export interface DomesticProfile {
  id: string;
  name: string;
  role: string;
  category: string;
  location: string;
  rating: number;
  reviewsCount: number;
  missions: number;
  experience: string;        // "8 ans"
  available: boolean;
  verified: boolean;
  price: number;             // FCFA/h
  phone: string;             // masqué partiellement
  cni: string;               // masqué
  age: number;
  birthDate: string;
  photo: string;             // URL portrait
  about: string;
  skills: string[];
  reviews: Review[];
}

export interface Review {
  id: number;
  reviewerName: string;
  reviewerInitials: string;
  rating: number;
  comment: string;
  date: string;              // "Il y a 2 mois"
}

// Exemple de profil complet (Awa Koné)
export const sampleProfile: DomesticProfile = {
  id: "3",
  name: "Awa Bakayoko",
  role: "Gouvernante / Aide Ménagère",
  category: "menage",
  location: "Marcory, Zone 4, Abidjan",
  rating: 5.0,
  reviewsCount: 32,
  missions: 8,
  experience: "8 ans",
  available: true,
  verified: true,
  price: 2000,
  phone: "+225 07 •••••• 42",
  cni: "•••••••• 9821 VÉRIFIÉE",
  age: 29,
  birthDate: "12 Mars 1995",
  photo: "https://i.pravatar.cc/400?img=47",   // photo de femme
  about:
    "Forte de 8 années d'expérience auprès de familles exigeantes à Abidjan (Cocody, Zone 4), je m'engage à apporter de la sérénité au sein de votre foyer. Experte en gestion de résidence haut de gamme, je maîtrise l'entretien des textiles délicats et la préparation de menus variés.",
  skills: [
    "Cuisine Ivoirienne",
    "Gestion de Maison",
    "Garde d'Enfants",
    "Entretien Textile",
    "Secourisme",
  ],
  reviews: [
    {
      id: 1,
      reviewerName: "M. Kouassi",
      reviewerInitials: "MK",
      rating: 5,
      comment:
        "Awa est d'une ponctualité exemplaire et son travail est impeccable. Je la recommande vivement pour son sérieux.",
      date: "Il y a 2 mois",
    },
    {
      id: 2,
      reviewerName: "Mme Diop",
      reviewerInitials: "MD",
      rating: 5,
      comment:
        "Très satisfaite de sa cuisine et de sa discrétion. Une perle rare pour les familles actives.",
      date: "Il y a 5 mois",
    },
    {
      id: 3,
      reviewerName: "Jean-Marc Diop",
      reviewerInitials: "JD",
      rating: 5,
      comment:
        "Excellente cuisinière. Maîtrise parfaitement les plats locaux. Travail sérieux et rigoureux.",
      date: "Il y a 1 mois",
    },
  ],
};