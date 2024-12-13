"use client";
import React, { useEffect, useState } from "react";

export default function page() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalHistory, setTotalHistory] = useState(0);

    useEffect(() => {
        fetchTotalUsers();
        fetchTotalHistory();
    }, []);

    const fetchTotalUsers = async () => {
        try {
            const response = await fetch("/api/users");
            const data = await response.json();
            setTotalUsers(data.length);
        } catch (error) {
            console.error("Error fetching total users:", error);
        }
    };

    const fetchTotalHistory = async () => {
        try {
            const response = await fetch("/api/admin/history");
            const data = await response.json();
            setTotalHistory(data.length);
        } catch (error) {
            console.error("Error fetching total history:", error);
        }
    };

    return (
        <div className="p-2 lg:p-8 flex flex-col">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="flex justify-between items-center space-x-4">
                <div className="p-4 bg-black/30 rounded-lg flex-1">
                    <h2 className="mb-3 text-lg">Total Users</h2>
                    <p className="text-lg font-bold">{totalUsers}</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg flex-1">
                    <h2 className="mb-3 text-lg">Total History</h2>
                    <p className="text-lg font-bold">{totalHistory}</p>
                </div>
            </div>
        </div>
    );
}
