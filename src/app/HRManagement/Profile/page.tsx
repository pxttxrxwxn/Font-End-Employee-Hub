"use client"

import React from 'react'
import Sidebar from '@/app/components/Sidebar'
export default function Profile() {
    return (
        <div className="flex bg-white">
            <Sidebar />
            <div className="flex flex-col items-left justify-start h-auto m-[3%] w-3/4">
                <h1 className="text-3xl font-bold mb-4 text-[#DF5E10] font-[Prompt]">โปรไฟล์พนักงาน</h1>
            </div>
        </div>
    )
}