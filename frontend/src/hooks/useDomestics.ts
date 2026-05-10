// src/hooks/useDomestic.ts
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

export interface DomesticDetail {
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
  };
  totalReviews: number;
  averageRating: number;
}

export function useDomestic(id: string | undefined) {
  const [domestic, setDomestic] = useState<DomesticDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        const res = await api.get(`/api/profiles/${id}`);
        setDomestic(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return { domestic, loading, error };
}