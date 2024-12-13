"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const pathname = usePathname();
    const router = useRouter();

    const toggleLogout = () => {
        // Implement logout logic here
        confirm("Log out?");
        Cookies.remove("token");
        router.push("/");
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div
                className={` dark:text-white transition-all duration-300 flex flex-col justify-between ${
                    isSidebarOpen ? "w-auto lg:w-64" : "w-16"
                }`}
            >
                <div className="flex items-center justify-between p-4">
                    <h1
                        className={`text-lg font-bold ${
                            !isSidebarOpen && "hidden"
                        }`}
                    >
                        Admin
                    </h1>
                    <button
                        className="text-white focus:outline-none"
                        onClick={toggleSidebar}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    isSidebarOpen
                                        ? "M15 19l-7-7 7-7"
                                        : "M9 5l7 7-7 7"
                                }
                            />
                        </svg>
                    </button>
                </div>
                <nav className="mt-4 flex flex-col">
                    <ul>
                        <li
                            className={
                                pathname === "/admin"
                                    ? "px-4 py-2 bg-gray-700"
                                    : `px-4 py-2 hover:bg-gray-700`
                            }
                        >
                            <Link href={"/admin"} className="flex items-center">
                                <svg
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="dark:fill-white w-6 h-6"
                                >
                                    <path d="M21.146,8.576l-7.55-6.135c-0.925-0.751-2.267-0.751-3.192,0c0,0,0,0,0,0L2.855,8.575C2.59,8.79,2.439,9.108,2.439,9.448  v11.543c0,0.62,0.505,1.13,1.125,1.13h5.062c0.62,0,1.125-0.51,1.125-1.13v-7.306h4.499v7.306c0,0.62,0.505,1.13,1.125,1.13h5.062  c0.62,0,1.125-0.51,1.125-1.13V9.448C21.561,9.108,21.41,8.79,21.146,8.576z M20.436,20.997h-5.062V13.68  c0-0.62-0.505-1.119-1.125-1.119H9.75c-0.62,0-1.125,0.499-1.125,1.119v7.317H3.564V9.448l7.55-6.134  c0.513-0.418,1.26-0.417,1.773,0l7.55,6.134V20.997z" />
                                </svg>
                                <span
                                    className={`ml-3 ${
                                        !isSidebarOpen && "hidden"
                                    }`}
                                >
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li
                            className={
                                pathname === "/admin/user"
                                    ? "px-4 py-2 bg-gray-700"
                                    : `px-4 py-2 hover:bg-gray-700`
                            }
                        >
                            <Link
                                href={"/admin/user"}
                                className="flex items-center"
                            >
                                <svg
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="dark:fill-white w-6 h-6"
                                >
                                    <title />
                                    <g id="about">
                                        <path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z" />
                                        <path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z" />
                                    </g>
                                </svg>
                                <span
                                    className={`ml-3 ${
                                        !isSidebarOpen && "hidden"
                                    }`}
                                >
                                    User
                                </span>
                            </Link>
                        </li>
                        <li
                            className={
                                pathname === "/admin/history"
                                    ? "px-4 py-2 bg-gray-700"
                                    : `px-4 py-2 hover:bg-gray-700`
                            }
                        >
                            <Link
                                href={"/admin/history"}
                                className="flex items-center"
                            >
                                <svg
                                    fill="none"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 6C6 5.44772 6.44772 5 7 5H17C17.5523 5 18 5.44772 18 6C18 6.55228 17.5523 7 17 7H7C6.44771 7 6 6.55228 6 6Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M6 10C6 9.44771 6.44772 9 7 9H17C17.5523 9 18 9.44771 18 10C18 10.5523 17.5523 11 17 11H7C6.44771 11 6 10.5523 6 10Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44771 15 7 15H17C17.5523 15 18 14.5523 18 14C18 13.4477 17.5523 13 17 13H7Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M6 18C6 17.4477 6.44772 17 7 17H11C11.5523 17 12 17.4477 12 18C12 18.5523 11.5523 19 11 19H7C6.44772 19 6 18.5523 6 18Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        clipRule="evenodd"
                                        d="M2 4C2 2.34315 3.34315 1 5 1H19C20.6569 1 22 2.34315 22 4V20C22 21.6569 20.6569 23 19 23H5C3.34315 23 2 21.6569 2 20V4ZM5 3H19C19.5523 3 20 3.44771 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44771 3 5 3Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                    />
                                </svg>
                                <span
                                    className={`ml-3 ${
                                        !isSidebarOpen && "hidden"
                                    }`}
                                >
                                    History
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button
                    onClick={toggleLogout}
                    className="flex items-center px-4 py-2 mt-auto mb-4 hover:bg-gray-700 w-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7"
                        />
                    </svg>
                    <span className={`ml-3 ${!isSidebarOpen && "hidden"}`}>
                        Logout
                    </span>
                </button>
            </div>
            <div className="flex-1 overflow-auto p-1 lg:p-4 bg-white text-black">
                {children}
            </div>
        </div>
    );
}
