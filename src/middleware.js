import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(req) {
    const token = req.cookies.get("token");

    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (!token || token === undefined) {
            console.log("No token", token);
            return NextResponse.redirect(new URL("/login", req.url));
        }

        try {
            const decoded = verify(token, JWT_SECRET);
            console.log(decoded);
            if (decoded.role !== "admin") {
                console.log("Not admin");
                return NextResponse.redirect(new URL("/", req.url));
            }
        } catch (error) {
            console.error("invalid", error.message);
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
