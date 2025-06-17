"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface LoginScreenProps {
  onLogin: () => void
  onSkip: () => void
}

export default function LoginScreen({ onLogin, onSkip }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState("")

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("请输入邮箱地址")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("请输入有效的邮箱地址")
      return
    }
    setError("")
    onLogin()
  }

  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone) {
      setError("请输入手机号码")
      return
    }
    // 中国大陆手机号格式：1开头，第二位3-9，共11位
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError("请输入有效的中国大陆手机号码")
      return
    }
    if (!verificationCode) {
      setError("请输入验证码")
      return
    }
    setError("")
    onLogin()
  }

  const sendVerificationCode = () => {
    if (!phone) {
      setError("请输入手机号码")
      return
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError("请输入有效的中国大陆手机号码")
      return
    }

    setError("")
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative animate-fadeIn">
      {/* 背景图片 - 50%透明度 */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/main-bg.png" alt="背景" fill className="object-cover opacity-50" />
      </div>

      {/* 登录表单 */}
      <div className="w-11/12 max-w-sm bg-black/70 backdrop-blur-md rounded-2xl p-6 z-10 shadow-2xl border border-pink-500/30 animate-slideUp">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">欢迎来到清吧</h1>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-800/50 border border-pink-500/30">
            <TabsTrigger
              value="email"
              className="text-white data-[state=active]:bg-pink-500 data-[state=active]:text-white transition-all duration-300"
            >
              邮箱登录
            </TabsTrigger>
            <TabsTrigger
              value="phone"
              className="text-white data-[state=active]:bg-pink-500 data-[state=active]:text-white transition-all duration-300"
            >
              手机登录
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  邮箱地址
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入邮箱地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800/50 border-pink-500/30 text-white placeholder-gray-400 focus:border-pink-500 transition-colors duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  密码
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="请输入密码"
                  className="bg-gray-800/50 border-pink-500/30 text-white placeholder-gray-400 focus:border-pink-500 transition-colors duration-300"
                />
              </div>

              {error && <p className="text-sm text-red-400 animate-shake">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                登录
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="phone">
            <form onSubmit={handlePhoneLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white font-medium">
                  手机号码
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="请输入手机号码"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    setPhone(value)
                  }}
                  maxLength={11}
                  className="bg-gray-800/50 border-pink-500/30 text-white placeholder-gray-400 focus:border-pink-500 transition-colors duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code" className="text-white font-medium">
                  验证码
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="code"
                    type="text"
                    placeholder="请输入验证码"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="flex-1 bg-gray-800/50 border-pink-500/30 text-white placeholder-gray-400 focus:border-pink-500 transition-colors duration-300"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={sendVerificationCode}
                    disabled={countdown > 0}
                    className="whitespace-nowrap bg-gray-800/50 border-pink-500/30 text-white hover:bg-pink-500/20 transition-all duration-300"
                  >
                    {countdown > 0 ? `${countdown}s` : "获取验证码"}
                  </Button>
                </div>
              </div>

              {error && <p className="text-sm text-red-400 animate-shake">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                登录
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <button
            onClick={onSkip}
            className="text-sm text-gray-400 hover:text-pink-400 hover:underline transition-colors duration-300"
          >
            跳过
          </button>
        </div>
      </div>
    </div>
  )
}
