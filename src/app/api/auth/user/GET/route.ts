import {server_messages_list} from "@/lib/api/server_messages/server_messages_list";
import {NextResponse} from "next/server";
import {HttpStatus} from "@/lib/api/Http_status/http_status";
import {getDB} from "@/lib/server/db/mongodb";
import {ObjectId} from "mongodb";

export async function GET (){
    if(!process.env.MONGODB_DB) {
        console.error("[SERVER] [USER] [GET] : " + server_messages_list.DB_NAME_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});

    }
    const db = await getDB(process.env.MONGODB_DB);

    if(!db){
        console.error("[SERVER] [USER] [GET] DB is undefined");
        return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});
    }

    if(!process.env.MONGODB_USERS) {
        console.error("[SERVER] [USER] [GET] : " + server_messages_list.DB_USER_NOT_FOUND);
        return NextResponse.json({success:false, message:server_messages_list.DB_USER_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR});
    }

            try {
            //TODO remove ID for deployment
                console.info("[SERVER] [USER] [GET] : fetching user data ...");
                const user = await db.collection(process.env.MONGODB_USERS).findOne({_id: new ObjectId("69b947361321bee1386f2af9")});
                console.info("[SERVER] [USER] [GET] : fetch is completed!");

                if(user)
                    console.info("[SERVER] [USER] [GET] : user found!");
                else
                    console.info("[SERVER] [USER] [GET] : user not found!");

                return NextResponse.json({success: true, user: user, status:HttpStatus.OK});

            }catch (e){
                console.error("[SERVER] [USER] [GET] error occurred while fetching. Error : " + e);
                return NextResponse.json({success: false, user: null, status:HttpStatus.INTERNAL_SERVER_ERROR});
            }
}