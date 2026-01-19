'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menu = [
  { href: '/profile', icon: 'bx bx-user', label: 'โปรไฟล์พนักงาน', sub: 'Profile' },
  { href: '/attendance', icon: 'bx bx-time', label: 'ลงเวลาทำงาน', sub: 'Time Attendance' },
  { href: '/employees', icon: 'bx bx-group', label: 'จัดการพนักงาน', sub: 'Employees' },
  { href: '/roles', icon: 'bx bx-shield', label: 'จัดการสิทธิ์', sub: 'Roles' },
  { href: '/departments', icon: 'bx bx-buildings', label: 'แผนกและตำแหน่ง', sub: 'Departments' },
  { href: '/leave', icon: 'bx bx-file', label: 'คำร้องขอลา', sub: 'Leave Request' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-96 min-h-screen bg-[#0B2C57] text-white flex flex-col justify-between">

      {/* ================= HEADER ================= */}
      <div>
        <div className="flex items-center gap-4 px-7 py-6">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-700 font-bold text-lg">
            EH
          </div>

          <div>
            <h1 className="text-lg font-bold leading-none">
              Employee Hub
            </h1>
            <p className="text-xs text-blue-200 mt-1">
              HR Management
            </p>
          </div>
        </div>

        {/* ================= MENU ================= */}
        <nav className="mt-3 px-5 space-y-2">
          {menu.map((item) => {
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-5 px-6 py-3.5 rounded-2xl transition
                  ${active ? 'bg-[#6B7C93]' : 'hover:bg-white/10'}
                `}
              >
                <div
                  className={`
                    w-10 h-10 flex items-center justify-center rounded-full
                    ${active ? 'bg-white/20' : ''}
                  `}
                >
                  <i className={`${item.icon} text-2xl`} />
                </div>

                <div className="leading-tight">
                  <p className={`text-sm ${active ? 'font-semibold' : ''}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-blue-200">
                    {item.sub}
                  </p>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="border-t border-white/20 px-6 py-4 flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
          ส
        </div>

        <div className="flex-1 leading-tight">
          <p className="text-sm font-medium">สมชาย ใจดี</p>
          <p className="text-xs text-blue-200">HR Manager</p>
        </div>

        <i className="bx bx-log-out text-xl cursor-pointer opacity-80 hover:opacity-100" />
      </div>
    </aside>
  )
}
