"use client"

import React, { useState } from "react"
import Sidebar from "@/app/components/Sidebar"

export default function Departments() {
    return (
        <div className="flex bg-white font-[Prompt] min-h-screen text-black">
            <Sidebar />
            <div className="flex flex-col m-[3%] w-3/4">
            </div>
        </div>
    )
}