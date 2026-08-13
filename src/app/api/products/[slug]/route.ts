//this file for single Product

import {getDB} from "@/lib/server/db/mongodb";
import {Db} from "mongodb";
import {NextResponse} from "next/server";
import {server_messages_list} from "@/lib/api/server_messages/server_messages_list";
import {HttpStatus} from "@/lib/api/Http_status/http_status";

export async function POST (req:Request, {params}:{params: Promise<{slug:string}>}){

    const {CName} = await req.json();

    //TODO maybe later ?
    //const qColor = typeof req.query.color === 'string' ? req.query.color.toLowerCase() : undefined;
    const {slug} = await params;

    const filter = {slug:slug};

    if(!process.env.MONGODB_DB){
        console.error("[SERVER] [PRODUCTS] [POST]" + server_messages_list.DB_NAME_NOT_FOUND );
        return NextResponse.json({success:false, status:HttpStatus.INTERNAL_SERVER_ERROR, message: server_messages_list.DB_NAME_NOT_FOUND});
    }

    try{
        const Fetched_Item = await getDB(process.env.MONGODB_DB) as Db;

        

        if (!Fetched_Item) {
            console.error("[SERVER] [PRODUCTS] [POST]" + server_messages_list.DB_CART_COLLECTION_NOT_FOUND);
            return NextResponse.json({success:false, status:HttpStatus.INTERNAL_SERVER_ERROR, message: server_messages_list.DB_CART_COLLECTION_NOT_FOUND});
        }

        const singleProduct = await Fetched_Item.collection(CName).findOne(filter);
        if (singleProduct)
            console.log("item retrieved");
            return NextResponse.json({success:true, status:HttpStatus.OK, data : singleProduct});

        //return NextResponse.json({item: singleProduct});

    }catch (e){
        console.error("[SERVER] [PRODUCTS] [POST]" + server_messages_list.ERROR + ": " + e );
        return NextResponse.json({success:false, status:HttpStatus.INTERNAL_SERVER_ERROR, message: server_messages_list.ERROR});
    }
}


