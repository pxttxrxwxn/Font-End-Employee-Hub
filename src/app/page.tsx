export default function Home() {
  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-600">
          โปรไฟล์พนักงาน
        </h1>

        <i className="bx bx-bell text-2xl text-gray-500" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ===== LEFT PROFILE CARD ===== */}
        <div className="col-span-1 space-y-4">

          {/* Avatar */}
          <div className="flex flex-col items-center text-center">
            <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-6xl font-bold text-white">
              ส
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              สมชาย ใจดี
            </h2>

            <p className="text-gray-500">
              HR Manager
            </p>

            <span className="mt-2 inline-block px-4 py-1 rounded-full text-sm bg-green-100 text-green-700">
              Active
            </span>
          </div>

          {/* Info */}
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-3">
              <i className="bx bx-envelope text-xl" />
              <span>somchai@company.com</span>
            </div>

            <div className="flex items-center gap-3">
              <i className="bx bx-phone text-xl" />
              <span>083-456-7890</span>
            </div>

            <div className="flex items-center gap-3">
              <i className="bx bx-building text-xl" />
              <span>Human Resources</span>
            </div>

            <div className="flex items-center gap-3">
              <i className="bx bx-calendar text-xl" />
              <span>เริ่มงาน 8 มกราคม 2564</span>
            </div>
          </div>
        </div>

        {/* ===== RIGHT FORM ===== */}
        <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              ข้อมูลส่วนตัว
            </h2>

            <button className="flex items-center gap-2 text-gray-600 hover:text-black">
              <i className="bx bx-edit" />
              แก้ไข
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* รหัสพนักงาน */}
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-1">
                รหัสพนักงาน
              </p>
              <p className="font-medium">EH001</p>
            </div>

            {/* ชื่อ */}
            <div>
              <label className="text-sm text-gray-500">ชื่อ</label>
              <input
                className="mt-1 w-full border rounded-md px-3 py-2"
                defaultValue="สมชาย"
              />
            </div>

            {/* นามสกุล */}
            <div>
              <label className="text-sm text-gray-500">นามสกุล</label>
              <input
                className="mt-1 w-full border rounded-md px-3 py-2"
                defaultValue="ใจดี"
              />
            </div>

            {/* อีเมล */}
            <div>
              <label className="text-sm text-gray-500">อีเมล</label>
              <input
                className="mt-1 w-full border rounded-md px-3 py-2"
                defaultValue="somchai@company.com"
              />
            </div>

            {/* เบอร์โทร */}
            <div>
              <label className="text-sm text-gray-500">เบอร์โทรศัพท์</label>
              <input
                className="mt-1 w-full border rounded-md px-3 py-2"
                defaultValue="083-456-7890"
              />
            </div>

            {/* ที่อยู่ */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-500">ที่อยู่</label>
              <textarea
                className="mt-1 w-full border rounded-md px-3 py-2"
                rows={3}
                defaultValue="123/45 ม.สุขใจ ถ.พหลโยธิน ซ.10 แขวงสามเสนใน เขตพญาไท กทม. 10400"
              />
            </div>

            {/* แผนก */}
            <div>
              <label className="text-sm text-gray-500">แผนก</label>
              <input
                className="mt-1 w-full border rounded-md px-3 py-2"
                defaultValue="Human Resources"
              />
            </div>

            {/* ตำแหน่ง */}
            <div>
              <label className="text-sm text-gray-500">ตำแหน่ง</label>
              <input
                className="mt-1 w-full border rounded-md px-3 py-2"
                defaultValue="HR Manager"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
