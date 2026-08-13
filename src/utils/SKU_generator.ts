import {Electronics} from "@/lib/strings/brands";

export default function generate_new_sku (Brand:string, Color:string, Model:string, Storage:string){
    const BRAND_SKU = Electronics.getBrandCode(Brand);
    const COLOR_SKU = Electronics.getColor(Color);
    const MODEL_SKU = Electronics.getModelCode(Model);
    return BRAND_SKU + "-" + MODEL_SKU + "-" + Storage + "-" + COLOR_SKU;
}