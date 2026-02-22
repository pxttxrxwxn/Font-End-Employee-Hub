"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { API_URL } from "@/app/utils/api";

export default function Reset_your_passsword() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem("resetEmail");
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            alert("รหัสผ่านไม่ตรงกัน กรุณาลองใหม่อีกครั้ง");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), newPassword }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน");
            }

            alert("เปลี่ยนรหัสผ่านสำเร็จ!");
            localStorage.removeItem("resetEmail");
            router.push("/");
        } catch (error) {
            const err = error as Error;
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    const EyeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
    const EyeSlashIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
    );

    return (
        <div className="min-h-screen flex items-center justify-between font-montserrat bg-white">
            <div className="flex flex-col items-left justify-center h-screen ml-[3%] mr-[3%]">
                <Image src="/images/LOGO Employee Hub-Photoroom 1.png" alt="Logo" width={704.29} height={606} />
            </div>
            <div className="bg-[#0D274E] h-screen w-[60%] flex flex-col items-right rounded-l-[100px]">
                <div className="flex flex-col items-center justify-center h-screen mr-[3%] ml-[3%] gap-[3em]">
                    <h1 className="text-white text-6xl font-bold">Reset your Password</h1>

                    <form id="login-form" onSubmit={handleSubmit} className="min-w-3/4 mt-1 flex flex-col gap-6 w-[70%]">
                        <div className="w-full">
                            <label className="text-xl font-Kanit text-[#ffffff]">E-mail</label>
                            <div className="mt-1 w-full rounded-md border px-4 py-4 focus:outline-none text-black bg-white text-xl">
                                {email || "Loading..."}
                            </div>
                        </div>

                        <div className="w-full">
                            <label htmlFor="newPassword" className="text-xl font-Kanit text-[#ffffff]">Set New Password</label>
                            <div className="relative mt-1">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter New Password"
                                    required
                                    className="w-full rounded-md border px-4 py-4 pr-12 placeholder-[#D1D1D1] focus:outline-none text-black bg-white text-xl"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute inset-y-0 right-4 flex items-center"
                                >
                                    {showNewPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </div>

                        <div className="w-full">
                            <label htmlFor="confirmPassword" className="text-xl font-Kanit text-[#ffffff]">Confirm Password</label>
                            <div className="relative mt-1">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your Password"
                                    required
                                    className="w-full rounded-md border px-4 py-4 pr-12 placeholder-[#D1D1D1] focus:outline-none text-black bg-white text-xl"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-4 flex items-center"
                                >
                                    {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="flex items-center justify-center gap-4 w-full">
                        <Link href="/">
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
                            disabled={isLoading}
                            className="cursor-pointer w-fit px-10 bg-[#D87031] text-white py-3 rounded-xl font-bold hover:bg-[#81441e] transition-all duration-300 hover:scale-105 text-3xl disabled:opacity-80 disabled:hover:scale-90"
                        >
                            {isLoading ? "Saving..." : "Confirm"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}