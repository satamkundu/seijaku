export const shopTopCategories = [
  "All",
  "Ritual Boxes & Gift Sets",
  "Individual Objects",
  "Seasonal Drops",
  "Programs",
  "Retreats",
] as const;

export const sortOptions = ["Featured", "Newest", "Price: Low to High", "Price: High to Low", "Alphabetical"] as const;

export type ShopTopCategory = (typeof shopTopCategories)[number];
export type ShopSortOption = (typeof sortOptions)[number];
export type ShopItemType = "Box / Set" | "Individual Object" | "Seasonal Drop" | "Program" | "Retreat";
export type ShopAudience = "Elderly" | "Adults" | "Teenagers" | "All Ages";
export type ShopAvailability = "In Stock" | "Limited Edition" | "Upcoming" | "Open for Booking" | "Sold Out" | "Waitlist";
export type ShopCollection = "Hemanta" | "Seasonal Drop" | "Core Collection";
export type ShopFormat = "Physical" | "Digital" | "In-Person";

export type ShopItemTag =
  | "Bestsellers"
  | "New"
  | "Limited Edition"
  | "In a Set"
  | "Standalone"
  | "Elderly"
  | "Adults"
  | "Teenagers"
  | "3-Day Retreat"
  | "Seasonal";

export type ShopItem = {
  id: string;
  slug: string;
  title: string;
  type: ShopItemType;
  category: Exclude<ShopTopCategory, "All">;
  audience: ShopAudience;
  collection: ShopCollection;
  shortDescription: string;
  longDescription?: string;
  price: number | null;
  compareAtPrice?: number;
  priceLabel: string;
  status: ShopAvailability;
  image: string;
  tags: ShopItemTag[];
  format: ShopFormat;
  isFeatured: boolean;
  isLimitedEdition: boolean;
  isInStock: boolean;
  ctaLabel: "View Object" | "View Details" | "Reserve Place" | "Book Retreat" | "Explore Set";
  createdAt: string;
};

export const shopAllItems: ShopItem[] = [
  {
    id: "set-evening-ritual",
    slug: "evening-ritual-box",
    title: "Evening Ritual Box",
    type: "Box / Set",
    category: "Ritual Boxes & Gift Sets",
    audience: "All Ages",
    collection: "Core Collection",
    shortDescription: "A composed set for the hour between work and rest.",
    longDescription:
      "Includes incense holder, oil blend, cloth, and guided ritual cards designed for repeatable evening practice.",
    price: 7200,
    compareAtPrice: 7900,
    priceLabel: "₹7,200",
    status: "In Stock",
    image: "/images/Home Page hero image 1.png",
    tags: ["Bestsellers", "In a Set"],
    format: "Physical",
    isFeatured: true,
    isLimitedEdition: false,
    isInStock: true,
    ctaLabel: "Explore Set",
    createdAt: "2026-02-14",
  },
  {
    id: "set-seijaku-gift-1",
    slug: "seijaku-gift-set-i",
    title: "Seijaku Gift Set I",
    type: "Box / Set",
    category: "Ritual Boxes & Gift Sets",
    audience: "All Ages",
    collection: "Core Collection",
    shortDescription: "An introductory composition of scent, textile, and tea.",
    price: 6400,
    priceLabel: "₹6,400",
    status: "In Stock",
    image: "/images/hero banner HP 1.png",
    tags: ["New", "In a Set"],
    format: "Physical",
    isFeatured: false,
    isLimitedEdition: false,
    isInStock: true,
    ctaLabel: "Explore Set",
    createdAt: "2026-03-01",
  },
  {
    id: "set-hemanta-collectors",
    slug: "hemanta-collectors-box",
    title: "Hemanta Collector's Box",
    type: "Seasonal Drop",
    category: "Seasonal Drops",
    audience: "All Ages",
    collection: "Hemanta",
    shortDescription: "A limited seasonal edition composed around winter inwardness.",
    price: 12400,
    priceLabel: "₹12,400",
    status: "Limited Edition",
    image: "/images/Hemanta drop HP banner 2.png",
    tags: ["Limited Edition", "Seasonal"],
    format: "Physical",
    isFeatured: true,
    isLimitedEdition: true,
    isInStock: true,
    ctaLabel: "Explore Set",
    createdAt: "2026-03-04",
  },
  {
    id: "obj-incense-holder",
    slug: "stone-incense-holder",
    title: "Stone Incense Holder",
    type: "Individual Object",
    category: "Individual Objects",
    audience: "All Ages",
    collection: "Core Collection",
    shortDescription: "Hand-finished holder for daily incense rituals.",
    price: 1800,
    priceLabel: "₹1,800",
    status: "In Stock",
    image: "/images/Seijaku section img 1.png",
    tags: ["Standalone"],
    format: "Physical",
    isFeatured: false,
    isLimitedEdition: false,
    isInStock: true,
    ctaLabel: "View Object",
    createdAt: "2025-12-28",
  },
  {
    id: "obj-brass-oil-spoon",
    slug: "brass-oil-spoon",
    title: "Brass Oil Spoon",
    type: "Individual Object",
    category: "Individual Objects",
    audience: "All Ages",
    collection: "Core Collection",
    shortDescription: "Balanced brass spoon for measured scent application.",
    price: 1200,
    priceLabel: "₹1,200",
    status: "In Stock",
    image: "/images/our-story-hero-banner.png",
    tags: ["In a Set", "Standalone"],
    format: "Physical",
    isFeatured: false,
    isLimitedEdition: false,
    isInStock: true,
    ctaLabel: "View Object",
    createdAt: "2025-11-18",
  },
  {
    id: "obj-cotton-cloth",
    slug: "cotton-ritual-cloth",
    title: "Cotton Ritual Cloth",
    type: "Individual Object",
    category: "Individual Objects",
    audience: "All Ages",
    collection: "Core Collection",
    shortDescription: "Soft woven cloth for tea, altar, and evening reset.",
    price: 950,
    priceLabel: "₹950",
    status: "Sold Out",
    image: "/images/seijaku sec img 2.png",
    tags: ["Standalone"],
    format: "Physical",
    isFeatured: false,
    isLimitedEdition: false,
    isInStock: false,
    ctaLabel: "View Details",
    createdAt: "2025-10-09",
  },
  {
    id: "obj-tea-bowl",
    slug: "hand-thrown-tea-bowl",
    title: "Hand-thrown Tea Bowl",
    type: "Individual Object",
    category: "Individual Objects",
    audience: "All Ages",
    collection: "Core Collection",
    shortDescription: "Textured ceramic bowl for slow tea rituals.",
    price: 2200,
    priceLabel: "₹2,200",
    status: "In Stock",
    image: "/images/Our Story Hero Banner 1.png",
    tags: ["Bestsellers", "Standalone"],
    format: "Physical",
    isFeatured: true,
    isLimitedEdition: false,
    isInStock: true,
    ctaLabel: "View Object",
    createdAt: "2026-01-17",
  },
  {
    id: "drop-object-01",
    slug: "seasonal-drop-object-01",
    title: "Seasonal Drop Object 01",
    type: "Seasonal Drop",
    category: "Seasonal Drops",
    audience: "All Ages",
    collection: "Seasonal Drop",
    shortDescription: "A one-season object released in limited quantities.",
    price: 4600,
    priceLabel: "₹4,600",
    status: "Upcoming",
    image: "/images/Hemanta drop HP banner 1.png",
    tags: ["Limited Edition", "Seasonal", "New"],
    format: "Physical",
    isFeatured: true,
    isLimitedEdition: true,
    isInStock: false,
    ctaLabel: "View Details",
    createdAt: "2026-03-08",
  },
  {
    id: "program-adult-slow-evenings",
    slug: "slow-evenings-for-adults",
    title: "Slow Evenings for Adults",
    type: "Program",
    category: "Programs",
    audience: "Adults",
    collection: "Core Collection",
    shortDescription: "A guided one-day practice in breath, scent, and attention.",
    price: 5400,
    priceLabel: "From ₹5,400",
    status: "Open for Booking",
    image: "/images/our-story-hero-banner.png",
    tags: ["Adults", "Bestsellers"],
    format: "In-Person",
    isFeatured: true,
    isLimitedEdition: false,
    isInStock: true,
    ctaLabel: "Reserve Place",
    createdAt: "2026-02-10",
  },
  {
    id: "program-teen-circle",
    slug: "ritual-circle-for-teenagers",
    title: "Ritual Circle for Teenagers",
    type: "Program",
    category: "Programs",
    audience: "Teenagers",
    collection: "Core Collection",
    shortDescription: "A sensory grounding program for younger participants.",
    price: 3900,
    priceLabel: "From ₹3,900",
    status: "Open for Booking",
    image: "/images/Our story hero banner 2.png",
    tags: ["Teenagers", "New"],
    format: "In-Person",
    isFeatured: false,
    isLimitedEdition: false,
    isInStock: true,
    ctaLabel: "Reserve Place",
    createdAt: "2026-03-03",
  },
  {
    id: "program-elderly-gentle",
    slug: "gentle-practice-for-the-elderly",
    title: "Gentle Practice for the Elderly",
    type: "Program",
    category: "Programs",
    audience: "Elderly",
    collection: "Core Collection",
    shortDescription: "Calm guided ritual sessions designed for slower pace and comfort.",
    price: 3600,
    priceLabel: "From ₹3,600",
    status: "Open for Booking",
    image: "/images/Our Story img_2.png",
    tags: ["Elderly"],
    format: "In-Person",
    isFeatured: false,
    isLimitedEdition: false,
    isInStock: true,
    ctaLabel: "Reserve Place",
    createdAt: "2026-01-27",
  },
  {
    id: "retreat-autumn-3-day",
    slug: "three-day-autumn-retreat",
    title: "3-Day Autumn Retreat",
    type: "Retreat",
    category: "Retreats",
    audience: "Adults",
    collection: "Seasonal Drop",
    shortDescription: "An immersive three-day retreat in ritual, rest, and sensory reset.",
    price: 24500,
    priceLabel: "From ₹24,500",
    status: "Open for Booking",
    image: "/images/japanese fan hero Our Story.png",
    tags: ["3-Day Retreat", "Adults"],
    format: "In-Person",
    isFeatured: true,
    isLimitedEdition: false,
    isInStock: true,
    ctaLabel: "Book Retreat",
    createdAt: "2026-02-26",
  },
  {
    id: "retreat-weekend-quiet",
    slug: "weekend-quiet-retreat",
    title: "Weekend Quiet Retreat",
    type: "Retreat",
    category: "Retreats",
    audience: "All Ages",
    collection: "Core Collection",
    shortDescription: "A two-night retreat for silence, ritual, and renewed rhythm.",
    price: 18900,
    priceLabel: "From ₹18,900",
    status: "Waitlist",
    image: "/images/our-story-hero-banner.png",
    tags: ["Bestsellers"],
    format: "In-Person",
    isFeatured: false,
    isLimitedEdition: false,
    isInStock: false,
    ctaLabel: "View Details",
    createdAt: "2025-12-06",
  },
];

export function getShopItemBySlug(slug: string) {
  return shopAllItems.find((item) => item.slug === slug);
}
