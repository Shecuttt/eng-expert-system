"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import Swal from "sweetalert2";

export default function Navbar() {
    const [authenticated, setAuthenticated] = useState(false);

    const router = useRouter();

    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = decode(token);
                if (decoded) {
                    setAuthenticated(true);
                }
            } catch (error) {
                console.error(error);
                setAuthenticated(false);
            }
        }
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: "Keluar?",
            text: "Apakah anda yakin ingin keluar?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Keluar",
        }).then((response) => {
            if (response.isConfirmed) {
                localStorage.removeItem("token");
                setAuthenticated(false);
                router.push("/");
                window.location.reload();
            }
        });
    };

    const handleHistory = () => {
        {
            authenticated ? (
                <Link href="/history">
                    <a className="text-white hover:text-gray-300">Riwayat</a>
                </Link>
            ) : (
                Swal.fire({
                    title: "Anda harus login terlebih dahulu",
                    text: "Untuk melanjutkan, silahkan login terlebih dahulu.",
                    icon: "info",
                    confirmButtonText: "Login",
                }).then((response) => {
                    if (response.isConfirmed) {
                        window.location.href = "/login";
                    }
                })
            );
        }
    };

    return (
        <div className="flex justify-center">
            <nav className="top-10 p-3 rounded-full absolute shadow-md bg-black/5 backdrop-blur-sm flex flex-row justify-between items-center w-4/5">
                <div className="flex flex-row space-x-12">
                    <div className="flex space-x-1 text-white">
                        <svg
                            className="w-6 h-6 text-violet-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
                                clipRule="evenodd"
                            />
                        </svg>

                        <h1 className="mr-6 font-bold">Belajar Rek</h1>
                    </div>
                    <div className="flex flex-row space-x-5 text-white">
                        <Link
                            href={"/"}
                            className={pathname === "/" ? "font-bold" : ""}
                        >
                            Beranda
                        </Link>
                        <Link
                            href={"/sesi"}
                            className={pathname === "/sesi" ? "font-bold" : ""}
                        >
                            Mulai
                        </Link>
                        <Link
                            href={"/riwayat"}
                            onClick={handleHistory}
                            className={
                                pathname === "/riwayat" ? "font-bold" : ""
                            }
                        >
                            Riwayat
                        </Link>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    {authenticated ? (
                        <button
                            onClick={handleLogout}
                            className="py-2 px-4 rounded-full hover:bg-white/20"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                href={"/login"}
                                className="py-2 px-4 rounded-full bg-gray-50 text-violet-600 hover:bg-gray-200"
                            >
                                Login
                            </Link>
                            <Link
                                href={"/register"}
                                className="py-2 px-4 rounded-full bg-violet-500 hover:bg-violet-700"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}
