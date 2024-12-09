"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Loading from "../components/Loading";
import Cookies from "js-cookie";

dayjs.extend(relativeTime);

export default function Page() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch history ketika halaman dimuat
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading ke true sebelum fetch
            try {
                const token = Cookies.get("token"); // Ambil token dari cookie
                if (!token) {
                    throw new Error("Token tidak ditemukan.");
                }

                const response = await fetch("/api/history", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Gagal memuat data riwayat.");
                }

                const data = await response.json();
                setHistory(data);
            } catch (error) {
                console.error("Error fetching history:", error.message);
                setHistory([]); // Reset riwayat jika terjadi error
            } finally {
                setLoading(false); // Pastikan loading dihentikan
            }
        };

        fetchData();
    }, []); // Efek dijalankan sekali ketika komponen dimuat

    return (
        <div className="min-h-screen bg-sesi">
            <Navbar />
            <div className="flex justify-center items-center h-screen overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-screen">
                        <Loading />
                    </div>
                ) : history.length === 0 ? (
                    <div className="text-white text-center">
                        <p>Data riwayat tidak ditemukan.</p>
                    </div>
                ) : (
                    <table className="p-2 lg:p-4 rounded bg-white/10 lg:w-4/5 mt-16 mx-2 lg:mx-0 text-sm lg:text-base block h-96 overflow-y-scroll">
                        <thead>
                            <tr>
                                <th className="p-1 lg:p-3">No</th>
                                <th className="p-1 lg:p-3 text-start">
                                    User ID
                                </th>
                                <th className="p-1 lg:p-3 text-start">
                                    Riwayat
                                </th>
                                <th className="p-1 lg:p-3 text-start">
                                    Created at
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="p-1 lg:p-3 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="p-1 lg:p-3">
                                        {item.userId}
                                    </td>
                                    <td className="p-1 lg:p-3 w-1/2">
                                        {item.action}
                                    </td>
                                    <td className="p-1 lg:p-3">
                                        {dayjs(item.createdAt).fromNow()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
