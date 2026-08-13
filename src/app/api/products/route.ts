import {getDB} from "@/lib/server/db/mongodb"
import {Db} from "mongodb";
import {NextResponse} from "next/server";
import {server_messages_list} from "@/lib/api/server_messages/server_messages_list";
import {HttpStatus} from "@/lib/api/Http_status/http_status";


export async function POST (req: Request){

    //TODO FIX
    const {CName, Cols_Projection} = await req.json();

    if(!process.env.MONGODB_DB) {
        console.error("[SERVER] [API] [INVENTORY] [Attributes] : " + server_messages_list.DB_NAME_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }

    //console.log('GET products came  ' +  CName);
    const db = await  getDB(process.env.MONGODB_DB) as Db;


    const Fetched_Items = await db.collection(CName).find({}, {projection: Cols_Projection}).toArray();


    return NextResponse.json({item: Fetched_Items})

  /*  console.log(JSON.stringify({
        message: "Backend mongodb:",
        collections: await db.listCollections().toArray()
    }, null, 2));*/
}