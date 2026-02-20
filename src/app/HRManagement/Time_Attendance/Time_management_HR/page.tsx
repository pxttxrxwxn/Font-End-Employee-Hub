"use client"

import { useState, useEffect } from 'react';
import Link from "next/link"
import { usePathname } from "next/navigation"
import Sidebar from "@/app/components/SidebarHRManagement"
import { Clock, Bell, Pencil, User } from "lucide-react"
import { apiFetch } from "@/app/utils/api"

type HRTimeItem = {
  name: string
  date: string
  checkIn: string
  inType: string
  checkOut: string
  outType: string
  status: string
}


const typeBadge = (type: string) => {
  switch (type) {
    case "ปกติ":
      return "bg-lime-200 text-lime-700"
    case "มาสาย":
      return "bg-orange-200 text-orange-700"
    case "ล่วงเวลา":
      return "bg-sky-200 text-sky-700"
    default:
      return "bg-[#C2C2C2] text-[#6D6D6D]"
  }
}

const statusBadge = (status: string) => {
  switch (status) {
    case "อนุมัติแล้ว":
      return "bg-lime-200 text-lime-700"
    case "รอตรวจสอบ":
    case "รอดำเนินการ":
      return "bg-yellow-200 text-yellow-700"
    case "ไม่อนุมัติ":
      return "bg-red-200 text-red-700"
    default:
      return "bg-[#C2C2C2] text-[#6D6D6D]"
  }
}

export default function TimeAttendanceHR() {
  const pathname = usePathname()
  const isMyAttendance = pathname === "/HRManagement/Time_Attendance"
  const isHRManagement = pathname === "/HRManagement/Time_Attendance/Time_management_HR"

  const [openEdit, setOpenEdit] = useState(false)
  const [selectedItem, setSelectedItem] = useState<HRTimeItem | null>(null)

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  
  const [data, setData] = useState<HRTimeItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiFetch('/api/time-attendance/all')
        setData(result)
      } catch (error) {
        console.error("Failed to load HR data", error)
      }
    }
    fetchData()
  }, [])

  const handleSaveEdit = async () => {
    if (!selectedItem) return

    try {
      const updated = data.map((item, index) =>
        index === selectedIndex ? selectedItem : item
      )
      
      setData(updated)
      setOpenEdit(false)
      
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <div className="flex min-h-screen bg-white font-[Prompt] text-black">
      <Sidebar />

      <div className="flex flex-col m-[3%] w-3/4">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#DF5E10]">
            จัดการเวลา (HR)
          </h1>

          <div className="flex items-center gap-3">
            <Link href="/HRManagement/Time_Attendance">
              <button
                className={`px-4 py-2 rounded-lg flex items-center gap-2
                  ${isMyAttendance
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-white hover:bg-gray-400"}`}
              >
                <Clock size={18} />
                ลงเวลาของฉัน
              </button>
            </Link>

            <Link href="/HRManagement/Time_Attendance/Time_management_HR">
              <button
                className={`px-4 py-2 rounded-lg flex items-center gap-2
                  ${isHRManagement
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-white hover:bg-gray-400"}`}
              >
                <User size={18} />
                จัดการเวลา (HR)
              </button>
            </Link>

            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={30} className="text-[#6D6D6D]" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm">
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
                    <span className={`px-3 py-1 rounded-full text-sm ${typeBadge(item.inType)}`}>
                      {item.inType}
                    </span>
                  </td>
                  <td className="p-4">{item.checkOut}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${typeBadge(item.outType)}`}>
                      {item.outType}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedItem({ ...item })
                        setSelectedIndex(index)
                        setOpenEdit(true)
                      }}
                      className="hover:text-blue-600"
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
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, date: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-white"
                  />
                </div>

                <div className="flex-1">
                  <label className="font-medium">สถานะ</label>
                  <select
                    value={selectedItem.status}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, status: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-white"
                  >
                    <option>อนุมัติแล้ว</option>
                    <option>รอตรวจสอบ</option>
                    <option>ไม่อนุมัติ</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="font-medium">เวลาเข้างาน</label>
                  <input
                    value={selectedItem.checkIn}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, checkIn: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-white"
                  />
                </div>

                <div className="flex-1">
                  <label className="font-medium">ประเภท</label>
                  <select
                    value={selectedItem.inType}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, inType: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-white"
                  >
                    <option>ปกติ</option>
                    <option>มาสาย</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="font-medium">เวลาออกงาน</label>
                  <input
                    type='time'
                    value={selectedItem.checkOut}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, checkOut: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-white"
                  />
                </div>

                <div className="flex-1">
                  <label className="font-medium">ประเภท</label>
                  <select
                    value={selectedItem.outType}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, outType: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2 rounded-lg bg-white"
                  >
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
              
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2 rounded-lg bg-orange-500 text-white font-semibold"
              >
                บันทึกการเปลี่ยนแปลง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}