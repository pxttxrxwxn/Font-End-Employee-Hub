"use client"

import React, { useState, useEffect } from "react"
import Sidebar from "@/app/components/SidebarHRManagement"
import { Plus, X, Trash2, CircleCheck, CircleX, FileText, AlertTriangle, Calendar } from "lucide-react"
import { apiFetch } from "@/app/utils/api"
import Image from "next/image"

interface LeaveRequest {
    id: number;
    type: string;
    startDate: string;
    endDate: string;
    reason: string;
    file: string | null;
    status: string;
    employeeName: string;
}

export default function Leave_Request() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [leaveHistory, setLeaveHistory] = useState<LeaveRequest[]>([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [refreshKey, setRefreshKey] = useState(0)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null)

    const initialFormState = {
        type: "",
        startDate: "",
        endDate: "",
        reason: "",
        file: null as string | null
    }

    const [formData, setFormData] = useState(initialFormState)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiFetch('/api/leave-requests');
                const sortedData = data.sort((a: LeaveRequest, b: LeaveRequest) => b.id - a.id);
                setLeaveHistory(sortedData);
            } catch (error) {
                console.error("Failed to fetch leave requests:", error);
            }
        };

        fetchData();
    }, [refreshKey]);

    const reloadData = () => setRefreshKey(prev => prev + 1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        
        if (name === "startDate") {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                endDate: (prev.endDate && value > prev.endDate) ? "" : prev.endDate
            }))
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData({ ...formData, file: reader.result as string })
            }
            reader.readAsDataURL(file)
        }
    }
    const PUBLIC_HOLIDAYS = [
        "2026-01-01",
        "2026-01-02",
        "2026-03-03",
        "2026-04-06",
        "2026-04-13",
        "2026-04-14",
        "2026-04-15",
        "2026-05-01",
        "2026-05-04",
        "2026-06-01",
        "2026-06-03",
        "2026-07-28",
        "2026-07-29",
        "2026-08-12",
        "2026-10-13",
        "2026-10-23",
        "2026-12-07",
        "2026-12-10",
        "2026-12-31",
    ]
    const calculateDays = (start: string, end: string) => {
        if (!start || !end) return "-";
        const startParts = start.split('T')[0].split('-');
        const endParts = end.split('T')[0].split('-');
        const startDate = new Date(Number(startParts[0]), Number(startParts[1]) - 1, Number(startParts[2]), 12, 0, 0);
        const endDate = new Date(Number(endParts[0]), Number(endParts[1]) - 1, Number(endParts[2]), 12, 0, 0);
        let workDaysCount = 0;
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dayOfWeek = currentDate.getDay();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const isHoliday = PUBLIC_HOLIDAYS.includes(formattedDate);
            if (!isWeekend && !isHoliday) {
                workDaysCount++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return workDaysCount;
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setFormData(initialFormState)
    }

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false)
        setSelectedLeave(null)
    }

    const handleSubmit = async () => {
        if (!formData.type) {
            alert("กรุณาเลือกประเภทการลา")
            return
        }
        if (!formData.startDate || !formData.endDate) {
            alert("กรุณาระบุวันที่")
            return
        }
        if (formData.endDate < formData.startDate) {
            alert("วันที่สิ้นสุดต้องไม่ก่อนวันที่เริ่มต้น")
            return
        }

        try {
            await apiFetch('/api/leave-requests', {
                method: 'POST',
                body: JSON.stringify({
                    type: formData.type,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    reason: formData.reason,
                    file: formData.file,
                })
            });

            closeModal();
            reloadData();

        } catch (error) {
            console.error("Error submitting request:", error);
            alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        }
    }

    const handleStatusChange = async (e: React.MouseEvent, id: number, newStatus: string) => {
        e.stopPropagation();
        try {
            await apiFetch(`/api/leave-requests/${id}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });
            reloadData();
        } catch (error) {
            console.error("Error updating status:", error);
            alert("ไม่สามารถอัปเดตสถานะได้");
        }
    }

    const handleDeleteClick = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setDeleteId(id)
        setShowDeleteModal(true)
    }

    const confirmDelete = async () => {
        if (deleteId !== null) {
            try {
                await apiFetch(`/api/leave-requests/${deleteId}`, {
                    method: 'DELETE'
                });
                
                setShowDeleteModal(false)
                setDeleteId(null)
                reloadData();
            } catch (error) {
                console.error("Error deleting request:", error);
                alert("ไม่สามารถลบข้อมูลได้");
            }
        }
    }
    const formatTextByWords = (text: string) => {
        if (!text) return null;
        const words = text.split(' ');
        const chunks = [];
        
        for (let i = 0; i < words.length; i += 10) {
            chunks.push(words.slice(i, i + 10).join(' '));
        }
        
        return chunks.map((chunk, index) => (
            <span key={index}>
            {chunk}
            {index < chunks.length - 1 && <br />}
            </span>
        ));
    };
    const handleRowClick = (item: LeaveRequest) => {
        setSelectedLeave(item)
        setIsDetailsModalOpen(true)
    }
    const renderAttachmentPreview = (fileData: string | null) => {
        if (!fileData || fileData === '-') return <p className="text-gray-500 italic mt-2">ไม่มีเอกสารแนบ</p>;
        
        if (fileData.startsWith('data:image/')) {
            return (
                <div className="relative mt-4 w-full h-96 bg-gray-50 border rounded-lg p-2">
                    <Image
                        src={fileData}
                        alt="Attachment"
                        fill
                        className="object-contain rounded shadow-sm"
                    />
                </div>
            );
        }
        else if (fileData.startsWith('data:application/pdf')) {
            return (
                <iframe src={fileData} className="w-full h-96 mt-4 border rounded-lg shadow-sm" title="PDF Attachment"></iframe>
            );
        }
        else {
            const displayData = fileData.length > 30
                ? `${fileData.substring(0, 30)}...`
                : fileData;

            return (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50 flex flex-col items-center overflow-hidden">
                    <FileText size={48} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2 break-all">ชื่อไฟล์: {displayData}</p>
                    <p className="text-xs text-red-500">ข้อมูลไฟล์ไม่สมบูรณ์</p>
                </div>
            );
        }
    }

    return (
        <div className="flex bg-[#F8F9FA] font-[Prompt] min-h-screen text-black">
            <Sidebar />
            <div className="flex flex-col m-[3%] w-3/4">
                <div className="flex w-full items-start justify-between">
                    <h1 className="text-3xl font-bold text-[#DF5E10] mb-10">
                        คำร้องขอลา
                    </h1>
                </div>

                <div className="flex w-full items-center justify-end mb-6">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex bg-[#134BA1] text-white px-4 py-2 rounded-xl text-xl items-center gap-1 cursor-pointer hover:bg-[#0f3a80] transition-colors shadow-sm"
                    >
                        <Plus />
                        ยื่นคำร้องขอลา
                    </button>
                </div>

                <div className="flex w-full items-end justify-start mb-6 text-2xl font-bold gap-2 text-black">
                    <FileText size={30} />รายการยื่นคำร้องขอลา
                </div>

                <div className="w-full bg-white overflow-hidden border rounded-xl shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="py-4 pl-4 font-semibold text-black">ชื่อ - นามสกุล</th>
                                <th className="p-4 font-semibold text-black">ประเภท</th>
                                <th className="p-4 font-semibold text-black">วันที่ลา</th>
                                <th className="py-4 font-semibold text-black text-center">จำนวนวัน</th>
                                <th className="p-4 font-semibold text-black">เหตุผล</th>
                                <th className="py-4 font-semibold text-black text-center">สถานะ</th>
                                <th className="py-4 font-semibold text-black text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveHistory.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-gray-400">ยังไม่มีรายการคำร้องขอลา</td>
                                </tr>
                            ) : (
                                leaveHistory.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-100 border-b cursor-pointer transition-colors"
                                        onClick={() => handleRowClick(item)}
                                    >
                                        <td className="py-4 pl-4">{item.employeeName}</td>
                                        <td className="p-4">{item.type}</td>
                                        <td className="p-4 text-sm text-black">
                                            {item.startDate}
                                        </td>
                                        <td className="py-4 text-center">
                                            {calculateDays(item.startDate, item.endDate)}
                                        </td>
                                        <td className="p-4 max-w-40 align-top whitespace-normal wrap-break-word" title={item.reason}>
                                            {formatTextByWords(item.reason)}
                                        </td>
                                        <td className="py-4 text-center">
                                            <span className={`py-1 px-3 rounded-full text-sm font-medium ${
                                                item.status === "อนุมัติแล้ว" ? "bg-green-100 text-green-700" :
                                                item.status === "ไม่อนุมัติ" ? "bg-red-100 text-red-700" :
                                                "bg-yellow-100 text-yellow-800"
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex justify-center items-center gap-2">
                                                {item.status === "รอพิจารณา" ? (
                                                    <>
                                                        <button
                                                            onClick={(e) => handleStatusChange(e, item.id, "อนุมัติแล้ว")}
                                                            className="text-green-500 hover:text-green-700 transition-transform hover:scale-110"
                                                            title="อนุมัติ"
                                                        >
                                                            <CircleCheck size={24} />
                                                        </button>
                                                        
                                                        <button
                                                            onClick={(e) => handleStatusChange(e, item.id, "ไม่อนุมัติ")}
                                                            className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                                                            title="ไม่อนุมัติ"
                                                        >
                                                            <CircleX size={24} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={(e) => handleDeleteClick(e, item.id)}
                                                        className="text-gray-500 hover:text-red-600 transition-transform hover:scale-110"
                                                        title="ลบรายการ"
                                                    >
                                                        <Trash2 size={24} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-[#F2EEEE] w-150 rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[#134BA1]">ยื่นคำร้องขอลา</h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-red-500">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1 text-gray-700">ประเภทการลา <span className="text-red-500">*</span></label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#134BA1]"
                                >
                                    <option value="" disabled>เลือกประเภทการลา</option>
                                    <option value="ลาป่วย">ลาป่วย</option>
                                    <option value="ลากิจ">ลากิจ</option>
                                    <option value="ลาพักร้อน">ลาพักร้อน</option>
                                    <option value="ลาคลอด">ลาคลอด</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-gray-700">วันที่เริ่มลา <span className="text-red-500">*</span></label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#134BA1]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-gray-700">วันที่สิ้นสุด <span className="text-red-500">*</span></label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        min={formData.startDate}
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#134BA1]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1 text-gray-700">เหตุผลในการลา</label>
                                <textarea
                                    name="reason"
                                    rows={3}
                                    value={formData.reason}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#134BA1]"
                                    placeholder="ระบุเหตุผล..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1 text-gray-700">เอกสารแนบ (ถ้ามี)</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="block max-w-fit text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-gray-700 hover:file:bg-gray-300"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold transition-colors"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleSubmit}
                                className={`px-6 py-2 text-white rounded-lg font-semibold shadow-md transition-colors ${formData.type ? "bg-[#DF5E10] hover:bg-[#c44e0b]" : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                disabled={!formData.type}
                            >
                                ยื่นคำร้อง
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDetailsModalOpen && selectedLeave && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-[#F2EEEE] w-200 max-w-[90vw] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 relative animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[#134BA1]">รายละเอียดคำร้องขอลา</h2>
                            <button onClick={closeDetailsModal} className="text-gray-500 hover:text-red-500">
                                <X size={28} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-black">ประเภทการลา</label>
                                <div className="w-1/3 min-w-50 p-3 bg-white border border-gray-300 rounded-lg shadow-sm">
                                    {selectedLeave.type}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-black">วันที่เริ่มลา</label>
                                    <div className="w-full p-3 bg-white border border-gray-300 rounded-lg flex justify-between items-center shadow-sm text-gray-600">
                                        {selectedLeave.startDate}
                                        <Calendar size={18} className="text-gray-400" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-black">วันที่สิ้นสุด</label>
                                    <div className="w-full p-3 bg-white border border-gray-300 rounded-lg flex justify-between items-center shadow-sm text-gray-600">
                                        {selectedLeave.endDate}
                                        <Calendar size={18} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-black">เหตุผลในการลา</label>
                                <div className="w-full p-4 bg-white border border-gray-300 rounded-lg min-h-25 shadow-sm">
                                    {selectedLeave.reason || "-"}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-black">เอกสารแนบ</label>
                                {renderAttachmentPreview(selectedLeave.file)}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-100 rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-red-100 p-3 rounded-full mb-4">
                                <AlertTriangle size={40} className="text-[#D03E11]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">ยืนยันการลบคำร้อง?</h3>
                            <p className="text-gray-500 mb-6">
                                คุณต้องการลบคำร้องขอลาจการนี้ใช่หรือไม่? <br />
                                การกระทำนี้ไม่สามารถย้อนกลับได้
                            </p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 px-4 py-2 bg-[#D03E11] text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                >
                                    ยืนยันการลบ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}