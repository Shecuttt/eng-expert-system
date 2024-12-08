"use client";

import { useEffect, useState } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime); // Enable relative time plugin

export default function page() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null; //IDK What's this fcking code for

    // Fetch history saat halaman dimuat
    useEffect(() => {
        fetchData();
        setLoading(false);
    }, [token]);
    async function fetchData() {
        try {
            const response = await fetch("/api/history", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            // console.log(data); // Debugging code
            setHistory(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen bg-sesi">
            <Navbar />
            <div className="flex justify-center items-center h-screen overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-screen">
                        <p>Loading...</p>
                    </div>
                ) : (
                    <table className="p-4 rounded bg-white/10 w-4/5 inset-x-4 block h-80 overflow-y-scroll">
                        <thead>
                            <tr>
                                <th className="p-3 ">No</th>
                                <th className="p-3 text-start">User ID</th>
                                <th className="p-3 text-start">Riwayat</th>
                                <th className="p-3 text-start">Created at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="p-3 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="p-3">{item.userId}</td>
                                    <td className="p-3 w-1/2">{item.action}</td>
                                    <td className="p-3">
                                        {dayjs(item.createdAt).fromNow()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {/* <Riwayat /> */}
            </div>
        </div>
    );
}
