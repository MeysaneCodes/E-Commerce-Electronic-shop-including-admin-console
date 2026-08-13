//import {Item_Structure} from "@/types/product_type";
import {Item_Structure} from "@/types/inventory_meta/product_meta/type"
import {body} from "@material-tailwind/react/theme/base/typography";

///////////////////////Structure//////////////////
type AllItems_Structure = Item_Structure[];
///////////////////////Structure//////////////////

export async function getAllItems ({signal}:{ signal?: AbortSignal}): Promise<AllItems_Structure | null> {
    try {
        if(!process.env.NEXT_PUBLIC_URL_API){
            console.error("Credentials are missing")
            return null;
        }

        const URL = process.env.NEXT_PUBLIC_URL_API

        const item = await fetch( `${URL}/api/products`, {
            method: "POST",
            credentials: "include",
            signal: signal,
            body: JSON.stringify({CName: "products"}),
        });


        if(!item.ok){
            console.warn("Error fetching all items. Error Unknown");
            return null;
        }



        const res = await item?.json();
        return res.item as AllItems_Structure;

    } catch (e) {
        console.warn("Error Occured : " + e );
        return null;
    }
}




//INV

export async function getAllItems_Inventory ({signal}:{ signal?: AbortSignal}): Promise<AllItems_Structure | null> {
    try {

        if(!process.env.NEXT_PUBLIC_URL_API){
            console.error("Credentials are missing")
            return null;
        }

        const URL = process.env.NEXT_PUBLIC_URL_API

        const item = await fetch( `${URL}/api/admin/inventory/POST`, {
            method: "POST",
            credentials: "include",
            signal: signal,
            body: JSON.stringify({CName: "products"}),
        });


        if(!item.ok){
            console.warn("Error fetching all items. Error Unknown");
            return null;
        }



        const {status, data} = await item?.json();
        return data as AllItems_Structure;


    } catch (e) {
        console.warn("Error Occurred : " + e );
        return null;
    }
}


export async function getItemById(id:string){
    const res = await fetch(`/api/products/${id}/byID`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({CName: "products"}),
        },
        );

    if(!res.ok){
        console.warn("Error fetching all items. Error Unknown : ", res.status);
        return false;
    }

    const {success,status,data} = await res.json();
    return {success,status,data};
}