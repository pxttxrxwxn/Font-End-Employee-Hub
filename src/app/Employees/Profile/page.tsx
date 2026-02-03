"use client"

import React, { useState, useEffect } from "react"
import Sidebar from "@/app/components/SidebarEmployees"
import { Mail, Phone, Building2, Calendar, Pencil, Bell } from "lucide-react"

export default function Profile() {
    const [isEdit, setIsEdit] = useState(false)

    const [profile, setProfile] = useState({
        firstName: "นภา",
        lastName: "สดใส",
        email: "napa@company.com",
        phone: "082-345-6789",
        address:
            "120/9 ม.กรีนพาร์ค ถ.รามคำแหง ซ.24 แขวงหัวหมาก เขตบางกะปิ กทม. 10240",
    })

    
    useEffect(() => {
        const saved = localStorage.getItem("employeeProfile")
        if (saved) {
            setProfile(JSON.parse(saved))
        }
    }, [])

    
    const handleSave = () => {
        localStorage.setItem("employeeProfile", JSON.stringify(profile))
        setIsEdit(false)
    }

    return (
        <div className="flex bg-white font-[Prompt] min-h-screen text-black">
            <Sidebar />

            <div className="flex flex-col m-[3%] w-3/4">
                <h1 className="text-3xl font-bold text-[#DF5E10] mb-10">
                    โปรไฟล์พนักงาน
                </h1>

                <button className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-100 mr-20 mt-14">
                    <Bell size={30} className="text-[#6D6D6D]" />
                </button>

                <div className="flex w-full gap-10">
                    {/* ================= ฝั่งซ้าย ================= */}
                    <div className="w-1/3 flex flex-col items-center">
                        <div className="mt-6 w-36 h-36 rounded-full bg-[#C2C2C2] flex items-center justify-center">
                            <p className="text-7xl text-white">น</p>
                        </div>

                        <p className="text-3xl font-semibold mt-4">
                            {profile.firstName} {profile.lastName}
                        </p>
                        <p className="text-lg mb-3 font-[Montserrat]">
                            System Analyst
                        </p>

                        <span className="px-4 py-1 text-sm rounded-full bg-green-100 text-green-600 mb-6">
                            Active
                        </span>

                        <div className="space-y-4 text-gray-500 w-full max-w-xs">
                            <div className="flex items-center gap-3">
                                <Mail size={20} />
                                <span>{profile.email}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone size={20} />
                                <span>{profile.phone}</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Building2 size={20} />
                                <span>System Analyst</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Calendar size={20} />
                                <span>เริ่มงาน 8 มกราคม 2564</span>
                            </div>
                        </div>
                    </div>

                    {/* ================= ฝั่งขวา ================= */}
                    <div className="w-2/3">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold">
                                ข้อมูลส่วนตัว
                            </h2>

                            {!isEdit && (
                                <button
                                    onClick={() => setIsEdit(true)}
                                    className="flex items-center gap-2 hover:text-[#DF5E10]"
                                >
                                    <Pencil size={18} />
                                    แก้ไข
                                </button>
                            )}
                        </div>

                        <p className="mb-8">
                            รหัสพนักงาน <span className="ml-2 font-medium">EH055</span>
                        </p>

                        {/* ข้อมูลส่วนตัว */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-1">ชื่อ</label>
                                <input
                                    value={profile.firstName}
                                    disabled={!isEdit}
                                    onChange={(e) =>
                                        setProfile({ ...profile, firstName: e.target.value })
                                    }
                                    className={`w-full border rounded-md px-4 py-2
                                        ${isEdit ? "border-gray-400" : "bg-gray-100 pointer-events-none"}`}
                                />
                            </div>

                            <div>
                                <label className="block mb-1">นามสกุล</label>
                                <input
                                    value={profile.lastName}
                                    disabled={!isEdit}
                                    onChange={(e) =>
                                        setProfile({ ...profile, lastName: e.target.value })
                                    }
                                    className={`w-full border rounded-md px-4 py-2
                                        ${isEdit ? "border-gray-400" : "bg-gray-100 pointer-events-none"}`}
                                />
                            </div>

                            <div>
                                <label className="block mb-1">อีเมล</label>
                                <input
                                    value={profile.email}
                                    disabled={!isEdit}
                                    onChange={(e) =>
                                        setProfile({ ...profile, email: e.target.value })
                                    }
                                    className={`w-full border rounded-md px-4 py-2
                                        ${isEdit ? "border-gray-400" : "bg-gray-100 pointer-events-none"}`}
                                />
                            </div>

                            <div>
                                <label className="block mb-1">เบอร์โทรศัพท์</label>
                                <input
                                    value={profile.phone}
                                    disabled={!isEdit}
                                    onChange={(e) =>
                                        setProfile({ ...profile, phone: e.target.value })
                                    }
                                    className={`w-full border rounded-md px-4 py-2
                                        ${isEdit ? "border-gray-400" : "bg-gray-100 pointer-events-none"}`}
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block mb-1">ที่อยู่</label>
                                <textarea
                                    rows={3}
                                    value={profile.address}
                                    disabled={!isEdit}
                                    onChange={(e) =>
                                        setProfile({ ...profile, address: e.target.value })
                                    }
                                    className={`w-full border rounded-md px-4 py-2
                                        ${isEdit ? "border-gray-400" : "bg-gray-100 pointer-events-none"}`}
                                />
                            </div>

                            <div>
                                <label className="block mb-1">แผนก</label>
                                <input
                                    value="Software Development"
                                    disabled
                                    className="w-full border rounded-md px-4 py-2 bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">ตำแหน่ง</label>
                                <input
                                    value="System Analyst"
                                    disabled
                                    className="w-full border rounded-md px-4 py-2 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {isEdit && (
                            <div className="flex justify-end gap-4 mt-10">
                                <button
                                    onClick={() => setIsEdit(false)}
                                    className="px-6 py-2 rounded-lg bg-gray-300"
                                >
                                    ยกเลิก
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2 rounded-lg bg-[#DF5E10] text-white"
                                >
                                    บันทึกการเปลี่ยนแปลง
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
