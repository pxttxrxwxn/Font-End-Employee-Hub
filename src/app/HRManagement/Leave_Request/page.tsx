"use client"

import React from "react"
import Sidebar from "@/app/components/SidebarHRManagement"
import { Bell, Plus, X, Minus, Trash2, CircleCheck, CircleX, Calendar, FileText } from "lucide-react"

export default function Leave_Request() {
    return (
        <div className="flex bg-white font-[Prompt] min-h-screen text-black">
            <Sidebar />
            <div className="flex flex-col m-[3%] w-3/4">
                <div className="flex w-full items-start justify-between">
                    <h1 className="text-3xl font-bold text-[#DF5E10] mb-10">
                        คำร้องขอลา
                    </h1>
                    <Bell size={30} />
                </div>
                <div className="flex w-full items-center justify-end mb-6">
                    <div
                        className="flex bg-[#134BA1] text-white px-4 py-2 rounded-xl text-xl items-center gap-1 cursor-pointer hover:bg-[#0f3a80] transition-colors"
                    >
                        <Plus />
                        ยื่นคำร้องขอลา
                    </div>
                </div>
                <div className="flex w-full items-end justify-start mb-6 text-2xl font-bold">
                    <FileText size={30} />รายการยื่นคำร้องขอลา
                </div>
            </div>
        </div>
    )
}