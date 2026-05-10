"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CookieBanner() {
  // lit directement le localStorage (ce composant est uniquement client)
  const [show, setShow] = useState(() => {
    if (typeof window !== "undefined") {
      return !localStorage.getItem("cookieConsent");
    }
    return false; // ne sera jamais exécuté côté serveur car le composant est chargé avec ssr:false
  });

  const acceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setShow(false);
  };

  const refuse = () => {
    localStorage.setItem("cookieConsent", "refused");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-primary/10 shadow-2xl animate-slide-up">
      <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Nous utilisons des cookies pour améliorer votre expérience. En
          poursuivant votre navigation, vous acceptez notre{" "}
          <Link href="/conditions" className="underline text-primary">
            politique de confidentialité
          </Link>
          .
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refuse}>
            Refuser
          </Button>
          <Button size="sm" onClick={acceptAll}>
            Accepter tout
          </Button>
        </div>
      </div>
    </div>
  );
}