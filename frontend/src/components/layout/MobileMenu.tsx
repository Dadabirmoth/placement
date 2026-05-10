"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Nos domestiques", href: "/domestiques" },
  { name: "À propos", href: "/a-propos" },
  { name: "Contact", href: "/contact" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function MobileMenu({ open, onClose, isLoggedIn, onLogout }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[280px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl text-primary">
            Sérénité
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`text-lg font-medium transition-colors hover:text-primary ${
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/tableau-de-bord"
                className={buttonVariants({ variant: "default", className: "w-full" })}
                onClick={onClose}
              >
                Mon compte
              </Link>
              <Button variant="outline" className="w-full" onClick={() => { onLogout(); onClose(); }}>
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/connexion"
                className={buttonVariants({ variant: "outline", className: "w-full" })}
                onClick={onClose}
              >
                Connexion
              </Link>
              <Link
                href="/inscription"
                className={buttonVariants({ variant: "default", className: "w-full" })}
                onClick={onClose}
              >
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}