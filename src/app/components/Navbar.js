"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decode } from "jsonwebtoken";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function Navbar() {
    const [authenticated, setAuthenticated] = useState(false);
    const [openedNav, setOpenedNav] = useState(false);
    const [username, setUsername] = useState("");
    const [showLogoutButton, setShowLogoutButton] = useState(false);

    const router = useRouter();

    const pathname = usePathname();

    useEffect(() => {
        const token = Cookies.get("token"); // Ambil token dari cookie menggunakan js-cookie
        if (token) {
            try {
                const decoded = decode(token);
                if (decoded) {
                    setAuthenticated(true);
                    // console.log(JSON.stringify(decoded));
                    setUsername(decoded.name || "Pengguna"); // Ambil nama dari payload token
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
                Cookies.remove("token");
                setAuthenticated(false);
                setUsername("");
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
            <nav className="hidden top-10 p-3 rounded-full absolute shadow-md bg-white/5 backdrop-blur-md outline outline-white/10 lg:flex flex-row justify-between items-center w-4/5">
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
                <div className="flex items-center justify-end space-x-4">
                    {authenticated ? (
                        <div className="flex items-center">
                            <p className="mr-2">
                                Hai,{" "}
                                <span className="font-semibold capitalize">
                                    {username}
                                </span>
                            </p>
                            <div className="flex flex-col justify-center items-center">
                                <button
                                    onClick={() =>
                                        setShowLogoutButton(!showLogoutButton)
                                    }
                                    className="p-3 rounded-full bg-white/20"
                                >
                                    <svg
                                        className="w-4 h-4 fill-white"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                                    </svg>
                                </button>
                                {showLogoutButton && (
                                    <div className="absolute -z-10 bg-white text-black mt-24 px-4 py-2 rounded-md">
                                        <button
                                            onClick={handleLogout}
                                            className="py-2 px-4 hover:bg-gray-200 rounded"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
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
            <nav className="lg:hidden top-6 absolute z-10 rounded-lg w-5/6 shadow-sm p-4 bg-white/10 backdrop-blur-md flex flex-col outline outline-white/10">
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
                                    Logout as{" "}
                                    <span className="capitalize font-bold">
                                        {username}
                                    </span>
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
