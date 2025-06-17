"use client"

import { useEffect, useState } from "react"
import SplashScreen from "@/components/splash-screen"
import LoginScreen from "@/components/login-screen"
import MainScreen from "@/components/main-screen"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"splash" | "login" | "main">("splash")
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // 缓冲页面停留1.5秒后跳转到登录界面
    const timer = setTimeout(() => {
      handleTransition("login")
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleTransition = (nextScreen: "splash" | "login" | "main") => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScreen(nextScreen)
      setIsTransitioning(false)
    }, 300)
  }

  const handleLogin = () => {
    handleTransition("main")
  }

  const handleSkip = () => {
    handleTransition("main")
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden relative">
      <div className="w-full max-w-md h-full relative">
        {/* 过渡遮罩 */}
        <div
          className={`absolute inset-0 bg-black z-50 transition-opacity duration-300 ${
            isTransitioning ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />

        {/* 页面内容 */}
        <div
          className={`w-full h-full transition-all duration-500 ${isTransitioning ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
        >
          {currentScreen === "splash" && <SplashScreen />}
          {currentScreen === "login" && <LoginScreen onLogin={handleLogin} onSkip={handleSkip} />}
          {currentScreen === "main" && <MainScreen />}
        </div>
      </div>
    </main>
  )
}
