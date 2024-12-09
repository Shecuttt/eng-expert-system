"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import Swal from "sweetalert2";

export default function Navbar() {
    const [authenticated, setAuthenticated] = useState(false);
    const [openedNav, setOpenedNav] = useState(false);

    const router = useRouter();

    const pathname = usePathname();

    useEffect(() => {
        const getCookieValue = (name) => {
            const cookies = document.cookie.split("; ");
            const cookie = cookies.find((c) => c.startsWith(`${name}=`));
            return cookie ? cookie.split("=")[1] : null;
        };

        const token = getCookieValue("token"); // Ambil token dari cookie
        if (token) {
            try {
                const decoded = decode(token);
                if (decoded) {
                    setAuthenticated(true);
                }
            } catch (error) {
                console.error("Invalid token:", error);
                setAuthenticated(false);
            }
        }

        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenedNav(false)
        );

        return () => {
            window.removeEventListener(
                "resize",
                () => window.innerWidth >= 960 && setOpenedNav(false)
            );
        };
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
                document.cookie =
                    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; //buat token expired secara paksa ke tanggal tersebut
                setAuthenticated(false);
                router.push("/");
            }
        });
    };

    const handleHistory = () => {
        Swal.fire({
            title: "Anda harus login terlebih dahulu",
            text: "Untuk melanjutkan, silahkan login terlebih dahulu.",
            icon: "info",
            confirmButtonText: "Login",
        }).then((response) => {
            if (response.isConfirmed) {
                window.location.href = "/login";
            }
        });
    };

    return (
        <div className="flex justify-center">
            <nav className="hidden top-10 p-3 rounded-full absolute shadow-md bg-black/5 backdrop-blur-sm lg:flex flex-row justify-between items-center w-4/5">
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
                        {authenticated ? (
                            <Link
                                href="/riwayat"
                                className={
                                    pathname === "/riwayat" ? "font-bold" : ""
                                }
                            >
                                Riwayat
                            </Link>
                        ) : (
                            <button
                                onClick={handleHistory}
                                className={
                                    pathname === "/riwayat" ? "font-bold" : ""
                                }
                            >
                                Riwayat
                            </button>
                        )}
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
            <nav className="lg:hidden top-6 absolute z-10 rounded-lg w-5/6 shadow-sm p-4 bg-white/10 backdrop-blur-md flex flex-col">
                <div className="flex justify-between items-center">
                    <h1 className="text-gray-100 font-bold">Belajar Rek</h1>
                    <button onClick={() => setOpenedNav(!openedNav)}>
                        {openedNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                {openedNav && (
                    <div className="p-4 mt-3 flex flex-col space-y-4">
                        <Link
                            href={"/"}
                            className={
                                pathname === "/"
                                    ? "font-bold text-gray-100"
                                    : "text-gray-200"
                            }
                        >
                            Beranda
                        </Link>
                        <Link
                            href={"/sesi"}
                            className={
                                pathname === "/sesi"
                                    ? "font-bold text-gray-100"
                                    : "text-gray-200"
                            }
                        >
                            Mulai
                        </Link>
                        {authenticated ? (
                            <Link
                                href="/riwayat"
                                className={
                                    pathname === "/riwayat" ? "font-bold" : ""
                                }
                            >
                                Riwayat
                            </Link>
                        ) : (
                            <Link
                                href={"#"}
                                onClick={handleHistory}
                                className={
                                    pathname === "/riwayat" ? "font-bold" : ""
                                }
                            >
                                Riwayat
                            </Link>
                        )}
                        <div className="flex flex-row justify-evenly mt-4">
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
                                        className="py-2 px-4 rounded-lg bg-gray-50 text-violet-600 hover:bg-gray-200"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={"/register"}
                                        className="py-2 px-4 rounded-lg bg-violet-500 hover:bg-violet-700"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}
