import { ShieldCheck, Heart, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16 animate-fade-in">
      {/* Hero section */}
      <section className="text-center space-y-4">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
          La tranquillité d&apos;esprit pour votre foyer.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Sérénité redéfinit le placement de personnel domestique en Côte
          d&apos;Ivoire en mettant la sécurité et le professionnalisme au cœur
          de chaque foyer.
        </p>
      </section>

      {/* Mission & valeurs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ValueCard
          icon={<ShieldCheck className="h-8 w-8 text-primary" />}
          title="Sécurité Absolue"
          description="Chaque candidat subit un processus de vérification rigoureux incluant le casier judiciaire et les références professionnelles."
        />
        <ValueCard
          icon={<Heart className="h-8 w-8 text-primary" />}
          title="Dignité & Respect"
          description="Nous valorisons le travail domestique en garantissant des conditions justes et conformes à la législation ivoirienne."
        />
        <ValueCard
          icon={<Award className="h-8 w-8 text-primary" />}
          title="Excellence"
          description="Nos formations continues assurent que chaque domestique placé maîtrise les standards de service les plus élevés."
        />
      </section>

      {/* Citation ou vision */}
      <section className="bg-muted/50 rounded-2xl p-8 text-center">
        <blockquote className="font-serif text-xl italic text-foreground">
          « Nous construisons un écosystème où employeurs et employés
          s&apos;épanouissent mutuellement grâce à une transparence totale. »
        </blockquote>
        <p className="mt-4 text-sm text-muted-foreground">
          — L&apos;équipe Sérénité
        </p>
      </section>
    </div>
  );
}

// Petit composant réutilisable pour les cartes de valeurs
function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group bg-card border rounded-2xl p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}