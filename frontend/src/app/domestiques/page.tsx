"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { domesticsData } from "@/data/domestics";
import { DomesticCard } from "@/components/domestics/DomesticCard";

const ITEMS_PER_PAGE = 6;

export default function DomestiquesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("tous");
  const [sort, setSort] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let list = domesticsData;

    // Filtre par recherche (nom, rôle, localisation)
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.role.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q)
      );
    }

    // Filtre par catégorie
    if (category !== "tous") {
      list = list.filter((d) => d.category === category);
    }

    // Tri
    if (sort === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [search, category, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      {/* Titre */}
      <div className="text-center">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          Nos <span className="text-primary">Domestiques</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Découvrez nos professionnels vérifiés et disponibles.
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center bg-card/80 backdrop-blur p-2 rounded-2xl border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, lieu..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 border-0 bg-transparent focus-visible:ring-0"
          />
        </div>
        <Select value={category} onValueChange={(v) => { setCategory(v); setCurrentPage(1); }}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Toutes</SelectItem>
            <SelectItem value="cuisine">Cuisine</SelectItem>
            <SelectItem value="enfants">Garde d&apos;enfants</SelectItem>
            <SelectItem value="menage">Ménage</SelectItem>
            <SelectItem value="chauffeur">Chauffeur</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => { setSort(v); setCurrentPage(1); }}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Note (décroissant)</SelectItem>
            <SelectItem value="price-asc">Prix croissant</SelectItem>
            <SelectItem value="price-desc">Prix décroissant</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grille */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          Aucun domestique trouvé.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((domestic) => (
              <DomesticCard key={domestic.id} domestic={domestic} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 items-center pt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Précédent
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} sur {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Suivant
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}