"use client"

import React from 'react'
import Sidebar from '@/app/components/Sidebar'
import Image from 'next/image'

export default function Profile() {
    return (
        <div className="flex bg-white font-[Prompt]">
            <Sidebar />
            <div className="flex flex-col items-left justify-start h-auto m-[3%] w-3/4">
                <h1 className="text-3xl font-bold mb-4 text-[#DF5E10] font-[Prompt]">โปรไฟล์พนักงาน</h1>
                <div className="flex flex-row w-full mt-7">
                    <div className="w-1/3 flex items-center justify-center">
                        <div className="flex-row items-center justify-center">
                            <div className="w-35 h-35 rounded-full bg-[#C2C2C2] flex items-center justify-center">
                                <p className="text-7xl text-white">ส</p>
                            </div>
                            <div className="flex-row items-center justify-center">
                                <p className="text-3xl font-medium mb-4 text-[#000000]">สมชาย ใจดี</p>
                                <p className="text-xl mb-4 text-[#000000] font-[montserrat]">HR Manager</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3 flex-col ">
                    <p className="text-2xl font-bold mb-4 text-[#DF5E10] font-[Prompt]"> ข้อมูลพนักงาน</p>
                    </div>
                </div>
            </div>
        </div>
    )
}