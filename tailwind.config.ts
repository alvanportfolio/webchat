import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          50: "var(--color-gray-50)",
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
          850: "var(--color-gray-850)",
          900: "var(--color-gray-900)",
          950: "var(--color-gray-950)",
        },
      },
      animation: {
        "shimmer-slide": "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
      },
      keyframes: {
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        "shimmer-slide": {
          "0%": {
            transform: "translate(-100%, 0)",
          },
          "100%": {
            transform: "translate(100%, 0)",
          },
        },
      },
      textShadow: {
        DEFAULT: '0 1px 3px rgba(0,0,0,0.8)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--color-gray-200)',
            a: {
              color: 'var(--color-gray-100)',
              '&:hover': {
                color: 'var(--color-gray-50)',
              },
            },
            h1: {
              color: 'var(--color-gray-100)',
            },
            h2: {
              color: 'var(--color-gray-100)',
            },
            h3: {
              color: 'var(--color-gray-100)',
            },
            h4: {
              color: 'var(--color-gray-100)',
            },
            strong: {
              color: 'var(--color-gray-100)',
            },
            code: {
              color: 'var(--color-gray-100)',
            },
            blockquote: {
              color: 'var(--color-gray-300)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      addUtilities(newUtilities)
    },
  ],
} satisfies Config;
