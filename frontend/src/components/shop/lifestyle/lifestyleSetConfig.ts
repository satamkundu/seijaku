import { type LifestyleSetField } from "./LifestyleSetCard";

export type LifestyleCardConfig = {
  id: string;
  backingSlug: string;
  title: string;
  groupLabel: string;
  includes: string[];
  fields?: LifestyleSetField[];
  imageSrc?: string;
  imageAlt?: string;
};

export type LifestyleSectionConfig = {
  title: string;
  items: LifestyleCardConfig[];
};

export const lifestyleSections: LifestyleSectionConfig[] = [
  {
    title: "Morning & Pause",
    items: [
      {
        id: "kolkata-chai-calm-box",
        backingSlug: "quiet-tea-ritual-box",
        title: "Kolkata Chai Calm Box",
        groupLabel: "Morning & Pause",
        includes: [
          "Terracotta diffuser inspired by Kolkata chai cups",
          "2 terracotta tea cups",
          "2 fragrance oils (choose any 2)",
          "2 tea bags",
        ],
        fields: [
          {
            id: "oils",
            label: "Choose your oils",
            options: ["Lavender Green", "Chamomile", "Spearmint", "Ginger Lemon", "Jasmine"],
          },
        ],
        imageSrc: "/images/Quiet Tea Ritual Box_lifestyle.JPG",
        imageAlt: "Kolkata Chai Calm Box arranged with terracotta ritual objects in a warm editorial still life.",
      },
      {
        id: "coffee-break-box",
        backingSlug: "evening-unwind-gift-set",
        title: "Coffee Break Box",
        groupLabel: "Morning & Pause",
        includes: ["Ceramic coffee tumbler diffuser", "Rice husk coffee mug", "1 scented wax melt"],
        fields: [
          {
            id: "wax-blend",
            label: "Select wax blend",
            options: ["Cool Caramel", "Coffee Break", "Choco Dark"],
          },
        ],
        imageSrc: "/images/Evening Unwind Set.png",
        imageAlt: "Coffee Break Box styled with diffuser, mug, and warm studio-toned ritual accents.",
      },
    ],
  },
  {
    title: "Personal Rituals",
    items: [
      {
        id: "unfold-ritual-box-01",
        backingSlug: "dawn-reset-box",
        title: "Unfold Ritual Box 01",
        groupLabel: "Personal Rituals",
        includes: ["Ritual oil perfume (15 ml)", "Dokra brooch", "Cotton cambric napkin"],
        fields: [
          {
            id: "brooch",
            label: "Choose your brooch",
            options: ["Japan handfan", "Bengal handfan"],
          },
        ],
        imageSrc: "/images/Seijaku Lifestyle img 1.png",
        imageAlt: "Unfold Ritual Box 01 composed with perfume, textile, and quiet metal detail.",
      },
      {
        id: "listen-ritual-box-02",
        backingSlug: "reading-hour-set",
        title: "Listen Ritual Box 02",
        groupLabel: "Personal Rituals",
        includes: ["Ritual oil perfume (15 ml)", "Dokra conch brooch", "Cotton cambric napkin"],
        imageSrc: "/images/Seasonal Drop Raja-Kundo.jpg",
        imageAlt: "Listen Ritual Box 02 styled around a dokra conch and soft ritual textiles.",
      },
      {
        id: "attune-ritual-box-03",
        backingSlug: "evening-unwind-gift-set",
        title: "Attune Ritual Box 03",
        groupLabel: "Personal Rituals",
        includes: ["Ritual oil perfume (15 ml)", "Dokra temple bell brooch", "Cotton cambric napkin"],
        imageSrc: "/images/Seasonal Drop Rishi Chhatim.jpg",
        imageAlt: "Attune Ritual Box 03 arranged with a temple bell brooch and tactile ritual cloth.",
      },
    ],
  },
  {
    title: "Gifting",
    items: [
      {
        id: "live-calm-gift-pouch",
        backingSlug: "dawn-reset-box",
        title: "Live Calm Gift Pouch",
        groupLabel: "Gifting",
        includes: ["Choose your perfume", "Choose your textile", "Choose your brooch"],
        fields: [
          {
            id: "perfume",
            label: "Choose your perfume",
            options: [
              "Breath of Pines (10 ml / 50 ml)",
              "Summer Held Close (10 ml / 50 ml)",
              "The Morning Desk (10 ml / 50 ml)",
            ],
          },
          {
            id: "textile",
            label: "Choose your textile",
            options: [
              "A Pine Forest scarf",
              "A Pine Forest pocket square",
              "Coffee Art scarf",
              "Coffee Art pocket square",
              "A Kolkata Summer scarf",
              "A Kolkata Summer pocket square",
            ],
          },
          {
            id: "brooch",
            label: "Choose your brooch",
            options: ["Japan handfan", "Bengal handfan", "Conch", "Temple bell"],
          },
        ],
        imageSrc: "/images/quiet-tea-ritual-box-lifestyle-neutral.png",
        imageAlt: "Live Calm Gift Pouch composed with fragrance, textile, and dokra gifting elements.",
      },
    ],
  },
];

export const homepageFeaturedLifestyleItems = lifestyleSections[0].items;
