"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import Sidebar from "@/app/components/SidebarHRManagement"
import { Clock, CalendarDays, LogIn, LogOut, Bell, User } from "lucide-react"

type HistoryItem = {
  date: string
  checkIn: string
  checkOut: string
  inType: string
  outType: string
  status: string
}

export default function Time_Attendance() {
  const [time, setTime] = useState(new Date())

  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [showCheckoutWarning, setShowCheckoutWarning] = useState(false)
  
  const pathname = usePathname()
  const isMyAttendance = pathname === "/HRManagement/Time_Attendance"
  const isHRManagement = pathname === "/HRManagement/Time_Attendance/Time_management_HR"

  const formatShortDate = (date: Date) =>
    date.toLocaleDateString("th-TH", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })

  const formatFullTime = (date: Date) =>
    date.toLocaleTimeString("th-TH", { hour12: false })

  const formatDate = (date: Date) =>
    date.toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "long", year: "numeric" })

  const calculateDuration = (startTimeStr: string, endTimeInput: Date | string) => {
    if (startTimeStr === "--:--") return "0:00"

    const [startH, startM] = startTimeStr.split(":").map(Number)
    const startDate = new Date()
    startDate.setHours(startH, startM, 0, 0)

    let endDate: Date
    if (typeof endTimeInput === 'string') {
        if (endTimeInput === "--:--") return "0:00"
        const [endH, endM] = endTimeInput.split(":").map(Number)
        endDate = new Date()
        endDate.setHours(endH, endM, 0, 0)
    } else {
        endDate = endTimeInput
    }

    const diff = endDate.getTime() - startDate.getTime()
    if (diff < 0) return "0:00"

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}:${minutes.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem("timeAttendanceHistory")
        const parsedHistory = storedData ? JSON.parse(storedData) : []
        setHistory(Array.isArray(parsedHistory) ? parsedHistory : [])
      } catch (error) {
        console.error("Local storage error", error)
      } finally {
        setIsDataLoaded(true)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && isDataLoaded) {
      localStorage.setItem("timeAttendanceHistory", JSON.stringify(history))
    }
  }, [history, isDataLoaded])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const todayStr = formatShortDate(new Date())
  const lastRecord = history[0]
  const isTodayRecord = lastRecord?.date === todayStr

  const checkIn = isTodayRecord ? lastRecord.checkIn : "--:--"
  const checkOut = isTodayRecord ? lastRecord.checkOut : "--:--"

  const isCheckedIn = isTodayRecord && checkOut === "--:--"

  const workingHours = isCheckedIn
    ? calculateDuration(checkIn, time)
    : calculateDuration(checkIn, checkOut)


  const handleCheckIn = () => {
    if (isCheckedIn) return

    const now = new Date()
    const timeNow = formatTime(now)
    const dateNow = formatShortDate(now)

    const isLate = (d: Date) => d.getHours() > 8 || (d.getHours() === 8 && d.getMinutes() > 30)

    const existingRecordIndex = history.findIndex((item) => item.date === dateNow)

    if (existingRecordIndex !== -1) {
      setHistory((prev) => {
        const newHistory = [...prev]
        newHistory[existingRecordIndex] = {
          ...newHistory[existingRecordIndex],
          checkOut: "--:--",
          outType: "ไม่ใช้งาน",
          status: "รอดำเนินการ",
        }
        return newHistory
      })
    } else {
      const newRecord: HistoryItem = {
        date: dateNow,
        checkIn: timeNow,
        checkOut: "--:--",
        inType: isLate(now) ? "มาสาย" : "ปกติ",
        outType: "ไม่ใช้งาน",
        status: "รอดำเนินการ",
      }
      setHistory((prev) => [newRecord, ...prev])
    }
  }

  const handleCheckOut = () => {
    if (!isCheckedIn) {
      alert("กรุณาลงเวลาเข้างานก่อน")
      return
    }

    const now = new Date()
    const canCheckOut = now.getHours() > 17 || (now.getHours() === 17 && now.getMinutes() >= 0)

    if (!canCheckOut) {
      setShowCheckoutWarning(true)
      return
    }

    const timeNow = formatTime(now)
    const isOvertime = now.getHours() >= 18

    setHistory((prev) =>
      prev.map((item, index) =>
        index === 0 && item.date === formatShortDate(now)
          ? {
              ...item,
              checkOut: timeNow,
              outType: isOvertime ? "ล่วงเวลา" : "ปกติ",
              status: "อนุมัติแล้ว",
            }
          : item
      )
    )
  }

  const typeBadge = (type: string) => {
    switch (type) {
      case "ปกติ": return "bg-green-100 text-green-700"
      case "มาสาย": return "bg-orange-100 text-orange-600"
      case "ล่วงเวลา": return "bg-blue-100 text-blue-600"
      default: return "bg-gray-200 text-gray-500"
    }
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case "อนุมัติ":
      case "อนุมัติแล้ว": return "bg-green-100 text-green-700"
      case "รอดำเนินการ": return "bg-yellow-100 text-yellow-700"
      default: return "bg-gray-200 text-gray-500"
    }
  }

  if (!isDataLoaded) {
    return <div className="min-h-screen bg-white"></div>
  }

  return (
    <div className="flex bg-white font-[Prompt] min-h-screen text-black">
      <Sidebar />

      <div className="flex flex-col m-[3%] w-3/4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#DF5E10]">
            ลงเวลาทำงานของฉัน
          </h1>

          <div className="flex items-center gap-3">
            <Link href="/HRManagement/Time_Attendance">
              <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isMyAttendance ? "bg-blue-600 text-white" : "bg-gray-300 text-white hover:bg-gray-400"}`}>
                <Clock size={18} /> ลงเวลาของฉัน
              </button>
            </Link>
            <Link href="/HRManagement/Time_Attendance/Time_management_HR">
              <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isHRManagement ? "bg-blue-600 text-white" : "bg-gray-300 text-white hover:bg-gray-400"}`}>
                <User size={18} /> จัดการเวลา (HR)
              </button>
            </Link>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={30} className="text-[#6D6D6D] cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="flex gap-12">
          <div className="flex-1 flex flex-col items-center">
            <Clock size={64} />
            <div className="text-6xl font-bold tracking-widest mt-6">
              {formatFullTime(time)}
            </div>
            <div className="mt-4 text-gray-600">{formatDate(time)}</div>

            <div className="flex gap-6 mt-10">
              <button
                onClick={handleCheckIn}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-medium transition-colors
                  ${isCheckedIn 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                    : "bg-green-100 text-green-700 hover:bg-green-200"}`}
              >
                <LogIn /> ลงเวลาเข้างาน
              </button>

              <button
                onClick={handleCheckOut}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-medium transition-colors
                  ${!isCheckedIn 
                    ? "opacity-50 cursor-pointer bg-orange-100 text-orange-600" 
                    : "bg-orange-100 text-orange-600 hover:bg-orange-200"}`}
              >
                <LogOut /> ลงเวลาออกงาน
              </button>
            </div>
          </div>

          <div className="w-105">
            <div className="bg-[#163B6C] text-white rounded-3xl p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
                <CalendarDays /> สรุปวันนี้
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
                    {workingHours}
                  </div>
                </div>
                <div>
                  <p className="mb-2">สถานะ</p>
                  <div className={`rounded-xl py-4 text-center text-2xl font-bold ${isCheckedIn ? "bg-[#E7F9C7] text-[#64C313]" : "bg-[#C2C2C2] text-[#6D6D6D]"}`}>
                    {isCheckedIn ? "Active" : "Inactive"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <CalendarDays /> ประวัติการลงเวลา
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
                {history.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">{item.date}</td>
                    <td className="p-4">{item.checkIn}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeBadge(item.inType)}`}>{item.inType}</span>
                    </td>
                    <td className="p-4">{item.checkOut}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeBadge(item.outType)}`}>{item.outType}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge(item.status)}`}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showCheckoutWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-[#E0E0E0] rounded-3xl px-14 py-12 w-130 text-center">
            <LogOut size={56} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">ลงเวลาออกงาน</h2>
            <p className="text-2xl font-bold text-[#E5531A] mb-10">หลังจากเวลา 17:00 เท่านั้น</p>
            <button onClick={() => setShowCheckoutWarning(false)} className="bg-[#E1874A] text-white text-2xl font-bold px-14 py-4 rounded-full">
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  )
}