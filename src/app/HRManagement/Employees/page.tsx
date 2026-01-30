"use client"

import React, { useEffect, useState } from "react"
import Sidebar from "@/app/components/SidebarHRManagement"
import {
  Search,
  Plus,
  Mail,
  Phone,
  MoreHorizontal,
  X,
  Bell,
} from "lucide-react"

/* ---------- Types ---------- */
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

const STORAGE_KEY = "employees_data"

export default function Employees() {
  const [showModal, setShowModal] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  }
  return []
})
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null)

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

  /* ---------- โหลดจาก localStorage ---------- */
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
}, [employees])
  /* ---------- บันทึก localStorage ---------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
  }, [employees])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  /* ---------- ตรวจสอบข้อมูลครบ ---------- */
  const isFormValid = () => {
    return (
      form.employeeCode.trim() !== "" &&
      form.firstName.trim() !== "" &&
      form.lastName.trim() !== "" &&
      form.email.trim() !== "" &&
      form.phone.trim() !== "" &&
      form.department.trim() !== "" &&
      form.position.trim() !== "" &&
      form.startDate.trim() !== "" &&
      form.address.trim() !== ""
    )
  }

  /* ---------- เพิ่มพนักงาน ---------- */
  const handleAddEmployee = () => {
    if (!isFormValid()) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง")
      return
    }

    setEmployees(prev => [...prev, form])

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

  /* ---------- ลบพนักงาน ---------- */
  const handleDeleteEmployee = () => {
    if (!selectedEmployee) return
    const confirmDelete = confirm("คุณต้องการลบพนักงานคนนี้ใช่หรือไม่?")
    if (!confirmDelete) return

    setEmployees(prev =>
      prev.filter(
        emp => emp.employeeCode !== selectedEmployee.employeeCode
      )
    )

    setShowDetail(false)
    setSelectedEmployee(null)
  }

  return (
    <div className="flex min-h-screen bg-white font-[Prompt] text-black">
      <Sidebar />

      <div className="flex-1 p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-orange-500">
            จัดการพนักงาน
          </h1>
          <Bell size={30} className="text-gray-500 cursor-pointer" />
        </div>

        {/* Search + Add */}
        <div className="flex items-center justify-between mb-10">
          <div className="relative w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              placeholder="ค้นหาพนักงาน..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 outline-none"
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-700 text-white px-5 py-2.5 rounded-xl"
          >
            <Plus size={20} />
            เพิ่มพนักงาน
          </button>
        </div>

        {/* Employee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {employees.map((emp, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl p-6 relative"
            >
              <MoreHorizontal
                className="absolute top-4 right-4 text-gray-500 cursor-pointer"
                onClick={() => {
                  setSelectedEmployee(emp)
                  setShowDetail(true)
                }}
              />

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-400 flex items-center justify-center text-xl font-bold text-white">
                  {emp.firstName?.[0]}
                </div>

                <div>
                  <p className="font-semibold text-lg">
                    {emp.firstName} {emp.lastName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {emp.position}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-gray-700 text-sm">
                <div className="flex items-center gap-3">
                  <Mail size={16} />
                  {emp.email}
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} />
                  {emp.phone}
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <span className="text-gray-500 text-sm">
                  {emp.department}
                </span>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Modal เพิ่มพนักงาน ---------- */}
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
              <Input label="รหัสพนักงาน" name="employeeCode" value={form.employeeCode} onChange={handleChange} />
              <Input label="อีเมล" name="email" value={form.email} onChange={handleChange} />
              <Input label="เบอร์โทรศัพท์" name="phone" value={form.phone} onChange={handleChange} />
              <Input label="ชื่อ" name="firstName" value={form.firstName} onChange={handleChange} />
              <Input label="นามสกุล" name="lastName" value={form.lastName} onChange={handleChange} />

              <Select label="แผนก" name="department" value={form.department} onChange={handleChange}
                options={["HR", "IT", "Front-end", "Back-end"]}
              />

              <Select label="ตำแหน่ง" name="position" value={form.position} onChange={handleChange}
                options={["Software Engineer", "HR Manager"]}
              />

              <Input
                label="วันที่เริ่มงาน"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
              />

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-600">สิทธิ์การใช้งาน</label>
                {["Employee", "HR"].map(r => (
                  <label key={r} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={form.role === r}
                      onChange={handleChange}
                    />
                    {r}
                  </label>
                ))}
              </div>

              <div className="col-span-3">
                <label className="text-sm text-gray-600">ที่อยู่</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none"
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
                disabled={!isFormValid()}
                className={`px-6 py-2 rounded-xl text-white
                  ${isFormValid()
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-400 cursor-not-allowed"}
                `}
              >
                เพิ่มพนักงาน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Modal รายละเอียดพนักงาน ---------- */}
      {showDetail && selectedEmployee && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-[#F5F0F0] w-[900px] rounded-3xl p-8 relative">
            <button
              className="absolute top-6 right-6 text-gray-500"
              onClick={() => setShowDetail(false)}
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              รายละเอียดพนักงาน
            </h2>

            <div className="grid grid-cols-3 gap-6 text-sm">
              <Detail label="รหัสพนักงาน" value={selectedEmployee.employeeCode} />
              <Detail label="อีเมล" value={selectedEmployee.email} />
              <Detail label="เบอร์โทรศัพท์" value={selectedEmployee.phone} />
              <Detail label="ชื่อ" value={selectedEmployee.firstName} />
              <Detail label="นามสกุล" value={selectedEmployee.lastName} />
              <Detail label="ตำแหน่ง" value={selectedEmployee.position} />
              <Detail label="แผนก" value={selectedEmployee.department} />
              <Detail label="วันที่เริ่มงาน" value={selectedEmployee.startDate} />
              <Detail label="สิทธิ์การใช้งาน" value={selectedEmployee.role} />

              <div className="col-span-3">
                <label className="text-gray-600">ที่อยู่</label>
                <div className="bg-white rounded-lg p-3 mt-1">
                  {selectedEmployee.address}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleDeleteEmployee}
                className="px-6 py-2 bg-orange-600 text-white rounded-xl"
              >
                ลบพนักงานออก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- Reusable Components ---------- */
function Input({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none"
      />
    </div>
  )
}

function Select({ label, options, ...props }: any) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <select
        {...props}
        className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none"
      >
        <option value="">เลือก</option>
        {options.map((op: string) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600">{label}</label>
      <div className="bg-white rounded-lg px-3 py-2">
        {value}
      </div>
    </div>
  )
}
