"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function SplashScreen() {
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    setFadeIn(true)
  }, [])

  return (
    <div
      className={`w-full h-full flex items-center justify-center transition-all duration-1000 ${fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
    >
      <div className="relative w-full h-full">
        <Image src="/images/main-bg.png" alt="清吧欢迎页" fill className="object-cover" priority />
        {/* 可选：添加品牌标识或加载动画 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-bold">清吧</p>
          </div>
        </div>
      </div>
    </div>
  )
}
