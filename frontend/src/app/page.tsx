import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif font-bold text-primary">
            Sérénité
          </h1>
          <ModeToggle />
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Trouvez une domestique en toute sécurité</CardTitle>
            <CardDescription>
              La référence ivoirienne pour le recrutement de personnel de maison.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button variant="default">S&apos;inscrire comme Patron</Button>
            <Button variant="secondary">Devenir Domestique</Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Awa Koné</CardTitle>
              <CardDescription>Gouvernante · Cocody</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Badge variant="default">Vérifié</Badge>
              <Badge variant="secondary">⭐ 4.9</Badge>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Jean-Marc Traoré</CardTitle>
              <CardDescription>Cuisinier · Plateau</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Badge variant="default">Vérifié</Badge>
              <Badge variant="secondary">⭐ 4.8</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}