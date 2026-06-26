import { NextResponse } from "next/server";
import { headers } from "next/headers"; 
import { auth } from "./lib/auth";

export async function proxy(request) {
   const session = await auth.api.getSession({
    headers: await headers()
   }) 

//    if(session?.user?.role == "user" && session?.user?.isPremium === false) {
//     return NextResponse.redirect(new URL('/pricing', request.url))
//    }

   if(!session){
    return NextResponse.redirect(new URL('/signin', request.url))
   }

}

export const config = {
    matcher: ['/lessons/:path','/pricing', '/dashboard/user', '/dashboard/admin', '/dashboard/user/add-lessons', '/dashboard/user/my-lessons','/dashboard/user/my-favorites', '/pricing/success', '/pricing/cancel']
}