import { DashTag } from '~/presentation/pages/dash';

export default async function DashPage() {
  return <DashTag />;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
