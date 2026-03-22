"use client"

import Link from "next/link"
import { SOCIAL_LINKS } from "@/lib/constants"

/* ── Brand-coloured SVG icons ── */
function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
    </svg>
  )
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  )
}

/* ── Social data with brand colors ── */
export const SOCIAL_DATA = [
  {
    key: "facebook",
    label: "Facebook",
    href: SOCIAL_LINKS.facebook,
    Icon: FacebookIcon,
    color: "#1877F2",
    bg: "rgba(24,119,242,0.12)",
    hoverBg: "rgba(24,119,242,0.22)",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
    Icon: LinkedInIcon,
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.12)",
    hoverBg: "rgba(10,102,194,0.22)",
  },
  {
    key: "instagram",
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    Icon: InstagramIcon,
    color: "#E1306C",
    bg: "rgba(225,48,108,0.12)",
    hoverBg: "rgba(225,48,108,0.22)",
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: SOCIAL_LINKS.tiktok,
    Icon: TikTokIcon,
    color: "#69C9D0",
    bg: "rgba(105,201,208,0.12)",
    hoverBg: "rgba(105,201,208,0.22)",
  },
  {
    key: "youtube",
    label: "YouTube",
    href: SOCIAL_LINKS.youtube,
    Icon: YouTubeIcon,
    color: "#FF0000",
    bg: "rgba(255,0,0,0.10)",
    hoverBg: "rgba(255,0,0,0.20)",
  },
]

/* ── Footer variant: circle icon buttons ── */
export function FooterSocialIcons() {
  return (
    <div className="flex items-center gap-2">
      {SOCIAL_DATA.map(({ key, label, href, Icon, color, bg, hoverBg }) => (
        <Link
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            width: 36,
            height: 36,
            background: bg,
            color,
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.background = hoverBg
            ;(e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.background = bg
            ;(e.currentTarget as HTMLElement).style.transform = "translateY(0)"
          }}
        >
          <Icon size={16} />
        </Link>
      ))}
    </div>
  )
}

/* ── Contact page variant: icon + label rows ── */
export function ContactSocialLinks() {
  return (
    <div className="flex flex-col gap-3">
      {SOCIAL_DATA.map(({ key, label, href, Icon, color, bg, hoverBg }) => (
        <Link
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-200"
          style={{ background: bg, color }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLElement).style.background = hoverBg
            ;(e.currentTarget as HTMLElement).style.transform = "translateX(4px)"
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.background = bg
            ;(e.currentTarget as HTMLElement).style.transform = "translateX(0)"
          }}
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-full" style={{ background: color + "22" }}>
            <Icon size={15} />
          </span>
          <span className="text-sm font-medium" style={{ color }}>
            {label}
          </span>
        </Link>
      ))}
    </div>
  )
}
