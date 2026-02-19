import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes';
import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';
import { formatPayerName } from '~/utils';
import { AthleteFormData } from '~/presentation/contexts';

interface ApiReqProps {
  tournamentId: string;
  categories: {
    id: string;
    name: string;
    price: number;
  }[];
  teamsByCategory: Record<string, AthleteFormData>;
  athlete: AthleteFormData;
  total: number;
}

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!
});

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ApiReqProps;

    const { athlete, categories, teamsByCategory, tournamentId, total } = body;

    if (!athlete?.email || !tournamentId || !categories?.length) {
      return NextResponse.json(
        { error: 'Dados incompletos para criar pagamento' },
        { status: 400 }
      );
    }

    /* ------------------------------------------------------------------
     * 💰 CÁLCULOS
     * ------------------------------------------------------------------ */

    const subtotal = categories.reduce((acc, c) => acc + c.price, 0);
    const platformFee = total - subtotal;
    const totalOrganizer = total - platformFee;
    const organizerFee = totalOrganizer * 0.03;
    const applicationFee = platformFee + organizerFee;

    /* ------------------------------------------------------------------
     * 🛒 CRIA PREFERENCE
     * ------------------------------------------------------------------ */

    const preference = new Preference(mp);

    const items: PreferenceRequest['items'] = [
      ...categories.map(c => ({
        id: c.id,
        title: c.name,
        quantity: 1,
        currency_id: 'BRL',
        unit_price: c.price
      })),
      {
        id: 'platform-fee',
        title: 'Taxa da plataforma',
        quantity: 1,
        currency_id: 'BRL',
        unit_price: platformFee
      }
    ];

    const payerName = formatPayerName({
      athlete,
      categories,
      teamsByCategory
    });

    const response = await preference.create({
      body: {
        items,
        payer: {
          email: athlete.email,
          name: payerName,
          surname: 'Atleta'
        },
        marketplace: 'Rancker',
        metadata: {
          tournamentId,
          athlete,
          teamsByCategory,
          tax: applicationFee
        },
        back_urls: {
          success: `https://rancker-mvp.vercel.app/success`,
          failure: `https://rancker-mvp.vercel.app/error`,
          pending: `https://rancker-mvp.vercel.app/pending`
        }
      }
    });

    /* ------------------------------------------------------------------
     * 💾 PERSISTÊNCIA NO BANCO (SEM TRANSAÇÃO INTERATIVA)
     * ------------------------------------------------------------------ */

    // 1️⃣ Upsert atleta principal
    const mainAthlete = await prisma.athlete.upsert({
      where: { email: athlete.email },
      update: athlete,
      create: athlete
    });

    // 2️⃣ Para cada categoria cria parceiro + time
    for (const [categoryId, partner] of Object.entries(teamsByCategory)) {
      const partnerAthlete = await prisma.athlete.upsert({
        where: { email: partner.email },
        update: partner,
        create: partner
      });

      // 🔒 Evita duplicação
      const existingTeam = await prisma.team.findFirst({
        where: {
          tournamentId,
          categoryId,
          paymentId: String(response.id)
        }
      });

      if (existingTeam) continue;

      await prisma.team.create({
        data: {
          tournamentId,
          categoryId,
          status: 'pending',
          paymentId: String(response.id),
          stripeSessionId: String(response.id),
          athletes: {
            create: [
              { athleteId: mainAthlete.id },
              { athleteId: partnerAthlete.id }
            ]
          }
        }
      });
    }

    /* ------------------------------------------------------------------
     * ✅ RESPONSE
     * ------------------------------------------------------------------ */

    return NextResponse.json({
      preferenceId: response.id
    });
  } catch (err) {
    console.error('Checkout error:', err);

    return NextResponse.json(
      { error: 'Erro ao criar pagamento' },
      { status: 500 }
    );
  }
}
