"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {User,Clock,Users,Trello,Shield,FileText,LogOut,} from "lucide-react";

const menus = [
  { icon: User, label: "โปรไฟล์พนักงาน", sub: "Profile", path: "/HRManagement/Profile" },
  { icon: Clock, label: "ลงเวลาทำงาน", sub: "Attendance", path: "/HRManagement/Time_Attendance" },
  { icon: Users, label: "จัดการพนักงาน", sub: "Employees", path: "/HRManagement/Employees" },
  { icon: Shield, label: "จัดการสิทธิ์", sub: "Roles", path: "/HRManagement/Roles" },
  { icon: Trello, label: "แผนกและตำแหน่ง", sub: "Departments", path: "/HRManagement/Departments" },
  { icon: FileText, label: "คำร้องขอลา", sub: "Leave Requests", path: "/HRManagement/Leave_Request" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-72 bg-[#07234D] text-white sticky top-0">
      <div className="flex items-center mb-2 mt-2">
        <div className="bg-white rounded-full p-2 ml-2">
          <Image
            src="/images/Logo.png"
            alt="Logo"
            width={50}
            height={50}
          />
        </div>
        <div className="flex flex-col px-4 py-5">
          <h1 className="text-lg font-semibold">Employee Hub</h1>
          <p className="text-xs text-gray-400 font-[montserrat]">HR Management</p>
        </div>
      </div>

      <nav className="px-3 space-y-2">
        {menus.map((m, i) => {
          const Icon = m.icon;
          const isActive = pathname === m.path;

          return (
            <Link
              key={i}
              href={m.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors
              ${isActive ? "bg-[#d9d9d944]" : "hover:bg-white/5"}`}
            >
              <Icon size={24} className="text-white" />
              <div className="leading-tight">
                <p className="text-xl font-[Prompt]">{m.label}</p>
                <p className="text-xs text-gray-400 font-[montserrat]">{m.sub}</p>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-72 px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            ส
          </div>
          <div className="flex-1">
            <p className="text-sm font-[Prompt]">สมชาย ใจดี</p>
            <p className="text-xs text-gray-400 font-[montserrat]">HR Manager</p>
          </div>
          <Link href="/">
            <LogOut size={18} className="text-gray-400 cursor-pointer hover:text-white" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
