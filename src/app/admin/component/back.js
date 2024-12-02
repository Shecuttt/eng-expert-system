"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Back() {
    const router = useRouter();

    const handleBack = () => {
        localStorage.removeItem("token");
        router.push("/");
    };
    return (
        <button
            onClick={handleBack}
            className="hover:bg-white/25 py-2 rounded-md"
        >
            Back to home
        </button>
    );
}
