"use client";

import { useEffect, useState } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import Riwayat from "../components/Riwayat";
import { getHistory } from "../utils/historyService";

export default function page() {
    const [history, setHistory] = useState([]);
    const [newAction, setNewAction] = useState("");
    const token = localStorage.getItem("token");

    // Fetch history saat halaman dimuat
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getHistory(token);
                setHistory(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [token]);

    return (
        <div className="min-h-screen bg-sesi">
            <Navbar />
            <div className="container mx-auto p-4 pt-6 mt-20">
                {/* {history.map((item) => (
                    <li key={item.id}>
                        <span>{item.action}</span>
                    </li>
                ))} */}
                <Riwayat />
            </div>
        </div>
    );
}
