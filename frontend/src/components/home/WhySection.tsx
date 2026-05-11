import { ShieldCheck, BadgeCheck, PiggyBank, Headphones } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Sécurité Maximale",
    description: "Antécédents vérifiés, casier judiciaire analysé.",
  },
  {
    icon: BadgeCheck,
    title: "Qualité Garantie",
    description: "Professionnels formés et évalués par nos soins.",
  },
  {
    icon: PiggyBank,
    title: "Prix Juste",
    description: "Tarification transparente sans frais cachés.",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "À votre écoute à chaque étape.",
  },
];

export function WhySection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground">
            Pourquoi choisir <span className="text-primary">Sérénité</span> ?
          </h2>
          <p className="text-muted-foreground mt-3">
            Nous redéfinissons les standards de la domesticité en Côte d’Ivoire.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="group bg-card border rounded-2xl p-6 text-center 
                         hover:shadow-lg hover:border-primary/30 
                         active:scale-95 active:shadow-md
                         transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4 
                              group-hover:bg-primary group-hover:text-primary-foreground 
                              group-active:scale-90
                              transition-colors">
                <reason.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}