import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ShieldCheck, Circle } from "lucide-react";
import type { Domestic } from "@/data/domestics";

interface DomesticCardProps {
  domestic: Domestic;
}

export function DomesticCard({ domestic }: DomesticCardProps) {
  return (
    <Link href={`/domestiques/${domestic.id}`}>
      <Card
        className="group relative h-64 overflow-hidden rounded-2xl border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        style={
          domestic.avatar
            ? { backgroundImage: `url(${domestic.avatar})` }
            : undefined
        }
      >
        {/* Overlay dégradé pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

        {/* Si pas d'image, on affiche l'initiale en grand */}
        {!domestic.avatar && (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/10 z-0">
            <span className="text-6xl font-serif text-primary/30">
              {domestic.initials}
            </span>
          </div>
        )}

        {/* Contenu superposé */}
        <CardContent className="relative z-20 h-full flex flex-col justify-end p-4 text-white">
          <div className="space-y-1.5">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {domestic.name}
            </h3>
            <p className="text-sm text-gray-300">{domestic.role}</p>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-bold">{domestic.rating}</span>
              <span className="text-xs text-gray-400 ml-1">
                ({domestic.reviews} avis)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <MapPin className="h-3.5 w-3.5" />
              {domestic.location}
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              <Badge
                variant="secondary"
                className="text-xs flex items-center gap-1 bg-white/20 text-white border-0"
              >
                <ShieldCheck className="h-3 w-3" />
                Vérifié
              </Badge>
              <Badge
                variant={domestic.available ? "default" : "outline"}
                className={`text-xs flex items-center gap-1 ${
                  domestic.available
                    ? "bg-green-600 text-white border-0"
                    : "bg-white/10 text-gray-300 border border-gray-500"
                }`}
              >
                <Circle
                  className={`h-2 w-2 fill-current ${
                    domestic.available ? "text-green-200" : "text-gray-500"
                  }`}
                />
                {domestic.available ? "Disponible" : "En mission"}
              </Badge>
            </div>
            <span className="text-sm font-bold text-primary drop-shadow">
              {domestic.price.toLocaleString()} FCFA/h
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}