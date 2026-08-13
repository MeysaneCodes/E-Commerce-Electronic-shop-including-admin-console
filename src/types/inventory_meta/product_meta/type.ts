export type DiscountOption = {
    type?: "PERCENTAGE" | "AMOUNT";
    value?: number;
    valid_until?: Date;
};


//dynamic
export type VariantOptionSelection = {
    [optionName: string]: string;
};


export type Variant = {
    _id : string;
    sku: string;
    price: number;
    stock: number;
    discount?: DiscountOption;
    options: VariantOptionSelection;
};

//stroage and colors
export type ProductOption = {
    name: string;
    values: string[];
};


export const image_options:images_variants_name[] = ["front", "back", "side", "hero", "lifestyle", "group", "detail", "thumbnail"];
export type images_variants_name = "front" | "back" | "side"| "hero"| "lifestyle"| "group"| "detail"| "thumbnail";

export type ImagesOption = {
    front?: string;
    back?: string;
    side?: string;
    hero?: string;
    lifestyle?: string;
    group?: string;
    detail?: string;
};

export type MediaBlock = {
    thumbnail?: string;
    images?: Record<string, ImagesOption>;
};


//export const SpecsBlock_Options:images_variants_name[] = ["screen_size", "ram", "camera", "battery", "os", "release_year", "warranty_months"];
export type SpecsBlock_type_keys = "screen_size" | "ram" | "camera"| "battery"| "os"| "release_year"| "warranty_months";

export type SpecsBlock = {
    screen_size?: number;
    ram?: number;
    camera?: string;
    battery?: string;
    os?: string;
    release_year?: number;
    warranty_months?: number;
    //more specs E.x Tv, Console ...
    [key: string]: any;
};

export type Item_Structure = {
    _id?: string;
    id?: number;

    slug?: string;
    brand?: string;
    model?: string;
    title?: string;
    description?: string;

    currency?: "EUR" | "USD" | string;

    options?: ProductOption[];

    variants?: Variant[];

    specs?: SpecsBlock;

    media?: MediaBlock;

    delivery_time?: string;

    rating?: number;
    review_count?: number;

    refurbished_companies?: string[];

    price_based_on_conditions?: {
        Excellent?: number | string;
        Very_Good?: number | string;
        Good?: number | string;
    };

    tags?: string[];
};