import Logo from '@/components/logo';
import { NAV_LINKS } from '@/constants';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { Settings } from '../../../sanity.types';
import { TiktokIcon } from '../../components/icons/socials/tiktok.icon';

type Props = {
  data: Settings;
};

const Footer = async ({ data }: Props) => {
  return (
    <footer>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-primary-foreground/80 text-sm">
              Créations artisanales en bois de palette. Authenticité, durabilité
              et savoir-faire français.
            </p>
            <div className="flex gap-3">
              <a
                href={data.instagram}
                target="_blank"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={data?.tiktok}
                target="_blank"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <TiktokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80">Meubles sur mesure</li>
              <li className="text-primary-foreground/80">Formations DIY</li>
              <li className="text-primary-foreground/80">E-book exclusif</li>
              <li className="text-primary-foreground/80">Devis gratuit</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-primary-foreground/80">
                <a
                  href={`mailto:${data.email}`}
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-primary"
                >
                  <Mail className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-sm">{data.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <a
                  href={`tel:${data.phone}`}
                  className="flex items-start gap-2 hover:text-primary"
                >
                  <Phone className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="text-sm">{data?.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-sm">{data?.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>
              &copy; {new Date().getFullYear()} RunWood. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="hover:text-primary-foreground transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="#"
                className="hover:text-primary-foreground transition-colors"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
