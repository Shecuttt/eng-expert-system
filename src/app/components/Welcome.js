"use client";
import React, { useState, useEffect } from "react";
import book from "../../../public/homework.png";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { decode } from "jsonwebtoken";

export default function Welcome() {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                if (decode(token)) {
                    setAuthenticated(true);
                }
            } catch (error) {
                console.error(error);
                setAuthenticated(false);
            }
        }
    }, []);

    const handleClick = () => {
        if (authenticated) {
            router.push("/sesi");
        } else {
            Swal.fire({
                title: "Ngga login dulu?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Login dong!",
                cancelButtonText: "Ga, malas!",
            }).then((response) => {
                if (response.isConfirmed) {
                    router.push("/login");
                } else if (response.isDenied) {
                    router.push("/sesi");
                }
            });
        }
    };
    return (
        <div className="w-4/5 lg:w-1/3 mt-20 lg:mt-32 bg-white/10 backdrop-blur-md rounded-2xl flex flex-col justify-center space-y-3 p-6">
            <Image
                src={book}
                width={180}
                height={180}
                alt="book"
                className="mx-auto mb-8"
            />
            <h1 className="text-3xl lg:text-5xl font-extrabold text-center">
                Belajar <span className="text-violet-700">Rek!</span>
            </h1>
            <p className="text-sm lg:text-base text-center">
                Cari rekomendasi cara belajar Bahasa Inggris dari permasalahan
                dalam belajarmu
            </p>

            <button
                onClick={handleClick}
                className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-full mx-auto text-sm lg:text-base"
            >
                Cari tahu sekarang!
            </button>
        </div>
    );
}
