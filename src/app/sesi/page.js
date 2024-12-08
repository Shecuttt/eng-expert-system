import Image from "next/image";
import React from "react";
import book from "../../../public/homework.png";
import Soal from "../components/Soal";
import Navbar from "../components/Navbar";

export default function page() {
    return (
        <div className="min-h-screen bg-sesi">
            <Navbar />
            <div className="flex flex-col lg:flex-row items-center justify-between h-screen w-4/5 mx-auto">
                <Image
                    src={book}
                    width={200}
                    height={200}
                    alt="book"
                    priority
                    className="mx-auto hidden lg:flex"
                />
                <Soal />
            </div>
        </div>
    );
}
