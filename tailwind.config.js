/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}',
    './examples/**/*.{html,js}',
    './docs/**/*.{html,md,vue}',
    './components/**/*.{html,js,jsx,ts,tsx}'
  ],
  
  darkMode: ['class', '[data-theme="dark"]'],
  
  theme: {
    // === BREAKPOINTS RESPONSIVOS ===
    screens: {
      'xs': '375px',    // Mobile small
      'sm': '640px',    // Mobile large 
      'md': '768px',    // Tablet
      'lg': '1024px',   // Desktop small
      'xl': '1280px',   // Desktop large
      '2xl': '1536px',  // Desktop XL
      
      // Breakpoints de utilidad
      'mobile-only': {'max': '767px'},
      'tablet-only': {'min': '768px', 'max': '1023px'},
      'desktop-only': {'min': '1024px'},
      
      // Breakpoints de accesibilidad
      'motion-safe': {'raw': '(prefers-reduced-motion: no-preference)'},
      'motion-reduce': {'raw': '(prefers-reduced-motion: reduce)'},
      'contrast-more': {'raw': '(prefers-contrast: more)'},
      'contrast-less': {'raw': '(prefers-contrast: less)'},
      'high-contrast': {'raw': '(prefers-contrast: high)'}
    },

    extend: {
      // === ANCLORA BRAND COLORS ===
      colors: {
        brand: {
          // Paleta principal
          700: '#213A57', // Navy Deep - AAA contrast
          600: '#0B6477', // Ocean Dark - AA contrast
          500: '#14919B', // Teal Core  
          400: '#0AD1C8', // Turquoise Vibrant - Solo decorativo
          300: '#45DFB1', // Aqua Fresh
          200: '#80ED99', // Mint Light
          
          // Variantes accesibles (TAREA 3)
          '400-accessible': '#048A81', // AA contrast para texto
          '400-alt': '#036B63',        // AAA contrast alternativo
          '300-dark-bg': '#2DD4AA',    // Verde agua para fondos oscuros
        },
        
        // Colores de superficie
        surface: {
          0: '#FFFFFF',    // Blanco puro
          50: '#F8FAFC',   // Off-white suave
          100: '#F1F5F9',  // Gris muy claro
          200: '#E2E8F0',  // Gris claro
          300: '#CBD5E1',  // Gris medio claro
          400: '#94A3B8',  // Gris medio
          500: '#64748B',  // Gris
          600: '#475569',  // Gris oscuro
          700: '#334155',  // Gris muy oscuro
          800: '#0D1F22',  // Carbon
          900: '#081B1B',  // Navy Black
        },

        // === COLORES SEMÁNTICOS ACCESIBLES ===
        success: {
          50: '#F0FDF9',
          100: '#DCFCE7',
          400: '#22C55E',   // Solo iconos/decoración
          500: '#16A34A',   // AA - texto pequeño  
          600: '#15803D',   // AAA - texto principal
          700: '#166534',   // AAA - alto contraste
        },
        
        warning: {
          50: '#FFFBEB',
          400: '#FBBF24',   // AA Large
          500: '#F59E0B',   // AA
          600: '#D97706',   // AAA
        },
        
        error: {
          50: '#FEF2F2',
          400: '#F87171',   // AA Large
          500: '#EF4444',   // AA
          600: '#DC2626',   // AAA
        },
        
        info: {
          50: '#F0F9FF',
          500: '#048A81',   // brand-400-accessible
          600: '#0B6477',   // brand-600
        },

        // === COLORES DE FOCUS Y ESTADOS ===
        focus: {
          ring: '#0AD1C8',        // Anillo de focus principal
          'ring-dark': '#45DFB1', // Anillo para modo oscuro
          outline: '#048A81',     // Outline accesible
          'offset': '#FFFFFF',    // Color de offset
        }
      },

      // === TIPOGRAFÍA ANCLORA ===
      fontFamily: {
        brand: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      
      fontSize: {
        // Tamaños con line-height integrado
        'xs-a11y': ['12px', { lineHeight: '18px' }],  // Solo AAA colors
        'sm-a11y': ['14px', { lineHeight: '20px' }],  // Solo AA+ colors
        'base-a11y': ['16px', { lineHeight: '24px' }], // Cualquier color AA
        'lg-a11y': ['18px', { lineHeight: '28px' }],   // AA Large permitido
        
        // Escala de marca
        'brand-h1': ['56px', { lineHeight: '64px', letterSpacing: '0.02em' }],
        'brand-h2': ['40px', { lineHeight: '48px', letterSpacing: '0.02em' }],
        'brand-h3': ['32px', { lineHeight: '40px', letterSpacing: '0.025em' }],
      },

      // === ESPACIADO Y SIZING ===
      spacing: {
        // Touch targets accesibles
        'touch-sm': '44px',   // Mínimo móvil
        'touch': '48px',      // Recomendado
        'touch-lg': '56px',   // Cómodo
        
        // Espaciado de focus
        'focus-offset': '2px',
        'focus-width': '3px',
        
        // Grid Anclora (escala 4pt)
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '30': '7.5rem',   // 120px
      },

      // === BORDER RADIUS ANCLORA ===
      borderRadius: {
        'anclora-sm': '8px',
        'anclora': '12px', 
        'anclora-lg': '16px',
        'anclora-xl': '24px',
      },

      // === SHADOWS CON MARCA ===
      boxShadow: {
        'anclora-sm': '0 2px 8px rgba(33, 58, 87, 0.08)',
        'anclora': '0 4px 16px rgba(33, 58, 87, 0.12)',
        'anclora-lg': '0 8px 32px rgba(33, 58, 87, 0.16)',
        'anclora-xl': '0 16px 48px rgba(33, 58, 87, 0.20)',
        'anclora-glass': '0 8px 32px rgba(10, 209, 200, 0.1)',
        
        // Focus shadows
        'focus': '0 0 0 3px rgba(10, 209, 200, 0.3)',
        'focus-dark': '0 0 0 3px rgba(69, 223, 177, 0.3)',
      },

      // === GRADIENTES ANCLORA ===
      backgroundImage: {
        'anclora-primary': 'linear-gradient(135deg, #0AD1C8 0%, #45DFB1 50%, #80ED99 100%)',
        'anclora-dark': 'linear-gradient(135deg, #213A57 0%, #0B6477 50%, #14919B 100%)',
        'anclora-button': 'linear-gradient(90deg, #0B6477 0%, #048A81 100%)',
        'anclora-card': 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(10,209,200,0.05) 100%)',
      },

      // === ANIMACIONES Y TRANSICIONES ===
      animation: {
        // Anclora microinteractions
        'anclora-wave': 'anclora-wave 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'anclora-pulse': 'anclora-pulse 2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite', 
        'anclora-bounce': 'anclora-bounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'anclora-shimmer': 'anclora-shimmer 2s cubic-bezier(0.25, 1, 0.5, 1) infinite',
        'anclora-float': 'anclora-wave 6s ease-in-out infinite',
        'anclora-tech-spin': 'anclora-tech-spin 2s linear infinite',
        
        // Loading states
        'loading-dots': 'loading-dots 1.4s ease-in-out infinite both',
        'gradient-flow': 'anclora-gradient-flow 3s ease-in-out infinite',
      },
      
      // Keyframes personalizados (definidos en CSS)
      keyframes: {
        'anclora-wave': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)', opacity: '1' },
          '50%': { transform: 'translateY(-5px) scale(1.02)', opacity: '0.9' },
        },
        'anclora-pulse': {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(10, 209, 200, 0.7)' },
          '50%': { transform: 'scale(1.03)', boxShadow: '0 0 0 8px rgba(10, 209, 200, 0.3)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(10, 209, 200, 0)' },
        }
      },

      // === EASING PERSONALIZADO ===
      transitionTimingFunction: {
        'anclora-wave': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'anclora-anchor': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'anclora-tech': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'anclora-flow': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'anclora-calm': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },

      // === Z-INDEX SYSTEM ===
      zIndex: {
        'dropdown': 1000,
        'sticky': 1020,
        'fixed': 1030,
        'modal-backdrop': 1040,
        'modal': 1050,
        'popover': 1060,
        'tooltip': 1070,
        'notification': 9999,
      },

      // === BACKDROP BLUR ===
      backdropBlur: {
        'anclora': '8px',
        'anclora-lg': '12px',
        'anclora-xl': '16px',
      },

      // === ASPECT RATIOS ===
      aspectRatio: {
        'anclora-card': '4 / 3',
        'anclora-banner': '16 / 9',
        'anclora-square': '1 / 1',
      }
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    
    // === PLUGIN PERSONALIZADO ANCLORA ===
    function({ addComponents, addUtilities, theme }) {
      
      // === COMPONENTES BASE ACCESIBLES ===
      addComponents({
        // Botones accesibles
        '.btn-anclora': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: theme('spacing.touch'),
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.anclora'),
          fontWeight: '600',
          fontSize: theme('fontSize.base-a11y[0]'),
          lineHeight: theme('fontSize.base-a11y[1].lineHeight'),
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          cursor: 'pointer',
          border: 'none',
          textDecoration: 'none',
          
          '&:focus': {
            outline: 'none',
            boxShadow: theme('boxShadow.focus'),
          },
          
          '&:disabled': {
            opacity: '0.6',
            cursor: 'not-allowed',
            transform: 'none',
          }
        },

        '.btn-anclora-primary': {
          background: theme('backgroundImage.anclora-button'),
          color: theme('colors.surface.0'),
          
          '&:hover:not(:disabled)': {
            filter: 'brightness(1.1)',
            transform: 'translateY(-1px)',
          },
        },

        '.btn-anclora-secondary': {
          backgroundColor: 'transparent',
          color: theme('colors.brand.400-accessible'),
          border: `2px solid ${theme('colors.brand.400-accessible')}`,
          
          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.brand.400-accessible'),
            color: theme('colors.surface.0'),
          },
        },

        // Cards accesibles
        '.card-anclora': {
          backgroundColor: theme('colors.surface.0'),
          borderRadius: theme('borderRadius.anclora-lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.anclora'),
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          border: `1px solid ${theme('colors.surface.200')}`,
          
          '&:focus-within': {
            outline: 'none',
            boxShadow: `${theme('boxShadow.anclora-lg')}, ${theme('boxShadow.focus')}`,
          },
          
          // Dark mode
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: theme('colors.surface.800'),
            borderColor: theme('colors.surface.600'),
          },
        },

        // Glass effect
        '.glass-anclora': {
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          
          '@media (prefers-color-scheme: dark)': {
            backgroundColor: 'rgba(33, 58, 87, 0.25)',
          },
        },

        // Inputs accesibles  
        '.input-anclora': {
          width: '100%',
          minHeight: theme('spacing.touch'),
          padding: theme('spacing.3'),
          backgroundColor: theme('colors.surface.0'),
          border: `2px solid ${theme('colors.surface.300')}`,
          borderRadius: theme('borderRadius.anclora'),
          fontSize: theme('fontSize.base-a11y[0]'),
          lineHeight: theme('fontSize.base-a11y[1].lineHeight'),
          color: theme('colors.brand.700'),
          transition: 'all 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
          
          '&::placeholder': {
            color: theme('colors.surface.500'),
          },
          
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.focus.outline'),
            boxShadow: theme('boxShadow.focus'),
          },
          
          '&:invalid': {
            borderColor: theme('colors.error.500'),
          },
          
          '&:invalid:focus': {
            boxShadow: `0 0 0 3px ${theme('colors.error.500')}33`,
          },
        },
      });

      // === UTILIDADES PERSONALIZADAS ===
      addUtilities({
        // Utilidades de accesibilidad
        '.sr-only-focusable': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
          
          '&:focus': {
            position: 'static',
            width: 'auto',
            height: 'auto',
            padding: 'inherit',
            margin: 'inherit',
            overflow: 'visible',
            clip: 'auto',
            whiteSpace: 'normal',
          },
        },

        // Skip links
        '.skip-link': {
          position: 'absolute',
          top: '-40px',
          left: '6px',
          background: theme('colors.brand.700'),
          color: theme('colors.surface.0'),
          padding: '8px 16px',
          textDecoration: 'none',
          borderRadius: '4px',
          zIndex: theme('zIndex.notification'),
          fontWeight: '600',
          fontSize: theme('fontSize.sm'),
          transition: 'top 0.2s ease',
          
          '&:focus': {
            top: '6px',
          },
        },

        // Touch optimizations
        '.touch-target': {
          minHeight: theme('spacing.touch'),
          minWidth: theme('spacing.touch'),
        },

        '.touch-target-lg': {
          minHeight: theme('spacing.touch-lg'),
          minWidth: theme('spacing.touch-lg'),
        },

        // Performance optimizations
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          willChange: 'transform, opacity',
        },

        // Motion utilities
        '.motion-safe-only': {
          '@media (prefers-reduced-motion: reduce)': {
            animation: 'none !important',
            transition: 'none !important',
            transform: 'none !important',
          },
        },

        // High contrast utilities
        '.high-contrast-border': {
          '@media (prefers-contrast: high)': {
            border: '2px solid currentColor !important',
          },
        },

        // Theme utilities
        '.theme-transition': {
          transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
        },
      });
    },
  ],
};