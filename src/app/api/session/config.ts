import {SessionOptions} from "iron-session";

const SESSION_PASSWORD = process.env.SESSION_SECRET as string;


export const sessionOptions: SessionOptions = {
    password : SESSION_PASSWORD,
    cookieName: "session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    }
};


//adding this property to iron session
declare module "iron-session" {
    interface IronSessionData {
        user?: {
            id: string;
            email: string;
            role?: string;
        }
    }
}