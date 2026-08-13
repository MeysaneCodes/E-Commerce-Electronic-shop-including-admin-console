import {Discount} from "@/types/cart_types";



interface props {
    DiscountType: Discount["type"],
    OriginalPrice: number,
    Qty: number,
    DiscountValue: number,
}


export default function calculatePrice({OriginalPrice, Qty, DiscountType, DiscountValue}:props) {
    if(!DiscountType)return {price_str: "", Price: OriginalPrice * Qty};
    if(DiscountType === "PERCENTAGE"){
        const DiscountPrice = (OriginalPrice * ( 1 - DiscountValue/100)) * Qty;
        const formatedPrice =  Intl.NumberFormat('de-DE',{
            style: "currency",
            currency: "EUR"
        }).format(DiscountPrice);

        return {Price_str: formatedPrice, Price: DiscountPrice};

    }else if(DiscountType === "AMOUNT"){
        const DiscountPrice =  (OriginalPrice - DiscountValue) * Qty;
        const formatedPrice =   Intl.NumberFormat('de-DE',{
            style: "currency",
            currency: "EUR"
        }).format(DiscountPrice);
        return {Price_str: formatedPrice, Price: DiscountPrice};

    }else return {price_str: "", Price: OriginalPrice * Qty};
}
