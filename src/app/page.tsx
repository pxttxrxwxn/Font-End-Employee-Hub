import { Bell, Pencil, Mail, Phone, Building2, Calendar } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-10">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-orange-500">
          โปรไฟล์พนักงาน
        </h1>

        <Bell className="w-6 h-6 text-gray-500" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* ========== LEFT PROFILE ========== */}
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-7xl font-bold text-white mb-6">
            ส
          </div>

          {/* Name */}
          <div className="text-3xl font-bold">
            สมชาย ใจดี
          </div>

          {/* Position */}
          <div className="text-gray-500 text-lg">
            HR Manager
          </div>

          {/* Status */}
          <span className="mt-2 px-6 py-1 text-sm rounded-full bg-green-100 text-green-600">
            Active
          </span>

          {/* Info */}
          <div className="mt-8 space-y-4 text-gray-600 w-full max-w-xs text-left">
            <InfoRow icon={<Mail />} text="somchai@company.com" />
            <InfoRow icon={<Phone />} text="083-456-7890" />
            <InfoRow icon={<Building2 />} text="Human Resources" />
            <InfoRow icon={<Calendar />} text="เริ่มงาน 8 มกราคม 2564" />
          </div>
        </div>

        {/* ========== RIGHT FORM ========== */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">
              ข้อมูลส่วนตัว
            </h2>

            <button className="flex items-center gap-2 text-gray-600 hover:text-black">
              <Pencil className="w-5 h-5" />
              แก้ไข
            </button>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employee ID */}
            <div className="md:col-span-2">
              <p className="text-gray-500 mb-1">
                รหัสพนักงาน
              </p>
              <p className="font-medium text-lg">
                EH001
              </p>
            </div>

            {/* First name */}
            <div>
              <label className="block mb-1">
                ชื่อ
              </label>
              <input
                className="w-full border rounded-xl px-4 py-3"
                defaultValue="สมชาย"
              />
            </div>

            {/* Last name */}
            <div>
              <label className="block mb-1">
                นามสกุล
              </label>
              <input
                className="w-full border rounded-xl px-4 py-3"
                defaultValue="ใจดี"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1">
                อีเมล
              </label>
              <input
                className="w-full border rounded-xl px-4 py-3"
                defaultValue="somchai@company.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1">
                เบอร์โทรศัพท์
              </label>
              <input
                className="w-full border rounded-xl px-4 py-3"
                defaultValue="083-456-7890"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block mb-1">
                ที่อยู่
              </label>
              <textarea
                rows={3}
                className="w-full border rounded-xl px-4 py-3"
                defaultValue="123/45 ม.สุขใจ ถ.พหลโยธิน ซ.10 แขวงสามเสนใน เขตพญาไท กทม. 10400"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block mb-1">
                แผนก
              </label>
              <input
                className="w-full border rounded-xl px-4 py-3"
                defaultValue="Human Resources"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block mb-1">
                ตำแหน่ง
              </label>
              <input
                className="w-full border rounded-xl px-4 py-3"
                defaultValue="HR Manager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===== Reusable Info Row ===== */
function InfoRow({
  icon,
  text,
}: {
  icon: React.ReactNode
  text: string
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-gray-400">{icon}</div>
      <span>{text}</span>
    </div>
  )
}
