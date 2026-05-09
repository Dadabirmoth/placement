import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background py-20 lg:py-28">
      {/* Cercles décoratifs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
            <ShieldCheck className="h-4 w-4" />
            Plateforme de confiance ivoirienne
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground animate-slide-up">
            Trouvez une domestique{" "}
            <span className="text-primary">en toute sécurité</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto animate-fade-in delay-200">
            Sérénité connecte les foyers ivoiriens avec des professionnels de
            maison qualifiés et vérifiés. Pour votre tranquillité d’esprit.
          </p>

          {/* Filtres */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto bg-card/80 backdrop-blur p-2 rounded-2xl border shadow-lg animate-slide-up delay-300">
            <Select>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abidjan">Abidjan</SelectItem>
                <SelectItem value="bouake">Bouaké</SelectItem>
                <SelectItem value="yamoussoukro">Yamoussoukro</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Commune (Abidjan)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cocody">Cocody</SelectItem>
                <SelectItem value="plateau">Plateau</SelectItem>
                <SelectItem value="marcory">Marcory</SelectItem>
                <SelectItem value="treichville">Treichville</SelectItem>
              </SelectContent>
            </Select>
            <Button size="lg" className="gap-2">
              <Search className="h-4 w-4" />
              Rechercher
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 animate-fade-in delay-500">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">1 200+</p>
              <p className="text-sm text-muted-foreground">Profils vérifiés</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">98%</p>
              <p className="text-sm text-muted-foreground">Satisfaction client</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">15 min</p>
              <p className="text-sm text-muted-foreground">Délai de matching</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}