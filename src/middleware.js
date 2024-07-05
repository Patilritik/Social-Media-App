// import {NextResponse } from "next/server";

// export async function middleware(request){
//     const token = request.cookies.get("token")?.value

//     console.log("middleware token " ,token);
//     if(!token){
//         return NextResponse.redirect(new URL("/Login" , request.url))
//     }
// }
// export const config = {
//     matcher :[
//         '/Home/:path*'
//     ]
// }
import { NextResponse } from "next/server";

export async function middleware(request) {
    // const token = request.cookies.get("token")?.value;
    const token = request.cookies.get("token");

    const { pathname } = new URL(request.url);

    // Check if the user is trying to access login or signup pages
    if (pathname.startsWith("/Login") || pathname.startsWith("/Signup")) {
        if (token) {
            // If the user has a token, redirect them to the home page
            console.log("User is authenticated, redirecting to Home");
            return NextResponse.redirect(new URL("/Home", request.url));
        }
        // If no token, allow access to login or signup pages
        return NextResponse.next();
    }

    // Check if the user is trying to access protected routes under /Home
    if (pathname.startsWith("/Home")) {
        if (!token) {
            // If there's no token, redirect to login page
            console.log("No token found, redirecting to Login");
            return NextResponse.redirect(new URL("/Login", request.url));
        }
        // If there's a token, allow access to the protected route
        return NextResponse.next();
    }

    // Allow the request to proceed if none of the conditions above match
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/Home/:path*',
        '/Login/:path*',
        '/Signup/:path*',
    ],
};

