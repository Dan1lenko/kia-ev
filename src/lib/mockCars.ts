export interface CarVariant {
  id: string;
  name: string;
  transmission: string;
  fuelType: string;
  price: number;
  onRoadPrice: string;
}

export interface CarModel {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  price: number;
  rating: number;
  colors: { name: string; hex: string }[];
  specs: {
    weight: string;
    range: string;
    topSpeed: string;
    acceleration: string;
    power: string;
  };
  variants: CarVariant[];
  description: string;
}

export interface Brand {
  slug: string;
  name: string;
  logo: string;
  tagline: string;
  models: CarModel[];
}

export const brands: Brand[] = [
  {
    slug: "kia",
    name: "KIA",
    logo: "Kɪᴀ",
    tagline: "Movement that Inspires",
    models: [
      {
        id: "kia-ev6",
        slug: "ev6",
        name: "KIA EV6",
        brand: "KIA",
        brandSlug: "kia",
        price: 45000,
        rating: 4,
        colors: [
          { name: "Steel Gray", hex: "#8A8D8F" },
          { name: "Snow White", hex: "#F5F5F0" },
          { name: "Aurora Black", hex: "#1A1A1A" },
          { name: "Yacht Blue", hex: "#1B3A5C" },
          { name: "Runway Red", hex: "#C41E3A" },
        ],
        specs: {
          weight: "4,456 lbs",
          range: "418 km",
          topSpeed: "200 mph",
          acceleration: "1.99 sec",
          power: "408 hp",
        },
        variants: [
          {
            id: "ev6-gt-line",
            name: "EV6 GT line",
            transmission: "Automatic",
            fuelType: "Electric",
            price: 45980,
            onRoadPrice: "Get On Road Price*",
          },
          {
            id: "ev6-gt-line-awd",
            name: "EV6 GT line AWD",
            transmission: "Automatic",
            fuelType: "Electric",
            price: 48900,
            onRoadPrice: "Get On Road Price*",
          },
          {
            id: "ev6-gt",
            name: "EV6 GT",
            transmission: "Automatic",
            fuelType: "Electric",
            price: 56500,
            onRoadPrice: "Get On Road Price*",
          },
        ],
        description:
          "The KIA EV6 is a cutting-edge electric crossover that combines stunning design with impressive performance. With its ultra-fast 800V charging capability, you can go from 10% to 80% in just 18 minutes.",
      },
      {
        id: "kia-seltos",
        slug: "seltos",
        name: "KIA Seltos",
        brand: "KIA",
        brandSlug: "kia",
        price: 32000,
        rating: 4,
        colors: [
          { name: "Gravity Gray", hex: "#6B6E70" },
          { name: "Clear White", hex: "#F0F0EB" },
          { name: "Aurora Black", hex: "#1A1A1A" },
          { name: "Yacht Blue", hex: "#1B3A5C" },
        ],
        specs: {
          weight: "3,850 lbs",
          range: "380 km",
          topSpeed: "170 mph",
          acceleration: "3.5 sec",
          power: "320 hp",
        },
        variants: [
          {
            id: "seltos-htx",
            name: "Seltos HTX",
            transmission: "Automatic",
            fuelType: "Electric",
            price: 32000,
            onRoadPrice: "Get On Road Price*",
          },
          {
            id: "seltos-gtx",
            name: "Seltos GTX+",
            transmission: "Automatic",
            fuelType: "Electric",
            price: 36500,
            onRoadPrice: "Get On Road Price*",
          },
        ],
        description:
          "The KIA Seltos EV brings electric power to the compact SUV segment with a bold design and advanced technology features.",
      },
      {
        id: "kia-ev9",
        slug: "ev9",
        name: "KIA EV9",
        brand: "KIA",
        brandSlug: "kia",
        price: 55000,
        rating: 5,
        colors: [
          { name: "Snow White", hex: "#F5F5F0" },
          { name: "Aurora Black", hex: "#1A1A1A" },
          { name: "Yacht Blue", hex: "#1B3A5C" },
        ],
        specs: {
          weight: "5,300 lbs",
          range: "541 km",
          topSpeed: "200 mph",
          acceleration: "5.3 sec",
          power: "379 hp",
        },
        variants: [
          {
            id: "ev9-light",
            name: "EV9 Light RWD",
            transmission: "Automatic",
            fuelType: "Electric",
            price: 55000,
            onRoadPrice: "Get On Road Price*",
          },
          {
            id: "ev9-land",
            name: "EV9 Land AWD",
            transmission: "Automatic",
            fuelType: "Electric",
            price: 62500,
            onRoadPrice: "Get On Road Price*",
          },
        ],
        description:
          "The KIA EV9 is a flagship electric SUV with three rows of seating, a futuristic design, and an impressive 541km range.",
      },
    ],
  },
  {
    slug: "mg",
    name: "MG",
    logo: "MG",
    tagline: "Innovation for Everyone",
    models: [
      {
        id: "mg-zs-ev",
        slug: "zs-ev",
        name: "MG ZS EV",
        brand: "MG",
        brandSlug: "mg",
        price: 28000,
        rating: 4,
        colors: [
          { name: "Arctic White", hex: "#F0F0EB" },
          { name: "Glaze Red", hex: "#B22234" },
          { name: "Black Pearl", hex: "#1A1A1A" },
        ],
        specs: {
          weight: "3,700 lbs",
          range: "461 km",
          topSpeed: "175 mph",
          acceleration: "3.6 sec",
          power: "174 hp",
        },
        variants: [
          {
            id: "zs-ev-excite",
            name: "ZS EV Excite",
            transmission: "Automatic",
            fuelType: "Electric",
            price: 28000,
            onRoadPrice: "Get On Road Price*",
          },
          {
            id: "zs-ev-exclusive",
            name: "ZS EV Exclusive",
            transmission: "Automatic",
            fuelType: "Electric",
            price: 31500,
            onRoadPrice: "Get On Road Price*",
          },
        ],
        description:
          "The MG ZS EV delivers great value with a spacious interior and impressive range for its price point.",
      },
    ],
  },
  {
    slug: "tata",
    name: "TATA",
    logo: "TATA",
    tagline: "Connecting Aspirations",
    models: [
      {
        id: "tata-nexon-ev",
        slug: "nexon-ev",
        name: "TATA Nexon EV",
        brand: "TATA",
        brandSlug: "tata",
        price: 25000,
        rating: 4,
        colors: [
          { name: "Teal Blue", hex: "#01766A" },
          { name: "Pristine White", hex: "#F0F0EB" },
          { name: "Midnight Black", hex: "#1A1A1A" },
          { name: "Flame Red", hex: "#CC2936" },
        ],
        specs: {
          weight: "3,500 lbs",
          range: "437 km",
          topSpeed: "150 mph",
          acceleration: "4.2 sec",
          power: "143 hp",
        },
        variants: [
          {
            id: "nexon-ev-prime",
            name: "Nexon EV Prime",
            transmission: "Automatic",
            fuelType: "Electric",
            price: 25000,
            onRoadPrice: "Get On Road Price*",
          },
          {
            id: "nexon-ev-max",
            name: "Nexon EV Max",
            transmission: "Automatic",
            fuelType: "Electric",
            price: 29500,
            onRoadPrice: "Get On Road Price*",
          },
        ],
        description:
          "India's best-selling electric SUV combines robust build quality with impressive range and modern features.",
      },
    ],
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getCarById(carId: string): CarModel | undefined {
  for (const brand of brands) {
    const model = brand.models.find((m) => m.id === carId);
    if (model) return model;
  }
  return undefined;
}

export function getCarByBrandAndSlug(
  brandSlug: string,
  modelSlug: string
): CarModel | undefined {
  const brand = getBrandBySlug(brandSlug);
  if (!brand) return undefined;
  return brand.models.find((m) => m.slug === modelSlug);
}

export function getAllCars(): CarModel[] {
  return brands.flatMap((b) => b.models);
}
