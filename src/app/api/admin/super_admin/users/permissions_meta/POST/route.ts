import {Db, ObjectId} from "mongodb"
import {getDB} from "@/lib/server/db/mongodb"
import {
    server_messages_list, products_messages_list,
    Super_admin_messages_list
} from "@/lib/api/server_messages/server_messages_list";
import {NextResponse} from "next/server";
import {HttpStatus} from "@/lib/api/Http_status/http_status";
import {AccountTypeMeta} from "@/types/super_admin_meta/account_type/type";



export async function POST(req:Request){
    const CName = "permissions";
    const {filter, projection} = await req.json();



    if(!CName || CName.length  == 0){
        console.error("[SERVER] [API] [SUPER ADMIN] [USERS] [PERMISSIONS]: " + server_messages_list.DB_CART_COLLECTION_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_CART_COLLECTION_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }

    if(!process.env.MONGODB_SUPER_ADMIN) {
        console.error("[SERVER] [API] [SUPER ADMIN] [USERS] [PERMISSIONS] : " + server_messages_list.DB_NAME_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }

    const db = await  getDB(process.env.MONGODB_SUPER_ADMIN) as Db;

    const QueryFilter = filter ?  {account_type:filter} : {};
    const ProjectionFilter = projection ? projection : {name:1, _id:0};

    const res = await db.collection<AccountTypeMeta>(CName).find(QueryFilter, {projection:ProjectionFilter}).toArray();


    if(res){
        console.error("[SERVER] [API] [SUPER ADMIN] [USERS] [PERMISSIONS] : " + products_messages_list.FOUND);
        return NextResponse.json({success:true, message:products_messages_list.FOUND, status:HttpStatus.OK, data:res});
    }else {
        console.error("[SERVER] [API] [SUPER ADMIN] [USERS] [PERMISSIONS] : " + products_messages_list.NO_ITEM_FOUND);
        return NextResponse.json({success:false, message:products_messages_list.NO_ITEM_FOUND , status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }
}