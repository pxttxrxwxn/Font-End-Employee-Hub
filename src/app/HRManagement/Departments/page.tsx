"use client"

import React, { useState } from "react"
import Sidebar from "@/app/components/Sidebar"
import { Bell, Plus, X } from "lucide-react"

export default function Departments() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex bg-white font-[Prompt] min-h-screen text-black relative">
            <Sidebar />
            <div className="flex flex-col m-[3%] w-3/4">
                <div className="flex w-full items-start justify-between">
                    <h1 className="text-3xl font-bold text-[#DF5E10] mb-10">
                        จัดการแผนกและตำแหน่ง
                    </h1>
                    <Bell size={30} />
                </div>

                <div className="flex w-full items-center justify-end ">
                    <div
                        onClick={() => setShowModal(true)}
                        className="flex bg-[#134BA1] text-white px-4 py-2 rounded-xl text-xl items-center gap-1 cursor-pointer hover:bg-[#0f3a80] transition-colors"
                    >
                        <Plus />
                        แผนกและตำแหน่ง
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
                        <div className="bg-[#F2EEEE] w-[50%] rounded-xl p-8 shadow-lg relative">
                            
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-6 right-6 text-gray-500 hover:text-black"
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-2xl font-bold text-[#1157C0] mb-4">เพิ่มแผนกใหม่</h2>
                            
                            <div className="grid grid-cols-2 gap-6 mb-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2">ชื่อแผนก(EN)</label>
                                    <input
                                        type="text"
                                        placeholder="Software Development"
                                        className="w-full p-2 rounded-md border-none focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">ชื่อแผนก(TH)</label>
                                    <input
                                        type="text"
                                        placeholder="แผนกพัฒนาระบบ"
                                        className="w-full p-2 rounded-md border-none focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2">คำอธิบาย</label>
                                <textarea
                                    placeholder="เขียนคำอธิบายเกี่ยวกับแผนก..."
                                    className="w-full p-2 rounded-md border-none h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                ></textarea>
                            </div>

                            <h2 className="text-2xl font-bold text-[#134BA1] mb-4">เพิ่มตำแหน่งใหม่</h2>
                            
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-bold mb-2">ชื่อตำแหน่ง(EN)</label>
                                    <div className="w-full p-2 rounded-md border-none focus:ring-2 focus:ring-blue-500 outline-none bg-white">Software Development Manager</div>
                                    <button className="w-full mt-2 bg-white hover:bg-gray-100 text-gray-500 p-2 rounded-md flex justify-center items-center transition-colors">
                                        <Plus size={20} />
                                    </button>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">ชื่อตำแหน่ง(TH)</label>
                                    <div className="w-full p-2 rounded-md border-none focus:ring-2 focus:ring-blue-500 outline-none bg-white">ผู้จัดการแผนกพัฒนาระบบ</div>
                                    <button className="w-full mt-2 bg-white hover:bg-gray-100 text-gray-500 p-2 rounded-md flex justify-center items-center transition-colors">
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 mt-8">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2 bg-[#C4C4C4] text-white rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    ยกเลิก
                                </button>
                                <button className="px-6 py-2 bg-[#DF5E10] text-white rounded-md hover:bg-[#c5520d] transition-colors">
                                    เพิ่มแผนก
                                </button>
                            </div>

                        </div>
                    </div>
                )}
        </div>
    </div>
    )
}