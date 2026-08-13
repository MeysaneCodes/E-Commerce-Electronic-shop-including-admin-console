import {getIronSession} from "iron-session";
import {NextResponse} from "next/server";
import {sessionOptions} from "@/app/api/session/config";
import {HttpStatus} from "@/lib/api/Http_status/http_status";
import {session_messages_list} from "@/lib/api/server_messages/server_messages_list";

type SessionData = {
    user?: {
        id: string;
        email: string;
        role?: string;
    };
};

export async function getSession(req:Request){
    const res = NextResponse.next();
    const session = await getIronSession<SessionData>(req,res,sessionOptions);
    if(!session.user){
        console.info("[SESSION MANAGER] " + session_messages_list.NO_SESSION);
        return {success:false, status : HttpStatus.UNPROCESSABLE_ENTITY, user_session:undefined, message: session_messages_list.NO_SESSION};
    }else {
        console.info("[SESSION MANAGER] " + session_messages_list.SESSION_FOUND);
        return {success:true, status : HttpStatus.OK, user_session:session.user, message: session_messages_list.SESSION_FOUND};
    }
}