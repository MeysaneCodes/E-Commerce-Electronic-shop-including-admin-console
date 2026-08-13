import {getDB} from "@/lib/server/db/mongodb";
import {NextResponse} from "next/server";
import {
    checkout_messages_list, mongo_db_operations_feedback,
    server_messages_list,
} from "@/lib/api/server_messages/server_messages_list";
import {HttpStatus} from "@/lib/api/Http_status/http_status";
import {ObjectId} from "bson";
import calculatePrice from "@/utils/calculate_price";
import {isCartCreated} from "@/lib/api/cart_api";
import {getSession} from "@/lib/server/session/session_manager";
import calculate_sum from "@/utils/calculate_sum";
import {Db} from "mongodb";
import {Cart_Template, CartItem} from "@/types/cart_types";
import {Variant} from "@/types/inventory_meta/product_meta/type"

interface props {

    db: Db,
    user_id: string,
    cartCollection: string,
    passedData: CartItem,
    VariantMatch: Variant,
    req: Request,
    inQty:number
}
async function  UpdateCart  ({db, user_id, cartCollection, passedData, VariantMatch, req, inQty }:props) :Promise<{success:boolean, message?:string, status:number}> {
    //check if product already exists in cart ID
    //update items and quantity, and the sums

    //Get cart, one product



    const cartProduct = await  db.collection(cartCollection).findOne(
        {userId: user_id,"items.productId":passedData.productId, "items.skuId": passedData.skuId},
        {projection: { _id:0 , items:1,subtotal:1,grandTotal:1,shippingTotal:1, discountTotal:1, taxTotal:1}});

    if(cartProduct){

        //item to be edited out of other items
        const existingItem = cartProduct.items.find((item:CartItem)=> item.skuId === passedData.skuId);
        //Qty always passed when editing product on shopping cart and when adding it first time default to 1
        if(inQty) existingItem.qty = inQty;
        else existingItem.qty++;



        //new price of edited Product
        const {Price_str, Price} = calculatePrice({OriginalPrice: VariantMatch.price, Qty: existingItem.qty,
            DiscountType: (VariantMatch.discount ? VariantMatch.discount.type : undefined), DiscountValue: (VariantMatch.discount ? VariantMatch.discount.value ?? 0 : 0)});

        existingItem.unitPrice = VariantMatch.price * existingItem.qty;


        //Calculate sum of whole cart
        //if we hit plus one we update sub total, grandtotal updates auto


        const {generalTotal, taxTotal, subTotal} = calculate_sum(
            {newAssignedPrice: Price,editedProduct: passedData,items: cartProduct.items, VAT_rate: 0.19,
                discountTotal:0, shippingTotal:0});


        //found one match item
        try {
            //TODO later assign userid with shoppingcart

            const updateResult = await db.collection(cartCollection).
            findOneAndUpdate({userId: user_id,"items.productId":passedData.productId, "items.skuId": passedData.skuId},{
                    $set : {
                        "items.$[items].qty": existingItem.qty,
                        "items.$[items].listPrice": Price,
                        "items.$[items].unitPrice": existingItem.unitPrice,
                        subtotal: subTotal,
                        grandTotal: generalTotal,
                        shippingTotal: cartProduct.shippingTotal,
                        discountTotal: cartProduct.discountTotal,
                        taxTotal: taxTotal,
                        updatedAt: new Date(Date.now()),
                    }
                },
                {arrayFilters: [
                        {
                            "items.productId": passedData.productId,
                            "items.skuId": passedData.skuId,
                        }
                    ],
                    returnDocument:"after"})

            if(updateResult){
                //true if exists and updated, false if not in cart yet
                return {success:true, status: HttpStatus.OK}
            }else  return {success:false,status: HttpStatus.OK}
        } catch (e) {
            console.error("[SERVER] [CHECKOUT]" + e);
            return {success:false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: e instanceof Error ? e.message : String(e)};
        }
        //only updating the price and quantity required

    }else {
        console.info("[SERVER] [CHECKOUT]" + checkout_messages_list.NO_ITEM_FOUND_ON_CHECKOUT_CART);
        return {success:false, status: HttpStatus.OK, message: checkout_messages_list.NO_ITEM_FOUND_ON_CHECKOUT_CART};
    }

}
async function addItemCart ({db, user_id, cartCollection, passedData, req, inQty}:props){

    console.log("add item method called")
    try {

        //increment the grand-total and subtotal when new product is added
        const {generalTotal, taxTotal, subTotal} = calculate_sum(
            {items:[passedData], shippingTotal: 0, discountTotal:0, VAT_rate:0.19})




        const updateResult = await db.collection<Cart_Template>(cartCollection).updateOne({userId: user_id},{
            $push : {
                items: {
                    $each: [passedData]
                }
            },
            $inc :{
                subtotal: subTotal,
                grandTotal: generalTotal,
                taxTotal: taxTotal,
            },
            $set:{
                updatedAt: new Date(Date.now()),
            }
        });

        if(updateResult.acknowledged){
            return {success:true, status: HttpStatus.OK, message: checkout_messages_list.NEW_ITEM_ADDED_TO_THE_CART};
        }else
            return {success:false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: mongo_db_operations_feedback.UPDATING_DOC_FAILED};


        //const nb_itemsFound = await  db.db(dbName).collection(Cname).countDocuments({});
        //   res.json({success:true,data:nb_itemsFound});
    } catch (e) {
        return {success:false,status:HttpStatus.INTERNAL_SERVER_ERROR,message:"[SERVER] [CHECKOUT] : " + mongo_db_operations_feedback.UPDATING_DOC_FAILED +  "with Error : " + e}
    }

}





export async function POST (req:Request) {

    const {Qty,data} = await req.json();



    //Calculations
/*    const Quantity = req.body.Qty;
    const passedData = req.body.data;
    const directional = req.body.directional;*/


    //Security Check//
    if(!process.env.MONGODB_DB)
    {
        console.error("[SERVER] [CHECKOUT] [UPDATE] : " + server_messages_list.DB_NAME_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});

    }


    const db = await getDB(process.env.MONGODB_DB);

    if(!db){
        console.error("[SERVER] [CHECKOUT] [UPDATE] DB is undefined");
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});
    }



    if(!process.env.MONGODB_PRODUCTS) {
        console.error("[SERVER] [CHECKOUT] [UPDATE] : " + server_messages_list.DB_PRODUCTS_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_PRODUCTS_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});

    }


    const nb_itemsFound = await  db.collection(process.env.MONGODB_PRODUCTS).findOne(
        {_id:new ObjectId(data.productId)}, {projection:{_id:0, sku:1, options:1, currency:1, variants:1}});
    // console.log(nb_itemsFound);
    if(!nb_itemsFound) return ;

    //find exact color match
    //const colorMatch = nb_itemsFound.options.colors.find(color => color.variants.some(variant=> variant.sku === data.skuId));


    //check if SKU STILL AVAILABLE

 /*   const isSKU_VALID = nb_itemsFound.sku === data.skuId
    if(!isSKU_VALID){
        console.error("[SERVER] [CHECKOUT] [UPDATE] : " + server_messages_list.ERROR + "SKU doesn't match!");
        return NextResponse.json({success:false, message:server_messages_list.ERROR, status:HttpStatus.INTERNAL_SERVER_ERROR});
    }*/

    const VARIANT_MATCH:Variant = nb_itemsFound.variants?.find((v:Variant)=>{
        return v.sku === data.skuId
    })

    if (!VARIANT_MATCH) {
        return NextResponse.json({
            success: false,
            message: "Variant not found",
            status: HttpStatus.NOT_FOUND,
        });
    }


   // const colorMatch = nb_itemsFound.options["Color"].find(color => color === data);
    //find exact variant within that color group
   // const VariantMatch = colorMatch.variants.find(variant=> variant.sku === data.skuId);


  /*  if(!db){
        console.error("No DB found!");
        return res.status(500).json({error:"Something went wrong!"})
    }*/

 /*   if(dbName.length === 0 ||Cname.length === 0){
        return res.status(400).json({ success: false, error: "Missing DB or Collection name" });
    }*/
    //Security Check//



    //Price Calculation
/*    const {Price_str, Price} = calculatePrice({OriginalPrice: VariantMatch.price, Qty: data.qty,
        DiscountType: (VariantMatch.discount ? VariantMatch.discount.type : ""), DiscountValue: (VariantMatch.discount ? VariantMatch.discount.value : 0)});*/
    const {Price_str, Price} = calculatePrice({OriginalPrice: VARIANT_MATCH.price, Qty: data.qty,
        DiscountType: (VARIANT_MATCH.discount ? VARIANT_MATCH.discount.type : undefined), DiscountValue: (VARIANT_MATCH.discount ? (VARIANT_MATCH.discount.value ?? 0) : 0)});

    //add it to the passed item object
    data.unitPrice = VARIANT_MATCH.price;
    data.listPrice = Price;


    //TODO change later maybe after one month, now at 24hours, not here but when cart being created
    //  passedData.expiresAt = new Date(Date.now() + 86400 * 1000);

    if(!process.env.MONGODB_CART_COLLECTION)
    {
        console.error("[SERVER] [CHECKOUT] [UPDATE] : " + server_messages_list.DB_CART_COLLECTION_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_CART_COLLECTION_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});

    }

    const {success, status,message, user_session} = await getSession(req);

    if(!success || !user_session)
        return NextResponse.json({success:false, message:message, status:status});


    const isNotCart = await isCartCreated(db,process.env.MONGODB_CART_COLLECTION,user_session.id);


    if(isNotCart){
        try {
            //no Cart Exists :
            isNotCart.items.push(data);
            const {generalTotal, subTotal, taxTotal} = calculate_sum({items:isNotCart.items, shippingTotal: isNotCart.shippingTotal, discountTotal: isNotCart.discountTotal, VAT_rate: 0.19});

            isNotCart.subtotal = subTotal;
            isNotCart.taxTotal = taxTotal; //Deutschland 19% VAT
            isNotCart.grandTotal = generalTotal;
            const isInserted = await db.collection("carts").insertOne(isNotCart);
            if(isInserted.acknowledged) {
                console.info("[SERVER] [CHECKOUT] [UPDATE]  Cart created successfully");
                return  NextResponse.json({success:true, status:HttpStatus.OK});
            } else {
                console.log("[SERVER] [CHECKOUT] [UPDATE]  error creating cart");
                return  NextResponse.json({success:true, status:HttpStatus.OK});
            }
        }catch (err){
            console.log(err);
        }

    }
    else {
        console.log("CART EXISTS");
        //check if product already exists in cart ID
        const {success,status,message} =  await UpdateCart({
            db: db,
            user_id: user_session.id,
            cartCollection: process.env.MONGODB_CART_COLLECTION,
            passedData: data,
            VariantMatch: VARIANT_MATCH,
            req: req,
            inQty: Qty
        });



        console.error("[SERVER] [CHECKOUT] Item exists : ");

        if(success) {
            console.log("EXISTS AND UPDATED!")
            return NextResponse.json({success:true});
        }else {
            console.log("NEW ADDED!")
            const  {success,status,message} = await addItemCart({db:db, user_id:user_session.id, cartCollection:process.env.MONGODB_CART_COLLECTION, passedData: data, inQty: Qty, req: req, VariantMatch: VARIANT_MATCH });
            if (success)
                return  NextResponse.json({success:true, status:HttpStatus.OK, message:message});
            else {
                return  NextResponse.json({success:false, status:status, message:message});
            }
        }
    }
}
