"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import { registerSchema } from "../schema/schema";
import Swal from "sweetalert2";

export default function page() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            registerSchema.parse(formData);

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Failed to register user");
            }
            const newUser = await response.json();
            setData([...data, newUser]);
            setFormData({
                name: "",
                email: "",
                password: "",
            });
            Swal.fire("Register success!");
            router.push("/login");
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldsError = {};
                error.errors.forEach((error) => {
                    fieldsError[error.path[0]] = error.message;
                });
                setErrors(fieldsError);
            } else {
                Swal.fire({
                    title: "Failed to register",
                    text: error.message,
                    icon: "error",
                    timer: 3000,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: undefined,
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-utama">
            <div className="w-4/5 lg:w-full inset-4 lg:inset-0 max-w-md p-8 space-y-3 bg-white/20 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 dark:text-black"
                            placeholder="Enter your name"
                            autoComplete="off"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 dark:text-black"
                            placeholder="Enter your email address"
                            autoComplete="off"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email}
                            </p>
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 dark:text-black"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password}
                            </p>
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
                            "Sign up"
                        )}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-100">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-violet-500 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
