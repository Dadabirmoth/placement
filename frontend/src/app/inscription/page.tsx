// src/app/inscription/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label"; // Assurez-vous de l'avoir (à ajouter si besoin)
import { ShieldCheck } from "lucide-react";
import api, { setToken } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // étape 1 : choix du rôle ; étape 2 : formulaire
  const [role, setRole] = useState<"domestic" | "employer">("domestic");
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", {
        ...form,
        role,
      });
      setToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      // Rediriger vers la page appropriée (tableau de bord domestique ou employeur)
      router.push("/tableau-de-bord");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <ShieldCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-serif text-2xl">Inscription</CardTitle>
          <CardDescription>
            {step === 1
              ? "Choisissez votre profil"
              : `Créer un compte ${role === "domestic" ? "Domestique" : "Patron"}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="space-y-4">
              <Button
                variant={role === "domestic" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => { setRole("domestic"); setStep(2); }}
              >
                <span className="font-bold text-lg">🧹</span> Je suis Domestique
              </Button>
              <Button
                variant={role === "employer" ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => { setRole("employer"); setStep(2); }}
              >
                <span className="font-bold text-lg">🏠</span> Je suis Patron
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  placeholder="Ex: Kouassi"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  placeholder="Ex: Jean"
                  value={form.prenom}
                  onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe (6 caractères minimum)</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Retour
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Création..." : "S'inscrire"}
                </Button>
              </div>
            </form>
          )}
          <p className="mt-4 text-sm text-center text-muted-foreground">
            Déjà un compte ?{" "}
            <Link href="/connexion" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}