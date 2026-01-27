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
                        จัดการแผนกและตำแหน่ง
                    </h1>
                    <Bell size={30} />
                    
                </div>
            </div>
        </div>
    )
}