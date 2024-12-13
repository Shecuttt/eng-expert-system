"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import Swal from "sweetalert2";

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

    async function deleteHistory(id) {
        try {
            const response = await fetch(`../api/admin/history/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                Swal.fire("Failed to delete history");
                throw new Error("Failed to delete history");
            }
            Swal.fire("History deleted successfully");
            const updatedHistory = history.filter((item) => item.id !== id);
            setHistory(updatedHistory);
        } catch (error) {
            Swal.fire("Failed to delete history");
            console.error("Error deleting history:", error);
            throw error;
        }
    }

    return (
        <div className="p-2 lg:p-8 flex flex-col space-y-6 overflow-y-scroll">
            <h1 className="text-2xl font-bold">History</h1>
            {history.length > 0 ? (
                <table className="mt-4 text-xs lg:text-base">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-3">No</th>
                            <th className="py-2 px-3">ID User</th>
                            <th className="py-2 px-3">Action</th>
                            <th className="py-2 px-3">Created at</th>
                            <th className="py-2 px-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr
                                key={item.id}
                                className="even:bg-gray-200 odd:bg-inherit"
                            >
                                <td className="py-2 px-3 w-1/12">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-3 w-1/12">
                                    {item.userId}
                                </td>
                                <td className="py-2 px-3">{item.action}</td>
                                <td className="py-2 px-3 w-2/12">
                                    {dayjs(item.createdAt).fromNow()}
                                </td>
                                <td className="py-2 px-3 w-1/12">
                                    <button
                                        className="p-1 lg:p-2 text-xs lg:text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
                                        onClick={() => deleteHistory(item.id)}
                                    >
                                        Delete
                                    </button>
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
