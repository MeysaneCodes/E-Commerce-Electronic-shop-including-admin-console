import {Item_Structure} from "@/types/inventory_meta/product_meta/type";

export default async function PushItem (Item:Item_Structure){
    try{

        const res = await fetch("/api/admin/inventory/push_item", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({data:Item})
        });


        return ({success:true, message:"Success", response:res});

    }catch(e){
        console.log("Error Occured : ", e)
        return ({success:false, message:"Error", response:e});
    }
}