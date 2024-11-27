
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



// start  of check authentication 

// import { NextResponse } from "next/server";
// const app_url = "http://localhost:3000";

// export default function middleware(req) {
//   let verify = req.cookies.get("token");
//   let url = req.url;
//   const { searchParams } = new URL(url);

//   // Check if the 'close' parameter exists and is set to 'true'
//   const isClose = searchParams.get('close') === 'true';

//   // If the user is logged in and tries to access the login or signup page with 'close=true', do not redirect
//   if (verify && (url.includes('/login') || url.includes('/signup'))) {
//     if (!isClose) {
//       return NextResponse.redirect(app_url + "/"); // Redirect to home if 'close=true' is not present
//     }
//   }

//   // If the user is not authenticated and tries to access protected pages (e.g., profile), redirect to login
//   if (!verify && url.includes('/profile')) {
//     return NextResponse.redirect(app_url + "/login");
//   }

//   return NextResponse.next();
// }

// end of check authentication 




// //merged : 
// import { NextResponse, NextRequest } from "next/server";

// const app_url = "http://localhost:3000";
// const PUBLIC_FILE = /\.(.*)$/; // Static file pattern

// export async function middleware(req) {
//   const { searchParams, pathname } = req.nextUrl;
//   let verify = req.cookies.get("token");
//   const isClose = searchParams.get("close") === "true";

//   // Ignore requests to static files and API routes
//   if (
//     pathname.startsWith("/_next") ||
//     pathname.includes("/api/") ||
//     PUBLIC_FILE.test(pathname)
//   ) {
//     return NextResponse.next(); // Let the request pass without interference
//   }

//   // Localization logic: If no locale is specified, redirect to locale based on cookie or default to 'en'
//   if (req.nextUrl.locale === "default") {
//     const locale = req.cookies.get("NEXT_LOCALE")?.value || "en";
//     return NextResponse.redirect(
//       new URL(`/${locale}${pathname}${req.nextUrl.search}`, req.url)
//     );
//   }

//   // Extract locale from the URL or default to 'en'
//   const locale = req.nextUrl.locale || 'en';

//   // Authentication logic: Check token and redirect based on authentication
//   if (verify && (pathname.includes("/login") || pathname.includes("/signup"))) {
//     // Redirect to home if the user is logged in and tries to access login or signup
//     if (!isClose) {
//       return NextResponse.redirect(`${app_url}/${locale}/`);
//     }
//   }

//   // If the user is not authenticated and tries to access protected pages (e.g., profile), redirect to login
//   if (!verify && pathname.includes("/profile")) {
//     return NextResponse.redirect(`${app_url}/${locale}/login`);
//   }

//   // Redirect to home with locale
//   if (pathname === "/home") {
//     return NextResponse.redirect(`${app_url}/${locale}/home`);
//   }

//   return NextResponse.next(); // Let the request pass through if no conditions match
// }

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(en|de)/:path*'],
// };


// import { NextResponse } from 'next/server';
// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// const app_url = "http://localhost:3000";

// const intlMiddleware = createMiddleware(routing);

// export default function middleware(req) {
//   let verify = req.cookies.get("token");
//   let url = req.url;
//   console.log('middle ware url ', url)
//   // Apply next-intl middleware
//   const intlResponse = intlMiddleware(req);
//   if (intlResponse) {
//     return intlResponse;
//   }

//    // Extract locale from the URL
//    const locale = req.nextUrl.locale || 'en'; // Default to 'en' if locale is not found

//    // Custom authentication logic with locale prefix
//    if (verify && (url.includes('/login') || url.includes('/signup'))) {
//      return NextResponse.redirect(`${app_url}/${locale}/`);
//    }
//    if (!verify && url.includes('/profile')) {
//      return NextResponse.redirect(`${app_url}/${locale}/login`);
//    }
// }

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(en|de)/:path*'],
// };






//this is the working one:
import createMiddleware from 'next-intl/middleware';
import { localePrefix, locales } from './navigation';

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'fr'
});

//need check if logged in to open reservations and profile pages , and block sign in and sign up

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};


