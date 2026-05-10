"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ShieldCheck, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (!token || !userStr) {
      router.push("/connexion");
      return;
    }
    const u = JSON.parse(userStr);
    if (u.role !== "admin") {
      router.push("/tableau-de-bord");
      return;
    }
    setUser(u);

    // Charger les stats et les utilisateurs récents
    const fetchData = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          api.get("/api/admin/stats"),
          api.get("/api/admin/users?limit=5"),
        ]);
        setStats(statsRes.data);
        setRecentUsers(usersRes.data.users || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  if (!user || loading) {
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-8 animate-fade-in">
      <h1 className="font-serif text-3xl font-bold text-foreground">
        Tableau de bord Administrateur
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Utilisateurs" value={stats?.totalUsers || 0} icon={<Users className="h-5 w-5" />} />
        <StatCard title="Domestiques" value={stats?.totalDomestics || 0} icon={<ShieldCheck className="h-5 w-5" />} />
        <StatCard title="Employeurs" value={stats?.totalEmployers || 0} icon={<Users className="h-5 w-5" />} />
        <StatCard title="Vérifications en attente" value={0} icon={<AlertTriangle className="h-5 w-5 text-destructive" />} />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Inscriptions récentes</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="flex items-center gap-4 p-2 border-b text-sm font-medium text-muted-foreground">
                <span className="flex-1">Nom</span>
                <span className="flex-1">Rôle</span>
                <span className="flex-1">Date</span>
                <span className="flex-1">Statut</span>
                <span className="w-20 text-right">Actions</span>
              </div>
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-4 p-2 border-b last:border-b-0 text-sm hover:bg-muted/50">
                  <span className="flex-1 font-medium">{u.nom} {u.prenom}</span>
                  <span className="flex-1">{u.role === "domestic" ? "Domestique" : "Employeur"}</span>
                  <span className="flex-1">{new Date(u.createdAt).toLocaleDateString()}</span>
                  <span className="flex-1"><Badge variant="secondary">N/A</Badge></span>
                  <span className="w-20 text-right">
                    <Button variant="ghost" size="sm">Détails</Button>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 text-right">
            <Link href="/admin/utilisateurs" className="text-sm text-primary hover:underline">Voir tous les utilisateurs</Link>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Link href="/admin/verifications" className={buttonVariants({ variant: "default" })}>Vérifications</Link>
        <Link href="/admin/statistiques" className={buttonVariants({ variant: "outline" })}>Statistiques avancées</Link>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
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