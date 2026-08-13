import {getDB} from "@/lib/server/db/mongodb"
import {Db} from "mongodb";
import {NextResponse} from "next/server";
import {server_messages_list} from "@/lib/api/server_messages/server_messages_list";
import {HttpStatus} from "@/lib/api/Http_status/http_status";


export async function POST (req: Request){

    const {CName} = await req.json();

    if(!CName || CName.length  == 0){
        console.error("[SERVER] [API] [INVENTORY] [POST] : " + server_messages_list.DB_CART_COLLECTION_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_CART_COLLECTION_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }

    if(!process.env.MONGODB_DB) {
        console.error("[SERVER] [API] [INVENTORY] [POST] : " + server_messages_list.DB_NAME_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }

    const db = await  getDB(process.env.MONGODB_DB) as Db;

    if(!db){
        console.error("[SERVER] [API] [INVENTORY] [POST] : " + server_messages_list.ERROR);
        return NextResponse.json({success:false, message:server_messages_list.ERROR, status:HttpStatus.INTERNAL_SERVER_ERROR, data: null});
    }

    try{
        const Fetched_Items = await db.collection(CName).find({}).toArray();
        return NextResponse.json({success:true, message:"OK", status:HttpStatus.OK ,data: Fetched_Items})
    }catch (e) {
        console.error("[SERVER] [API] [INVENTORY] [POST] : " + e);
        return NextResponse.json({success:false, message:e, status:HttpStatus.INTERNAL_SERVER_ERROR, data: null});
    }
}