"use client"

import React, { useState } from "react"
import Sidebar from "@/app/components/SidebarHRManagement"
import { Bell, Plus, X, FileText } from "lucide-react"

type LeaveItem = {
  name: string
  type: string
  date: string
  days: number
  reason: string
  status: "รอพิจารณา"
}

export default function Leave_Request() {
  const [openModal, setOpenModal] = useState(false)

// form state
  const [leaveType, setLeaveType] = useState("ลาป่วย")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")

  // list state
  const [leaveList, setLeaveList] = useState<LeaveItem[]>([])

  const calcDays = (start: string, end: string) => {
    const s = new Date(start)
    const e = new Date(end)
    return Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1
  }

  return (
    <div className="flex bg-white font-[Prompt] min-h-screen text-black">
      <Sidebar />

      <div className="flex flex-col m-[3%] w-3/4 relative">
        
        <div className="flex w-full items-start justify-between">
          <h1 className="text-3xl font-bold text-[#DF5E10] mb-10">
            คำร้องขอลา
          </h1>
          <Bell size={28} />
        </div>

        
        <div className="flex w-full items-center justify-end mb-6">
          <button
            onClick={() => setOpenModal(true)}
            className="flex bg-[#134BA1] text-white px-5 py-2 rounded-lg text-lg items-center gap-2 hover:bg-[#0f3a80]"
          >
            <Plus size={20} />
            ยื่นคำร้องขอลา
          </button>
        </div>

        
        <div className="flex w-full items-center gap-2 mb-4 text-xl font-bold">
          <FileText size={24} />
          รายการยื่นคำร้องขอลา
        </div>

        {/* =====ตาราง ===== */}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th>ชื่อ - นามสกุล</th>
              <th>ประเภท</th>
              <th>วันที่ลา</th>
              <th>จำนวนวัน</th>
              <th>เหตุผล</th>
              <th>สถานะ</th>
            </tr>
          </thead>

          <tbody>
            {leaveList.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-3">สมชาย ใจดี</td>
                <td>{item.type}</td>
                <td>{item.date}</td>
                <td>{item.days}</td>
                <td>{item.reason}</td>
                <td>
                  <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ===== ตัวลา ===== */}
        {openModal && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" />

            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-[#F4EFED] w-[650px] rounded-xl p-8 relative">
                <button
                  onClick={() => setOpenModal(false)}
                  className="absolute right-6 top-6 text-gray-400 hover:text-black"
                >
                  <X size={22} />
                </button>

                <h2 className="text-2xl font-bold text-[#134BA1] mb-6">
                  ยื่นคำร้องขอลา
                </h2>

                <div className="space-y-5 text-sm">
                  <div>
                    <label className="block mb-1">ประเภทการลา</label>
                    <select
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                      className="w-full px-4 py-2 rounded-md bg-white border"
                    >
                      <option>ลาป่วย</option>
                      <option>ลากิจ</option>
                      <option>ลาพักร้อน</option>
                    </select>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-1">
                      <label className="block mb-1">วันที่เริ่มลา</label>
                      <input
                        type="date"
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-4 py-2 rounded-md bg-white border"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block mb-1">วันที่สิ้นสุด</label>
                      <input
                        type="date"
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-4 py-2 rounded-md bg-white border"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1">เหตุผลในการลา</label>
                    <textarea
                      rows={4}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-4 py-2 rounded-md bg-white border resize-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">เอกสารแนบ (ถ้ามี)</label>
                    <input type="file" className="text-sm" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="px-6 py-2 rounded-md bg-gray-300"
                  >
                    ยกเลิก
                  </button>

                  <button
                    onClick={() => {
                      if (!startDate || !endDate) return

                      setLeaveList([
                        ...leaveList,
                        {
                          name: "นภา สดใส",
                          type: leaveType,
                          date: startDate,
                          days: calcDays(startDate, endDate),
                          reason,
                          status: "รอพิจารณา",
                        },
                      ])

                      setOpenModal(false)
                    }}
                    className="px-6 py-2 rounded-md bg-[#DF5E10] text-white"
                  >
                    ยื่นคำร้อง
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
