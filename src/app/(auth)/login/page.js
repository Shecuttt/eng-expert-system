"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import { loginSchema } from "../schema/schema";
import Swal from "sweetalert2";

export default function page() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorValidation, setErrorValidation] = useState({});

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            loginSchema.parse(formData);
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to login");
            }

            localStorage.setItem("token", data.token); // set the token
            if (data.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
            Swal.fire({
                title: "Welcome!",
                text: "Login sukses!",
                icon: "success",
                confirmButtonText: "Oke",
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldsError = {};
                error.errors.forEach((error) => {
                    fieldsError[error.path[0]] = error.message;
                });
                setErrorValidation(fieldsError);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Oke",
                });
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });

        setErrorValidation((prevErrors) => ({
            ...prevErrors,
            [e.target.id]: undefined,
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-utama">
            <div className="lg:w-full inset-4 lg:inset-0 max-w-md p-8 space-y-3 bg-white/20 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 dark:text-black"
                            placeholder="Enter your email"
                            autoComplete="off"
                        />
                        {errorValidation.email && (
                            <div className="text-red-600 text-xs">
                                {errorValidation.email}
                            </div>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 dark:text-black"
                            placeholder="Enter your password"
                        />
                        {errorValidation.password && (
                            <div className="text-red-600 text-xs">
                                {errorValidation.password}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-2 text-white bg-violet-600 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 mx-auto text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V4C5.373 4 4 5.373 4 7v4zm8 8a8 8 0 018 8v4c0-1.627-1.373-3-3-3h-4zm8-8a8 8 0 018-8v4c0 1.627-1.373 3-3 3h-4zm-8 8a8 8 0 018 8v4c0-1.627-1.373-3-3-3h-4z"
                                ></path>
                            </svg>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-100">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="text-violet-500 hover:underline"
                    >
                        Register
                    </Link>
                </p>
                {error && (
                    <div className="text-red-600 text-center">{error}</div>
                )}
            </div>
        </div>
    );
}
