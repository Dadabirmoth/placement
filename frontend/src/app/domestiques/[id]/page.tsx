"use client";

import { notFound } from "next/navigation";
import { sampleProfile } from "@/data/profile";
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
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage({ params }: { params: { id: string } }) {
  const profile = sampleProfile; // pour la démo

  if (!profile) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-10 animate-fade-in">
      {/* Fil d'ariane */}
      <div className="text-sm text-muted-foreground flex gap-1">
        <Link href="/" className="hover:text-primary">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/domestiques" className="hover:text-primary">
          Domestiques
        </Link>
        <span>/</span>
        <span className="text-foreground">{profile.name}</span>
      </div>

      {/* HEADER PROFILE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne gauche : photo et badges */}
        <div className="lg:col-span-1 space-y-6">
          <div className="relative">
            {/* Photo en rectangle arrondi (plus d'Avatar) */}
            <div className="w-full aspect-square rounded-2xl border-4 border-primary/20 shadow-lg overflow-hidden bg-muted">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const parent = e.currentTarget.parentElement!;
                  parent.innerHTML = `<span class="text-6xl font-serif text-primary flex items-center justify-center w-full h-full">${profile.name.charAt(0)}</span>`;
                }}
              />
            </div>
            <Badge
              className="absolute top-4 right-4 flex items-center gap-1 text-sm"
              variant={profile.available ? "default" : "outline"}
            >
              <Circle
                className={`h-2 w-2 fill-current ${
                  profile.available ? "text-green-500" : "text-muted-foreground"
                }`}
              />
              {profile.available ? "Disponible" : "En mission"}
            </Badge>
          </div>

          {/* Badge de confiance */}
          <Card className="bg-primary/5 border-primary/20">
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
            <p className="text-lg text-primary font-medium mt-1">
              {profile.role}
            </p>
            <div className="flex items-center gap-1 text-amber-500 mt-2">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-bold text-foreground">
                {profile.rating}
              </span>
              <span className="text-muted-foreground text-sm ml-2">
                ({profile.reviewsCount} avis) · {profile.missions} missions
              </span>
            </div>
          </div>

          {/* Détails rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem icon={<MapPin />} label="Localisation" value="Cocody, Abidjan" />
            <StatItem icon={<Briefcase />} label="Expérience" value={profile.experience} />
            <StatItem icon={<Clock />} label="Âge" value={`${profile.age} ans`} />
            <StatItem icon={<ShieldCheck />} label="CNI" value={profile.cni} />
          </div>

          <Separator />

          {/* À propos */}
          <section>
            <h2 className="text-xl font-semibold mb-3">À propos</h2>
            <p className="text-muted-foreground leading-relaxed">
              {profile.about}
            </p>
          </section>

          {/* Compétences */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-3 py-1 text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          <Separator />

          {/* Boutons d'action */}
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2">
              <Briefcase className="h-4 w-4" />
              Embaucher {profile.name.split(" ")[0]}
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Mail className="h-4 w-4" />
              Contacter
            </Button>
          </div>

          {/* Avis */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Avis des employeurs ({profile.reviews.length})
            </h2>
            <div className="space-y-4">
              {profile.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {profile.reviews.length === 0 && (
              <p className="text-muted-foreground">Aucun avis pour le moment.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

// Composant StatItem amélioré (optionnel, mais déjà présent)
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