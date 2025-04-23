"use client"
import { Parallax } from "react-scroll-parallax"

type Props = {
  children: React.ReactNode
  translateX?: [number, number]
  opacity?: [number, number]
  className?: string
}

export default function ParallaxCardBlock({ children, translateX = [30, -30], opacity = [0.8, 1], className = "" }: Props) {
  return (
    <Parallax translateX={translateX} opacity={opacity} className={className}>
      {children}
    </Parallax>
  )
}