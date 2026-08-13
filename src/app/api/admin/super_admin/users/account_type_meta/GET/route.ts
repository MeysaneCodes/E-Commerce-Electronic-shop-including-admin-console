import {Db, ObjectId} from "mongodb"
import {getDB} from "@/lib/server/db/mongodb"
import {
    server_messages_list,
    Inventory_messages_list,
    Super_admin_messages_list
} from "@/lib/api/server_messages/server_messages_list";
import {NextResponse} from "next/server";
import {HttpStatus} from "@/lib/api/Http_status/http_status";
import {AccountTypeMeta} from "@/types/super_admin_meta/account_type/type";



export async function GET(){
    const CName = "account_types";




    if(!CName || CName.length  == 0){
        console.error("[SERVER] [API] [SUPER ADMIN] [USERS] [ACCOUNT TYPE META]: " + server_messages_list.DB_CART_COLLECTION_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_CART_COLLECTION_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }

    if(!process.env.MONGODB_SUPER_ADMIN) {
        console.error("[SERVER] [API] [SUPER ADMIN] [USERS] [ACCOUNT TYPE META] : " + server_messages_list.DB_NAME_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }

    const db = await  getDB(process.env.MONGODB_SUPER_ADMIN) as Db;

    const res = await db.collection<AccountTypeMeta>(CName).find({}, {projection:{name:1, _id:0}}).toArray();


    if(res){
        console.error("[SERVER] [API] [SUPER ADMIN] [USERS] [ACCOUNT TYPE META] : " + Super_admin_messages_list.ACCOUNT_TYPE_META_RETRIEVED);
        return NextResponse.json({success:true, message:Super_admin_messages_list.ACCOUNT_TYPE_META_RETRIEVED, status:HttpStatus.OK, data:res});
    }else {
        console.error("[SERVER] [API] [SUPER ADMIN] [USERS] [ACCOUNT TYPE META] : " + Super_admin_messages_list.ACCOUNT_TYPE_META_FAILED);
        return NextResponse.json({success:false, message:Super_admin_messages_list.ACCOUNT_TYPE_META_FAILED, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }
}