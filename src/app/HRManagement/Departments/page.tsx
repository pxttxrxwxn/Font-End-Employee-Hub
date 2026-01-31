"use client"

import React, { useState, useEffect, ChangeEvent } from "react"
import Sidebar from "@/app/components/SidebarHRManagement"
import { Bell, Plus, X, Minus, Trello, Users, Trash2, Pen, Briefcase, AlertTriangle } from "lucide-react"

interface Position {
    en: string;
    th: string;
}

interface Department {
    id: number;
    deptEn: string;
    deptTh: string;
    description: string;
    positions: Position[];
    memberCount: number;
}

interface EmployeeRecord {
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
}

export default function Departments() {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [deptEn, setDeptEn] = useState("");
    const [deptTh, setDeptTh] = useState("");
    const [description, setDescription] = useState("");
    const [positions, setPositions] = useState<Position[]>([
        { en: "Software Development Manager", th: "ผู้จัดการแผนกพัฒนาระบบ" }
    ]);
    const [departmentList, setDepartmentList] = useState<Department[]>([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedDept, setSelectedDept] = useState<Department | null>(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => {
        const loadData = () => {
            try {
                const savedDepts = localStorage.getItem("my_departments");
                const savedEmployees = localStorage.getItem("employees_data");

                if (savedDepts) {
                    let deptList: Department[] = JSON.parse(savedDepts);

                    if (savedEmployees) {
                        const employees: EmployeeRecord[] = JSON.parse(savedEmployees);

                        deptList = deptList.map(dept => {
                            const count = employees.filter(emp =>
                                emp.department === dept.deptEn || emp.department === dept.deptTh
                            ).length;

                            return { ...dept, memberCount: count };
                        });
                    }

                    setDepartmentList(deptList);
                }
            } catch (error) {
                console.error("Failed to load data:", error);
            }
        };

        loadData();
        
        window.addEventListener('focus', loadData);
        return () => window.removeEventListener('focus', loadData);
    }, []);

    const handleCloseModal = () => {
        setDeptEn("");
        setDeptTh("");
        setDescription("");
        setPositions([
            { en: "Software Development Manager", th: "ผู้จัดการแผนกพัฒนาระบบ" }
        ]);
        setIsEditing(false);
        setEditId(null);
        setShowModal(false);
    };

    const handleEdit = (dept: Department) => {
        setIsEditing(true);
        setEditId(dept.id);
        setDeptEn(dept.deptEn);
        setDeptTh(dept.deptTh);
        setDescription(dept.description);
        setPositions(dept.positions.map(p => ({ ...p })));
        setShowModal(true);
    };

    const handleSubmit = () => {
        if (isEditing && editId !== null) {
            const updatedList = departmentList.map((dept) => {
                if (dept.id === editId) {
                    return { ...dept, deptEn, deptTh, description, positions };
                }
                return dept;
            });
            setDepartmentList(updatedList);
            localStorage.setItem("my_departments", JSON.stringify(updatedList));
        } else {
            const newDepartment: Department = {
                id: Date.now(),
                deptEn,
                deptTh,
                description,
                positions,
                memberCount: 0
            };
            const updatedList = [...departmentList, newDepartment];
            setDepartmentList(updatedList);
            localStorage.setItem("my_departments", JSON.stringify(updatedList));
        }
        handleCloseModal();
    };

    const handleDeleteClick = (id: number) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deleteId !== null) {
            const updatedList = departmentList.filter(dept => dept.id !== deleteId);
            setDepartmentList(updatedList);
            localStorage.setItem("my_departments", JSON.stringify(updatedList));
            
            setShowDeleteModal(false);
            setDeleteId(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    const addNewRow = () => {
        setPositions([...positions, { en: "", th: "" }]);
    };

    const removeRow = (index: number) => {
        const list = [...positions];
        list.splice(index, 1);
        setPositions(list);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number, field: keyof Position) => {
        const { value } = e.target;
        const list = [...positions];
        list[index][field] = value;
        setPositions(list);
    };

    const handleOpenDetail = (dept: Department) => {
        setSelectedDept(dept);
        setShowDetailModal(true);
    };

    return (
        <div className="flex bg-white font-[Prompt] min-h-screen text-black relative">
            <Sidebar />
            <div className="flex flex-col m-[3%] w-3/4">
                <div className="flex w-full items-start justify-between">
                    <h1 className="text-3xl font-bold text-[#DF5E10] mb-10">
                        จัดการแผนกและตำแหน่ง
                    </h1>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        <Bell size={30} className="text-[#6D6D6D] cursor-pointer" />
                    </button>
                </div>

                <div className="flex w-full items-center justify-end mb-6">
                    <div
                        onClick={() => setShowModal(true)}
                        className="flex bg-[#134BA1] text-white p-4 rounded-xl text-xl items-center gap-1 cursor-pointer hover:bg-[#0f3a80] transition-colors"
                    >
                        <Plus />
                        แผนกและตำแหน่ง
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
                    {departmentList.map((dept) => (
                        <div key={dept.id} className="bg-[#F8F9FA] rounded-xl p-6 relative shadow-sm border border-gray-100">

                            <div className="absolute top-4 right-4 flex gap-2 z-10">
                                <Pen
                                    size={18}
                                    className="text-[#6D6D6D] cursor-pointer hover:text-blue-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(dept);
                                    }}
                                />
                                <Trash2
                                    size={18}
                                    className="text-[#D03E11] cursor-pointer hover:text-red-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteClick(dept.id);
                                    }}
                                />
                            </div>

                            <div
                                className="flex items-start gap-4 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => handleOpenDetail(dept)}
                            >
                                <div className="p-1">
                                    <Trello size={40} className="text-black" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-black">{dept.deptTh}</h3>
                                    <p className="text-gray-500 text-sm">{dept.deptEn}</p>
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm mb-4 min-h-10 line-clamp-2">
                                {dept.description || "ไม่มีคำอธิบายระบุไว้"}
                            </p>

                            <div className="flex items-center gap-2 text-blue-600 mb-4 text-sm font-medium">
                                <Users size={18} />
                                <span className="text-black">{dept.memberCount} <span className="text-[#6D6D6D]">ผู้ใช้งาน</span></span>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                                <span className="text-gray-400 text-xs flex items-center gap-1">
                                    <Briefcase size={20} className="text-[#757575]" /> ตำแหน่งในแผนก
                                </span>
                                <div className="w-full flex flex-wrap gap-2 mt-1">
                                    {dept.positions.map((pos, idx) => (
                                        (pos.en || pos.th) && (
                                            <span key={idx} className="bg-[#1C3F78] text-white text-[10px] px-3 py-1 rounded-full">
                                                {pos.en || pos.th}
                                            </span>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
                        <div className="bg-[#F2EEEE] w-[50%] rounded-xl p-8 shadow-lg relative max-h-[90vh] overflow-y-auto">
                            <button onClick={handleCloseModal} className="absolute top-6 right-6 text-gray-500 hover:text-black">
                                <X size={24} />
                            </button>
                            <h2 className="text-2xl font-bold text-[#1157C0] mb-4">
                                {isEditing ? "แก้ไขแผนกและตำแหน่ง" : "เพิ่มแผนกใหม่"}
                            </h2>

                            <div className="grid grid-cols-2 gap-6 mb-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2">ชื่อแผนก(EN)</label>
                                    <input type="text" value={deptEn} onChange={(e) => setDeptEn(e.target.value)} placeholder="Software Development" className="w-full p-2 rounded-md border-none focus:ring-2 focus:ring-blue-500 outline-none bg-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">ชื่อแผนก(TH)</label>
                                    <input type="text" value={deptTh} onChange={(e) => setDeptTh(e.target.value)} placeholder="แผนกพัฒนาระบบ" className="w-full p-2 rounded-md border-none focus:ring-2 focus:ring-blue-500 outline-none bg-white" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2">คำอธิบาย</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="เขียนคำอธิบาย..." className="w-full p-2 rounded-md border-none h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none bg-white"></textarea>
                            </div>
                            <h2 className="text-2xl font-bold text-[#1157C0] mb-4">{isEditing ? "แก้ไขตำแหน่ง" : "เพิ่มตำแหน่งใหม่"}</h2>
                            <div className="grid grid-cols-2 gap-6 mb-2">
                                <label className="block text-sm font-bold">ชื่อตำแหน่ง(EN)</label>
                                <label className="block text-sm font-bold">ชื่อตำแหน่ง(TH)</label>
                            </div>
                            {positions.map((item, index) => (
                                <div key={index} className="grid grid-cols-2 gap-6 mb-3 items-center">
                                    <input type="text" value={item.en} onChange={(e) => handleInputChange(e, index, 'en')} className="w-full p-2 rounded-md border-none focus:ring-2 focus:ring-blue-500 outline-none bg-white" />
                                    <div className="flex items-center gap-2">
                                        <input type="text" value={item.th} onChange={(e) => handleInputChange(e, index, 'th')} className="w-full p-2 rounded-md border-none focus:ring-2 focus:ring-blue-500 outline-none bg-white" />
                                        {(positions.length > 1 || (positions.length === 1 && (item.en !== "" || item.th !== ""))) && (
                                            <button onClick={() => removeRow(index)} className="bg-[#D03E11] text-white p-1 rounded hover:bg-red-700 transition-colors shrink-0">
                                                <Minus size={16} strokeWidth={4} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="grid grid-cols-2 gap-6 mb-8 mt-4">
                                <button onClick={addNewRow} className="w-full bg-white hover:bg-gray-100 text-gray-500 p-2 rounded-md flex justify-center items-center transition-colors shadow-sm"><Plus size={20} /></button>
                                <button onClick={addNewRow} className="w-full bg-white hover:bg-gray-100 text-gray-500 p-2 rounded-md flex justify-center items-center transition-colors shadow-sm"><Plus size={20} /></button>
                            </div>
                            <div className="flex justify-end gap-4 mt-8">
                                <button onClick={handleCloseModal} className="px-6 py-2 bg-[#C2C2C2] text-white rounded-md hover:bg-gray-400 transition-colors">ยกเลิก</button>
                                <button onClick={handleSubmit} className="px-6 py-2 bg-[#D87031] text-white rounded-md hover:bg-[#c5520d] transition-colors">{isEditing ? "บันทึกการเปลี่ยนแปลง" : "เพิ่มแผนก"}</button>
                            </div>
                        </div>
                    </div>
                )}

                {showDetailModal && selectedDept && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
                        <div className="bg-[#F2EEEE] w-[50%] rounded-xl p-8 shadow-lg relative max-h-[90vh] overflow-y-auto">

                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="absolute top-6 right-6 text-gray-500 hover:text-black"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-2xl font-bold text-[#1157C0] mb-8">
                                รายละเอียดแผนกและตำแหน่ง
                            </h2>

                            <div className="grid grid-cols-2 gap-6 mb-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2">ชื่อแผนก(EN)</label>
                                    <div className="w-full p-3 rounded-md bg-white text-gray-700 min-h-11">
                                        {selectedDept.deptEn}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">ชื่อแผนก(TH)</label>
                                    <div className="w-full p-3 rounded-md bg-white text-gray-700 min-h-11">
                                        {selectedDept.deptTh}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-bold mb-2">คำอธิบาย</label>
                                <div className="w-full p-3 rounded-md bg-white text-gray-700 min-h-20">
                                    {selectedDept.description || "-"}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-2">
                                <label className="block text-sm font-bold">ชื่อตำแหน่ง(EN)</label>
                                <label className="block text-sm font-bold">ชื่อตำแหน่ง(TH)</label>
                            </div>

                            {selectedDept.positions.map((pos, idx) => (
                                <div key={idx} className="grid grid-cols-2 gap-6 mb-3">
                                    <div className="w-full p-3 rounded-md bg-white text-gray-700 min-h-11">
                                        {pos.en}
                                    </div>
                                    <div className="w-full p-3 rounded-md bg-white text-gray-700 min-h-11">
                                        {pos.th}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {showDeleteModal && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center bg-opacity-40 bg-black/50">
                        <div className="bg-white w-100 rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                            
                            <div className="flex flex-col items-center text-center">
                                <div className="bg-red-100 p-3 rounded-full mb-4">
                                    <AlertTriangle size={40} className="text-[#D03E11]" />
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    ยืนยันการลบแผนก?
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    คุณแน่ใจหรือไม่ที่จะลบแผนกนี้? <br/>
                                    การกระทำนี้ไม่สามารถย้อนกลับได้
                                </p>

                                <div className="flex gap-3 w-full">
                                    <button 
                                        onClick={cancelDelete}
                                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="flex-1 px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                    >
                                        ยืนยันการลบ
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}