"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime); // Enable relative time plugin

export default function page() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    async function fetchHistory() {
        const response = await fetch("/api/admin/history");
        if (response.ok) {
            setHistory(await response.json());
        } else {
            console.error("Failed to fetch history");
        }
    }
    return (
        <div className="p-8 flex flex-col space-y-6">
            <h1 className="text-2xl">History</h1>
            {history.length > 0 ? (
                <table className="mt-4">
                    <thead className="bg-gray-900">
                        <tr>
                            <th className="py-2 px-3">ID</th>
                            <th className="py-2 px-3">ID User</th>
                            <th className="py-2 px-3">Action</th>
                            <th className="py-2 px-3">Created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item) => (
                            <tr key={item.id}>
                                <td className="py-2 px-3 w-1/12">{item.id}</td>
                                <td className="py-2 px-3 w-1/12">
                                    {item.userId}
                                </td>
                                <td className="py-2 px-3">{item.action}</td>
                                <td className="py-2 px-3 w-2/12">
                                    {dayjs(item.createdAt).fromNow()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-400">No history found.</p>
            )}
        </div>
    );
}
