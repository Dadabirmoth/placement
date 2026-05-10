"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star, Pencil, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useProfile } from "@/hooks/useProfile";

export default function DomesticDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const { profile, loading: profileLoading, error } = useProfile();

  // Vérification utilisateur
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (!token || !userStr) {
      router.push("/connexion");
      return;
    }
    const u = JSON.parse(userStr);
    if (u.role !== "domestic") {
      router.push("/tableau-de-bord");
      return;
    }
    setUser(u);
  }, [router]);

  if (!user) return <p className="text-center mt-20">Chargement...</p>;

  if (profileLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Bienvenue, {user.prenom} {user.nom}
          </h1>
          <p className="text-muted-foreground">Domestique</p>
        </div>
        <Link
          href={profile ? "/profil/modifier" : "/profil/creer"}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          {profile ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
          {profile ? "Modifier mon profil" : "Créer mon profil"}
        </Link>
      </div>

      {profile ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Mon Profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-center">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={profile.photo || "/placeholder.jpg"} alt="Photo" />
                    <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                      {user.prenom.charAt(0)}{user.nom.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{user.prenom} {user.nom}</p>
                  <p className="text-sm text-muted-foreground">{profile.adresse}</p>
                  <div className="flex items-center justify-center gap-1 text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold">{profile.averageRating || 0}</span>
                  </div>
                  <Badge variant="secondary" className="mt-2">Vérifié</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Mes Missions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Aucune mission en cours. Votre profil est visible par les employeurs.</p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-muted/50 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-primary">0</p>
                    <p className="text-sm">Missions réalisées</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-primary">{profile.averageRating || 0}</p>
                    <p className="text-sm">Note moyenne</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-primary">{profile.totalReviews || 0}</p>
                    <p className="text-sm">Avis reçus</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Avis (à connecter plus tard) */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Avis reçus</h2>
            <p className="text-muted-foreground">Les avis s'afficheront ici.</p>
          </section>
        </>
      ) : (
        <Card className="text-center p-8">
          <p className="text-muted-foreground mb-4">Vous n'avez pas encore créé votre profil domestique.</p>
          <Link href="/profil/creer" className={buttonVariants({})}>Créer mon profil</Link>
        </Card>
      )}
    </div>
  );
}