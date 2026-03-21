import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Colors ── */
      colors: {
        accent: {
          blue: "#00A8FF",
          cyan: "#00E5FF",
        },
        status: {
          success: "#00E676",
          warning: "#FFB300",
          error: "#FF1744",
        },
        brand: {
          "bg-primary-light": "#F5F7FF",
          "bg-surface-light": "#FFFFFF",
          "bg-card-light": "#F0F4FF",
          "bg-card-hover-light": "#E8EEFF",
          "text-primary-light": "#0A0F1E",
          "text-secondary-light": "#4A5568",
          "text-muted-light": "#8899AA",
          "border-light": "#E2E8F0",
          "bg-primary-dark": "#050810",
          "bg-surface-dark": "#0A0F1E",
          "bg-card-dark": "#0D1428",
          "bg-card-hover-dark": "#111B35",
          "text-primary-dark": "#F0F4FF",
          "text-secondary-dark": "#8899BB",
          "text-muted-dark": "#4A5878",
          "border-dark": "#1A2440",
        },
      },

      /* ── Fonts ── */
      fontFamily: {
        syne: ["Syne", "system-ui", "sans-serif"],
        "dm-sans": ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        bebas: ["Bebas Neue", "system-ui", "sans-serif"],
      },

      /* ── Border Radius ── */
      borderRadius: {
        card: "16px",
        btn: "10px",
        input: "8px",
      },

      /* ── Box Shadow ── */
      boxShadow: {
        "glow-blue": "0 0 40px rgba(0,168,255,0.35)",
        "glow-blue-lg": "0 0 60px rgba(0,168,255,0.5)",
        "glow-cyan": "0 0 40px rgba(0,229,255,0.35)",
        "card-light": "0 4px 24px rgba(0,0,0,0.06)",
        "card-dark": "0 4px 24px rgba(0,0,0,0.4)",
      },

      /* ── Background Images / Gradients ── */
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #0066FF, #00FFD1)",
        "brand-gradient-radial":
          "radial-gradient(ellipse at center, rgba(0,102,255,0.15) 0%, transparent 70%)",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,168,255,0.25), transparent)",
      },

      /* ── Animations ── */
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee 30s linear infinite reverse",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) both",
        scramble: "scramble 0.8s steps(10) both",
        "spin-slow": "spin 8s linear infinite",
        "border-glow": "borderGlow 2s ease-in-out infinite",
      },

      /* ── Keyframes ── */
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 20px rgba(0,168,255,0.4)",
          },
          "50%": {
            opacity: "0.75",
            boxShadow: "0 0 50px rgba(0,168,255,0.8), 0 0 80px rgba(0,229,255,0.4)",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(24px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        scramble: {
          "0%": { opacity: "0", letterSpacing: "0.5em" },
          "30%": { opacity: "0.5", letterSpacing: "0.2em" },
          "100%": { opacity: "1", letterSpacing: "normal" },
        },
        borderGlow: {
          "0%, 100%": {
            borderColor: "rgba(0,168,255,0.3)",
            boxShadow: "0 0 10px rgba(0,168,255,0.2)",
          },
          "50%": {
            borderColor: "rgba(0,229,255,0.7)",
            boxShadow: "0 0 30px rgba(0,229,255,0.5)",
          },
        },
      },

      /* ── Transition Timing ── */
      transitionTimingFunction: {
        brand: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      /* ── Screens ── */
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
}

export default config
