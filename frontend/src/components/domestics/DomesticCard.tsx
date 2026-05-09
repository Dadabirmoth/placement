import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, ShieldCheck, Circle } from "lucide-react";
import type { Domestic } from "@/data/domestics";

interface DomesticCardProps {
  domestic: Domestic;
}

export function DomesticCard({ domestic }: DomesticCardProps) {
  return (
    <Link href={`/domestiques/${domestic.id}`}>
      <Card className="group h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-primary/10">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 border-2 border-primary/20 group-hover:border-primary transition-colors">
              <AvatarImage src={domestic.avatar} alt={domestic.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {domestic.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {domestic.name}
              </h3>
              <p className="text-xs text-muted-foreground">{domestic.role}</p>
              <div className="flex items-center gap-1 text-amber-500 mt-1">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-xs font-bold">{domestic.rating}</span>
                <span className="text-xs text-muted-foreground ml-1">
                  ({domestic.reviews} avis)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {domestic.location}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge
                variant="secondary"
                className="text-xs flex items-center gap-1"
              >
                <ShieldCheck className="h-3 w-3" />
                Vérifié
              </Badge>
              <Badge
                variant={domestic.available ? "default" : "outline"}
                className={`text-xs flex items-center gap-1 ${
                  domestic.available ? "" : "text-muted-foreground"
                }`}
              >
                <Circle className={`h-2 w-2 fill-current ${domestic.available ? 'text-green-500' : 'text-muted-foreground'}`} />
                {domestic.available ? "Disponible" : "En mission"}
              </Badge>
            </div>
            <span className="text-sm font-bold text-primary">
              {domestic.price.toLocaleString()} FCFA/h
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}