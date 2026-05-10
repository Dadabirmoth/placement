"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assurez-vous que Textarea existe (sinon on peut l'ajouter via shadcn)
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici plus tard on enverra vers le backend
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl font-bold text-foreground text-center mb-8">
          Parlons de vos besoins
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Notre équipe est prête à vous accompagner dans la recherche du profil
          idéal pour votre foyer ou pour votre carrière.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coordonnées */}
          <div className="space-y-6">
            <ContactInfo
              icon={<MapPin className="h-5 w-5 text-primary" />}
              title="Siège Social"
              lines={["Cocody Ambassades, Rue de la Sérénité", "Abidjan, Côte d’Ivoire"]}
            />
            <ContactInfo
              icon={<Phone className="h-5 w-5 text-primary" />}
              title="Téléphone"
              lines={["+225 07 00 00 00 00", "Lun - Ven, 8h00 - 18h00"]}
            />
            <ContactInfo
              icon={<Mail className="h-5 w-5 text-primary" />}
              title="Email"
              lines={["contact@serenite.ci"]}
            />
          </div>

          {/* Formulaire */}
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            {submitted ? (
              <div className="text-center py-8">
                <p className="text-lg font-semibold text-primary">
                  Merci ! Votre message a bien été envoyé.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="name"
                  placeholder="Nom complet"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="subject"
                  placeholder="Objet"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  name="message"
                  placeholder="Comment pouvons-nous vous aider ?"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
                <Button type="submit" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Envoyer le message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant d'affichage des coordonnées
function ContactInfo({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="font-medium text-sm">{title}</p>
        {lines.map((line, idx) => (
          <p key={idx} className="text-sm text-muted-foreground">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}