"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useSpring(useMotionValue(-100), { stiffness: 150, damping: 15 })
  const ringY = useSpring(useMotionValue(-100), { stiffness: 150, damping: 15 })
  const ringXVal = useMotionValue(-100)
  const ringYVal = useMotionValue(-100)
  const isHovering = useRef(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      ringXVal.set(e.clientX)
      ringYVal.set(e.clientY)
    }

    const overLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      isHovering.current = !!(target.closest("a") || target.closest("button"))
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", overLink)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", overLink)
    }
  }, [dotX, dotY, ringXVal, ringYVal])

  // spring follow
  const springX = useSpring(ringXVal, { stiffness: 80, damping: 18 })
  const springY = useSpring(ringYVal, { stiffness: 80, damping: 18 })

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-[var(--accent-blue)] hidden lg:block"
        style={{
          width: 36,
          height: 36,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: 0.6,
        }}
      />
      {/* Inner dot */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[var(--accent-blue)] hidden lg:block"
        style={{
          width: 6,
          height: 6,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  )
}
