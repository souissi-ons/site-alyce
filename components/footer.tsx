import Image from "next/image";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-tertiary pt-12 pb-8 rounded-t-[75px] overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {/* Colonne 1 - Logo et description */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-6">
              <Image
                src="/alyce-logo-2.png"
                alt="Alyce"
                width={200}
                height={96}
                className="w-40 md:w-48 h-auto border border-primaryDark p-3"
              />
            </div>
            <p className="text-primaryDark text-center md:text-left max-w-xs">
              Bienvenue chez Alyce, où nous élevons votre expérience des parfums
              et des bougies à un tout autre niveau !
            </p>
          </div>

          {/* Colonne 2 - Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-primaryDark font-semibold text-lg mb-4 border-b border-primaryDark pb-2 w-full">
              Contactez-nous
            </h3>
            <address className="text-primaryDark not-italic text-center md:text-left space-y-2">
              <p className="flex items-center justify-center md:justify-start">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                contact@alyce-senteurs.tn
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                +216 99 235 689
              </p>
            </address>
          </div>

          {/* Colonne 3 - Réseaux sociaux */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-primaryDark font-semibold text-lg mb-4 border-b border-primaryDark pb-2 w-full">
              Suivez-nous
            </h3>
            <div className="flex space-x-4 md:space-x-6">
              {[
                { name: "Facebook", icon: Facebook },
                { name: "Instagram", icon: Instagram },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href="#"
                    className="text-primaryDark hover:text-primaryDark transition-colors duration-300 flex flex-col items-center"
                    aria-label={`Suivez-nous sur ${social.name}`}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-xs mt-1">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-opacity-20 border-primaryDark">
          <p className="text-center text-primaryDark text-sm">
            &copy; {new Date().getFullYear()} Alyce. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
