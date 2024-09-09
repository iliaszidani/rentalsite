import { NextResponse } from "next/server";
const app_url = "http://localhost:3000";
export default function middleware(req){
    let verify = req.cookies.get("token");
    let url = req.url;
    
    if(verify && ( url.includes('/login') ||  url.includes('/signup') )){
        return NextResponse.redirect(app_url+"/")
    }
    if(!verify &&  url.includes('/profile') ){
        return NextResponse.redirect(app_url+"/login")
    }
}