import React from "react";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
    title: "Belajar Rek!",
    description: "Sistem Pakar Rekomendasi Belajar Bahasa Inggris",
};

export default function layout({ children }) {
    return (
        <html>
            <head>
                <link rel="icon" href="favicon.ico" sizes="any" />
            </head>
            <body className={`${montserrat.className} antialiased`}>
                <main>{children}</main>
            </body>
        </html>
    );
}
