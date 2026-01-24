"use client"

import React, { useEffect, useState } from "react"
import Sidebar from "@/app/components/Sidebar"
import {
  Clock,
  CalendarDays,
  LogIn,
  LogOut,
  Bell,
} from "lucide-react"

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
  const [checkIn, setCheckIn] = useState("--:--")
  const [checkOut, setCheckOut] = useState("--:--")
  const [history, setHistory] = useState<HistoryItem[]>([])

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

  const handleCheckIn = () => {
    const now = new Date()
    const timeNow = formatTime(now)
    setCheckIn(timeNow)

    setHistory(prev => [
      {
        date: formatShortDate(now),
        checkIn: timeNow,
        checkOut: "--:--",
        inType: "ปกติ",
        outType: "ไม่ใช้งาน",
        status: "รอดำเนินการ",
      },
      ...prev,
    ])
  }

  const handleCheckOut = () => {
    const now = new Date()
    const timeNow = formatTime(now)
    setCheckOut(timeNow)

    setHistory(prev =>
      prev.map((item, index) =>
        index === 0
          ? {
              ...item,
              checkOut: timeNow,
              outType: "ปกติ",
              status: "อนุมัติ",
            }
          : item
      )
    )
  }

  return (
    <div className="flex bg-white font-[Prompt] min-h-screen text-black">
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 px-10 py-8 flex flex-col gap-10">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#DF5E10]">
            ลงเวลาทำงานของฉัน
          </h1>

          <div className="flex items-center gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Clock size={18} />
              ลงเวลาของฉัน
            </button>

            <button
              disabled
              className="bg-gray-300 text-white px-4 py-2 rounded-lg cursor-not-allowed flex items-center gap-2"
            >
              <CalendarDays size={18} />
              จัดการเวลา (HR)
            </button>

            {/* Notification */}
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell size={22} />
             
            </button>
          </div>
        </div>

        {/* TOP SECTION */}
        <div className="flex gap-12">
          {/* LEFT */}
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

          {/* RIGHT */}
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

        {/* HISTORY */}
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
                    <td className="p-4">{item.inType}</td>
                    <td className="p-4">{item.checkOut}</td>
                    <td className="p-4">{item.outType}</td>
                    <td className="p-4">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
