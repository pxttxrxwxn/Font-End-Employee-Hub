"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import Sidebar from "@/app/components/Sidebar"
import {
  Clock,
  CalendarDays,
  LogIn,
  LogOut,
  Bell,
  User,
} from "lucide-react"

/* ================= Types ================= */
type HistoryItem = {
  date: string
  checkIn: string
  checkOut: string
  inType: string
  outType: string
  status: string
}



const mockHistoryFromDB: HistoryItem[] = [
  {
    date: "จ. 26 ม.ค",
    checkIn: "08:20",
    inType: "ปกติ",
    checkOut: "17:00",
    outType: "ปกติ",
    status: "อนุมัติแล้ว",
  },
]

export default function Time_Attendance() {
  const [time, setTime] = useState(new Date())
  const [checkIn, setCheckIn] = useState("--:--")
  const [checkOut, setCheckOut] = useState("--:--")
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showCheckoutWarning, setShowCheckoutWarning] = useState(false)


  const pathname = usePathname()

  const isMyAttendance =
    pathname === "/HRManagement/Time_Attendance"

  const isHRManagement =
    pathname === "/HRManagement/Time_Attendance/Time_management_HR"

      // database ฮะๆๆๆๆ
  useEffect(() => {
  
    const fetchHistoryFromDB = async () => {
 
      setHistory(mockHistoryFromDB)
    }

    fetchHistoryFromDB()
  }, [])

  /* ================= นาฬิกา ================= */
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
    })

  const formatFullTime = (date: Date) =>
    date.toLocaleTimeString("th-TH", { hour12: false })

  const formatDate = (date: Date) =>
    date.toLocaleDateString("th-TH", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })

  const formatShortDate = (date: Date) =>
    date.toLocaleDateString("th-TH", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })

  
  const isLate = (date: Date) => {
    const h = date.getHours()
    const m = date.getMinutes()
    return h > 8 || (h === 8 && m > 30)
  }

  const canCheckOut = (date: Date) => {
    const h = date.getHours()
    const m = date.getMinutes()
    return h > 17 || (h === 17 && m >= 0)
  }

  const isOvertime = (date: Date) => {
    return date.getHours() >= 18
  }


  const handleCheckIn = () => {
    const now = new Date()
    const timeNow = formatTime(now)
    const late = isLate(now)

    setCheckIn(timeNow)

    setHistory(prev => [
      {
        date: formatShortDate(now),
        checkIn: timeNow,
        checkOut: "--:--",
        inType: late ? "มาสาย" : "ปกติ",
        outType: "ไม่ใช้งาน",
        status: "รอดำเนินการ",
      },
      ...prev,
    ])
  }

  const handleCheckOut = () => {
    const now = new Date()

    if (!canCheckOut(now)) {
      setShowCheckoutWarning(true)
      return
    }

    const timeNow = formatTime(now)
    const overtime = isOvertime(now)

    setCheckOut(timeNow)

    setHistory(prev =>
      prev.map((item, index) =>
        index === 0
          ? {
              ...item,
              checkOut: timeNow,
              outType: overtime ? "ล่วงเวลา" : "ปกติ",
              status: "อนุมัติ",
            }
          : item
      )
    )
  }

 
  const typeBadge = (type: string) => {
    switch (type) {
      case "ปกติ":
        return "bg-green-100 text-green-700"
      case "มาสาย":
        return "bg-orange-100 text-orange-600"
      case "ล่วงเวลา":
        return "bg-blue-100 text-blue-600"
      default:
        return "bg-gray-200 text-gray-500"
    }
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case "อนุมัติ":
      case "อนุมัติแล้ว":
        return "bg-green-100 text-green-700"
      case "รอดำเนินการ":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-200 text-gray-500"
    }
  }

 
  return (
    <div className="flex bg-white font-[Prompt] min-h-screen text-black">
      <Sidebar />

      <div className="flex-1 px-10 py-8 flex flex-col gap-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#DF5E10]">
            ลงเวลาทำงานของฉัน
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
              <Bell size={22} />
            </button>
          </div>
        </div>

        
        <div className="flex gap-12">
          {/* นาฬิกา */}
          <div className="flex-1 flex flex-col items-center">
            <Clock size={64} />
            <div className="text-6xl font-bold tracking-widest mt-6">
              {formatFullTime(time)}
            </div>
            <div className="mt-4 text-gray-600">
              {formatDate(time)}
            </div>

            <div className="flex gap-6 mt-10">
              <button
                onClick={handleCheckIn}
                className="flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-xl text-lg font-medium"
              >
                <LogIn />
                ลงเวลาเข้างาน
              </button>

              <button
                onClick={handleCheckOut}
                className="flex items-center gap-2 bg-orange-100 text-orange-600 px-6 py-3 rounded-xl text-lg font-medium"
              >
                <LogOut />
                ลงเวลาออกงาน
              </button>
            </div>
          </div>

          {/* กล่องสรุปวันนี้ */}
          <div className="w-[420px]">
            <div className="bg-[#163B6C] text-white rounded-3xl p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
                <CalendarDays />
                สรุปวันนี้
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="mb-2">ลงเวลาเข้างาน</p>
                  <div className="bg-green-200 text-black rounded-xl py-4 text-center text-2xl font-bold">
                    {checkIn}
                  </div>
                </div>

                <div>
                  <p className="mb-2">ลงเวลาออกงาน</p>
                  <div className="bg-orange-200 text-black rounded-xl py-4 text-center text-2xl font-bold">
                    {checkOut}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-2">ชั่วโมงการทำงาน</p>
                  <div className="bg-white text-black rounded-xl py-4 text-center text-2xl font-bold">
                    0:00
                  </div>
                </div>

                <div>
                  <p className="mb-2">สถานะ</p>
                  <div className="bg-gray-300 text-gray-600 rounded-xl py-4 text-center text-2xl font-bold">
                    {checkIn !== "--:--" ? "Active" : "Inactive"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ประวัติ */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <CalendarDays />
            ประวัติการลงเวลา
          </h2>

          <div className="bg-white rounded-xl shadow-sm border">
            <table className="w-full text-left">
              <thead className="border-b text-gray-500">
                <tr>
                  <th className="p-4">วันที่</th>
                  <th className="p-4">เวลาเข้า</th>
                  <th className="p-4">ประเภท</th>
                  <th className="p-4">เวลาออก</th>
                  <th className="p-4">ประเภท</th>
                  <th className="p-4">สถานะ</th>
                </tr>
              </thead>

              <tbody>
                {history.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-gray-400">
                      ยังไม่มีประวัติการลงเวลา
                    </td>
                  </tr>
                )}

                {history.map((item, index) => (
                  <tr key={index} className="border-b">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ข้อความก่อน17:00 */}
      {showCheckoutWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-[#E0E0E0] rounded-3xl px-14 py-12 w-[520px] text-center">
            <LogOut size={56} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              ลงเวลาออกงาน
            </h2>
            <p className="text-2xl font-bold text-[#E5531A] mb-10">
              หลังจากเวลา 17:00 เท่านั้น
            </p>
            <button
              onClick={() => setShowCheckoutWarning(false)}
              className="bg-[#E1874A] text-white text-2xl font-bold px-14 py-4 rounded-full"
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

