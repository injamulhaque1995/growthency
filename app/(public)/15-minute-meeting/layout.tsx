import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book a Free 15-Min Call",
  description:
    "Stop wasting time on repetitive tasks. In 15 minutes, we'll identify your biggest business bottleneck and show you exactly how to fix it — for free.",
}

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
