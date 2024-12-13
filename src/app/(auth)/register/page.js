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
    const [showPassword, setShowPassword] = useState(false);
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

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
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
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-500 dark:text-black"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2 p-1"
                                onClick={handleShowPassword}
                            >
                                {showPassword ? (
                                    <svg
                                        width="24"
                                        height="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    >
                                        <path d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z" />
                                    </svg>
                                ) : (
                                    <svg
                                        width="24"
                                        height="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    >
                                        <path d="M8.137 15.147c-.71-.857-1.146-1.947-1.146-3.147 0-2.76 2.241-5 5-5 1.201 0 2.291.435 3.148 1.145l1.897-1.897c-1.441-.738-3.122-1.248-5.035-1.248-6.115 0-10.025 5.355-10.842 6.584.529.834 2.379 3.527 5.113 5.428l1.865-1.865zm6.294-6.294c-.673-.53-1.515-.853-2.44-.853-2.207 0-4 1.792-4 4 0 .923.324 1.765.854 2.439l5.586-5.586zm7.56-6.146l-19.292 19.293-.708-.707 3.548-3.548c-2.298-1.612-4.234-3.885-5.548-6.169 2.418-4.103 6.943-7.576 12.01-7.576 2.065 0 4.021.566 5.782 1.501l3.501-3.501.707.707zm-2.465 3.879l-.734.734c2.236 1.619 3.628 3.604 4.061 4.274-.739 1.303-4.546 7.406-10.852 7.406-1.425 0-2.749-.368-3.951-.938l-.748.748c1.475.742 3.057 1.19 4.699 1.19 5.274 0 9.758-4.006 11.999-8.436-1.087-1.891-2.63-3.637-4.474-4.978zm-3.535 5.414c0-.554-.113-1.082-.317-1.562l.734-.734c.361.69.583 1.464.583 2.296 0 2.759-2.24 5-5 5-.832 0-1.604-.223-2.295-.583l.734-.735c.48.204 1.007.318 1.561.318 2.208 0 4-1.792 4-4z" />
                                    </svg>
                                )}
                            </button>
                        </div>
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
