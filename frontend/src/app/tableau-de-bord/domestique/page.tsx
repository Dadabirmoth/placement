"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Briefcase, Circle, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

// Données mockées (simulant un profil)
const mockProfile = {
  id: 1,
  dateNaissance: "1995-08-22",
  lieuNaissance: "Abidjan",
  telephone: "0102030405",
  adresse: "Cocody, Angré",
  numeroCNI: "CI123456789",
  photo: "/uploads/photo-test.png",
};

const mockReviews = [
  { id: 1, reviewerName: "M. Kouassi", rating: 5, comment: "Excellent travail !", date: "Il y a 1 mois" },
  { id: 2, reviewerName: "Mme Diop", rating: 4, comment: "Très satisfaite.", date: "Il y a 3 mois" },
];

export default function DomesticDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    // Simuler le chargement du profil (plus tard appel API)
    // Pour le moment, on vérifie si un profil existe dans le mock
    setProfile(mockProfile); // remplacer par appel API
    setLoading(false);
  }, [router]);

  if (loading) return <p className="text-center mt-20">Chargement...</p>;
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-10 space-y-8 animate-fade-in">
      {/* En-tête avec nom et rôle */}
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
            {/* Carte profil */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Mon Profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-center">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={profile.photo || "/uploads/photo-test.png"} alt="Photo" />
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
                    <span className="font-bold">4.5</span> {/* mock */}
                  </div>
                  <Badge variant="secondary" className="mt-2">Vérifié</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Missions / Stats */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Mes Missions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Aucune mission en cours. Votre profil sera visible par les employeurs.</p>
                {/* Simuler quelques stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-muted/50 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-primary">0</p>
                    <p className="text-sm">Missions réalisées</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-primary">4.5</p>
                    <p className="text-sm">Note moyenne</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl text-center">
                    <p className="text-2xl font-bold text-primary">2</p>
                    <p className="text-sm">Avis reçus</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Avis */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Avis reçus</h2>
            <div className="space-y-4">
              {mockReviews.map((rev) => (
                <Card key={rev.id} className="border-primary/10">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Avatar className="h-10 w-10 bg-primary/10">
                      <AvatarFallback>{rev.reviewerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{rev.reviewerName}</p>
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{rev.comment}</p>
                      <p className="text-xs text-muted-foreground mt-1">{rev.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
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