"use client";

import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  MapPin,
  Star,
  Briefcase,
  Clock,
  Circle,
  Mail,
} from "lucide-react";
import { domesticsData } from "@/data/domestics";
import Link from "next/link";

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const profile = domesticsData.find((d) => d.id === id);

  if (!profile) {
    return <p className="text-center mt-20">Profil introuvable</p>;
  }

  const user = {
    nom: profile.name.split(" ")[0],
    prenom: profile.name.split(" ").slice(1).join(" "),
  };
  const totalReviews = profile.reviews;
  const averageRating = profile.rating;
  const adresse = profile.location;
  const numeroCNI = "N/A";
  const photoUrl = "/images/domestic-profil.jpg.png";

  return (
    <div className="container mx-auto px-4 py-10 space-y-10 animate-fade-in">
      {/* fil d'ariane */}
      <div className="text-sm text-muted-foreground flex gap-1">
        <Link href="/" className="hover:text-primary active:underline">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/domestiques" className="hover:text-primary active:underline">
          Domestiques
        </Link>
        <span>/</span>
        <span className="text-foreground">{profile.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne gauche : photo circulaire */}
        <div className="lg:col-span-1 space-y-6">
          <div className="relative flex justify-center">
            <div className="w-48 h-48 rounded-full border-4 border-primary/20 shadow-lg overflow-hidden bg-muted
                            active:scale-105 active:border-primary/40 transition-all duration-200">
              <img
                src={photoUrl}
                alt={`${profile.name}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <Badge className="absolute top-0 right-0 flex items-center gap-1 text-sm active:scale-90 transition-transform">
              <Circle className="h-2 w-2 fill-current text-green-500" />{" "}
              Disponible
            </Badge>
          </div>
          <Card className="bg-primary/5 border-primary/20 active:scale-[0.98] transition-transform">
            <CardContent className="p-4 flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">Badge de Confiance Or</p>
                <p className="text-xs text-muted-foreground">
                  Identité vérifiée, casier judiciaire OK.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne droite : infos */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {profile.name}
            </h1>
            <p className="text-lg text-primary font-medium mt-1">{adresse}</p>
            <div className="flex items-center gap-1 text-amber-500 mt-2">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-bold text-foreground">
                {averageRating}
              </span>
              <span className="text-muted-foreground text-sm ml-2">
                ({totalReviews} avis)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem icon={<MapPin />} label="Localisation" value={adresse} />
            <StatItem icon={<Briefcase />} label="Expérience" value="-" />
            <StatItem icon={<Clock />} label="Âge" value="-" />
            <StatItem icon={<ShieldCheck />} label="CNI" value={numeroCNI} />
          </div>

          <Separator />
          <section>
            <h2 className="text-xl font-semibold mb-3">À propos</h2>
            <p className="text-muted-foreground">Aucune description fournie.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="px-3 py-1 active:scale-95 transition-transform">
                Non spécifié
              </Badge>
            </div>
          </section>

          <Separator />
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2 active:scale-95 transition-transform">
              <Briefcase className="h-4 w-4" /> Embaucher
            </Button>
            <Button variant="outline" size="lg" className="gap-2 active:scale-95 transition-transform">
              <Mail className="h-4 w-4" /> Contacter
            </Button>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              Avis ({totalReviews})
            </h2>
            {totalReviews === 0 ? (
              <p className="text-muted-foreground">
                Aucun avis pour le moment.
              </p>
            ) : (
              <div className="space-y-4">
                {/* Les avis réels seront intégrés plus tard */}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 
                    active:scale-95 active:bg-muted/80 transition-all duration-200">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}