"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Users } from "lucide-react";
import Link from "next/link";

// mock
const savedDomestics = [
  { id: "1", name: "Awa Bakayoko", role: "Gouvernante", rating: 5.0, location: "Marcory", initials: "AB", avatar: "/avatars/awa.jpg" },
  { id: "2", name: "Jean-Paul Koffi", role: "Cuisinier", rating: 4.8, location: "Plateau", initials: "JK", avatar: "/avatars/jeanpaul.jpg" },
];

export default function EmployerDashboard() {
  const router = useRouter();

  // Lecture directe du localStorage dans l'initialisation de l'état (pas d'effet)
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
        try {
          const u = JSON.parse(userStr);
          if (u.role === "employer") {
            return u;
          }
        } catch {}
      }
    }
    return null;
  });

  // Redirection si non connecté (dans un useEffect, sans setUser)
  // Mais on peut aussi utiliser un simple if et router.replace, sans état.
  if (user === null) {
    // Vérification supplémentaire au cas où l'utilisateur n'est pas employeur
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (!token || !userStr) {
        router.replace("/connexion");
      } else {
        try {
          const u = JSON.parse(userStr);
          if (u.role !== "employer") {
            router.replace("/tableau-de-bord");
          }
        } catch {}
      }
    }
    return <p className="text-center mt-20">Chargement...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-8 animate-fade-in">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Bienvenue, {user.prenom} {user.nom}
        </h1>
        <p className="text-muted-foreground">Employeur</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Domestiques sauvegardés</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {savedDomestics.length === 0 ? (
              <p className="text-muted-foreground">Aucun domestique sauvegardé.</p>
            ) : (
              savedDomestics.map((d) => (
                <div key={d.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={d.avatar} />
                    <AvatarFallback>{d.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.role} · {d.location}</p>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs">{d.rating}</span>
                    </div>
                  </div>
                  <Link href={`/domestiques/${d.id}`} className="text-xs text-primary hover:underline">Voir</Link>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/domestiques" className={buttonVariants({ className: "w-full" })}>
              Rechercher un domestique
            </Link>
            <Button variant="outline" className="w-full">Laisser un avis (bientôt)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}