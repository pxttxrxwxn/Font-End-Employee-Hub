// ยังไม่ได้ใส่Localhost
"use client"

import React, { useState } from "react"
import Sidebar from "@/app/components/SidebarHRManagement"
import { Search, Plus, Mail, Phone, MoreVertical, X } from "lucide-react"

type Employee = {
  employeeCode: string
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  position: string
  startDate: string
  role: "Employee" | "HR"
  address: string
}

export default function Employees() {
  const [showModal, setShowModal] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])

  const [form, setForm] = useState<Employee>({
    employeeCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    startDate: "",
    role: "Employee",
    address: "",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleAddEmployee = () => {
    setEmployees([...employees, form])
    setForm({
      employeeCode: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      startDate: "",
      role: "Employee",
      address: "",
    })
    setShowModal(false)
  }

  return (
    <div className="flex min-h-screen bg-white font-[Prompt] text-black">
      <Sidebar />

      <div className="flex-1 p-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-orange-500">จัดการพนักงาน</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-xl"
          >
            <Plus size={20} /> เพิ่มพนักงาน
          </button>
        </div>

        <div className="relative w-80 mb-10">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            placeholder="ค้นหาพนักงาน..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {employees.map((emp, index) => (
            <div key={index} className="bg-gray-100 rounded-2xl p-6 relative">
              <MoreVertical className="absolute top-4 right-4 text-gray-500" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
                  {emp.firstName[0]}
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {emp.firstName} {emp.lastName}
                  </p>
                  <p className="text-gray-600 text-sm">{emp.position}</p>
                </div>
              </div>
              <div className="space-y-3 text-gray-700 text-sm">
                <div className="flex items-center gap-3">
                  <Mail size={16} /> {emp.email}
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} /> {emp.phone}
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="text-gray-500 text-sm">{emp.department}</span>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

{showModal && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-[#F2EEEE] w-[900px] rounded-3xl p-10 relative">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-6 right-6 text-gray-500"
      >
        <X />
      </button>

      <h2 className="text-2xl font-bold text-blue-700 mb-8">
        เพิ่มพนักงานใหม่
      </h2>

      <div className="grid grid-cols-3 gap-x-10 gap-y-6">
  {/* รหัสพนักงาน */}
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">รหัสพนักงาน</label>
    <input
      name="employeeCode"
      value={form.employeeCode}
      onChange={handleChange}
      className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none focus:border-black"
    />
  </div>

  {/* อีเมล */}
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">อีเมล</label>
    <input
      name="email"
      value={form.email}
      onChange={handleChange}
      className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none focus:border-black"
    />
  </div>

  {/* เบอร์โทรศัพท์ */}
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">เบอร์โทรศัพท์</label>
    <input
      name="phone"
      value={form.phone}
      onChange={handleChange}
      className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none focus:border-black"
    />
  </div>

  {/* ชื่อ */}
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">ชื่อ</label>
    <input
      name="firstName"
      value={form.firstName}
      onChange={handleChange}
      className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none focus:border-black"
    />
  </div>

  {/* นามสกุล */}
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">นามสกุล</label>
    <input
      name="lastName"
      value={form.lastName}
      onChange={handleChange}
      className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none focus:border-black"
    />
  </div>

  {/* แผนก แผนกไม่ครบเดี๋ยวค่อยมาเพิ่ม */} 
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">แผนก</label>
    <select
      name="department"
      value={form.department}
      onChange={handleChange}
      className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none focus:border-black"
    > 
      <option value="">เลือกแผนก</option>
      <option value="HR">HR</option>
      <option value="IT">IT</option>
      <option value="Front-end">Front-end</option>
      <option value="Back-end">Back-end</option>
    </select>
  </div>

  {/* ตำแหน่ง ตำแหน่งก็ไม่ครบเดี๋ยวค่อยมาเพิ่ม */}
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">ตำแหน่ง</label>
    <select
      name="position"
      value={form.position}
      onChange={handleChange}
      className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none focus:border-black"
    >
      <option value="">เลือกตำแหน่ง</option>
      <option value="Sofrware Engineer">Sofrware Engineer</option>
      
    </select>
  </div>

  {/* วันที่เริ่มงาน */}
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">วันที่เริ่มงาน</label>
    <input
      type="date"
      name="startDate"
      value={form.startDate}
      onChange={handleChange}
      className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none focus:border-black"
    />
  </div>

  {/* สิทธิ์การใช้งาน */}
  <div className="flex flex-col gap-2">
    <label className="text-sm text-gray-600">สิทธิ์การใช้งาน</label>
    <label className="flex items-center gap-2 text-sm">
      <input
        type="radio"
        name="role"
        value="Employee"
        checked={form.role === "Employee"}
        onChange={handleChange}
      />
      Employee
    </label>
    <label className="flex items-center gap-2 text-sm">
      <input
        type="radio"
        name="role"
        value="HR"
        checked={form.role === "HR"}
        onChange={handleChange}
      />
      HR
    </label>
  </div>

  {/* ที่อยู่ */}
  <div className="col-span-3 flex flex-col gap-1">
    <label className="text-sm text-gray-600">ที่อยู่</label>
    <textarea
      name="address"
      value={form.address}
      onChange={handleChange}
      className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none focus:border-black"
    />
  </div>
</div>


      <div className="flex justify-end gap-4 mt-10">
        <button
          onClick={() => setShowModal(false)}
          className="px-6 py-2 rounded-xl bg-gray-300"
        >
          ยกเลิก
        </button>
        <button
          onClick={handleAddEmployee}
          className="px-6 py-2 rounded-xl bg-orange-500 text-white"
        >
          เพิ่มพนักงาน
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  )
}
