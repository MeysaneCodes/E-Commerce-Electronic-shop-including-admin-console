import {getDB} from "@/lib/server/db/mongodb";
import {
    mongo_db_operations_feedback,
    server_messages_list,
    session_messages_list
} from "@/lib/api/server_messages/server_messages_list";
import {NextResponse} from "next/server";
import {HttpStatus} from "@/lib/api/Http_status/http_status";
import {getSession} from "@/lib/server/session/session_manager";

export async function POST (req:Request) {


        if(!process.env.MONGODB_DB) {
            console.error("[SERVER] [CHECKOUT] [POST] : " + server_messages_list.DB_NAME_NOT_FOUND);
            return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});

            }
        const db = await getDB(process.env.MONGODB_DB);

        if(!db){
            console.error("[SERVER] [CHECKOUT] [POST] DB is undefined");
            return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});
             }

        if(!process.env.MONGODB_CART_COLLECTION) {
            console.error("[SERVER] [CHECKOUT] [POST] : " + server_messages_list.DB_CART_COLLECTION_NOT_FOUND);
            return NextResponse.json({success:false, message:server_messages_list.DB_CART_COLLECTION_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});

            }

        //TODO create logic for shoppingcart for guest with limit of 30days
        const {success, status,message, user_session} = await getSession(req);


    if(!success || !user_session){
        console.error("[SERVER] [CHECKOUT] [DELETE] : " + session_messages_list.NO_SESSION);
        return NextResponse.json({success:false, message:session_messages_list.NO_SESSION, status:HttpStatus.INTERNAL_SERVER_ERROR});
    }


    try {
        console.info("[SERVER] [CHECKOUT] [POST] fetching the items on the cart ...");
        const nb_itemsFound = await  db.collection(process.env.MONGODB_CART_COLLECTION).findOne({userId: user_session.id}, {projection:{_id:0, items:1,subtotal:1, grandTotal:1, discountTotal:1, shippingTotal:1, taxTotal:1}});
            // const nb_itemsFound = await  db.db(dbName).collection(Cname).countDocuments({});


            if(nb_itemsFound) {
                console.info("[SERVER] [CHECKOUT] [POST]" + mongo_db_operations_feedback.GET_DOC_SUCCESS)
                return NextResponse.json(
                    {
                        success:true,
                        status:HttpStatus.OK,
                        message: mongo_db_operations_feedback.GET_DOC_SUCCESS,
                        data:nb_itemsFound.items ?? [],
                        sum: {subtotal: nb_itemsFound.subtotal, grandTotal: nb_itemsFound.grandTotal, discountTotal: nb_itemsFound.discountTotal, shippingTotal:nb_itemsFound.shippingTotal, taxTotal:nb_itemsFound.taxTotal }});
            }
            else {
                console.info("[SERVER] [CHECKOUT] [POST]:  " + mongo_db_operations_feedback.NO_DOC_FOUND);
                return NextResponse.json({success:false, status:HttpStatus.OK, message: mongo_db_operations_feedback.NO_DOC_FOUND, data: undefined});
            }
        } catch (e) {
            console.error("[SERVER] [CHECKOUT] [POST]" + server_messages_list.ERROR + " : " + e);
            return NextResponse.json({success:false, status:HttpStatus.INTERNAL_SERVER_ERROR, message: server_messages_list.ERROR});
        }



}