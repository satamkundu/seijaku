export type NavLink = {
  label: string;
  href: string;
};

export type BrowseLink = NavLink & {
  note?: string;
};

export type BrowseGroup = {
  label: string;
  href?: string;
  children?: BrowseLink[];
  note?: string;
};

export type BrowseSection = {
  title: string;
  groups: BrowseGroup[];
};

export const commerceMenuSections: NavLink[] = [
  {
    label: "Fragrance Sets",
    href: "/shop-all?category=Ritual+Boxes+%26+Gift+Sets",
  },
  {
    label: "Perfumes",
    href: "/lifestyle",
  },
  {
    label: "Handcrafted Artifacts",
    href: "/shop-all?category=Individual+Objects",
  },
  {
    label: "Shop All",
    href: "/shop-all",
  },
];

export const drawerBrowseSections: BrowseSection[] = [
  {
    title: "By Type",
    groups: [
      {
        label: "Fragrances",
        href: "/lifestyle",
        children: [
          { label: "Body", href: "/shop-all?category=Ritual+Boxes+%26+Gift+Sets" },
          { label: "Diffusers", href: "/shop-all?category=Individual+Objects" },
          { label: "Objects", href: "/shop-all?category=Individual+Objects" },
          { label: "Textiles", href: "/lifestyle#ritual-boxes" },
        ],
      },
      { label: "Scented Wax", href: "/shop-all?collection=Seasonal+Drop", note: "TODO: map to dedicated scented wax collection" },
      { label: "Diffusers", href: "/shop-all?category=Individual+Objects", note: "TODO: map to dedicated diffuser collection" },
      { label: "Ornaments", href: "/shop-all?category=Individual+Objects", note: "TODO: map to dedicated ornaments collection" },
      { label: "Scarves", href: "/shop-all?category=Individual+Objects", note: "TODO: map to dedicated scarves collection" },
      {
        label: "Pocket Squares & Napkins",
        href: "/shop-all?category=Individual+Objects",
        note: "TODO: map to dedicated pocket squares and napkins collection",
      },
      {
        label: "Gift Sets",
        href: "/shop-all?category=Ritual+Boxes+%26+Gift+Sets",
        children: [
          {
            label: "For Yourself",
            href: "/shop-all?category=Ritual+Boxes+%26+Gift+Sets",
            note: "TODO: map to self-gifting collection page",
          },
          {
            label: "For a Loved One",
            href: "/shop-all?category=Ritual+Boxes+%26+Gift+Sets",
            note: "TODO: map to loved-one gifting collection page",
          },
        ],
      },
    ],
  },
  {
    title: "By Material",
    groups: [
      { label: "Perfumes - Oil-based", href: "/shop-all?category=Ritual+Boxes+%26+Gift+Sets", note: "TODO: map to dedicated oil-based fragrances collection" },
      { label: "Perfumes - Alcohol-based", href: "/shop-all?category=Ritual+Boxes+%26+Gift+Sets", note: "TODO: map to dedicated alcohol-based perfumes collection" },
      { label: "Soy wax", href: "/shop-all?collection=Seasonal+Drop", note: "TODO: map to dedicated soy wax collection" },
      { label: "Beeswax", href: "/shop-all?collection=Seasonal+Drop", note: "TODO: map to dedicated beeswax collection" },
      { label: "Dokra (Metal)", href: "/our-story", note: "TODO: map to dedicated Dokra collection" },
      { label: "Terracotta", href: "/seasonaldrops", note: "TODO: map to dedicated terracotta collection" },
      { label: "Ceramics", href: "/shop-all?category=Individual+Objects", note: "TODO: map to dedicated ceramics collection" },
      { label: "Handwoven textiles", href: "/lifestyle", note: "TODO: map to dedicated handwoven textiles collection" },
      { label: "Printed textiles", href: "/lifestyle", note: "TODO: map to dedicated printed textiles collection" },
    ],
  },
];
