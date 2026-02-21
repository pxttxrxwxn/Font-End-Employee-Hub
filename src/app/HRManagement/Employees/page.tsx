"use client"

import React, { useEffect, useState, useCallback, InputHTMLAttributes, SelectHTMLAttributes } from "react"
import Sidebar from "@/app/components/SidebarHRManagement"
import { Search, Plus, Mail, Phone, X, Bell, AlertTriangle, Pen, Trash2 } from "lucide-react"
import { apiFetch } from "@/app/utils/api"

interface PositionData {
  en: string;
  th: string;
}

interface DepartmentData {
  id: number;
  deptEn: string;
  deptTh: string;
  positions: PositionData[];
}

interface RoleData {
  id: number;
  nameEN: string;
  nameTH: string;
}

type Employee = {
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
  activityStatus?: string
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: string[]
}

export default function Employees() {
  const [showModal, setShowModal] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentsData, setDepartmentsData] = useState<DepartmentData[]>([])
  const [rolesData, setRolesData] = useState<RoleData[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])

  const fetchEmployees = useCallback(async () => {
    try {
      const data = await apiFetch('/api/employees');
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  }, []);

  const fetchRoles = useCallback(async () => {
    try {
      const data = await apiFetch('/api/roles');
      setRolesData(data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  }, []);

  const fetchDepartments = useCallback(async () => {
    try {
      const data = await apiFetch('/api/departments');
      setDepartmentsData(data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
    fetchRoles();
    fetchDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const search = searchTerm.toLowerCase();
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    
    return (
      emp.employeeCode.toLowerCase().includes(search) ||
      fullName.includes(search)
    );
  });

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const [form, setForm] = useState<Employee>({
    employeeCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    startDate: "",
    role: "",
    address: "",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target

    if (name === "department") {
        setForm((prev) => ({ ...prev, [name]: value, position: "" }))
    } else {
        setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const getPositionOptions = () => {
    const selectedDept = departmentsData.find(d => d.deptEn === form.department);
    return selectedDept ? selectedDept.positions.map(p => p.en).filter(Boolean) : [];
  }

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
      form.role.trim() !== "" &&
      form.address.trim() !== ""
    )
  }

  const handleAddEmployee = async () => {
    if (!isFormValid()) {
      alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    try {
      await apiFetch('/api/employees', {
        method: 'POST',
        body: JSON.stringify(form)
      });

      await fetchEmployees();

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
      });
      setShowModal(false);

    } catch (error) {
      console.error("Error adding employee:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มพนักงาน หรือรหัสพนักงานซ้ำ");
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      if (!form.employeeCode) {
        alert("ไม่พบรหัสพนักงาน");
        return;
      }
      
      await apiFetch(`/api/employees/${form.employeeCode}`, {
        method: 'PUT',
        body: JSON.stringify(form)
      });

      await fetchEmployees();
      setShowDetail(false);
      alert("อัปเดตข้อมูลพนักงานสำเร็จ");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล กรุณาตรวจสอบว่ามี API รองรับหรือไม่");
    }
  };

  const confirmDeleteEmployee = async () => {
    if (!selectedEmployee) return

    try {
      await apiFetch(`/api/employees/${selectedEmployee.employeeCode}`, {
        method: 'DELETE'
      });

      await fetchEmployees();

      setShowDeleteModal(false)
      setShowDetail(false)
      setSelectedEmployee(null)
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("ไม่สามารถลบข้อมูลพนักงานได้");
    }
  }

  const getStatusInfo = (emp: Employee) => {
    const status = emp.activityStatus || "Inactive";
    const getStatusColorClass = (s: string) => {
        const lowerS = s.toLowerCase();
        if (lowerS === 'active' || lowerS === 'online') return 'bg-green-100 text-green-600';
        return 'bg-[#C2C2C2] text-[#6D6D6D]';
    }

    return {
      text: status,
      className: getStatusColorClass(status)
    };
  };

  return (
    <div className="flex min-h-screen bg-white font-[Prompt] text-black">
      <Sidebar />

      <div className="flex flex-col m-[3%] w-3/4">
        <div className="flex w-full items-start justify-between">
          <h1 className="text-3xl font-bold text-[#DF5E10] mb-10">
            จัดการพนักงาน
          </h1>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={30} className="text-[#6D6D6D] cursor-pointer" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-10">
            <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    placeholder="ค้นหาพนักงาน..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 outline-none"
                />
            </div>
            <button
                onClick={() => setShowModal(true)}
                className="flex bg-[#134BA1] text-white p-4 rounded-xl text-xl items-center gap-1 cursor-pointer hover:bg-[#0f3a80] transition-colors"
            >
                <Plus size={20} />
                เพิ่มพนักงาน
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEmployees.map((emp) => {
            const statusInfo = getStatusInfo(emp);

            return (
              <div key={emp.employeeCode} className="bg-gray-100 rounded-2xl p-6 relative" >
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <Pen
                    size={18}
                    className="text-[#6D6D6D] cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setForm({
                          employeeCode: emp.employeeCode,
                          firstName: emp.firstName,
                          lastName: emp.lastName,
                          email: emp.email,
                          phone: emp.phone,
                          department: emp.department,
                          position: emp.position,
                          startDate: emp.startDate,
                          role: emp.role,
                          address: emp.address,
                          activityStatus: emp.activityStatus || "Active"
                      });
                      setShowDetail(true);
                    }}
                  />
                  <Trash2
                    size={18}
                    className="text-[#D03E11] cursor-pointer hover:text-red-500 transition-colors"
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setShowDeleteModal(true);
                    }}
                  />
                </div>

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
                  <span className={`${statusInfo.className} px-3 py-1 rounded-full text-xs`}>
                    {statusInfo.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
          <div className="bg-[#F2EEEE] w-225 rounded-3xl p-10 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-[#6D6D6D] cursor-pointer"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold text-blue-700 mb-8">
              เพิ่มพนักงานใหม่
            </h2>

            <div className="grid grid-cols-3 gap-x-10 gap-y-6">
              <Input label="รหัสพนักงาน" name="employeeCode" placeholder="EH001" value={form.employeeCode} onChange={handleChange} />
              <Input label="อีเมล" name="email" placeholder="kongsuk@company.co.th" value={form.email} onChange={handleChange} />
              <Input label="เบอร์โทรศัพท์" name="phone" placeholder="081-111-2233" value={form.phone} onChange={handleChange} />
              <Input label="ชื่อ" name="firstName" placeholder="ก้อง" value={form.firstName} onChange={handleChange} />
              <Input label="นามสกุล" name="lastName" placeholder="สินสุข" value={form.lastName} onChange={handleChange} />

              <Select
                label="แผนก"
                name="department"
                value={form.department}
                onChange={handleChange}
                options={departmentsData.map(d => d.deptEn)}
              />

              <Select
                label="ตำแหน่ง"
                name="position"
                value={form.position}
                onChange={handleChange}
                options={getPositionOptions()}
              />

              <Input
                label="วันที่เริ่มงาน"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
              />

              <div className="flex flex-col gap-2">
                <label className="text-sm text-black font-medium">สิทธิ์การใช้งาน</label>
                <div className="flex flex-col gap-2">
                    {rolesData.length > 0 ? (
                        rolesData.map((r) => (
                        <label key={r.id} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                            type="radio"
                            name="role"
                            value={r.nameEN}
                            checked={form.role === r.nameEN}
                            onChange={handleChange}
                            className="cursor-pointer w-4 h-4 accent-[#009951]"
                            />
                            {r.nameEN}
                        </label>
                        ))
                    ) : (
                        <div className="text-gray-400 text-sm">ไม่พบข้อมูลบทบาท กรุณาเพิ่มในหน้า Roles</div>
                    )}
                </div>
              </div>

              <div className="col-span-3">
                <label className="text-sm text-black font-medium">ที่อยู่</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="45/12 ซอยลาดพร้าว 71 แขวงสะพานสอง เขตวังทองหลาง กรุงเทพฯ 10310"
                  className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-xl bg-gray-300 cursor-pointer hover:bg-gray-400 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleAddEmployee}
                disabled={!isFormValid()}
                className={`px-6 py-2 rounded-xl text-white cursor-pointer transition-colors
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

      {showDetail && selectedEmployee && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-[#F5F0F0] w-225 rounded-3xl p-10 relative">
            <button
              className="absolute top-6 right-6 text-gray-500 hover:text-black"
              onClick={() => setShowDetail(false)}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-[#134BA1] mb-8">
              รายละเอียดพนักงาน
            </h2>

            <div className="flex items-center gap-6 mb-5 ml-10">
              <div className="w-24 h-24 rounded-full bg-[#C2C2C2] flex items-center justify-center text-5xl font-bold text-white shadow-sm">
                {form.firstName?.[0]}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-bold text-black">{form.firstName} {form.lastName}</h3>
                  <span className={`${getStatusInfo(form).className} px-4 py-1 rounded-full text-sm font-medium`}>
                    {getStatusInfo(form).text}
                  </span>
                </div>
                <p className="text-[#6D6D6D] text-base">{form.position}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-5 text-sm">
              <div className="col-start-1">
                <Input label="รหัสพนักงาน" name="employeeCode" value={form.employeeCode} readOnly className="bg-white! border-none! shadow-sm! text-gray-500" />
              </div>
              <div className="col-start-2">
                <Input label="อีเมล" name="email" value={form.email} onChange={handleChange} className="bg-white! border-none! shadow-sm!" />
              </div>
              <div className="col-start-3">
                <Input label="เบอร์โทรศัพท์" name="phone" value={form.phone} onChange={handleChange} className="bg-white! border-none! shadow-sm!" />
              </div>

              <div className="col-start-1">
                <Input label="ชื่อ" name="firstName" value={form.firstName} onChange={handleChange} className="bg-white! border-none! shadow-sm!" />
              </div>
              <div className="col-start-2">
                <Input label="นามสกุล" name="lastName" value={form.lastName} onChange={handleChange} className="bg-white! border-none! shadow-sm!" />
              </div>

              <div className="col-start-3">
                <Select label="แผนก" name="department" value={form.department} onChange={handleChange} options={departmentsData.map(d => d.deptEn)} className="bg-white! border-none! shadow-sm!" />
              </div>
              <div className="col-start-1">
                <Select label="ตำแหน่ง" name="position" value={form.position} onChange={handleChange} options={getPositionOptions()} className="bg-white! border-none! shadow-sm!" />
              </div>

              <div className="col-start-2">
                <Input label="วันที่เริ่มงาน" name="startDate" type="date" value={form.startDate} onChange={handleChange} className="bg-white! border-none! shadow-sm!" />
              </div>
              <div className="col-start-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-black font-medium">สิทธิ์การใช้งาน</label>
                  <div className="flex flex-col gap-2 mt-2">
                    {rolesData.length > 0 ? (
                      rolesData.map((r) => (
                        <label key={r.id} className="flex items-center gap-2 text-sm cursor-pointer text-gray-700">
                          <input
                            type="radio"
                            name="role"
                            value={r.nameEN}
                            checked={form.role === r.nameEN}
                            onChange={handleChange}
                            className="cursor-pointer w-4 h-4 accent-[#009951]"
                          />
                          {r.nameEN}
                        </label>
                      ))
                    ) : (
                      <>
                        <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-700">
                          <input type="radio" name="role" value="Employee" checked={form.role === "Employee"} onChange={handleChange} className="cursor-pointer w-4 h-4 accent-[#009951]" /> Employee
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-700">
                          <input type="radio" name="role" value="HR" checked={form.role === "HR"} onChange={handleChange} className="cursor-pointer w-4 h-4 accent-[#009951]" /> HR
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <label className="text-sm text-black font-medium block mb-1">ที่อยู่</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white px-4 py-3 outline-none shadow-sm border-none resize-none"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowDetail(false)}
                className="px-6 py-2.5 rounded-xl bg-[#C2C2C2] font-medium text-white hover:bg-gray-400 transition-colors cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleUpdateEmployee}
                className="px-6 py-2.5 rounded-xl text-white font-medium bg-[#D87031] hover:bg-[#914617] transition-colors cursor-pointer"
              >
                บันทึกการแก้ไข
              </button>
            </div>
            
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
            <div className="bg-white w-100 rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <div className="flex flex-col items-center text-center">
                    <div className="bg-red-100 p-3 rounded-full mb-4">
                        <AlertTriangle size={40} className="text-[#C83B10]" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        ยืนยันการลบพนักงาน?
                    </h3>
                    <p className="text-gray-500 mb-6">
                        คุณต้องการลบคุณ <span className="font-bold text-gray-700">{selectedEmployee?.firstName} {selectedEmployee?.lastName}</span> ใช่หรือไม่? <br/>
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
                            onClick={confirmDeleteEmployee}
                            className="flex-1 px-4 py-2 bg-[#C83B10] text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                            ลบพนักงาน
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  )
}

function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-black font-medium">{label}</label>
      <input
        {...props}
        className={`w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 transition-colors ${props.className || ""}`}
      />
    </div>
  )
}

function Select({ label, options, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-black font-medium">{label}</label>
      <select
        {...props}
        className={`w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 outline-none focus:border-blue-500 transition-colors ${props.className || ""}`}
      >
        <option value="">เลือก</option>
        {options.map((op: string, index) => (
          <option key={index} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  )
}