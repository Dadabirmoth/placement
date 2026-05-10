"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ShieldCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";

// mock stats
const stats = {
  totalUsers: 1284,
  domestics: 980,
  employers: 300,
  admins: 4,
  pendingVerifications: 12,
};

// mock utilisateurs récents
const recentUsers = [
  {
    id: 1,
    name: "Awa Koné",
    role: "domestic",
    date: "2026-05-08",
    status: "Vérifié",
  },
  {
    id: 2,
    name: "Jean-Marc Traoré",
    role: "employer",
    date: "2026-05-07",
    status: "En attente",
  },
  {
    id: 3,
    name: "Fatou Diop",
    role: "domestic",
    date: "2026-05-06",
    status: "Vérifié",
  },
];

export default function AdminDashboard() {
  const router = useRouter();

  // Initialisation de l'état utilisateur sans effet
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
        try {
          const u = JSON.parse(userStr);
          if (u.role === "admin") {
            return u;
          }
        } catch {}
      }
    }
    return null;
  });

  // Redirection si non connecté ou mauvais rôle (pas de setState dans un effet)
  if (user === null) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (!token || !userStr) {
        router.replace("/connexion");
      } else {
        try {
          const u = JSON.parse(userStr);
          if (u.role !== "admin") {
            router.replace("/tableau-de-bord");
          }
        } catch {}
      }
    }
    return <p className="text-center mt-20">Chargement...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold text-foreground">
        Tableau de bord Administrateur
      </h1>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Utilisateurs"
          value={stats.totalUsers}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Domestiques"
          value={stats.domestics}
          icon={<ShieldCheck className="h-5 w-5" />}
        />
        <StatCard
          title="Employeurs"
          value={stats.employers}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Vérifications en attente"
          value={stats.pendingVerifications}
          icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
        />
      </div>

      {/* Inscriptions récentes (sans composant Table) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Inscriptions récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* En-tête */}
              <div className="flex items-center gap-4 p-2 border-b text-sm font-medium text-muted-foreground">
                <span className="flex-1">Nom</span>
                <span className="flex-1">Rôle</span>
                <span className="flex-1">Date</span>
                <span className="flex-1">Statut</span>
                <span className="w-20 text-right">Actions</span>
              </div>
              {/* Lignes */}
              {recentUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-4 p-2 border-b last:border-b-0 text-sm hover:bg-muted/50"
                >
                  <span className="flex-1 font-medium">{u.name}</span>
                  <span className="flex-1">
                    {u.role === "domestic" ? "Domestique" : "Employeur"}
                  </span>
                  <span className="flex-1">{u.date}</span>
                  <span className="flex-1">
                    <Badge
                      variant={
                        u.status === "Vérifié" ? "default" : "secondary"
                      }
                    >
                      {u.status}
                    </Badge>
                  </span>
                  <span className="w-20 text-right">
                    <Button variant="ghost" size="sm">
                      Détails
                    </Button>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 text-right">
            <Link
              href="/admin/utilisateurs"
              className="text-sm text-primary hover:underline"
            >
              Voir tous les utilisateurs
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="flex gap-4">
        <Link
          href="/admin/verifications"
          className={buttonVariants({ variant: "default" })}
        >
          Vérifications en attente ({stats.pendingVerifications})
        </Link>
        <Link
          href="/admin/statistiques"
          className={buttonVariants({ variant: "outline" })}
        >
          Statistiques avancées
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-2 rounded-full bg-primary/10 text-primary">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}