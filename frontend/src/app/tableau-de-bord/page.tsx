"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) return JSON.parse(userStr);
    }
    return null;
  });

  useEffect(() => {
    // Si pas de token, rediriger immédiatement
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/connexion");
    }
  }, [router]);

  if (!user) return <p className="text-center mt-20">Chargement...</p>;

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Bienvenue, {user.prenom} {user.nom} !</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Rôle : {user.role}</p>
          <p>Email : {user.email}</p>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              router.push("/connexion");
            }}
          >
            Déconnexion
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}