import Link from "next/link";
import React from "react";
import Back from "./component/back";

export default function layout({ children }) {
    return (
        <div className="flex flex-row min-h-screen">
            <div className="w-1/5 shadow-md shadow-current">
                <div className="flex flex-col p-10">
                    <h1 className="text-xl text-center mb-8">Uwiwiw</h1>
                    <div className="flex flex-col space-y-4 w-full">
                        <Link href={"/admin"} className="hover:font-semibold">
                            Dashboard
                        </Link>
                        <Link
                            href={"/admin/user"}
                            className="hover:font-semibold"
                        >
                            User
                        </Link>
                        <Link
                            href={"/admin/history"}
                            className="hover:font-semibold"
                        >
                            History
                        </Link>

                        <Back />
                    </div>
                </div>
            </div>
            <div className="flex-1">{children}</div>
        </div>
    );
}
