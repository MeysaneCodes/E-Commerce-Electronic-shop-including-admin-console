import {Db, ObjectId} from "mongodb"
import {getDB} from "@/lib/server/db/mongodb"
import {server_messages_list, Inventory_messages_list} from "@/lib/api/server_messages/server_messages_list";
import {NextResponse} from "next/server";
import {HttpStatus} from "@/lib/api/Http_status/http_status";



export async function POST(req:Request){
    const CName = "users";
    const {data, id} = await req.json();


     const filter = data ? (data as string[]).reduce((acc,key,)=>{
         acc[key] = 1;
         return acc;
     }, {} as Record<string, number>) : {};

    const Query = id &&  ObjectId.isValid(id) ? {_id: new ObjectId(id)} : {};


    if(!CName || CName.length  == 0){
        console.error("[SERVER] [API] [SUPER ADMIN] [USERS] : " + server_messages_list.DB_CART_COLLECTION_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_CART_COLLECTION_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }

    if(!process.env.MONGODB_SUPER_ADMIN) {
        console.error("[SERVER] [API] [SUPER ADMIN] [USERS] : " + server_messages_list.DB_NAME_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }

    const db = await  getDB(process.env.MONGODB_SUPER_ADMIN) as Db;

    const res = await db.collection(CName).find(Query,{projection:filter}).toArray();


    if(res){
        console.error("[SERVER] [API] [SUPER ADMIN] [USERS] : " + Inventory_messages_list.INVENTORY_SUB_CATEGORY);
        return NextResponse.json({success:true, message:Inventory_messages_list.INVENTORY_SUB_CATEGORY, status:HttpStatus.OK, data:res});
    }else {
        console.error("[SERVER] [API] [SUPER ADMIN] [USERS] : " + Inventory_messages_list.INVENTORY_SUB_CATEGORY_FAILED);
        return NextResponse.json({success:false, message:Inventory_messages_list.INVENTORY_SUB_CATEGORY_FAILED, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }
}