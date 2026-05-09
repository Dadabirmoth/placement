import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-foreground">
          Prêt à simplifier votre quotidien ?
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Rejoignez des milliers de familles ivoiriennes qui font confiance à
          Sérénité pour le recrutement de leur personnel de maison.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/inscription?role=employer"
            className={buttonVariants({ size: "lg" })}
          >
            S&apos;inscrire comme Patron
          </Link>
          <Link
            href="/inscription?role=domestic"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Devenir Domestique
          </Link>
        </div>
      </div>
    </section>
  );
}