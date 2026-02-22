"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/utils/api";

export default function Forgot_password() {
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const res = await fetch(`${API_URL}/api/auth/check-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                localStorage.setItem("resetEmail", email);
                router.push("/Forgot_your_password/Enter_otp");
            } else {
                const data = await res.json();
                setErrorMsg(data.error || "ไม่พบอีเมลนี้ในระบบ");
            }
        } catch {
            setErrorMsg("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-between font-montserrat bg-white">
            <div className="flex flex-col items-left justify-center h-screen ml-[3%] mr-[3%]">
                <Image src="/images/LOGO Employee Hub-Photoroom 1.png" alt="Logo" width={704.29} height={606} />
            </div>
            <div className="bg-[#0D274E] h-screen w-[60%] flex flex-col items-right rounded-l-[100px]">
                <div className="flex flex-col items-center justify-center h-screen mr-[3%] ml-[3%] gap-[3em]">
                    <h1 className="text-white text-6xl font-bold mb-4">Reset your Password</h1>
                    
                    <form id="login-form" onSubmit={handleSubmit} className="min-w-3/4 mt-6 flex flex-col gap-6">
                        <div className="w-full">
                            <label htmlFor="email" className="text-xl font-Kanit text-[#ffffff]">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your registered email address" 
                                required
                                className="mt-1 w-full rounded-md border px-4 py-4 placeholder-[#D1D1D1] focus:outline-none text-black bg-white text-xl" 
                            />
                            {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
                        </div>
                    </form>
    
                    <div className="flex items-center justify-center gap-4 w-full">
                        <Link href="/" >
                            <button
                                type="button"
                                className="cursor-pointer w-fit px-10 bg-[#757575] text-white py-3 rounded-xl font-bold hover:bg-[#4d4d4d] transition-all duration-300 hover:scale-105 text-3xl disabled:opacity-80 disabled:hover:scale-90"
                            >
                                Cancel
                            </button>
                        </Link>
                        <button
                            type="submit"
                            form="login-form"
                            className="cursor-pointer w-fit px-10 bg-[#D87031] text-white py-3 rounded-xl font-bold hover:bg-[#81441e] transition-all duration-300 hover:scale-105 text-3xl disabled:opacity-80 disabled:hover:scale-90"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}