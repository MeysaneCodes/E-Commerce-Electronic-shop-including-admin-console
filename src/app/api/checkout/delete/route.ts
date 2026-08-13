import {
    mongo_db_operations_feedback,
    server_messages_list,
    session_messages_list
} from "@/lib/api/server_messages/server_messages_list";
import {NextResponse} from "next/server";
import {HttpStatus} from "@/lib/api/Http_status/http_status";
import {getDB} from "@/lib/server/db/mongodb";
import {Cart_Template, CartItem} from "@/types/cart_types";
import {getSession} from "@/lib/server/session/session_manager";
import {Db} from "mongodb";
import calculate_sum from "@/utils/calculate_sum";

export  async function POST (req:Request){


    interface typeBody {
        data : CartItem
    }
    const {data} = await req.json() as typeBody;



    //Db check
    if(!process.env.MONGODB_DB) {
        console.error("[SERVER] [CHECKOUT] [DELETE] : " + server_messages_list.DB_NAME_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});

    }
    const db = await getDB(process.env.MONGODB_DB);

    if(!db){
        console.error("[SERVER] [CHECKOUT] [DELETE] DB is undefined");
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});
    }

    if(!process.env.MONGODB_CART_COLLECTION) {
        console.error("[SERVER] [CHECKOUT] [DELETE] : " + server_messages_list.DB_CART_COLLECTION_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_CART_COLLECTION_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});
    }


    const {success, status, message, user_session} = await getSession(req);

    if(!success || !user_session){
        console.error("[SERVER] [CHECKOUT] [DELETE] : " + session_messages_list.NO_SESSION);
        return NextResponse.json({success:false, message:session_messages_list.NO_SESSION, status:HttpStatus.INTERNAL_SERVER_ERROR});
    }








        //get amount of items on cart
        const fetchAmountOfItems =  await  db.collection(process.env.MONGODB_CART_COLLECTION).findOne({userId: user_session.id}, {projection:{_id:0, items:1}});
        if(fetchAmountOfItems && fetchAmountOfItems.items.length === 1){


            //delete the whole cart then return
            const isDeleted = await deleteShoppingCart(db,process.env.MONGODB_CART_COLLECTION,user_session.id);

            if(!isDeleted)
                return NextResponse.json({success:false, isCartDeleted:isDeleted, status:HttpStatus.INTERNAL_SERVER_ERROR});


            //isCartDeleted is used to confirm to the frontend that the empty cart page can be shown
            return NextResponse.json({success:true, isCartDeleted:isDeleted, status:HttpStatus.OK});

        }


        //there is items on cart
        try {
            //TODO later assign userid with shoppingcart
            const deleteResponse = await  db.collection<Cart_Template>(process.env.MONGODB_CART_COLLECTION).findOneAndUpdate({userId:user_session.id}, {
                    $pull: { items : {
                            skuId: data.skuId
                        }},

                },
                {returnDocument:"after"});

            if(deleteResponse){
                //update the cart price
                try {
                    //TODO later assign userid with shoppingcart

                    //TODO Shipping costs - how to assign them ? Default to 0 ?

                    const {generalTotal, taxTotal, subTotal}  = calculate_sum({items:deleteResponse.items, shippingTotal:deleteResponse.shippingTotal, discountTotal: deleteResponse.discountTotal, VAT_rate: 0.19});



                    const updateResult = await db.collection<Cart_Template>(process.env.MONGODB_CART_COLLECTION).findOneAndUpdate({userId: user_session.id},{
                            $set : {
                                subtotal: subTotal,
                                grandTotal: generalTotal,
                                shippingTotal: deleteResponse.shippingTotal,
                                discountTotal: deleteResponse.discountTotal,
                                taxTotal: taxTotal,
                                updatedAt: new Date(Date.now()),
                            }
                        },
                        {returnDocument:"after"})



                    if(updateResult){
                        console.info("[SERVER] [CHECKOUT] [DELETE] :" + mongo_db_operations_feedback.UPDATING_DOC_SUCCEEDED);
                        return NextResponse.json({success:true, status:HttpStatus.OK});
                    }else {
                        console.info("[SERVER] [CHECKOUT] [DELETE] :" + mongo_db_operations_feedback.UPDATING_DOC_FAILED);
                        return NextResponse.json({success:false, status:HttpStatus.INTERNAL_SERVER_ERROR});

                    }
                } catch (e) {
                    console.info("[SERVER] [CHECKOUT] [DELETE] :" + mongo_db_operations_feedback.UPDATING_DOC_FAILED + "Error : " + e);
                    return NextResponse.json({success:false, status:HttpStatus.INTERNAL_SERVER_ERROR});
                }
            }
            else {
                console.warn("[SERVER] [CHECKOUT] [DELETE] :" + mongo_db_operations_feedback.DELETING_DOC_FAILED);
                return NextResponse.json({success:false, status:HttpStatus.INTERNAL_SERVER_ERROR});
            }
        } catch (e) {
            console.info("[SERVER] [CHECKOUT] [DELETE] :" + mongo_db_operations_feedback.DELETING_DOC_FAILED + "Error : " + e);
            return NextResponse.json({success:false, status:HttpStatus.INTERNAL_SERVER_ERROR});
        }


}


async function deleteShoppingCart (DB:Db, DB_COLLECTION:string, USER_ID:string){

    try {
        //delete item
        console.info("[SERVER] [CHECKOUT] [DELETE] Deleting one doc ...");
        const response = await DB.collection(DB_COLLECTION).deleteOne({userId:USER_ID});
        console.info("[SERVER] [CHECKOUT] [DELETE] Deleting one doc completed!");
        return response.acknowledged && response.deletedCount === 1;
    }catch (err){
        console.error("[SERVER] [CHECKOUT] [DELETE] : " + mongo_db_operations_feedback.DELETING_DOC_FAILED + " Error: " + err);
        return false;
    }
}
