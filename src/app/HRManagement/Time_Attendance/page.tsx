"use client"

import React, { useState } from "react"
import Sidebar from "@/app/components/Sidebar"
import { Mail, Phone, Building2, Calendar, Pencil } from "lucide-react"
import Image from 'next/image'

export default function Time_Attendance() {
    return (
        <div className="flex bg-white font-[Prompt] min-h-screen text-black">
            <Sidebar />

            <div className="flex flex-col m-[3%] w-3/4">
                {/* ลงเวลาทำงานของฉัน */}
                <h1 className="text-3xl font-bold text-[#DF5E10] mb-10">
                    ลงเวลาทำงานของฉัน
                </h1>
            </div>
        </div>
    )
}