"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ShieldCheck, User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import { useState } from "react";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Nos domestiques", href: "/domestiques" },
  { name: "À propos", href: "/a-propos" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [auth, setAuth] = useState(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          return { isLoggedIn: true, userRole: user.role };
        } catch {}
      }
    }
    return { isLoggedIn: false, userRole: null };
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ isLoggedIn: false, userRole: null });
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <ShieldCheck className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
          <span className="font-serif text-2xl font-bold text-primary tracking-tight">
            Sérénité
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href
                  ? "text-primary"
                  : "text-foreground/80"
              }`}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {auth.isLoggedIn ? (
            <>
              <Link
                href={
                  auth.userRole
                    ? `/tableau-de-bord/${auth.userRole}`
                    : "/tableau-de-bord"
                }
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                <User className="h-4 w-4 mr-2" />
                Mon compte
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/connexion"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Connexion
              </Link>
              <Link
                href="/inscription"
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isLoggedIn={auth.isLoggedIn}
        onLogout={() => {
          handleLogout();
          setMobileOpen(false);
        }}
      />
    </header>
  );
}