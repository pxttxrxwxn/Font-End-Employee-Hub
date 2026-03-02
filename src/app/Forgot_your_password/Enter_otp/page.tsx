"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { apiFetch } from '@/app/utils/api';
import { useRouter } from 'next/navigation';

export default function Enter_otp() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const router = useRouter();

    useEffect(() => {
        const storedEmail = localStorage.getItem("resetEmail");
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleRequestOTP = async () => {
        if (!email) return alert("ไม่พบอีเมลในระบบ");
        try {
            setIsLoading(true);
            await apiFetch('/api/auth/request-otp', {
                method: 'POST',
                body: JSON.stringify({ email }),
            });
            alert(`ส่ง OTP ไปยัง ${email} แล้ว!`);
        } catch (error) {
            const err = error as Error;
            alert(err.message || "เกิดข้อผิดพลาดในการขอ OTP");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        const otpCode = otp.join('');
        if (otpCode.length < 6) return alert("กรุณากรอก OTP ให้ครบ 6 หลัก");
        
        try {
            setIsLoading(true);
            await apiFetch('/api/auth/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ email, otp: otpCode }),
            });
            
            alert("ยืนยัน OTP สำเร็จ!");
            router.push('/Forgot_your_password/Reset_your_passsword');
            
        } catch (error) {
            const err = error as Error;
            alert(err.message || "OTP ไม่ถูกต้อง");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-between font-montserrat bg-white">
            <div className="flex flex-col items-left justify-center h-screen ml-[3%] mr-[3%]">
                <Image src="/images/LOGO Employee Hub-Photoroom 1.png" alt="Logo" width={704.29} height={606} />
            </div>
            <div className="bg-[#0D274E] h-screen w-[60%] flex flex-col items-right rounded-l-[50px]">
                <div className="flex flex-col items-center justify-center h-screen mr-[3%] ml-[3%] gap-[3em]">
                    <h1 className="text-6xl font-extrabold text-white font-[Montserrat]">Forgot password</h1>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-2xl font-medium text-white font-[Montserrat]">Enter the code that was sent to</h4>
                        <h4 className="text-2xl font-bold text-white font-[Montserrat]">{email || "Loading..."}</h4>
                    </div>
                
                    <h5 className="text-l  text-white font-[Montserrat]">Enter 6-digit Code  we have sand to you </h5>
                        <div className="w-[60%] flex flex-row items-center justify-between gap-2">
                            {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                className="w-12 h-15 bg-white rounded-lg text-black shadow-2xl text-center text-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={data}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => { inputRefs.current[index] = el; }}
                            />
                            ))}
                            <button
                                onClick={handleRequestOTP}
                                disabled={isLoading}
                                className="cursor-pointer w-fit px-3 h-12 bg-[#D87031] rounded-lg text-white hover:bg-[#81441e] transition-all duration-300 hover:scale-105 disabled:opacity-80 disabled:hover:scale-90"
                            >
                                รับรหัส OTP
                            </button>
                        </div>
                    <button
                        type="button"
                        onClick={handleVerifyOTP}
                        disabled={isLoading}
                        className="cursor-pointer w-fit px-16 bg-[#D87031] text-white py-3 rounded-full font-bold hover:bg-[#81441e] transition-all duration-300 hover:scale-105 text-3xl disabled:opacity-80 disabled:hover:scale-90 mt-10"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}