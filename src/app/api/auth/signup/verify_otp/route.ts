import {getDB} from "@/lib/server/db/mongodb";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import {Otp_messages_list} from "@/lib/api/sign_up_api_messages/otp_messages_list";
import {server_messages_list} from "@/lib/api/server_messages/server_messages_list";
import {HttpStatus} from "@/lib/api/Http_status/http_status";



export async function POST (req:Request){

    const {input_otp_code, email} = await req.json();





    try{
        if(!process.env.MONGODB_DB) {
            console.error("[SERVER] [API] [AUTH] [SIGNUP] [OTP] : " + server_messages_list.DB_NAME_NOT_FOUND);
            return NextResponse.json({success:false, message:server_messages_list.DB_NAME_NOT_FOUND, status:HttpStatus.INTERNAL_SERVER_ERROR, data:null});
        }

        const db = await getDB(process.env.MONGODB_DB);
        if(!db)
            return NextResponse.json({success:false, message:"Db error"});

        const response = await db.collection("otp_codes").findOne({email:email}, {
            projection: {otp:1}
        });

        if(response){
            console.info("S: Checking the OTP ...")
            const isValid = await bcrypt.compare(input_otp_code,response.otp);

            if(isValid){
                console.info("S: OTP Verified");
                return NextResponse.json({success:true, message:"S: OTP Verified"});
            }else {
                console.info("S: OTP not valid");
                return NextResponse.json({success:false, message:Otp_messages_list.NOT_VALID_CREDENTIALS});
            }
        }
    }catch (e){
        console.error(e);
        return NextResponse.json({success:false, message:"S: Error occured on OTP Verification: " + e});
    }


}