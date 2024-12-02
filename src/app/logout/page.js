"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

export default async function LogoutPage() {
    await new Promise((resolve) => {
        setTimeout(resolve, 5000);
    });
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem("token"); // Hapus token dari localStorage
        router.push("/"); // Arahkan ke halaman login
    }, [router]);

    return (
        <div className="flex inset-0 bg-black/20">
            <Loading />
        </div>
    );
}
