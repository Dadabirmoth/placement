import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

const profiles = [
  {
    id: "1",
    name: "Marie Kouassi",
    role: "Nounou / Gouvernante",
    location: "Cocody, Angré",
    rating: 4.9,
    missions: 12,
    avatar: "/avatars/marie.jpg",
    initials: "MK",
  },
  {
    id: "2",
    name: "Jean-Paul Koffi",
    role: "Cuisinier Professionnel",
    location: "Plateau",
    rating: 4.8,
    missions: 25,
    avatar: "/avatars/jeanpaul.jpg",
    initials: "JK",
  },
  {
    id: "3",
    name: "Awa Bakayoko",
    role: "Aide Ménagère",
    location: "Marcory, Zone 4",
    rating: 5.0,
    missions: 8,
    avatar: "/avatars/awa.jpg",
    initials: "AB",
  },
  {
    id: "4",
    name: "Marc Konan",
    role: "Chauffeur Privé",
    location: "Riviera",
    rating: 4.7,
    missions: 42,
    avatar: "/avatars/marc.jpg",
    initials: "MK",
  },
];

export function FeaturedProfiles() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground">
              Profils <span className="text-primary">Recommandés</span>
            </h2>
            <p className="text-muted-foreground mt-2">
              Découvrez nos meilleurs professionnels actuellement disponibles.
            </p>
          </div>
          <Link
            href="/domestiques"
            className="text-sm font-medium text-primary hover:underline hidden sm:block"
          >
            Voir tous les profils →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <Link key={profile.id} href={`/domestiques/${profile.id}`}>
              <Card className="group h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-primary/10">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-primary/20 group-hover:border-primary transition-colors">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {profile.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {profile.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {profile.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-bold">{profile.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({profile.missions} missions)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {profile.location}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Badge variant="secondary" className="text-xs">
                      Vérifié
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Disponible
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/domestiques"
            className="text-sm font-medium text-primary hover:underline"
          >
            Voir tous les profils →
          </Link>
        </div>
      </div>
    </section>
  );
}