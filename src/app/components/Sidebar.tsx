"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  User,
  Clock,
  FileText,
  Users,
  Layers,
  Shield,
  BarChart2,
  ChevronLeft,
  LogOut,
} from "lucide-react";

const menus = [
  { icon: LayoutDashboard, label: "แดชบอร์ด", sub: "Dashboard", active: true },
  { icon: User, label: "โปรไฟล์พนักงาน", sub: "Profile" },
  { icon: Clock, label: "ลงเวลาทำงาน", sub: "Attendance" },
  { icon: FileText, label: "คำร้องขอลา", sub: "Leave Requests" },
  { icon: Users, label: "จัดการพนักงาน", sub: "Employees" },
  { icon: Layers, label: "แผนกและตำแหน่ง", sub: "Departments" },
  { icon: Shield, label: "จัดการสิทธิ์", sub: "Roles" },
  { icon: BarChart2, label: "รายงาน", sub: "Reports" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-[#07234D] text-white
      transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && (
          
          <div>
            <h1 className="text-lg font-semibold">Employee Hub</h1>
            <p className="text-xs text-gray-400">HR Management</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20"
        >
          <ChevronLeft
            className={`transition-transform ${collapsed && "rotate-180"}`}
            size={18}
          />
        </button>
      </div>

      {/* Menu */}
      <nav className="px-3 space-y-1">
        {menus.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer
              ${m.active ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              <Icon size={20} className="text-blue-400" />
              {!collapsed && (
                <div className="leading-tight">
                  <p className="text-sm">{m.label}</p>
                  <p className="text-xs text-gray-400">{m.sub}</p>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            ส
          </div>
          {!collapsed && (
            <>
              <div className="flex-1">
                <p className="text-sm">สมชาย ใจดี</p>
                <p className="text-xs text-gray-400">HR Manager</p>
              </div>
              <LogOut size={18} className="text-gray-400 cursor-pointer" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
