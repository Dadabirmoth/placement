import Link from "next/link";
import { ShieldCheck, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-muted/30 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Colonne 1 : Logo + description */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-bold text-primary">
                Sérénité
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La référence pour le recrutement de personnel de maison en Côte
              d&apos;Ivoire. Confiance, sécurité et professionnalisme.
            </p>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Liens rapides</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/domestiques" className="hover:text-primary transition-colors">
                  Nos domestiques
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Légal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Informations légales</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/conditions" className="hover:text-primary transition-colors">
                  Conditions d&apos;utilisation
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary transition-colors">
                  Gestion des cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Cocody Ambassades, Abidjan
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +225 07 00 00 00 00
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                contact@serenite.ci
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Sérénité Côte d&apos;Ivoire. Tous
            droits réservés.
          </p>
          <div className="flex gap-4">
            <Link href="/conditions" className="hover:text-primary">
              CGU
            </Link>
            <Link href="/confidentialite" className="hover:text-primary">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}