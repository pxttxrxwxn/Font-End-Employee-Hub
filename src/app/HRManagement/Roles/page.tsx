"use client"

import React, { useState, useEffect } from "react"
import Sidebar from "@/app/components/SidebarHRManagement"
import { Bell, Plus, X, Users, Trash2, Pen, Shield, Key } from "lucide-react"

interface Role {
    id: number;
    nameTH: string;
    nameEN: string;
    description: string;
    userCount: number;
    permissions: string[];
}

interface RoleFormData {
    nameEN: string;
    nameTH: string;
    description: string;
    permissions: string[];
}

const PERMISSIONS_LIST = [
    { id: 'manageUser', label: 'จัดการผู้ใช้', desc: 'เพิ่ม แก้ไข ลบผู้ใช้ในระบบ' },
    { id: 'viewHistory', label: 'ดูประวัติ', desc: 'ดูประวัติการทำงาน' },
    { id: 'manageDept', label: 'จัดการแผนก', desc: 'เพิ่ม แก้ไข ลบแผนกและตำแหน่ง' },
    { id: 'manageEmp', label: 'จัดการพนักงาน', desc: 'จัดการข้อมูลพนักงานทั้งหมด' },
    { id: 'editTime', label: 'แก้ไขเวลา', desc: 'แก้ไขเวลาเข้า - ออกงาน' },
    { id: 'approveLeave', label: 'อนุมัติการลา', desc: 'อนุมัติ/ปฏิเสธคำขอลา' },
    { id: 'timeEntry', label: 'ลงเวลา', desc: 'ลงเวลาเข้า - ออกงาน' },
    { id: 'viewProfile', label: 'ดูโปรไฟล์', desc: 'ดูโปรไฟล์ตัวเอง' },
    { id: 'requestLeave', label: 'ขอลา', desc: 'ยื่นคำขอลา' },
];

export default function Roles() {

    const [roles, setRoles] = useState<Role[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [editingId, setEditingId] = useState<number | null>(null);

    const [formData, setFormData] = useState<RoleFormData>({
        nameEN: "",
        nameTH: "",
        description: "",
        permissions: []
    });

useEffect(() => {
        const loadData = setTimeout(() => {
            const savedRoles = localStorage.getItem("hr_roles");
            if (savedRoles) {
                setRoles(JSON.parse(savedRoles));
            }
        }, 0);

        return () => clearTimeout(loadData);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePermissionToggle = (permId: string) => {
        setFormData(prev => {
            const isSelected = prev.permissions.includes(permId);
            if (isSelected) {
                return { ...prev, permissions: prev.permissions.filter(id => id !== permId) };
            } else {
                return { ...prev, permissions: [...prev.permissions, permId] };
            }
        });
    };

    const handleEdit = (role: Role) => {
        setEditingId(role.id);
        setFormData({
            nameEN: role.nameEN,
            nameTH: role.nameTH,
            description: role.description,
            permissions: role.permissions
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({ nameEN: "", nameTH: "", description: "", permissions: [] });
        setEditingId(null);
        setIsModalOpen(false);
    }

    const handleSubmit = () => {
        if (!formData.nameEN.trim() || !formData.nameTH.trim() || formData.permissions.length === 0) {
            alert("กรุณากรอกข้อมูล ชื่อบทบาท (TH/EN) และเลือกสิทธิ์อย่างน้อย 1 รายการ");
            return;
        }

        let updatedRoles: Role[];

        if (editingId !== null) {
            // กรณี: แก้ไขข้อมูลเดิม (Update)
            updatedRoles = roles.map(role =>
                role.id === editingId
                ? { ...role, ...formData }
                : role
            );
        } else {
            // กรณี: เพิ่มข้อมูลใหม่ (Create)
            const newRole: Role = {
                id: Date.now(),
                nameTH: formData.nameTH,
                nameEN: formData.nameEN,
                description: formData.description,
                userCount: 0,
                permissions: formData.permissions
            };
            updatedRoles = [...roles, newRole];
        }

        setRoles(updatedRoles);
        localStorage.setItem("hr_roles", JSON.stringify(updatedRoles)); 
        resetForm();
    };

    const handleDelete = (id: number) => {
        if (confirm("ต้องการลบบทบาทนี้ใช่หรือไม่?")) {
            const updatedRoles = roles.filter(r => r.id !== id);
            setRoles(updatedRoles);
            localStorage.setItem("hr_roles", JSON.stringify(updatedRoles));
        }
    };

    const getPermissionLabel = (id: string) => {
        const perm = PERMISSIONS_LIST.find(p => p.id === id);
        return perm ? perm.label : id;
    };

    return (
        <div className="flex bg-white font-[Prompt] min-h-screen text-black">
            <Sidebar />
            <div className="flex flex-col m-[3%] w-3/4 relative">

                <div className="flex w-full items-start justify-between">
                    <h1 className="text-3xl font-bold text-[#DF5E10] mb-10">
                        จัดการสิทธิ์ผู้ใช้งาน
                    </h1>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        <Bell size={30} className="text-[#6D6D6D] cursor-pointer" />
                    </button>
                </div>

                <div className="flex w-full items-center justify-end mb-6">
                    <div
                        onClick={() => {
                            setEditingId(null);
                            setFormData({ nameEN: "", nameTH: "", description: "", permissions: [] }); // Clear form
                            setIsModalOpen(true);
                        }}
                        className="flex bg-[#134BA1] text-white px-4 py-3 rounded-xl text-xl items-center gap-1 cursor-pointer hover:bg-[#0f3a80] transition-colors shadow-lg"
                    >
                        <Plus />
                        เพิ่มบทบาท
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
                    {roles.map((role) => (
                        <div key={role.id} className="bg-[#F8F9FA] rounded-xl p-6 relative shadow-sm border border-[#000000] flex flex-col h-full">
                            <div className="absolute top-4 right-4 flex gap-2 z-10">
                                <Pen
                                    size={18}
                                    onClick={() => handleEdit(role)}
                                    className="text-[#6D6D6D] cursor-pointer hover:text-blue-500"
                                />
                                <Trash2
                                    size={18}
                                    onClick={() => handleDelete(role.id)}
                                    className="text-[#D03E11] cursor-pointer hover:text-red-500"
                                />
                            </div>

                            <div className="flex items-start gap-4 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
                                <div className="p-1">
                                    <Shield size={40} className="text-black" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black">{role.nameTH}</h3>
                                    <p className="text-gray-500 text-sm">{role.nameEN}</p>
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm mb-4 min-h-10 line-clamp-2">
                                {role.description || "-"}
                            </p>

                            <div className="flex items-center gap-2 text-blue-600 mb-4 text-sm font-medium">
                                <Users size={18} />
                                <span className="text-black">{role.userCount} <span className="text-[#6D6D6D]">ผู้ใช้งาน</span></span>
                            </div>

                            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                                <span className="text-gray-400 text-xs flex items-center gap-1">
                                    <Key size={12} /> สิทธิ์การเข้าถึง
                                </span>
                                <div className="w-full flex flex-wrap gap-2 mt-1">
                                    {role.permissions.slice(0, 10).map((permId) => (
                                        <span key={permId} className="bg-[#1C3F78] text-white text-[10px] px-3 py-1 rounded-full">
                                            {getPermissionLabel(permId)}
                                        </span>
                                    ))}
                                    {role.permissions.length > 10 && (
                                        <span className="text-gray-500 text-[10px] px-2 py-1">+{role.permissions.length - 10}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center font-[Prompt]">
                    <div className="bg-[#F2EEEE] w-200 max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-8 relative animate-in fade-in zoom-in duration-200">
                        
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[#134BA1]">
                                {editingId ? "แก้ไขบทบาท" : "เพิ่มบทบาทใหม่"}
                            </h2>
                            <button onClick={resetForm} className="text-gray-500 hover:text-black">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-black mb-1">ชื่อบทบาท(EN) <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="nameEN"
                                        value={formData.nameEN}
                                        onChange={handleInputChange}
                                        placeholder="HR"
                                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-black mb-1">ชื่อบทบาท(TH) <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="nameTH"
                                        value={formData.nameTH}
                                        onChange={handleInputChange}
                                        placeholder="ฝ่ายบุคคล"
                                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black mb-1">คำอธิบาย</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="เขียนคำอธิบายเกี่ยวกับบทบาท..."
                                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-black mb-3">สิทธิการใช้งาน <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-2 gap-4">
                                    {PERMISSIONS_LIST.map((perm) => (
                                        <div 
                                            key={perm.id} 
                                            className="flex items-start gap-3 cursor-pointer group"
                                            onClick={() => handlePermissionToggle(perm.id)}
                                        >
                                            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                                                ${formData.permissions.includes(perm.id)
                                                    ? "bg-[#009951] border-[#009951]"
                                                    : "border-gray-400 bg-white group-hover:border-[#009951]"
                                                }`}
                                            >
                                                {formData.permissions.includes(perm.id) && (
                                                    <div className="w-2 h-2 bg-white rounded-full" />
                                                )}
                                            </div>
                                            
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-black">{perm.label}</span>
                                                <span className="text-xs text-gray-500">{perm.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={resetForm}
                                className="px-6 py-2 rounded-lg bg-gray-400 text-white font-medium hover:bg-gray-500 transition-colors"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 rounded-lg bg-[#DF5E10] text-white font-medium hover:bg-[#c4520e] transition-colors shadow-md"
                            >
                                {editingId ? "บันทึกแก้ไข" : "เพิ่มบทบาท"}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}