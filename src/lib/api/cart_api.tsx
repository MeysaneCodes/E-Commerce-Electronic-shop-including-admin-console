import {CartItem, CartPrices} from "@/types/cart_types";
import {Dispatch, SetStateAction} from "react";
import {Db} from "mongodb";
import CreateNewCart from "@/utils/create_new_cart";


export async function UpdateCart  ({item, Qty, directional}:{item:CartItem, Qty: number | undefined, directional: "+" | "-"}) {
    //if null then we have nothing. => Fetch from database
    //TODO on this page we just need to know how much we got on our shopping list ? to update the icon notification



    try {
        const response = await fetch(`/api/checkout/update`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",


            body: JSON.stringify({data : item, Qty: Qty, directional: directional}),

        });
        return response.json();

    }catch (e){
        // if(!response.ok)
        console.error("Error occurred" + e);
        // throw new Error(`HTTP ${e.status} - ${e.statusText}`);
        // throw new Error(e.data);

    }






}


//TODO this should be on backend file!!!
//check if there is any card that belongs to this user - return object if cart to be created otherwise returns false
export async function isCartCreated(db:Db,cartCollection:string, userID:string){

    //console.log("session" + JSON.stringify(req.session.user._id));
    const isCardExists = await db.collection(cartCollection).findOne({userId: userID.toString()});

    if(isCardExists){
        console.log("cart exists");
        return false;
    }
    if(!isCardExists){
        //we dont have one
        console.log("no cart found here!");

        //Create new Cart
        return new CreateNewCart(userID);
    }else return false;
}


/*
export async function GetNumberOfCartItems  ({setNumberCartItems}:{setNumberCartItems:Dispatch<SetStateAction<number>>})  {
    //if null then we have nothing. => Fetch from database
    //TODO on this page we just need to know how much we got on our shopping list ? to update the icon notification

    const response = await fetch(`/api/checkout/Cart_Item_Count`, {
        method: "GET",
        credentials: "include",
    });

    if(!response.ok)
        throw new Error(`HTTP ${response.status}`);


    const payload:{success:boolean, data?:number} = await response.json();

    if(payload.success && payload.data) {
        //show the new data
        console.log("items nb" + payload.data);
        setNumberCartItems(payload.data ?? 0);
        try {

            //update the cache
            //  await localforage.setItem("cart_NB", payload.data ?? 0);
        }catch (e){
            throw new Error(`Error parsing local cart: ${e}`);
        }
    }
}
*/


export async function GetCart ({setCartItems, setCart_prices}:{setCartItems:Dispatch<SetStateAction<object[]>>, setCart_prices?:Dispatch<SetStateAction<CartPrices>>}){
    const response = await fetch(`/api/checkout/get`, {
        method: "POST",
        credentials: "include",

    });

    if (!response.ok)
        throw new Error(`HTTP ${response.status}`);


    const payload:{success:boolean, data?: object[], sum: object} = await response.json();

    if(payload.success && payload.data) {
        console.log("data successfully fetched");
        console.log(payload.data);
        if(Array.isArray(payload.data)) {
            setCartItems(payload.data);

            if(setCart_prices)
                setCart_prices(payload.sum);

            return {data: payload.data, sum: payload.sum};
        }else {
            console.error("fetched data not compatible");
            return [];
        }
    }


}


export async function DeleteCartItem ({item}:{item:CartItem}):Promise<{success:boolean, data?: CartItem[], isCartDeleted?:boolean}>   {


    const response = await fetch(`/api/checkout/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({data : item})
    });

    if(response.ok){
        return  await response.json();
        // return {
        //     success:false,
        //     data:payload.data ?? []
        // };
    }else {
        console.error("fetched data not compatible" + response.statusText);
        console.error(response)
        return  {
            success:false,
            data:[]
        }
    }

    //if there are more items, we update the items array. if the items array is empty then we delete the whole cart item
}
