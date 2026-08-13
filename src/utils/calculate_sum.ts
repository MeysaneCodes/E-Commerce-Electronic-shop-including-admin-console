import {CartItem} from "@/types/cart_types";


interface props {
    editedProduct?: CartItem,
    items: CartItem[],
    shippingTotal:number,
    discountTotal:number,
    VAT_rate:number,
    newAssignedPrice?:number,
}
export default function  calculate_sum ({editedProduct,items, shippingTotal, discountTotal, VAT_rate, newAssignedPrice}: props){
    let items_sum = 0;
    let tax_sum=0;


    items.map((item,_)=>{
        if(editedProduct && item.skuId === editedProduct.skuId){
            console.info("[SERVER] [CAL_SUM] Item is found");
            console.log("[SERVER] [CAL_SUM] item sum is : " + items_sum + ", added to it :" + newAssignedPrice);

            items_sum += newAssignedPrice ?? 0;
            console.log("[SERVER] [CAL_SUM] new sub sum: " + items_sum);
        }else {
            console.log("[SERVER] [CAL_SUM] item sum is : " + items_sum + ", (not new price ) added to it :" + item.listPrice);
            items_sum += item.listPrice ?? 0;
        }
    });

    tax_sum = items_sum * VAT_rate;
    return {generalTotal : items_sum + shippingTotal  - discountTotal, subTotal: items_sum, taxTotal: tax_sum};
}
