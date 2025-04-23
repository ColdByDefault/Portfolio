"use client"
import { Parallax } from "react-scroll-parallax"

type Props = {
  children: React.ReactNode
  translateY?: [number, number]
  className?: string
}

export default function ParallaxHeading({ children, translateY = [10, -10], className = "" }: Props) {
  return (
    <Parallax translateY={translateY} className={className}>
      {children}
    </Parallax>
  )
}
