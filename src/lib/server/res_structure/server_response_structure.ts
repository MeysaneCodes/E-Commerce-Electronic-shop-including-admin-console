import {NextResponse} from "next/server";
import {HttpStatus} from "@/lib/api/Http_status/http_status";

export function send_response (success:boolean, message:string, status:HttpStatus, data?: object | null ) {
   return NextResponse.json({success:success, message:message, status:status, data:data});
}

