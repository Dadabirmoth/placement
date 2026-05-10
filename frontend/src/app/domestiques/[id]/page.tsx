"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReviewCard } from "@/components/domestics/ReviewCard";
import {
  ShieldCheck,
  MapPin,
  Star,
  Briefcase,
  Clock,
  Circle,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/api/profiles/${id}`);
        setProfileData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetch();
  }, [id]);

  // Spinner de chargement
  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profileData) {
    return <p className="text-center mt-20">Profil introuvable</p>;
  }

  const { ...profile } = profileData;
  const user = profile.User;
  const totalReviews = profile.totalReviews || 0;
  const averageRating = profile.averageRating || 0;

  return (
    <div className="container mx-auto px-4 py-10 space-y-10 animate-fade-in">
      {/* fil d'ariane */}
      <div className="text-sm text-muted-foreground flex gap-1">
        <Link href="/" className="hover:text-primary">Accueil</Link><span>/</span>
        <Link href="/domestiques" className="hover:text-primary">Domestiques</Link><span>/</span>
        <span className="text-foreground">{user.nom} {user.prenom}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne gauche : photo et badge */}
        <div className="lg:col-span-1 space-y-6">
          <div className="relative">
            <div className="w-full aspect-square rounded-2xl border-4 border-primary/20 shadow-lg overflow-hidden bg-muted">
              <img
                src={profile.photo || "/placeholder.jpg"}
                alt={`${user.nom} ${user.prenom}`}
                className="w-full h-full object-cover"
              />
            </div>
            <Badge className="absolute top-4 right-4 flex items-center gap-1 text-sm">
              <Circle className="h-2 w-2 fill-current text-green-500" /> Disponible
            </Badge>
          </div>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-sm">Badge de Confiance Or</p>
                <p className="text-xs text-muted-foreground">Identité vérifiée, casier judiciaire OK.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne droite : infos */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {user.nom} {user.prenom}
            </h1>
            <p className="text-lg text-primary font-medium mt-1">
              {profile.adresse}
            </p>
            <div className="flex items-center gap-1 text-amber-500 mt-2">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-bold text-foreground">{averageRating}</span>
              <span className="text-muted-foreground text-sm ml-2">
                ({totalReviews} avis)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem icon={<MapPin />} label="Localisation" value={profile.adresse} />
            <StatItem icon={<Briefcase />} label="Expérience" value="-" />
            <StatItem icon={<Clock />} label="Âge" value="-" />
            <StatItem icon={<ShieldCheck />} label="CNI" value={profile.numeroCNI} />
          </div>

          <Separator />
          <section>
            <h2 className="text-xl font-semibold mb-3">À propos</h2>
            <p className="text-muted-foreground">Aucune description fournie.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                Non spécifié
              </Badge>
            </div>
          </section>

          <Separator />
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2">
              <Briefcase className="h-4 w-4" /> Embaucher
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Mail className="h-4 w-4" /> Contacter
            </Button>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-4">Avis ({totalReviews})</h2>
            {totalReviews === 0 ? (
              <p className="text-muted-foreground">Aucun avis pour le moment.</p>
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
    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}