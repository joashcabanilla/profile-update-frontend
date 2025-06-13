import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

//routes
import { publicRoutes, authRoutes, apiAuthPrefix, defaultLoginRedirect } from "@/routes";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
    const { nextUrl } = req;
    const isLoggedIn = req.auth;
    
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute) {
        // Allow access to API auth routes without authentication
        return NextResponse.next();
    }

    if(isAuthRoute) {
        if(isLoggedIn) {
            // If the user is logged in, redirect to the default login redirect path
            return NextResponse.redirect(new URL(defaultLoginRedirect, nextUrl));
        }
        // Allow access to authentication routes without authentication
        return NextResponse.next();
    }

    if(!isPublicRoute && !isLoggedIn) {
        // If the user is not logged in and trying to access a protected route, redirect to the login page
        return NextResponse.redirect(new URL("/login", nextUrl));
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)"
    ]
};
