import {getUser} from "@/lib/server/db/user/auth_user"
import {getDB} from "@/lib/server/db/mongodb";
import {NextResponse} from "next/server";
import {getIronSession} from "iron-session";
import {sessionOptions} from "@/app/api/session/config";
import {HttpStatus} from "@/lib/api/Http_status/http_status";

type SessionData = {
    user?: {
        id: string;
        email: string;
        role?: string;
    };
};

export async function  POST (req:Request){

    //delete session
    const sessionCookie = await delete_session(req);
    return NextResponse.json(
        {
            success: true,
            message: "[SERVER] [AUTH] [LOGOUT] Logged out",
            status: HttpStatus.OK,
            data:sessionCookie
        },
    );
}







//TODO is Redundant ?????
/*async function create_session(req:Request, {userID, Email}:{userID: string, Email: string}){
    const res = new NextResponse();
    const session = await getIronSession(req, res, sessionOptions);
    session.user = {
        id: userID,
        email: Email,
    };
    await session.save();
    return res;
}


async function get_session(req:Request){
    const res = new NextResponse();
    const session = await getIronSession(req, res, sessionOptions);

    if(session.user){
        console.log("session found:" + JSON.stringify(session));
        return res;
    }

    else{
        console.warn("no session found when calling get_session");
        return undefined;
    }

}*/


async function delete_session(req:Request){
    const res = new NextResponse();
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    session.destroy();
    //console.info("Session destroyed");
    return res;
}
