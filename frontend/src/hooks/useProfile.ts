"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";

export interface ProfileData {
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
    email?: string | null;
  };
  totalReviews?: number;
  averageRating?: number;
}

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/api/profiles/me");
        setProfile(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Erreur de chargement du profil");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { profile, loading, error };
}