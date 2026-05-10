import { Separator } from "@/components/ui/separator";

export default function LegalPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl animate-fade-in">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
        Cadre Légal et Transparence
      </h1>
      <p className="text-muted-foreground mb-10">
        Chez Sérénité, la confiance est le pilier de notre service. Nous nous
        engageons à protéger vos données et à définir clairement les règles
        d&apos;utilisation de notre plateforme en Côte d&apos;Ivoire.
      </p>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Conditions Générales d&apos;Utilisation</h2>
        <h3 className="text-lg font-medium">1. Objet du Service</h3>
        <p className="text-sm text-muted-foreground">
          La plateforme Sérénité met en relation des employeurs (Patrons) et des
          employés de maison (Domestiques) en Côte d&apos;Ivoire. Nous agissons
          en tant qu&apos;intermédiaire facilitateur et tiers de confiance.
        </p>
        <h3 className="text-lg font-medium">2. Inscription et Sécurité</h3>
        <p className="text-sm text-muted-foreground">
          Tout utilisateur doit fournir des informations exactes et certifiées.
          Pour les <strong>Domestiques</strong>, une vérification d&apos;identité
          et d&apos;antécédents est obligatoire avant la mise en place. Sérénité
          se réserve le droit de suspendre tout compte ne respectant pas les
          critères de moralité et de professionnalisme requis.
        </p>
        <h3 className="text-lg font-medium">3. Obligations de l&apos;Employeur</h3>
        <p className="text-sm text-muted-foreground">
          L&apos;employeur s&apos;engage à respecter le Code du Travail Ivoirien,
          notamment en ce qui concerne les horaires de travail, le repos
          hebdomadaire et la rémunération minimum légale.
        </p>
      </section>

      <Separator className="my-10" />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Politique de Confidentialité</h2>
        <h3 className="text-lg font-medium">Collecte de données</h3>
        <p className="text-sm text-muted-foreground">
          Nous collectons uniquement les données nécessaires à la vérification et
          à la mise en relation : Nom, prénoms, contact, pièce d&apos;identité
          et références professionnelles.
        </p>
        <h3 className="text-lg font-medium">Sécurité</h3>
        <p className="text-sm text-muted-foreground">
          Vos données sont cryptées et stockées sur des serveurs sécurisés. Seuls
          les agents habilités de Sérénité peuvent accéder aux documents
          d&apos;identité.
        </p>
        <h3 className="text-lg font-medium">Conservation des données</h3>
        <p className="text-sm text-muted-foreground">
          Les données sont conservées pendant toute la durée de l&apos;inscription
          et archivées pendant une période de 5 ans après la fermeture du compte,
          conformément aux obligations légales de traçabilité en vigueur.
        </p>
      </section>

      <Separator className="my-10" />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Gestion des Cookies</h2>
        <p className="text-sm text-muted-foreground">
          Nous utilisons des cookies pour améliorer votre expérience de navigation
          et analyser notre trafic sur la plateforme Sérénité. Vous pouvez
          personnaliser vos préférences ci-dessous.
        </p>
        {/* Le bandeau réel de cookies sera géré dans le layout.
            Ici nous affichons des explications statiques. */}
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site.</li>
          <li><strong>Cookies analytiques :</strong> nous aident à comprendre l&apos;usage du site.</li>
          <li><strong>Cookies publicitaires :</strong> non utilisés par Sérénité.</li>
        </ul>
      </section>
    </div>
  );
}