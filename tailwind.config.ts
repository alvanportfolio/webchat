import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			gray: {
  				'50': 'var(--color-gray-50)',
  				'100': 'var(--color-gray-100)',
  				'200': 'var(--color-gray-200)',
  				'300': 'var(--color-gray-300)',
  				'400': 'var(--color-gray-400)',
  				'500': 'var(--color-gray-500)',
  				'600': 'var(--color-gray-600)',
  				'700': 'var(--color-gray-700)',
  				'800': 'var(--color-gray-800)',
  				'850': 'var(--color-gray-850)',
  				'900': 'var(--color-gray-900)',
  				'950': 'var(--color-gray-950)'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
  			'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear'
  		},
  		keyframes: {
  			'spin-around': {
  				'0%': {
  					transform: 'translateZ(0) rotate(0)'
  				},
  				'15%, 35%': {
  					transform: 'translateZ(0) rotate(90deg)'
  				},
  				'65%, 85%': {
  					transform: 'translateZ(0) rotate(270deg)'
  				},
  				'100%': {
  					transform: 'translateZ(0) rotate(360deg)'
  				}
  			},
  			'shimmer-slide': {
  				'0%': {
  					transform: 'translate(-100%, 0)'
  				},
  				'100%': {
  					transform: 'translate(100%, 0)'
  				}
  			}
  		},
  		textShadow: {
  			DEFAULT: '0 1px 3px rgba(0,0,0,0.8)'
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					color: 'var(--color-gray-200)',
  					maxWidth: 'none',
  					a: {
  						color: '#3b82f6',
  						textDecoration: 'none',
  						'&:hover': {
  							textDecoration: 'underline'
  						}
  					},
  					h1: {
  						color: 'var(--color-gray-100)',
  						marginTop: '1.25em',
  						marginBottom: '0.5em',
  						lineHeight: '1.2'
  					},
  					h2: {
  						color: 'var(--color-gray-100)',
  						marginTop: '1em',
  						marginBottom: '0.5em',
  						lineHeight: '1.2'
  					},
  					h3: {
  						color: 'var(--color-gray-100)',
  						marginTop: '0.875em',
  						marginBottom: '0.5em',
  						lineHeight: '1.2'
  					},
  					h4: {
  						color: 'var(--color-gray-100)',
  						marginTop: '0.875em',
  						marginBottom: '0.5em',
  						lineHeight: '1.2'
  					},
  					strong: {
  						color: 'var(--color-gray-100)',
  						fontWeight: '600'
  					},
  					code: {
  						color: 'var(--color-gray-100)',
  						backgroundColor: 'rgba(55, 65, 81, 0.3)',
  						paddingLeft: '0.25rem',
  						paddingRight: '0.25rem',
  						paddingTop: '0.125rem',
  						paddingBottom: '0.125rem',
  						borderRadius: '0.25rem',
  						fontWeight: '400',
  						fontSize: '0.875em'
  					},
  					blockquote: {
  						color: 'var(--color-gray-300)',
  						borderLeftColor: 'rgba(75, 85, 99, 0.5)',
  						borderLeftWidth: '4px',
  						paddingLeft: '1rem',
  						fontStyle: 'normal'
  					},
  					p: {
  						marginTop: '0.75em',
  						marginBottom: '0.75em',
  						lineHeight: '1.625'
  					},
  					ul: {
  						marginTop: '0.5em',
  						marginBottom: '0.5em',
  						paddingLeft: '1.625em'
  					},
  					ol: {
  						marginTop: '0.5em',
  						marginBottom: '0.5em',
  						paddingLeft: '1.625em'
  					},
  					li: {
  						marginTop: '0.25em',
  						marginBottom: '0.25em',
  						paddingLeft: '0.375em'
  					},
  					'ul > li::marker': {
  						color: 'var(--color-gray-400)'
  					},
  					'ol > li::marker': {
  						color: 'var(--color-gray-400)'
  					},
  					'li > p': {
  						marginTop: '0.125em',
  						marginBottom: '0.125em'
  					},
  					'li > ul': {
  						marginTop: '0.25em',
  						marginBottom: '0.25em'
  					},
  					'li > ol': {
  						marginTop: '0.25em',
  						marginBottom: '0.25em'
  					},
  					table: {
  						fontSize: '0.875em'
  					},
  					pre: {
  						backgroundColor: 'transparent',
  						padding: 0,
  						margin: 0,
  						color: 'inherit',
  						fontSize: 'inherit',
  						lineHeight: 'inherit',
  						overflowX: 'auto'
  					},
  					'pre code': {
  						backgroundColor: 'transparent',
  						padding: 0,
  						fontSize: 'inherit',
  						color: 'inherit',
  						fontWeight: 'inherit',
  						fontFamily: 'inherit'
  					}
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
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
      require("tailwindcss-animate")
],
} satisfies Config;
