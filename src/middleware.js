import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const acceptHeader = req.headers.get("accept") || "";
    if (!acceptHeader.includes("text/html")) {
        return NextResponse.next(); // Lewati permintaan selain HTML
    }

    const tokenObj = req.cookies.get("token");
    const token = tokenObj?.value;

    console.log("Token received:", token);

    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (!token) {
            console.log("No token");
            return NextResponse.redirect(new URL("/login", req.url));
        }

        try {
            const { payload } = await jwtVerify(token, JWT_SECRET); // Verifikasi token
            console.log("Decoded token:", payload);

            if (payload.role !== "admin") {
                console.log("Not admin");
                return NextResponse.redirect(new URL("/", req.url));
            }
        } catch (error) {
            console.error("Invalid token:", error.message);
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
