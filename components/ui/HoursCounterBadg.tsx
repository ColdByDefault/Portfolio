'use client'

import { Badge } from "@/components/ui/badge"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

export default function HoursCounterBadge() {
  const count = useMotionValue(1)
  const smoothCount = useSpring(count, { duration: 15, stiffness: 50, damping: 20 })
  const rounded = useTransform(smoothCount, Math.round)

  useEffect(() => {
    const interval = setInterval(() => {
      count.set(803)
    }, 3000) // wait for loadingScreen before animating

    return () => clearInterval(interval)
  }, [count])

  return (
    <Badge className="text-[12px] font-light text-white min-w-28 max-w-28">
      <span>wakatime</span>
      <motion.span>
        <motion.span className="text-blue-400">{rounded}</motion.span>
      </motion.span>
      <span> hrs</span>
    </Badge>
  )
}
