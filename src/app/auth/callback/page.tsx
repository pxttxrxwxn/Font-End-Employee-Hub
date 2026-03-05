"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        const userStr = searchParams.get("user");
        const error = searchParams.get("error");

        if (error) {
            let errorMsg = "Login Failed";
            if (error === 'unauthorized_email') errorMsg = "This email is not registered in our system.";
            
            alert(errorMsg);
            router.push("/");
            return;
        }

        if (token && userStr) {
            try {
                const user = JSON.parse(decodeURIComponent(userStr));
                
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; Secure; SameSite=Strict`;
                if (user.role?.name_en === "HR Management") {
                    router.replace("/HRManagement/Profile");
                } else if (user.role?.name_en === "Employee") {
                    router.replace("/Employees/Profile");
                } else {
                    router.replace("/Employees/Profile");
                }
            } catch (e) {
                console.error("Error parsing user data", e);
                router.push("/");
            }
        }
    }, [router, searchParams]);

    return (
        <div className="h-screen flex items-center justify-center bg-white flex-col gap-4">
            <div className="w-12 h-12 border-4 border-[#0D274E] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl text-[#0D274E] font-bold">Verifying your account...</p>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <AuthCallbackContent />
        </Suspense>
    );
}