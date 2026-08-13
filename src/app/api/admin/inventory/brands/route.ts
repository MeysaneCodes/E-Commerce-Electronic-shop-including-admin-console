import {Db} from "mongodb"
import {getDB} from "@/lib/server/db/mongodb"
import {server_messages_list, Inventory_messages_list} from "@/lib/api/server_messages/server_messages_list";
import {NextResponse} from "next/server";
import {HttpStatus} from "@/lib/api/Http_status/http_status";



export async function GET(){
    const CName = "brands";

    if(!CName || CName.length  == 0){
        console.error("[SERVER] [API] [INVENTORY] [BRANDS] : " + server_messages_list.DB_CART_COLLECTION_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_CART_COLLECTION_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }

    if(!process.env.MONGODB_DB) {
        console.error("[SERVER] [API] [INVENTORY] [BRANDS] : " + server_messages_list.DB_NAME_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }

    const db = await  getDB(process.env.MONGODB_DB) as Db;

    const res = await db.collection(CName).find().toArray();

    if(res){
        console.error("[SERVER] [API] [INVENTORY] [BRANDS] : " + Inventory_messages_list.BRANDS);
        return NextResponse.json({success:true, message:Inventory_messages_list.BRANDS, status:HttpStatus.OK, data:res});
    }else {
        console.error("[SERVER] [API] [INVENTORY] [BRANDS] : " + Inventory_messages_list.BRANDS_FAILED);
        return NextResponse.json({success:false, message:Inventory_messages_list.BRANDS_FAILED, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }
}