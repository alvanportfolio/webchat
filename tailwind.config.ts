import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
            // Add specific overrides for lists and paragraphs for better spacing
            p: {
              marginTop: '0.5em', // Default for standalone paragraphs
              marginBottom: '0.5em',
              lineHeight: '1.625',
            },
            ul: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
              paddingLeft: '1.65em', // Adjusted for marker alignment
            },
            ol: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
              paddingLeft: '1.65em', // Adjusted for marker alignment
            },
            li: {
              marginTop: '0.2em', // Reduced margin for list items
              marginBottom: '0.2em',
            },
            // Crucial: Remove margins from paragraphs, and nested lists directly inside list items
            'li > p': {
              marginTop: '0',
              marginBottom: '0',
            },
            'li > ul': {
              marginTop: '0.2em', // Small margin for nested lists
              marginBottom: '0.2em',
            },
            'li > ol': {
              marginTop: '0.2em', // Small margin for nested lists
              marginBottom: '0.2em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      addUtilities(newUtilities)
    }),
  ],
} satisfies Config;
