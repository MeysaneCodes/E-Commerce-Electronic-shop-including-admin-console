import {getUser} from "@/lib/server/db/user/auth_user"
import {getDB} from "@/lib/server/db/mongodb";
import {NextResponse} from "next/server";
import {getIronSession} from "iron-session";
import {sessionOptions} from "@/app/api/session/config";
import {json} from "node:stream/consumers";
import {validate_email} from "@/utils/sign_up_validation";
import {Errors_list, sign_up_messages} from "@/lib/api/sign_up_api_messages/sign_up_message_list";
import {HttpStatus} from "@/lib/api/Http_status/http_status";
import {server_messages_list} from "@/lib/api/server_messages/server_messages_list";

export async function  POST (req:Request){

    const {email, password} = await req.json();

    //check if inputs are valid before processing
    if(!email || !password || password.length === 0 || email.length === 0)
        return NextResponse.json({success:false, message: Errors_list.EMAIL_PASSWORD_NOT_VALID, status: HttpStatus.UNPROCESSABLE_ENTITY});


    //Email Validation
    const {success, message}  = validate_email(email);


    //Email & Password Check
    if(!success){
        if(message === Errors_list.emailNotValid){
            return NextResponse.json({success:false, message: Errors_list.emailNotValid});
        }
        return NextResponse.json({success:false, message: Errors_list.emailNotValid});
    }

    if(password.length < 8)
        return NextResponse.json({success:false, message: Errors_list.EMAIL_PASSWORD_NOT_VALID});



    if(!process.env.MONGODB_DB)
        return NextResponse.json({success:false, message: "", status: HttpStatus.INTERNAL_SERVER_ERROR});

    const db = await getDB(process.env.MONGODB_DB);


        if(!db){
            console.error("[SERVER] [AUTH] [LOGIN]: " + server_messages_list.DB_NAME_NOT_FOUND);
            return NextResponse.json({success:false, message: server_messages_list.DB_NAME_NOT_FOUND, status: HttpStatus.INTERNAL_SERVER_ERROR});
        }

        try{
            const user = await getUser({db: db.collection('users'), email: email, password: password});

            if(!user)
                return NextResponse.json({success:false, message:Errors_list.EMAIL_PASSWORD_NOT_VALID, status: HttpStatus.OK});


            let session_cookie:   NextResponse<unknown> | undefined;
            console.info("[SERVER] [AUTH] [LOGIN] searching for existing session cookie ... ")
             session_cookie = await get_session(req);
            if(!session_cookie && user && user._id){
                 console.info("[SERVER] [AUTH] [LOGIN] Session cookie not found, creating session ...");
                 session_cookie = await create_session(req,{userID: user?._id.toString() ?? "null", Email: email});
                console.info("[SERVER] [AUTH] [LOGIN]  Session created!");
            }

            console.info("[SERVER] [AUTH] [LOGIN] Session cookie  found");
            return NextResponse.json({success:true, message:"[SERVER] [AUTH] [LOGIN]" + server_messages_list.LOGGED_IN},session_cookie);
        }catch (e){
            console.error("[SERVER] [AUTH] [LOGIN] " + e);
            return NextResponse.json({success:false, message:"[SERVER] [AUTH] [LOGIN] " + e, status: HttpStatus.INTERNAL_SERVER_ERROR});

        }

}



async function create_session(req:Request, {userID, Email}:{userID: string, Email: string}){
    const res = new NextResponse();
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    session.user = {
        id: userID,
        email: Email,
    };
    await session.save();
    return res;
}

type SessionData = {
    user?: {
        id: string;
        email: string;
        role?: string;
    };
};

async function get_session(req:Request){
    const res = new NextResponse();
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    if(session.user){
        console.log("session found:" + JSON.stringify(session));
        return res;
    }

    else{
        console.warn("no session found when calling get_session");
        return undefined;
    }

}


async function delete_session(req:Request){
    const res = new NextResponse();
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    if(session.user){
        session.destroy();
        console.info("Session destroyed");
         await session.save();
        return res;
    }else {
        console.error("No session found when calling delete_session");
        return undefined;
    }
}

