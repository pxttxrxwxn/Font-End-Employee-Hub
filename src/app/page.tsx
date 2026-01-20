import Image from "next/image";
import Link from "next/link";

export default function Index() {
  return (
    <div className="min-h-screen  flex items-center justify-between font-montserrat bg-white">
      <div className="flex flex-col items-left justify-center h-screen ml-[3%] mr-[3%]">
        <Image
        src="/images/LOGO Employee Hub-Photoroom 1.png" alt="Logo"
        width={704.29} height={606} />
      </div>
      <div className="bg-[#0D274E] h-screen w-[60%] flex flex-col items-right rounded-l-[100px]">
        <div className="flex flex-col items-center justify-center h-screen mr-[3%] ml-[3%] gap-[5em]">
          <h1 className="text-white text-6xl font-bold mb-4">Sign in to continue</h1>
          <form className="min-w-3/4 mt-6 flex flex-col gap-6">
            <div className="w-full">
              <label htmlFor="email" className="text-xl font-Kanit text-[#ffffff]">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your registered email address"
                className="mt-1 w-full rounded-md border px-4 py-3 placeholder-[#D1D1D1] focus:outline-none text-black bg-white text-xl"
              />
            </div>

            <div className="w-full">
              <label htmlFor="password" className="text-xl font-Kanit text-[#ffffff] block mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  
                  className="mt-1 w-full rounded-md border px-4 py-3 placeholder-[#D1D1D1] focus:outline-none text-black bg-white text-xl"
                />
              </div>
            </div>
            <div className="w-full flex justify-end">
              <p className="text-white underline text-xs cursor-pointer">Forgot your password?</p>
            </div>
        </form>
        <Link href="/HRManagement/Profile">
          <button
            type="submit"
            className="cursor-pointer mt-8 w-fit px-15 bg-[#D87031] text-white py-4 rounded-full font-bold hover:bg-[#7a5c4d] transition text-3xl"
          >
            Sign in
          </button></Link>
        </div>
      </div>
    </div>
  );
}

















  {/* <div className="flex flex-col items-center justify-center h-screen mr-[3%] ml-[3%]">
    <div className="relative">
      <input
        type="email"
        required
        className="peer w-[20em] px-5 py-2 text-[1.5em] border text-black border-gray-300 rounded outline-none focus:border-blue-500 bg-white"
      />

      <label
        className="absolute left-5 top-2 text-[1.5em] transition-all duration-300 text-black
              peer-focus:-top-2 peer-focus:left-2 peer-focus:text-base
              peer-focus:bg-[#505c6d] peer-focus:px-1
              peer-valid:-top-2 peer-valid:left-2 peer-valid:text-base
              peer-valid:bg-[#000000] peer-valid:px-1">
        E-mail
      </label>
    </div>
  </div> */}