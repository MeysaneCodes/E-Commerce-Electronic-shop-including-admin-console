import { Resend } from "resend";
import send_opt_code from "@/providers/Resend/send_opt_code";
import {NextResponse} from "next/server";
import {randomInt} from "node:crypto";
import {getDB} from "@/lib/server/db/mongodb";
import bcrypt from "bcrypt";
import {HttpStatus} from "@/lib/api/Http_status/http_status";
import {Errors_list} from "@/lib/api/sign_up_api_messages/sign_up_message_list";
import {validate_email} from "@/utils/sign_up_validation";
import {Otp_messages_list} from "@/lib/api/sign_up_api_messages/otp_messages_list";

export async function POST (req:Request){

    //body
    const {email} = await req.json();


    console.info("[SERVER] [OTP] [SEND] Validating email ... ");
    //2nd Check
    const {success, message} = validate_email(email);

    if(!success){
        //email not valid
        console.warn("[SERVER] [OTP] [SEND] EMAIL IS NOT VALID!");

        return NextResponse.json({success: false, message: message, status: HttpStatus.UNPROCESSABLE_ENTITY});
    }

    console.info("[SERVER] [OTP] [SEND] EMAIL VALIDATION COMPLETED");


    try {

        if(!process.env.MONGODB_DB){
            throw new Error("Missing environment variable: MONGODB_DB");
        }
        //check if we reached max code request per 24h
        const db = await getDB(process.env.MONGODB_DB);
        if(!db)
            return NextResponse.json({success:false, message:"Db error"});



        //check if email already exists
        const checkEmail = await db.collection("users").findOne({email:email}, {projection: {email:1}});

        console.info("[SERVER] [OTP] [SEND] Checking if e-mail already exists ...");
        if(checkEmail){
            console.info("[SERVER] [OTP] [SEND] " + Errors_list.emailExistsAlready);
            return NextResponse.json({success:false, status: HttpStatus.OK, message: Errors_list.emailExistsAlready});
        }

        console.info("[SERVER] [OTP] [SEND] Checking E-mail Completed!");



        const response = await db.collection("otp_codes").findOne({email:email}, {projection: {count:1, createdAt:1}});

        if(response){
            //24h ago
            const now = new Date();
            const cutoff = new Date(now.getTime() - 24*60*60*1000);
            if(response.createdAt > cutoff && response.count >= 2){
                console.info("[SERVER] [OTP] [SEND] too many requests in the last 24h");
                return NextResponse.json({success:false, message:Otp_messages_list.TOO_MANY_REQUEST, status: HttpStatus.TOO_MANY_REQUESTS});
            }
        }




        console.info("[SERVER] [OTP] [SEND] Generating OPT code ... ")
        //send new code
        const code = randomInt(100000,999999);
        const hash_digit_code = await bcrypt.hash(code.toString(), 12);

        console.info("[SERVER] [OTP] [SEND] Sending OPT ... ")

        const {error,data} = await send_opt_code({fromEmail: "Resend <onboarding@resend.dev>", toEmail: "meysane22@gmail.com", digits_code:code})

        if (error){
            console.error("[SERVER] [OTP] [SEND] Error occured while sending OPT code : " + error.message);
            return NextResponse.json({success:false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message});
        }


        if(data){
            try {
                console.info("[SERVER] [OTP] [SEND] Sending Otp to Db ...")
                //check if one exists then update. if not create a new one
                const response = await db.collection("otp_codes").findOneAndUpdate(
                    {email:email},
                    {$set: {
                        otp: hash_digit_code, expiresAt: new Date(Date.now() +24*60*60*1000)
                        },
                        $inc: {count:1},
                    $setOnInsert: {email:email, createdAt: new Date()}
                    },

                    {returnDocument:"after",
                    upsert:true}

                );


                if( response){
                    console.info("[SERVER] [OTP] [SEND] inserted into otp database successfully");
                    console.info("[SERVER] [OTP] [SEND] Document updated/added successfully, Document: " + response );
                    return NextResponse.json({success:true,message:"OK"})
                }else {
                    console.error("[SERVER] [OTP] [SEND] error occurred while inserting into otp database");
                    return NextResponse.json({success:false,message:"Error inserting code to the DB", status:HttpStatus.INTERNAL_SERVER_ERROR});
                }

            }catch (e) {
                console.error(e);
            }
            
        }else {
            return NextResponse.json({success:false,message:"Error" + error})
        }
    }catch (e) {
        console.error(e);
        return NextResponse.json({success:false,message:"Error" + e})
    }
}

