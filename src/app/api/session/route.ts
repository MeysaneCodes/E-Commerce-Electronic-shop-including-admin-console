import {NextResponse} from "next/server";
import {getIronSession} from "iron-session";
import {sessionOptions} from "@/app/api/session/config";

type SessionData = {
    user?: {
        id: string;
        email: string;
        role?: string;
    };
};

//create session
export async function POST (req:Request){

    const {user_id, email} = await req.json();
    //create_session
    const res = NextResponse.json({ok:true});
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    session.user = {
        id: user_id.toString(),
        email: email,
    }

    await session.save();

    return res;
}


//Get Session
export async function GET (req:Request){

    const res = NextResponse.next();
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    if(!session.user){
        console.log("Session: no user found");
        return NextResponse.json({LoggedIn:false});
    }else {
        console.log("Session: Found!")
        return NextResponse.json({LoggedIn:true, user: session.user});
    }
}