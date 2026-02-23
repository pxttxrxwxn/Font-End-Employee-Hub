"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/app/components/SidebarEmployees"
import { Mail, Phone, Building2, Calendar, Pencil } from "lucide-react"
import { apiFetch } from "@/app/utils/api"

type Employee = {
    employeeCode: string
    firstName: string
    lastName: string
    email: string
    phone: string
    department: string
    position: string
    startDate: string
    role: string
    address: string
    activityStatus?: string
}

export default function Profile() {
    const router = useRouter()
    const [isEdit, setIsEdit] = useState(false)
    const [currentUser, setCurrentUser] = useState<Employee | null>(null)
    const [formData, setFormData] = useState<Partial<Employee>>({})
    const [activityStatus, setActivityStatus] = useState<string>("Inactive")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                router.push("/")
                return
            }

            try {
                const data: Employee = await apiFetch("/api/profile")
                
                setCurrentUser(data)
                setFormData(data)
                setActivityStatus(data.activityStatus ? data.activityStatus : "Inactive")

            } catch (err) {
                console.error("Error loading data:", err)
                localStorage.removeItem("token")
                router.push("/")
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSave = async () => {
        try {
            await apiFetch("/api/profile", {
                method: "PUT",
                body: JSON.stringify({
                    phone: formData.phone,
                    address: formData.address
                })
            })

            setCurrentUser(formData as Employee)
            setIsEdit(false)
            alert("บันทึกข้อมูลเรียบร้อยแล้ว")
        } catch (error) {
            console.error("Error saving data:", error)
            alert("บันทึกไม่สำเร็จ")
        }
    }

    const handleCancel = () => {
        if (currentUser) {
            setFormData(currentUser)
        }
        setIsEdit(false)
    }

    const getStatusColorClass = (status: string) => {
        const s = (status || '').toLowerCase()
        if (s === 'active') return 'bg-green-100 text-green-600'
        return 'bg-[#C2C2C2] text-[#6D6D6D]'
    }

    if (loading) return <div className="p-10">Loading Profile...</div>
    if (!currentUser) return <div className="p-10 text-red-500">Error loading profile. Please login again.</div>

    return (
        <div className="flex bg-white font-[Prompt] min-h-screen text-black">
            <Sidebar />

            <div className="flex flex-col m-[3%] w-3/4 ">
                <div className="flex w-full items-start justify-between">
                    <h1 className="text-3xl font-bold text-[#DF5E10] mb-10">
                        จัดการแผนกและตำแหน่ง
                    </h1>
                </div>

                <div className="flex w-full gap-10">
                    <div className="w-1/3 flex flex-col items-center">
                        <div className="mt-6 w-36 h-36 rounded-full bg-[#C2C2C2] flex items-center justify-center overflow-hidden">
                            <p className="text-7xl text-white">{currentUser.firstName ? currentUser.firstName.charAt(0) : "U"}</p>
                        </div>
                        <p className="text-3xl font-semibold mt-4">
                            {currentUser.firstName} {currentUser.lastName}
                        </p>
                        <p className="text-lg mb-3 font-[Montserrat]">
                            {currentUser.position}
                        </p>
                        <span className={`px-4 py-1 text-sm rounded-full mb-6 font-medium ${getStatusColorClass(activityStatus)}`}>
                            {activityStatus}
                        </span>
                        <div className="space-y-4 text-gray-500 w-full max-w-xs">
                            <div className="flex items-center gap-3">
                                <Mail size={20} />
                                <span className="truncate">{currentUser.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={20} />
                                <span>{currentUser.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Building2 size={20} />
                                <span>{currentUser.department}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar size={20} />
                                <span>เริ่มงาน {new Date(currentUser.startDate).toLocaleDateString('th-TH')}</span>
                            </div>
                        </div>
                    </div>
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
                            รหัสพนักงาน <span className="ml-2 font-medium">{currentUser.employeeCode}</span>
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-1">ชื่อ</label>
                                <input
                                    name="firstName"
                                    value={formData.firstName || ''}
                                    disabled={true}
                                    className="w-full border rounded-md px-4 py-2 bg-gray-100 text-gray-500 pointer-events-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">นามสกุล</label>
                                <input
                                    name="lastName"
                                    value={formData.lastName || ''}
                                    disabled={true}
                                    className="w-full border rounded-md px-4 py-2 bg-gray-100 text-gray-500 pointer-events-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">อีเมล</label>
                                <input
                                    name="email"
                                    value={formData.email || ''}
                                    disabled={true}
                                    className="w-full border rounded-md px-4 py-2 bg-gray-100 text-gray-500 pointer-events-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">เบอร์โทรศัพท์</label>
                                <input
                                    name="phone"
                                    value={formData.phone || ''}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                    className={`w-full border rounded-md px-4 py-2 
                                    ${!isEdit ? "bg-gray-100 text-gray-500" : "border-gray-400 bg-white text-black"}`}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block mb-1">ที่อยู่</label>
                                <textarea
                                    name="address"
                                    rows={3}
                                    value={formData.address || ''}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                    className={`w-full border rounded-md px-4 py-2 
                                    ${!isEdit ? "bg-gray-100 text-gray-500" : "border-gray-400 bg-white text-black"}`}
                                />
                            </div>
                            <div>
                                <label className="block mb-1">แผนก</label>
                                <input
                                    name="department"
                                    value={formData.department || ''}
                                    disabled={true}
                                    className="w-full border rounded-md px-4 py-2 bg-gray-100 text-gray-500 pointer-events-none"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">ตำแหน่ง</label>
                                <input
                                    name="position"
                                    value={formData.position || ''}
                                    disabled={true}
                                    className="w-full border rounded-md px-4 py-2 bg-gray-100 text-gray-500 pointer-events-none"
                                />
                            </div>
                        </div>

                        {isEdit && (
                            <div className="flex justify-end gap-4 mt-10">
                                <button
                                    onClick={handleCancel}
                                    className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                                >
                                    ยกเลิก
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2 rounded-lg bg-[#DF5E10] text-white hover:bg-[#c34e0b] transition"
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