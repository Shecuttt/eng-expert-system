import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import Cookies from "js-cookie";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const acceptHeader = req.headers.get("accept") || "";
    if (!acceptHeader.includes("text/html")) {
        return NextResponse.next(); // Lewati permintaan selain HTML
    }

    // Gunakan js-cookie untuk mendapatkan token
    const token = Cookies.get("token");

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

// Fungsi untuk menghapus token saat browser ditutup
function setupTokenRemoval() {
    if (typeof window !== "undefined") {
        window.addEventListener("beforeunload", () => {
            Cookies.remove("token");
        });
    }
}

// Panggil fungsi setupTokenRemoval saat aplikasi dimuat
if (typeof window !== "undefined") {
    setupTokenRemoval();
}
