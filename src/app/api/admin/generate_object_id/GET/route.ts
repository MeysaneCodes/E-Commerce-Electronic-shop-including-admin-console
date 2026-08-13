import {ObjectId} from "mongodb";
import {NextResponse} from "next/server";
import {server_messages_list} from "@/lib/api/server_messages/server_messages_list";
import {HttpStatus} from "@/lib/api/Http_status/http_status";

export async function GET(){
    const newID = new ObjectId();
    if(newID)
        return NextResponse.json({success:true, status:HttpStatus.OK, data:newID.toString()});
    else
        return NextResponse.json({success:false, status:HttpStatus.INTERNAL_SERVER_ERROR, data:false});
}