import {Item_Structure} from "@/types/inventory_meta/product_meta/type";

export async function Add_Product(Item:Item_Structure){
    const res = await fetch("/api/admin/inventory/add_item", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Item),
        credentials: "include",
    })

    if(!res.ok)
        return {}


}