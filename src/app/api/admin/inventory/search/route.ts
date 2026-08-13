import {Db} from "mongodb"
import {getDB} from "@/lib/server/db/mongodb"
import {server_messages_list, Inventory_messages_list} from "@/lib/api/server_messages/server_messages_list";
import {NextResponse} from "next/server";
import {HttpStatus} from "@/lib/api/Http_status/http_status";

function escapeRegex(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}



export async function POST(req:Request){
    const CName = "products";
    const {data}  = await req.json();

    if(!CName || CName.length  == 0){
        console.error("[SERVER] [API] [INVENTORY] [add_item] : " + server_messages_list.DB_CART_COLLECTION_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_CART_COLLECTION_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }

    if(!process.env.MONGODB_DB) {
        console.error("[SERVER] [API] [INVENTORY] [add_item] : " + server_messages_list.DB_NAME_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }

    const db = await  getDB(process.env.MONGODB_DB) as Db;

    //search logic
    const words:string[] = data.split(/\s+/).filter(Boolean).map(escapeRegex);

    const filter = data
        ? {
            $and: words.map(word => ({
                $or: [
                    { title: { $regex: word, $options: "i" } },
                    { slug: { $regex: word, $options: "i" } },
                    { brand: { $regex: word, $options: "i" } },
                    { model: { $regex: word, $options: "i" } },
                    { "variants.sku": { $regex: word, $options: "i" } },
                    { "variants.options.Color": { $regex: word, $options: "i" } },
                    { "variants.options.Storage": { $regex: word, $options: "i" } },
                ],
            })),
        }
        : {};



    const res = await db.collection(CName).find(filter).toArray();

    console.log("dododo" + JSON.stringify(res));

    if(res){
        console.error("[SERVER] [API] [INVENTORY] [Search] : " + Inventory_messages_list.ITEM_ADDED);
        return NextResponse.json({success:true, message:Inventory_messages_list.ITEM_ADDED, status:HttpStatus.OK, data:res});
    }else {
        console.error("[SERVER] [API] [INVENTORY] [Search] : " + Inventory_messages_list.ITEM_ADDED_FAILED);
        return NextResponse.json({success:false, message:Inventory_messages_list.ITEM_ADDED_FAILED, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
    }
}