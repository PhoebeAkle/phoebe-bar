"use client"

import type React from "react"

import Image from "next/image"
import { Home, ShoppingCart, User } from "lucide-react"

export default function MainScreen() {
  return (
    <div className="w-full h-full flex flex-col relative animate-fadeIn">
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/main-bg.png" alt="主界面背景" fill className="object-cover" />
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 p-4">
        <div className="grid grid-cols-2 gap-6 w-full max-w-xs mt-auto mb-24">
          <FeatureButton icon="/images/cocktail-icon.png" label="调酒" onClick={() => console.log("调酒")} />
          <FeatureButton icon="/images/food-icon.png" label="美食" onClick={() => console.log("美食")} />
          <FeatureButton icon="/images/seat-icon.png" label="订座" onClick={() => console.log("订座")} />
          <FeatureButton icon="/images/shop-icon.png" label="周边" onClick={() => console.log("周边")} />
        </div>
      </div>

      {/* 底部导航栏 */}
      <div className="h-20 bg-black/80 backdrop-blur-md border-t border-pink-500/30 flex items-center justify-around z-10">
        <NavButton icon={<Home size={24} />} label="主页" active />
        <NavButton icon={<ShoppingCart size={24} />} label="订单" />
        <NavButton icon={<User size={24} />} label="我的" />
      </div>
    </div>
  )
}

interface FeatureButtonProps {
  icon: string
  label: string
  onClick: () => void
}

function FeatureButton({ icon, label, onClick }: FeatureButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-black/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-pink-500/30 hover:bg-black/70 hover:border-pink-500/50 transition-all duration-300 transform hover:scale-110 group animate-slideUp"
    >
      <div className="w-12 h-12 relative mb-3 group-hover:scale-110 transition-transform duration-300">
        <Image src={icon || "/placeholder.svg"} alt={label} fill className="object-contain filter drop-shadow-lg" />
      </div>
      <span className="text-sm font-medium text-white group-hover:text-pink-400 transition-colors duration-300">
        {label}
      </span>
    </button>
  )
}

interface NavButtonProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}

function NavButton({ icon, label, active = false }: NavButtonProps) {
  return (
    <button className="flex flex-col items-center justify-center w-1/3 py-2 group hover:scale-110 transition-all duration-300">
      <div
        className={`${active ? "text-pink-500" : "text-gray-400"} group-hover:text-pink-400 transition-colors duration-300`}
      >
        {icon}
      </div>
      <span
        className={`text-xs mt-1 font-medium ${active ? "text-pink-500" : "text-gray-400"} group-hover:text-pink-400 transition-colors duration-300`}
      >
        {label}
      </span>
    </button>
  )
}
