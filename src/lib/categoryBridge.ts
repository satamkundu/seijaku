export type CategoryBridgeSlug =
  | "perfumes"
  | "scarves-and-squares"
  | "diffusers"
  | "dokra-ornaments";

export type CategoryBridgeProduct = {
  name: string;
  description: string;
  price: string;
  image: string;
  href: string;
  imagePosition?: string;
};

export type CategoryBridgeSection = {
  eyebrow: string;
  title: string;
  description: string;
  products: CategoryBridgeProduct[];
};

export type CategoryBridgePageData = {
  slug: CategoryBridgeSlug;
  navLabel: string;
  href: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;
  heroImagePosition?: string;
  heroQuote: string;
  introTitle: string;
  introDescription: string;
  introNotes: Array<{
    title: string;
    text: string;
  }>;
  productSections: CategoryBridgeSection[];
};

export const shopAllRoute = "/shop-all";
export const lifestyleRoute = "/lifestyle";

export const categoryBridgeLinks: Record<CategoryBridgeSlug, { label: string; href: string }> = {
  perfumes: {
    label: "Perfumes",
    href: "/categories/perfumes",
  },
  "scarves-and-squares": {
    label: "Scarves & Squares",
    href: "/categories/scarves-and-squares",
  },
  diffusers: {
    label: "Diffusers",
    href: "/categories/diffusers",
  },
  "dokra-ornaments": {
    label: "Dokra Ornaments",
    href: "/categories/dokra-ornaments",
  },
};

export const categoryBridgePages: CategoryBridgePageData[] = [
  {
    slug: "perfumes",
    navLabel: categoryBridgeLinks.perfumes.label,
    href: categoryBridgeLinks.perfumes.href,
    heroEyebrow: "Fragrance for Skin",
    heroTitle: "Perfumes composed for close, quiet wear.",
    heroDescription:
      "A slower fragrance wardrobe with oils and fine mists designed to sit near the body rather than announce themselves ahead of it.",
    heroImage: "/images/Seijaku Lifestyle img 1.png",
    heroImageAlt: "A composed arrangement of Seijaku fragrance objects in a calm editorial setting.",
    heroImagePosition: "object-[center_24%]",
    heroQuote: "Scent that stays intimate, soft, and close to the pulse.",
    introTitle: "A calmer fragrance bridge",
    introDescription:
      "This page is designed as a decision-light threshold between discovery and purchase. Shoppers can understand the mood, compare formats, and move into buying without first parsing the full inventory.",
    introNotes: [
      {
        title: "Wear Close",
        text: "Soft projection and skin-near composition keep the experience personal.",
      },
      {
        title: "Choose by Hour",
        text: "Morning brightness, afternoon ease, and evening depth make selection easier.",
      },
      {
        title: "Move Gently",
        text: "Each product section keeps copy, price, and actions in one calm frame.",
      },
    ],
    productSections: [
      {
        eyebrow: "Daily Signatures",
        title: "Perfumes for everyday rhythm",
        description: "Balanced fragrances for repeat wear, gifting, and daily ritual.",
        products: [
          {
            name: "Hinoki Morning Oil",
            description: "A dry cedar-hinoki opening with green tea warmth for early hours and quiet focus.",
            price: "INR 3,200",
            image: "/images/hero banner HP 1.png",
            href: shopAllRoute,
            imagePosition: "object-[center_42%]",
          },
          {
            name: "Neroli Linen Mist",
            description: "Citrus blossom and pale musk for those who want fragrance to feel clear, airy, and almost weightless.",
            price: "INR 2,900",
            image: "/images/our-story-hero-banner.png",
            href: shopAllRoute,
            imagePosition: "object-center",
          },
        ],
      },
      {
        eyebrow: "Evening Depth",
        title: "Softer perfumes with longer quiet",
        description: "Warmer compositions for reading hours, dinners at home, and slower transitions out of the day.",
        products: [
          {
            name: "Saffron Plum Attar",
            description: "Stone fruit, spice, and resin settle into a rounded warmth that lingers close to the scarf and collar.",
            price: "INR 4,100",
            image: "/images/Hemanta drop HP banner 1.png",
            href: shopAllRoute,
            imagePosition: "object-[center_38%]",
          },
          {
            name: "Smoke Tea Parfum",
            description: "Black tea, pale woods, and incense for a contemplative finish that never feels heavy.",
            price: "INR 4,600",
            image: "/images/Hemanta drop HP banner 2.png",
            href: shopAllRoute,
            imagePosition: "object-[center_46%]",
          },
        ],
      },
    ],
  },
  {
    slug: "scarves-and-squares",
    navLabel: categoryBridgeLinks["scarves-and-squares"].label,
    href: categoryBridgeLinks["scarves-and-squares"].href,
    heroEyebrow: "Textiles in Ritual",
    heroTitle: "Scarves and squares that bring scent into movement.",
    heroDescription:
      "Hand-finished textiles for pocket, neck, table, and travel, made to carry texture and fragrance through the day with quiet clarity.",
    heroImage: "/images/Quiet Tea Ritual Box_lifestyle.JPG",
    heroImageAlt: "Textile-led Seijaku objects arranged with tea and scent.",
    heroImagePosition: "object-[center_40%]",
    heroQuote: "A textile can hold memory, atmosphere, and gesture at once.",
    introTitle: "Textiles as bridge objects",
    introDescription:
      "These pages help the shopper move from broad interest in fragrance textiles into concrete choices by format, use, and gifting intent. The rhythm is editorial first, transactional second.",
    introNotes: [
      {
        title: "By Use Case",
        text: "Separate pieces for wear, hosting, and gifting reduce browse fatigue.",
      },
      {
        title: "By Touch",
        text: "Copy emphasizes drape, softness, and how each object lives in the hand.",
      },
      {
        title: "By Pairing",
        text: "Textiles are framed as companions to perfume and home ritual rather than isolated objects.",
      },
    ],
    productSections: [
      {
        eyebrow: "For Wear",
        title: "Scarves for skin and outer layers",
        description: "Quiet textiles that move between dress, travel, and soft layering.",
        products: [
          {
            name: "Mulberry Dawn Scarf",
            description: "A long printed scarf in pale earth tones, designed to hold a trace of fragrance without overwhelming it.",
            price: "INR 3,800",
            image: "/images/Seijaku section img 1.png",
            href: shopAllRoute,
            imagePosition: "object-center",
          },
          {
            name: "Rain Quiet Wrap",
            description: "A softer drape in washed cotton for transitional weather, reading hours, and evening travel.",
            price: "INR 4,400",
            image: "/images/Evening Unwind Set.png",
            href: shopAllRoute,
            imagePosition: "object-[center_54%]",
          },
        ],
      },
      {
        eyebrow: "For Pocket and Table",
        title: "Squares for hosting, gifting, and small ritual",
        description: "Pocket squares and cloth accents that bring composed detail to everyday use.",
        products: [
          {
            name: "Tea Room Pocket Square",
            description: "A compact square with a precise border for tailoring, gifting, or carrying scent into a formal layer.",
            price: "INR 1,650",
            image: "/images/seijaku sec img 2.png",
            href: shopAllRoute,
            imagePosition: "object-[center_48%]",
          },
          {
            name: "Table Ritual Napkin Pair",
            description: "A pair of hand-finished napkins intended for tea service, quiet hosting, or small table rituals.",
            price: "INR 2,100",
            image: "/images/Our Story Hero Banner 1.png",
            href: shopAllRoute,
            imagePosition: "object-center",
          },
        ],
      },
    ],
  },
  {
    slug: "diffusers",
    navLabel: categoryBridgeLinks.diffusers.label,
    href: categoryBridgeLinks.diffusers.href,
    heroEyebrow: "Home Fragrance",
    heroTitle: "Diffusers that shape room atmosphere without noise.",
    heroDescription:
      "For desks, bedside tables, and entry rituals, these diffusers bring fragrance into the room with a measured, enduring pace.",
    heroImage: "/images/Home Page hero image 1.png",
    heroImageAlt: "A still life of home fragrance objects and vessels.",
    heroImagePosition: "object-[center_50%]",
    heroQuote: "Home scent should settle the room before it tries to fill it.",
    introTitle: "A lower-friction home fragrance flow",
    introDescription:
      "The diffuser bridge page groups products by placement and atmosphere so shoppers can choose by room and tempo instead of decoding formats on the fly.",
    introNotes: [
      {
        title: "Choose by Room",
        text: "Entry, bedside, and living room uses create a calmer browse path.",
      },
      {
        title: "Choose by Tempo",
        text: "Short-burst and long-release formats are explained in plain editorial language.",
      },
      {
        title: "Keep Actions Near",
        text: "Primary and secondary actions sit within the product card to avoid extra decision loops.",
      },
    ],
    productSections: [
      {
        eyebrow: "Desk and Bedside",
        title: "Smaller diffusers for close spaces",
        description: "Quiet release formats for rooms where scent should stay local and controlled.",
        products: [
          {
            name: "Stone Oil Diffuser",
            description: "A porous stone vessel for slow evaporation beside the bed, at a desk, or near a reading chair.",
            price: "INR 2,450",
            image: "/images/quiet-tea-ritual-box-lifestyle-neutral.png",
            href: shopAllRoute,
            imagePosition: "object-[center_44%]",
          },
          {
            name: "Brass Tea Light Diffuser",
            description: "A warmer, evening-led format that carries resin and wood notes into the room for shorter sessions.",
            price: "INR 3,100",
            image: "/images/Evening Unwind Set.png",
            href: shopAllRoute,
            imagePosition: "object-[center_48%]",
          },
        ],
      },
      {
        eyebrow: "Room Atmosphere",
        title: "Longer-release vessels for shared spaces",
        description: "Designed for entryways, living rooms, and composed hosting environments.",
        products: [
          {
            name: "Reed Diffuser in Cedar Smoke",
            description: "A balanced cedar and pale smoke profile for living spaces that need depth without density.",
            price: "INR 3,750",
            image: "/images/our-story-hero-banner.png",
            href: shopAllRoute,
            imagePosition: "object-center",
          },
          {
            name: "Clay Vessel Diffuser",
            description: "An artisanal terracotta vessel that releases scent gradually while also reading as a quiet room object.",
            price: "INR 4,250",
            image: "/images/Seijaku Lifestyle img 1.png",
            href: shopAllRoute,
            imagePosition: "object-[center_22%]",
          },
        ],
      },
    ],
  },
  {
    slug: "dokra-ornaments",
    navLabel: categoryBridgeLinks["dokra-ornaments"].label,
    href: categoryBridgeLinks["dokra-ornaments"].href,
    heroEyebrow: "Metal Objects",
    heroTitle: "Dokra ornaments with weight, patina, and quiet narrative.",
    heroDescription:
      "Handcrafted metal pieces for shelves, desks, altars, and gifting. These are objects of presence, chosen slowly and lived with for a long time.",
    heroImage: "/images/japanese fan hero Our Story.png",
    heroImageAlt: "An atmospheric composition of artisanal objects suggesting metalwork and ritual.",
    heroImagePosition: "object-[center_34%]",
    heroQuote: "Ornament matters most when it deepens the atmosphere around it.",
    introTitle: "Objects chosen for atmosphere",
    introDescription:
      "For dokra, shoppers need context, not just inventory. This bridge page creates that context through material cues, display moments, and gifting language before asking for commitment.",
    introNotes: [
      {
        title: "Material Clarity",
        text: "The page explains dokra as crafted metalwork with warmth and patina, not generic decor.",
      },
      {
        title: "Placement First",
        text: "Products are grouped by shelf, desk, and altar use to support visual decision-making.",
      },
      {
        title: "Gift Readiness",
        text: "Ornaments are framed as lasting gifts with meaning, not impulse add-ons.",
      },
    ],
    productSections: [
      {
        eyebrow: "Shelf and Console",
        title: "Presence-led objects for daily sightlines",
        description: "Metal pieces that bring warmth and quiet detail into the room at first glance.",
        products: [
          {
            name: "Dokra Bird Figure",
            description: "A small sculptural bird with a hand-cast texture suited to shelves, windows, and writing desks.",
            price: "INR 2,850",
            image: "/images/Seasonal Drop Listen before shaping.jpg",
            href: shopAllRoute,
            imagePosition: "object-[center_44%]",
          },
          {
            name: "Threshold Bell Ornament",
            description: "A hanging ornament in warm metal intended for doorways, entry rituals, or gifting.",
            price: "INR 3,300",
            image: "/images/Seasonal Drop Rishi Chhatim.jpg",
            href: shopAllRoute,
            imagePosition: "object-[center_38%]",
          },
        ],
      },
      {
        eyebrow: "Desk and Altar",
        title: "Smaller dokra pieces for focused spaces",
        description: "Compact objects for prayer corners, reading nooks, and thoughtful gifting.",
        products: [
          {
            name: "Quiet Lamp Charm",
            description: "A compact cast-metal charm that sits beside candles, incense, or a bedside stack of books.",
            price: "INR 1,950",
            image: "/images/Seasonal Drop Nandini Raktakarabi.jpg",
            href: shopAllRoute,
            imagePosition: "object-[center_42%]",
          },
          {
            name: "Dokra Talisman Pair",
            description: "A matched pair of palm-sized ornaments made for symbolic gifting and small interior rituals.",
            price: "INR 2,400",
            image: "/images/Seasonal Drop Raja-Kundo.jpg",
            href: shopAllRoute,
            imagePosition: "object-[center_38%]",
          },
        ],
      },
    ],
  },
];

export function getCategoryBridgePage(slug: string) {
  return categoryBridgePages.find((page) => page.slug === slug);
}
