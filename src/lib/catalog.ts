export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  badge?: "Bestseller" | "New" | "Trending" | "Limited" | "Deal";
  colors: string[];
  sizes: string[];
  description: string;
  stock: number;
  delivery: string;
};

const img = (id: string, width = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${width}&h=${width}`;

export const products: Product[] = [
  {
    id: "p1",
    slug: "aura-pro-headphones",
    name: "Aura Pro Spatial Headphones",
    brand: "SONORA",
    category: "Electronics",
    price: 12999,
    originalPrice: 16999,
    rating: 4.8,
    reviews: 2384,
    image: img("3394650"),
    gallery: [img("3394650", 1200), img("3394653", 1200), img("3394651", 1200), img("3756907", 1200)],
    badge: "Bestseller",
    colors: ["#ece9e2", "#262626", "#9babb8"],
    sizes: ["One size"],
    description: "Immersive adaptive audio, luxurious memory foam and 40-hour battery life—engineered for all-day listening.",
    stock: 18,
    delivery: "Tomorrow, 10 AM – 2 PM",
  },
  {
    id: "p2",
    slug: "atelier-classic-watch",
    name: "Atelier Classic Automatic",
    brand: "MONARCH",
    category: "Watches",
    price: 8499,
    originalPrice: 11999,
    rating: 4.7,
    reviews: 846,
    image: img("13273982"),
    gallery: [img("13273982", 1200), img("13273982", 1000), img("12495668", 1000)],
    badge: "Trending",
    colors: ["#6d4934", "#1d1d1d"],
    sizes: ["38mm", "42mm"],
    description: "A refined automatic timepiece with sapphire crystal, hand-finished indices and a full-grain leather strap.",
    stock: 9,
    delivery: "Wednesday, 8 AM – 12 PM",
  },
  {
    id: "p3",
    slug: "milk-drop-barrier-serum",
    name: "Milk Drop Barrier Serum",
    brand: "NATIVE LAB",
    category: "Beauty",
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviews: 1542,
    image: img("20382236"),
    gallery: [img("20382236", 1200), img("16329382", 1200), img("31251024", 1200)],
    badge: "New",
    colors: ["#f4f0e9"],
    sizes: ["30ml", "50ml"],
    description: "A featherlight ceramide and niacinamide serum that visibly calms, plumps and strengthens the skin barrier.",
    stock: 42,
    delivery: "Tomorrow, 10 AM – 2 PM",
  },
  {
    id: "p4",
    slug: "mila-soft-leather-tote",
    name: "Mila Soft Leather Tote",
    brand: "ELARA",
    category: "Fashion",
    price: 5299,
    originalPrice: 7499,
    rating: 4.6,
    reviews: 684,
    image: img("12877069"),
    gallery: [img("12877069", 1200), img("13025817", 1200), img("12495668", 1200)],
    badge: "Limited",
    colors: ["#8b5b3d", "#1c1c1c", "#b9ab91"],
    sizes: ["Medium", "Large"],
    description: "Supple, responsibly sourced leather meets an intelligently organized interior for an effortless everyday carry.",
    stock: 6,
    delivery: "Wednesday, 8 AM – 12 PM",
  },
  {
    id: "p5",
    slug: "cloud-runner-knit-sneakers",
    name: "Cloud Runner Knit Sneakers",
    brand: "MOTION",
    category: "Footwear",
    price: 3999,
    originalPrice: 5999,
    rating: 4.5,
    reviews: 3290,
    image: img("2529148"),
    gallery: [img("2529148", 1200), img("1598505", 1200), img("1464625", 1200)],
    badge: "Deal",
    colors: ["#efede7", "#242424", "#c86d52"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    description: "A breathable everyday runner with responsive foam cushioning and a flexible, grippy recycled-rubber outsole.",
    stock: 25,
    delivery: "Tomorrow, 10 AM – 2 PM",
  },
  {
    id: "p6",
    slug: "luna-gold-heart-studs",
    name: "Luna Gold Heart Studs",
    brand: "AURELIA",
    category: "Jewellery",
    price: 2799,
    originalPrice: 3499,
    rating: 4.8,
    reviews: 431,
    image: img("29193422"),
    gallery: [img("29193422", 1200), img("28389455", 1200), img("29193427", 1200)],
    badge: "New",
    colors: ["#d8b867", "#d7d7d7"],
    sizes: ["One size"],
    description: "Delicate 18k gold-vermeil heart studs traced with brilliant, ethically sourced crystal pavé.",
    stock: 12,
    delivery: "Thursday, 9 AM – 1 PM",
  },
  {
    id: "p7",
    slug: "barista-one-espresso-machine",
    name: "Barista One Espresso Machine",
    brand: "FORMA",
    category: "Home",
    price: 18999,
    originalPrice: 23999,
    rating: 4.7,
    reviews: 579,
    image: img("36573009"),
    gallery: [img("36573009", 1200), img("7303844", 1200), img("7303855", 1200)],
    badge: "Bestseller",
    colors: ["#d8d4cb", "#242424"],
    sizes: ["Standard"],
    description: "Café-quality espresso at home with precision pressure, a rapid thermocoil and velvety microfoam wand.",
    stock: 11,
    delivery: "Friday, 9 AM – 5 PM",
  },
  {
    id: "p8",
    slug: "studio-arc-sunglasses",
    name: "Studio Arc Sunglasses",
    brand: "ÉLAN",
    category: "Accessories",
    price: 2199,
    originalPrice: 2999,
    rating: 4.4,
    reviews: 267,
    image: img("29301758"),
    gallery: [img("29301758", 1200), img("19793982", 1200), img("19445634", 1200)],
    badge: "Trending",
    colors: ["#161616", "#a96b43"],
    sizes: ["Standard", "Wide"],
    description: "Sculptural acetate frames with glare-cutting polarized lenses and complete UVA/UVB protection.",
    stock: 34,
    delivery: "Tomorrow, 10 AM – 2 PM",
  },
];

export const categories = [
  { name: "Fashion", eyebrow: "New season", image: img("19445634") },
  { name: "Electronics", eyebrow: "Up to 40% off", image: img("3394650") },
  { name: "Beauty", eyebrow: "Clean essentials", image: img("20382236") },
  { name: "Home", eyebrow: "Modern living", image: img("29383227") },
  { name: "Footwear", eyebrow: "Move better", image: img("2529148") },
  { name: "Jewellery", eyebrow: "Fine details", image: img("29193422") },
];

export const brands = ["NIKE", "SAMSUNG", "L'ORÉAL", "adidas", "SONY", "ZARA", "LEVI'S"];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
