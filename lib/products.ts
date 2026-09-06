export type Product = {
  id: string;
  slug: string;
  name: string;
  designer: string;
  category: string;
  lot: string;
  price: number;
  imgClass: string;
  imgStyle?: React.CSSProperties;
};

export const products: Product[] = [
  {
    id: "antwerp-overshirt",
    slug: "product",
    name: "Antwerp",
    designer: "Studio Mira",
    category: "overshirt · linen",
    lot: "NF·0024",
    price: 480,
    imgClass: "p1",
  },
  {
    id: "chrome-pleat-trouser",
    slug: "product",
    name: "Chrome Pleat",
    designer: "Kestrel & Co.",
    category: "trouser · wool",
    lot: "NF·0017",
    price: 620,
    imgClass: "p2",
  },
  {
    id: "dune-long-coat",
    slug: "product",
    name: "Dune Long",
    designer: "Atelier Souk",
    category: "coat · cashmere",
    lot: "NF·0008",
    price: 1240,
    imgClass: "p3",
  },
  {
    id: "late-hour-knit",
    slug: "product",
    name: "Late Hour",
    designer: "Hana Lindqvist",
    category: "knit · merino",
    lot: "NF·0031",
    price: 390,
    imgClass: "p4",
  },
  {
    id: "mistral-trouser",
    slug: "product",
    name: "Mistral",
    designer: "Studio Mira",
    category: "trouser · linen",
    lot: "NF·0026",
    price: 410,
    imgClass: "p5",
  },
  {
    id: "night-ink-shawl",
    slug: "product",
    name: "Night Ink",
    designer: "Atelier Souk",
    category: "shawl · wool",
    lot: "NF·0011",
    price: 780,
    imgClass: "p6",
  },
];
