import Link from "next/link";
import { DomesticCard } from "@/components/domestics/DomesticCard";
import type { Domestic } from "@/data/domestics";

const featuredProfiles: Domestic[] = [
  {
    id: "1",
    name: "Marie Kouassi",
    role: "Nounou / Gouvernante",
    category: "enfants",
    location: "Cocody, Angré",
    rating: 4.9,
    reviews: 12,
    missions: 12,
    price: 2500,
    verified: true,
    available: true,
    avatar: "/images/domestic1.jpg.png",
    initials: "MK",
  },
  {
    id: "2",
    name: "Jean-Paul Koffi",
    role: "Cuisinier Professionnel",
    category: "cuisine",
    location: "Plateau",
    rating: 4.8,
    reviews: 25,
    missions: 25,
    price: 3000,
    verified: true,
    available: false,
    avatar: "/images/domestic2.jpg.png",
    initials: "JK",
  },
  {
    id: "3",
    name: "Awa Bakayoko",
    role: "Aide Ménagère",
    category: "menage",
    location: "Marcory, Zone 4",
    rating: 5.0,
    reviews: 8,
    missions: 8,
    price: 2000,
    verified: true,
    available: true,
    avatar: "/images/domestic3.jpg.png",
    initials: "AB",
  },
  {
    id: "4",
    name: "Marc Konan",
    role: "Chauffeur Privé",
    category: "chauffeur",
    location: "Riviera",
    rating: 4.7,
    reviews: 42,
    missions: 42,
    price: 4000,
    verified: true,
    available: true,
    avatar: "/images/domestic5.jpg.png",
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
          {featuredProfiles.map((profile) => (
            <DomesticCard key={profile.id} domestic={profile} />
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