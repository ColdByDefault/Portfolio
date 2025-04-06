"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem("cookieBannerDismissed")
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem("cookieBannerDismissed", "true")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-in fade-in slide-in-from-top duration-500">
      <div className="bg-white border-b shadow-md p-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              I bake my own cookies, I don't collect any personal data of yours.
              Hosting provider (Vercel) may collect anonymous speed & location info for performance purposes. [OK]
            </p>
            <div className="text-blue-600">
              <Link href="/berich/policy">..see more</Link>
            </div>
          </div>
          <div>
            <button
              onClick={handleDismiss}
              aria-label="Close">
              <X className="h-4 w-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
