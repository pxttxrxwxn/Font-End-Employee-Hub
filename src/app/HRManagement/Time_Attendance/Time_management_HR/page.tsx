
"use client"

import { useState } from 'react';
import Link from "next/link"
import { usePathname } from "next/navigation"
import Sidebar from "@/app/components/SidebarHRManagement"
import { Clock, Bell, Pencil, User } from "lucide-react"


type HRTimeItem = {
  name: string
  date: string
  checkIn: string
  inType: string
  checkOut: string
  outType: string
  status: string
}

/* ================== สมชาย ทดสอบๆ ================== */
const mockData: HRTimeItem[] = [
  {
    name: "สมชาย ใจดี",
    date: "จ. 26 ม.ค",
    checkIn: "08:20",
    inType: "ปกติ",
    checkOut: "17:00",
    outType: "ปกติ",
    status: "อนุมัติแล้ว",
  },
]

/* ================== ข้อมูลสีๆๆๆ================== */
const typeBadge = (type: string) => {
  switch (type) {
    case "ปกติ":
      return "bg-lime-200 text-lime-700"
    case "มาสาย":
      return "bg-orange-200 text-orange-700"
    case "ล่วงเวลา":
      return "bg-sky-200 text-sky-700"
    default:
      return "bg-gray-200 text-gray-500"
  }
}

const statusBadge = (status: string) => {
  switch (status) {
    case "อนุมัติแล้ว":
      return "bg-lime-200 text-lime-700"
    case "รอตรวจสอบ":
      return "bg-yellow-200 text-yellow-700"
    default:
      return "bg-gray-200 text-gray-500"
  }
}


export default function TimeAttendanceHR() {
  const pathname = usePathname()

  const isMyAttendance =
    pathname === "/HRManagement/Time_Attendance"

  const isHRManagement =
    pathname === "/HRManagement/Time_Attendance/Time_management_HR"

  

  const [openEdit, setOpenEdit] = useState(false)
  const [selectedItem, setSelectedItem] = useState<HRTimeItem | null>(null)

  const [data] = useState(mockData);

  return (
    <div className="flex min-h-screen bg-white font-[Prompt] text-black">
      <Sidebar />

      <div className="flex-1 px-10 py-8 flex flex-col gap-8">
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#DF5E10]">
            จัดการเวลา (HR)
          </h1>

          <div className="flex items-center gap-3">
            <Link href="/HRManagement/Time_Attendance">
              <button
                className={`px-4 py-2 rounded-lg flex items-center gap-2
                  ${
                    isMyAttendance
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600 hover:bg-gray-400"
                  }`}
              >
                <Clock size={18} />
                ลงเวลาของฉัน
              </button>
            </Link>

            <Link href="/HRManagement/Time_Attendance/Time_management_HR">
              <button
                className={`px-4 py-2 rounded-lg flex items-center gap-2
                  ${
                    isHRManagement
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600 hover:bg-gray-400"
                  }`}
              >
                <User size={18} />
                จัดการเวลา (HR)
              </button>
            </Link>

            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={30} className="text-[#6D6D6D] cursor-pointer" />
            </button>
          </div>
        </div>
        
          <div className="flex flex-col gap-1 mb-6">
          <div className="flex items-center gap-2 text-2xl font-semibold text-black">
            <User size={22} />
            จัดการเวลาพนักงาน (HR)
          </div>
        </div>
        {/* ================= ตาราง ================= */}
        <div className="bg-white rounded-xl border shadow-sm ">
          
          <table className="w-full text-left">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="p-4">ชื่อพนักงาน</th>
                <th className="p-4">วันที่</th>
                <th className="p-4">เวลาเข้า</th>
                <th className="p-4">ประเภท</th>
                <th className="p-4">เวลาออก</th>
                <th className="p-4">ประเภท</th>
                <th className="p-4">สถานะ</th>
                <th className="p-4 text-center">จัดการ</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.date}</td>
                  <td className="p-4">{item.checkIn}</td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeBadge(item.inType)}`}>
                      {item.inType}
                    </span>
                  </td>

                  <td className="p-4">{item.checkOut}</td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeBadge(item.outType)}`}>
                      {item.outType}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      className="hover:text-blue-600"
                      onClick={() => {
                        setSelectedItem(item)
                        setOpenEdit(true)
                      }}
                    >
                      <Pencil size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ตัวแก้ไข================= */}
      {openEdit && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-[#E0E0E0] rounded-3xl w-155 p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setOpenEdit(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              แก้ไขเวลาลงเวลา
            </h2>


            <div className="flex flex-col gap-4">
              <div>
                <label className="font-medium">ชื่อพนักงาน</label>
                <input
                  value={selectedItem.name}
                  disabled
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-white"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="font-medium">วันที่</label>
                  <input
                    value={selectedItem.date}
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-white"
                  />
                </div>

                <div className="flex-1">
                  <label className="font-medium">สถานะ</label>
                  <select className="w-full mt-1 px-4 py-2 rounded-lg bg-white">
                    <option>อนุมัติแล้ว</option>
                    <option>รอตรวจสอบ</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="font-medium">เวลาเข้างาน</label>
                  <input
                    value={selectedItem.checkIn}
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-white"
                  />
                </div>

                <div className="flex-1">
                  <label className="font-medium">ประเภท</label>
                  <select className="w-full mt-1 px-4 py-2 rounded-lg bg-white">
                    <option>ปกติ</option>
                    <option>มาสาย</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="font-medium">เวลาออกงาน</label>
                  <input
                    value={selectedItem.checkOut}
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-white"
                  />
                </div>

                <div className="flex-1">
                  <label className="font-medium">ประเภท</label>
                  <select className="w-full mt-1 px-4 py-2 rounded-lg bg-white">
                    <option>ปกติ</option>
                    <option>ล่วงเวลา</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-medium">เหตุผลในการแก้ไข *</label>
                <textarea
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-white resize-none"
                  rows={3}
                  placeholder="กรุณาระบุเหตุผลในการแก้ไขเวลา"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setOpenEdit(false)}
                className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700"
              >
                ยกเลิก
              </button>
              <button className="px-6 py-2 rounded-lg bg-orange-500 text-white font-semibold">
                บันทึกการเปลี่ยนแปลง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
