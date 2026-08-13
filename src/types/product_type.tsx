export type DiscountOption= {
    type?:"PERCENTAGE" | "AMOUNT",
    value?:number,
    valid_until?:Date
}


type VariantByStorage = {
    storage: string;   // e.g. "256GB"
    sku: string;       // e.g. "APL-IP15PM-256-BLK"
    price: number; // numeric for math
    discount: DiscountOption,
    stock: number;     // per-variant stock
};

export type ImagesOption = {
    front: string;
    back: string;
    side: string;
    hero: string;
    lifestyle: string;
    group: string;
    detail:string;
}

export type ColorOption = {
    name: string;          // e.g. "Black Titanium"
    swatch?: string;       // hex
    imagesURL: ImagesOption;      // color-specific gallery (URLs)
    variants: VariantByStorage[];
};

type OptionsBlock = {
    colors: ColorOption[];
    storages: string[];    // quick facet list
};





type SpecsBlock = {
    screen_size: number;   // 6.7
    ram: number;           // 8
    camera: string;        // "48MP Triple"
    battery: string;       // "4422mAh"
    os: string;            // "iOS 17"
    release_year: number;  // 2023
    warranty_months: number; // 24
};

export type Item_Structure = {
    _id?: string;              // mongo id
    id?: number;               // human id
    sku?: string;              // base SKU (non-variant)
    slug?: string;             // "iphone-15-pro-max"
    brand?: string;            // "Apple"
    model?: string;            // "iPhone 15 Pro Max"
    title?: string;            // "Apple iPhone 15 Pro Max"
    description?: string;      // keep if you add it later
    currency?: "EUR" | "USD" | string;

    // Grouped blocks
    options?: OptionsBlock;    // colors -> variants by storage
    specs?: SpecsBlock;

    // Media
    thumbnail?: string;

    // Commerce/UX
    delivery_time?: string;    // "2–4 Werktage"
    rating?: number;           // 0-5
    review_count?: number;

    // Legacy/compat fields (optional, if older code still references them)
    // These can be derived from options/specs if needed:
    color?: string[];          // derive: unique colors from options.colors
    storage?: string[];        // derive: options.storages
    ram?: number;              // derive: specs.ram
    screen_size?: number;      // derive: specs.screen_size
    os?: string;               // derive: specs.os
    release_year?: number;     // derive: specs.release_year
    warranty_months?: number;  // derive: specs.warranty_months
    price?: number;   // derive: from selected variant or base
    stock?: number;            // derive: selected variant
    camera_battery?: string;   // derive: `${specs.camera} + ${specs.battery}`

    // Optional legacy arrays if you use them elsewhere
    ratings?: object[];
    refurbished_companies?: string[];
    price_based_on_conditions?: Array<number | string>;

    // Misc
    brand_logo?: Record<string, unknown>;
    article_Number?: string;
    discount_price?: string;
};

