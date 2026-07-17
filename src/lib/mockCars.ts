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
    tagline: "movement that inspires / рух, що надихає",
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
          { name: "Сталевий сірий", hex: "#8A8D8F" },
          { name: "Сніжно-білий", hex: "#F5F5F0" },
          { name: "Чорна Аврора", hex: "#1A1A1A" },
          { name: "Синя яхта", hex: "#1B3A5C" },
          { name: "Червона смуга", hex: "#C41E3A" },
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
            transmission: "Автомат",
            fuelType: "Електро",
            price: 45980,
            onRoadPrice: "Ціна «під ключ»*",
          },
          {
            id: "ev6-gt-line-awd",
            name: "EV6 GT line AWD",
            transmission: "Автомат",
            fuelType: "Електро",
            price: 48900,
            onRoadPrice: "Ціна «під ключ»*",
          },
          {
            id: "ev6-gt",
            name: "EV6 GT",
            transmission: "Автомат",
            fuelType: "Електро",
            price: 56500,
            onRoadPrice: "Ціна «під ключ»*",
          },
        ],
        description:
          "KIA EV6 — це передовий електричний кросовер, який поєднує в собі приголомшливий дизайн та вражаючу продуктивність. Завдяки надшвидкій зарядці 800 В ви можете зарядитися від 10% до 80% всього за 18 хвилин.",
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
          { name: "Гравітаційний сірий", hex: "#6B6E70" },
          { name: "Чистий білий", hex: "#F0F0EB" },
          { name: "Чорна Аврора", hex: "#1A1A1A" },
          { name: "Синя яхта", hex: "#1B3A5C" },
        ],
        specs: {
          weight: "1746 кг",
          range: "380 км",
          topSpeed: "170 км/год",
          acceleration: "3.5 сек",
          power: "320 к.с.",
        },
        variants: [
          {
            id: "seltos-htx",
            name: "Seltos HTX",
            transmission: "Автомат",
            fuelType: "Електро",
            price: 32000,
            onRoadPrice: "Ціна «під ключ»*",
          },
          {
            id: "seltos-gtx",
            name: "Seltos GTX+",
            transmission: "Автомат",
            fuelType: "Електро",
            price: 36500,
            onRoadPrice: "Ціна «під ключ»*",
          },
        ],
        description:
          "KIA Seltos EV приносить електричну потужність у сегмент компактних кросоверів завдяки сміливому дизайну та передовим технологіям.",
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
          { name: "Сніжно-білий", hex: "#F5F5F0" },
          { name: "Чорна Аврора", hex: "#1A1A1A" },
          { name: "Синя яхта", hex: "#1B3A5C" },
        ],
        specs: {
          weight: "2404 кг",
          range: "541 км",
          topSpeed: "200 км/год",
          acceleration: "5.3 sec",
          power: "379 к.с.",
        },
        variants: [
          {
            id: "ev9-light",
            name: "EV9 Light RWD",
            transmission: "Автомат",
            fuelType: "Електро",
            price: 55000,
            onRoadPrice: "Ціна «під ключ»*",
          },
          {
            id: "ev9-land",
            name: "EV9 Land AWD",
            transmission: "Автомат",
            fuelType: "Електро",
            price: 62500,
            onRoadPrice: "Ціна «під ключ»*",
          },
        ],
        description:
          "KIA EV9 — це флагманський електричний позашляховик із трьома рядами сидінь, футуристичним дизайном та вражаючим запасом ходу в 541 км.",
      },
    ],
  },
  {
    slug: "mg",
    name: "MG",
    logo: "MG",
    tagline: "Innovation for Everyone / Інновації для кожного",
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
          { name: "Арктичний білий", hex: "#F0F0EB" },
          { name: "Глянцевий червоний", hex: "#B22234" },
          { name: "Чорна перлина", hex: "#1A1A1A" },
        ],
        specs: {
          weight: "1678 кг",
          range: "461 км",
          topSpeed: "175 км/год",
          acceleration: "3.6 sec",
          power: "174 к.с.",
        },
        variants: [
          {
            id: "zs-ev-excite",
            name: "ZS EV Excite",
            transmission: "Автомат",
            fuelType: "Електро",
            price: 28000,
            onRoadPrice: "Ціна «під ключ»*",
          },
          {
            id: "zs-ev-exclusive",
            name: "ZS EV Exclusive",
            transmission: "Автомат",
            fuelType: "Електро",
            price: 31500,
            onRoadPrice: "Ціна «під ключ»*",
          },
        ],
        description:
          "MG ZS EV забезпечує високу цінність завдяки просторому салону та вражаючому запасу ходу за свою ціну.",
      },
    ],
  },
  {
    slug: "tata",
    name: "TATA",
    logo: "TATA",
    tagline: "Connecting Aspirations / Поєднуючи прагнення",
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
          { name: "Бірюзово-синій", hex: "#01766A" },
          { name: "Первісно-білий", hex: "#F0F0EB" },
          { name: "Опівнічний чорний", hex: "#1A1A1A" },
          { name: "Вогняно-червоний", hex: "#CC2936" },
        ],
        specs: {
          weight: "1587 кг",
          range: "437 км",
          topSpeed: "150 км/год",
          acceleration: "4.2 sec",
          power: "143 к.с.",
        },
        variants: [
          {
            id: "nexon-ev-prime",
            name: "Nexon EV Prime",
            transmission: "Автомат",
            fuelType: "Електро",
            price: 25000,
            onRoadPrice: "Ціна «під ключ»*",
          },
          {
            id: "nexon-ev-max",
            name: "Nexon EV Max",
            transmission: "Автомат",
            fuelType: "Електро",
            price: 29500,
            onRoadPrice: "Ціна «під ключ»*",
          },
        ],
        description:
          "Найпопулярніший електричний кросовер в Індії поєднує надійну якість збірки з вражаючим запасом ходу та сучасними функціями.",
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
