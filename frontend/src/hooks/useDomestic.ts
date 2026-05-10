// src/hooks/useDomestics.ts
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

export interface Domestic {
  id: number;
  userId: number;
  dateNaissance: string;
  lieuNaissance: string;
  telephone: string;
  adresse: string;
  numeroCNI: string;
  photo: string | null;
  User: {
    nom: string;
    prenom: string;
    telephone: string;
    email: string | null;
  };
  totalReviews?: number;
  averageRating?: number;
}

export function useDomestics() {
  const [domestics, setDomestics] = useState<Domestic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        // On va utiliser la route publique de liste des profils (nous devons la créer)
        // Pour l'instant, nous allons créer un endpoint GET /api/profiles (public, sans pagination)
        const res = await api.get("/api/profiles");
        setDomestics(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { domestics, loading, error };
}