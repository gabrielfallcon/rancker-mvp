'use client';
import { useForm } from 'react-hook-form';
import {
  EmailIcon,
  InstagramIcon,
  LogoTextIcon,
  PhoneIcon,
  SmallEmailIcon,
  WhatsAppIcon
} from '../../icons';
import { ButtonTag } from '../button';
import { TextFieldTag } from '../text-field';
import './footer.styles.scss';
import { DividerTag } from '../divider';
import { useRouter } from 'next/navigation';

function FooterComponent() {
  const router = useRouter();

  const redirectLink = (link: string) => {
    router.push(link);
  };
  const { control } = useForm();
  return (
    <footer className='footer-wrapper'>
      <div className='footer-wrapper__newsletter'>
        <div className='box-infoContact'>
          <LogoTextIcon />

          <div className='box-item'>
            <PhoneIcon />
            <div>
              <p>Ficou com alguma dúvida?</p>
              <span>+(55) 11 99180-5514</span>
            </div>
          </div>

          <div className='box-item'>
            <EmailIcon />
            <div>
              <p>Entre em contato</p>
              <span>ranckersports@gmail.com</span>
            </div>
          </div>
        </div>

        {/* <div className='box-newsletter'>
          <h3>Newsletter</h3>
          <p>Receba todas as atualizações da Rancker e fique por dentro.</p>

          <div className='form-newsletter'>
            <TextFieldTag
              control={control}
              label='E-mail'
              name='newsletter-email'
              type='text'
              placeholder='informe seu e-mail'
            />
            <ButtonTag label='Cadastrar-se' primary />
          </div>
        </div> */}
      </div>

      {/* <div className='footer-wrapper__list-links'>
        <ul>
          <span>Rancker</span>
          <li>Quem somos</li>
          <li>Nossos torneios</li>
          <li>Ranking</li>
        </ul>
        <ul>
          <span>Planos</span>
          <li>Para Atletas</li>
          <li>Para Organizadores</li>
          <li>Arenas Parceiras</li>
        </ul>
        <ul>
          <span>Contato</span>
          <li>Falar no WhatsApp</li>
          <li>Enviar E-mail</li>
          <li>Instagram</li>
        </ul>
        <ul>
          <span>Segurança</span>
          <li>Termos e Uso</li>
          <li>Política e Privacidade</li>
          <li>Política de Cookies</li>
        </ul>
      </div> */}

      <DividerTag />

      <div className='footer-wrapper__copyright-web'>
        <div className='copyright-midia'>
          <span>Acompanhe a Rancker</span>
          <ul>
            <li>
              <WhatsAppIcon
                onClick={() =>
                  redirectLink('https://wa.me/send?phone=5511991805514')
                }
              />
            </li>
            <li>
              <InstagramIcon
                onClick={() =>
                  redirectLink(
                    'https://www.instagram.com/user?username=ranckersports'
                  )
                }
              />
            </li>
            <li>
              <SmallEmailIcon
                onClick={() =>
                  redirectLink(
                    'https://www.mailto:email@://ranckersports@gmail.com'
                  )
                }
              />
            </li>
          </ul>
        </div>

        <p className='copyright-text'>
          Copyright © 2026 Rancker | Todos os direitos reservados.
        </p>
      </div>

      <div className='footer-wrapper__copyright-mob'>
        <div className='box-copy'>
          <LogoTextIcon />

          <p className='copyright-text'>
            Copyright © 2026 Rancker <br /> Todos os direitos reservados.
          </p>
        </div>

        <div className='box-item'>
          <PhoneIcon />
          <div>
            <p>Ficou com alguma dúvida?</p>
            <span>+(55) 11 99180-5514</span>
          </div>
        </div>

        <div className='box-item'>
          <EmailIcon />
          <div>
            <p>Entre em contato</p>
            <span>ranckersports@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
