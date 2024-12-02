import React from "react";
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";

export default function page() {
    return (
        <div className="min-h-screen bg-utama">
            <Navbar />
            <div className="flex items-center justify-center h-screen">
                <Welcome />
            </div>
        </div>
    );
}
