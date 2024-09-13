// import { NextResponse } from "next/server";
// const app_url = "http://localhost:3000";
// export default function middleware(req){
//     let verify = req.cookies.get("token");
//     let url = req.url;
    
//     if(verify && ( url.includes('/login') ||  url.includes('/signup') )){
//         return NextResponse.redirect(app_url+"/")
//     }
//     if(!verify &&  url.includes('/profile') ){
//         return NextResponse.redirect(app_url+"/login")
//     }
// }

import { NextResponse } from "next/server";
const app_url = "http://localhost:3000";

export default function middleware(req) {
  let verify = req.cookies.get("token");
  let url = req.url;
  const { searchParams } = new URL(url);

  // Check if the 'close' parameter exists and is set to 'true'
  const isClose = searchParams.get('close') === 'true';

  // If the user is logged in and tries to access the login or signup page with 'close=true', do not redirect
  if (verify && (url.includes('/login') || url.includes('/signup'))) {
    if (!isClose) {
      return NextResponse.redirect(app_url + "/"); // Redirect to home if 'close=true' is not present
    }
  }

  // If the user is not authenticated and tries to access protected pages (e.g., profile), redirect to login
  if (!verify && url.includes('/profile')) {
    return NextResponse.redirect(app_url + "/login");
  }

  return NextResponse.next();
}
