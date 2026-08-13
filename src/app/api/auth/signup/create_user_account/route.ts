import {getDB} from "@/lib/server/db/mongodb";
import {NextResponse} from "next/server";
import {HttpStatus} from "@/lib/api/Http_status/http_status";
import {Errors_list, Success_List} from "@/lib/api/sign_up_api_messages/sign_up_message_list";
import {SignupUser} from "@/types/user_information_type";
import {Customer_User} from "@/utils/create_user";
import bcrypt from "bcrypt";
import {general_validation, validate_signup_inputs} from "@/utils/sign_up_validation";


export async function POST (req:Request){
    const {salutation, firstname, lastname, birthDay, email, password} = await req.json();

    const isData_Not_Valid = general_validation({
        UserInfos : {
            firstname: firstname,
            lastname:lastname,
            email:email,
            password:password,
            repeated_password:password,
            birthday:new Date(birthDay),
        }
    })


    if(isData_Not_Valid){
        if (isData_Not_Valid === Errors_list.INPUT_NOT_VALID){
            return NextResponse.json({success: false, message: isData_Not_Valid})
        }
    }





    try {
        if(!process.env.MONGODB_DB){
            console.error("[SERVER] [AUTH] [SIGN UP] [NEW ACC] Missing env variable MONGODB_DB");
            return NextResponse.json({success:false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Env missing variable" });
        }
        const db = await getDB(process.env.MONGODB_DB);
        if (!db){
            console.error("[SERVER] [AUTH] [SIGN UP] [NEW ACC] Error Fetching DB");
            return NextResponse.json({success:false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Error on DB fetch" });
        }

      /*  //check if user exists

        const checkEmail = await db.collection("users").findOne({email:email}, {projection: {email:1}});

        if(checkEmail){
            console.info("this email is already in use");
            return NextResponse.json({success:false, status: HttpStatus.OK, message: Errors_list.emailExistsAlready });
        }*/


        const h_password = await bcrypt.hash(password, 12);

       const newUser = new Customer_User(salutation,firstname, lastname, birthDay, email,h_password);

        const addUser =  await db.collection("users").insertOne(newUser);

        if(addUser.acknowledged){
            console.info("[SERVER] [AUTH] [SIGN UP] [NEW ACC] :" + Success_List.account_created );
            return  NextResponse.json({success:true, status: HttpStatus.OK, message:Success_List.account_created});
        }else {
            console.warn("[SERVER] [AUTH] [SIGN UP] [NEW ACC] :" + Success_List.account_not_created )
            return  NextResponse.json({success:true, status: HttpStatus.OK, message:Success_List.account_not_created });
        }



    }catch (e) {
        console.error(e);
        return  NextResponse.json({success:false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: "\"[SERVER] [AUTH] [SIGN UP] [NEW ACC] : Error occurred" });

    }








}