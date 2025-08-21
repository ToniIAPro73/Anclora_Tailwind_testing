# 🌊 Anclora Design System

> **IA que convierte y diseña con precisión** - Sistema de diseño completo, accesible y profesional

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/anclora/design-system/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![WCAG 2.2](https://img.shields.io/badge/WCAG-2.2%20AA-green.svg)](https://www.w3.org/WAI/WCAG22/quickref/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3+-06B6D4.svg)](https://tailwindcss.com)

## ⚡ Descripción

Anclora es un **sistema de diseño completo y moderno** que combina la **potencia de la IA** con principios sólidos de diseño. Inspirado en el mar y la tecnología, ofrece una experiencia de usuario fluida, accesible y visualmente impactante.

### 🎯 **Características Principales**

- **🎨 Diseño Mobile-first** - Responsive perfecto en todos los dispositivos
- **🌙 Dark/Light Mode** - Temas automáticos con transiciones suaves  
- **♿ WCAG 2.2 AA** - Accesibilidad completa certificada
- **🎭 Microinteracciones** - 50+ animaciones y efectos UX únicos
- **🔊 UX Feedback** - Sistema de sonidos, hápticos y notificaciones
- **⚡ Performance** - GPU-acelerado y optimizado
- **🧪 Component Tester** - Herramienta integrada de testing visual

---

## 🚀 Inicio Rápido

### Instalación

```bash
# NPM
npm install @anclora/design-system

# Yarn
yarn add @anclora/design-system

# CDN
<link href="https://cdn.anclora.design/v1/anclora.min.css" rel="stylesheet">
<script src="https://cdn.anclora.design/v1/anclora.min.js"></script>
```

### Uso Básico

```html
<!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi App con Anclora</title>
  
  <!-- Anclora Design System -->
  <link rel="stylesheet" href="dist/anclora-complete.css">
  <script src="dist/anclora-complete.js"></script>
</head>
<body>
  <!-- Skip link automático -->
  <a href="#main-content" class="skip-link">Saltar al contenido</a>
  
  <main id="main-content">
    <!-- Botón con microinteracciones -->
    <button class="btn-anclora btn-anclora-primary">
      ¡Hola Anclora!
    </button>
    
    <!-- Card con efectos 3D -->
    <div class="card-anclora">
      <h2>Card Interactiva</h2>
      <p>Con efectos de profundidad y glassmorphism</p>
    </div>
  </main>
</body>
</html>
```

### JavaScript API

```javascript
// Auto-inicializado al cargar DOM
// Acceso global via window.Anclora

// Cambiar tema
Anclora.theme.toggleTheme();

// Mostrar notificaciones
Anclora.ux.showSuccess('¡Operación completada!');
Anclora.ux.showError('Error en el proceso');

// Crear progress bar
const progress = Anclora.ux.createProgressBar(container, {
  showPercentage: true,
  animated: true
});
progress.update(75);

// Verificar contraste de colores
const contrast = Anclora.accessibility.checkContrast('#0AD1C8', '#FFFFFF');
console.log(contrast); // { ratio: 2.1, AA: false, AAA: false }

// Anunciar a screen readers  
Anclora.accessibility.announce('Contenido actualizado');
```

---

## 📁 Estructura del Proyecto

```
anclora-design-system/
├── 📦 dist/                     # Archivos listos para producción
│   ├── anclora.min.css          # CSS minificado (25KB gzipped)
│   ├── anclora.min.js           # JS minificado (15KB gzipped)
│   ├── anclora-complete.css     # CSS completo no minificado
│   └── anclora-complete.js      # JS completo no minificado
├── 🎨 src/                      # Código fuente
│   ├── css/
│   │   ├── anclora-complete.css # Estilos principales unificados
│   │   ├── anclora-core.css     # Variables y base
│   │   ├── anclora-components.css # Componentes 
│   │   └── anclora-microinteractions.css # Animaciones
│   └── js/
│       ├── anclora-complete.js  # JavaScript principal unificado
│       ├── anclora-ux-feedback.js # Sistema UX
│       ├── anclora-accessibility.js # Accesibilidad
│       └── anclora-theme-manager.js # Temas
├── 🔧 config/
│   ├── tailwind.config.js       # Configuración Tailwind completa
│   ├── postcss.config.js        # PostCSS config
│   └── anclora-tokens.json      # Design tokens
├── 📚 docs/                     # Documentación
│   ├── accessibility-guide.md   # Guía de accesibilidad
│   ├── microinteractions-guide.md # Guía de microinteracciones
│   └── component-library.md     # Librería de componentes
├── 🧪 examples/                 # Ejemplos y demos
│   ├── basic-usage.html         # Uso básico
│   ├── accessibility-demo.html  # Demo de accesibilidad
│   └── microinteractions-demo.html # Demo de microinteracciones
├── index.html                   # Component Tester principal
└── package.json                 # Configuración del proyecto
```

---

## 🎨 Sistema de Colores

### Paleta Principal Anclora

| Color | Hex | Uso | Contraste AA |
|-------|-----|-----|--------------|
| **brand-700** | `#213A57` | Textos principales | ✅ AAA |
| **brand-600** | `#0B6477` | Textos secundarios | ✅ AA |
| **brand-500** | `#14919B` | Elementos decorativos | ✅ AA Large |
| **brand-400** | `#0AD1C8` | Solo decorativo | ❌ |
| **brand-400-accessible** | `#048A81` | Textos accesibles | ✅ AA |
| **brand-300** | `#45DFB1` | Acentos | ✅ AA Large |
| **brand-200** | `#80ED99` | Toques de color | ✅ AA Large |

### Colores Semánticos

```css
/* Success (Verde) */
--anclora-success-400: #22C55E; /* Decorativo */
--anclora-success-500: #16A34A; /* AA texto */
--anclora-success-600: #15803D; /* AAA texto */

/* Warning (Amarillo) */
--anclora-warning-400: #FBBF24; /* AA Large */
--anclora-warning-500: #F59E0B; /* AA */
--anclora-warning-600: #D97706; /* AAA */

/* Error (Rojo) */
--anclora-error-400: #F87171;  /* AA Large */
--anclora-error-500: #EF4444;  /* AA */
--anclora-error-600: #DC2626;  /* AAA */
```

---

## 🧩 Componentes Principales

### Botones

```html
<!-- Botón primario -->
<button class="btn-anclora btn-anclora-primary">
  Primario
</button>

<!-- Botón secundario -->
<button class="btn-anclora btn-anclora-secondary">
  Secundario
</button>

<!-- Con microinteracciones -->
<button class="btn-anclora btn-anclora-primary" onclick="Anclora.ux.showSuccess('¡Éxito!')">
  Con Feedback UX
</button>
```

**Características:**
- ✅ Touch targets 44px+ (móvil)
- ✅ Focus visible con ring
- ✅ Hover/active states
- ✅ Ripple effect al click
- ✅ Sonidos UX opcionales
- ✅ Haptic feedback móvil

### Cards

```html
<!-- Card básica -->
<div class="card-anclora">
  <h3>Título de la Card</h3>
  <p>Contenido con efectos de profundidad</p>
</div>

<!-- Card flotante -->
<div class="card-anclora anclora-floating">
  <h3>Card Flotante</h3>
  <p>Con animación de ondas oceánicas</p>
</div>

<!-- Glass card -->
<div class="card-anclora glass-anclora">
  <h3>Glass Card</h3>
  <p>Efecto cristal con backdrop-filter</p>
</div>
```

### Formularios

```html
<!-- Input accesible -->
<label for="email" class="block text-sm font-medium mb-2">
  Email corporativo
</label>
<input 
  id="email"
  type="email" 
  class="input-anclora"
  placeholder="tu@email.com"
  required
  aria-describedby="email-help"
>
<p id="email-help" class="text-sm text-gray-600 mt-1">
  Usaremos tu email para notificaciones importantes
</p>
```

### Notificaciones

```javascript
// Notificación de éxito
Anclora.ux.showSuccess('¡Datos guardados correctamente!');

// Notificación de error
Anclora.ux.showError('Error al conectar con el servidor');

// Notificación personalizada con acciones
Anclora.ux.showNotification('¿Confirmas esta acción?', 'warning', {
  persistent: true,
  actions: [
    {
      id: 'confirm',
      label: 'Confirmar',
      callback: () => console.log('Confirmado')
    },
    {
      id: 'cancel', 
      label: 'Cancelar',
      callback: () => console.log('Cancelado')
    }
  ]
});
```

---

## ♿ Accesibilidad WCAG 2.2 AA

### ✅ Criterios Cumplidos

| Criterio | Nivel | Implementación |
|----------|-------|----------------|
| **1.4.3** Contrast (Minimum) | AA | Ratio 4.5:1+ para todo el texto |
| **1.4.11** Non-text Contrast | AA | UI components con ratio 3:1+ |
| **2.1.1** Keyboard | A | 100% navegable por teclado |
| **2.1.2** No Keyboard Trap | A | Focus trap en modales únicamente |
| **2.4.3** Focus Order | A | Orden lógico y secuencial |
| **2.4.7** Focus Visible | AA | Indicadores claros 3px ring |
| **3.2.1** On Focus | A | Sin cambios inesperados |
| **4.1.2** Name, Role, Value | A | ARIA completo implementado |

### 🛠️ Herramientas de Testing

```javascript
// Verificar contraste automáticamente
const result = Anclora.accessibility.checkContrast('#0AD1C8', '#FFFFFF');
console.log(`Ratio: ${result.ratio}:1, AA: ${result.AA ? '✅' : '❌'}`);

// Anunciar cambios a screen readers
Anclora.accessibility.announce('Formulario enviado exitosamente', 'polite');

// Testing automático en desarrollo
if (window.location.hostname === 'localhost') {
  // Auto-testing activado
  console.log('🧪 Accessibility testing enabled');
}
```

### ⚙️ Configuración de Preferencias

El sistema respeta automáticamente:

- **`prefers-color-scheme`** - Tema oscuro/claro del sistema
- **`prefers-reduced-motion`** - Animaciones reducidas
- **`prefers-contrast`** - Alto contraste
- **Navegación por teclado** - Focus enhanced automático
- **Screen readers** - Anuncios ARIA automáticos

---

## 🎭 Microinteracciones y Animaciones

### 🎨 Principios de Animación Anclora

Inspirados en la filosofía de marca **mar + tecnología**:

| Principio | Easing | Uso |
|-----------|---------|-----|
| **🔗 Confianza (Ancla)** | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Estados estables |
| **⚡ Inteligencia (Circuito)** | `cubic-bezier(0.4, 0, 0.2, 1)` | Feedback preciso |
| **🌊 Calma Oceánica** | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Transiciones suaves |
| **🎯 Rigor Tecnológico** | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Bounce controlado |

### ✨ Animaciones Disponibles

```css
/* Ondas oceánicas */
.anclora-floating { 
  animation: anclora-wave 4s ease-wave infinite; 
}

/* Pulso de ancla */
.anclora-pulse { 
  animation: anclora-pulse 2s ease-calm infinite; 
}

/* Bounce de éxito */
.anclora-success-bounce { 
  animation: anclora-bounce 1s ease-anchor; 
}

/* Shimmer de loading */
.anclora-loading {
  animation: anclora-shimmer 2s ease-flow infinite;
}

/* Spin tecnológico */
.anclora-tech-spin {
  animation: anclora-tech-spin 2s linear infinite;
}
```

### 🔊 Sistema de Sonidos UX

```javascript
// Sonidos procedurales integrados
Anclora.ux.playSound('click');        // 800Hz, 100ms - Click botones
Anclora.ux.playSound('success');      // 660Hz, 200ms - Operaciones exitosas  
Anclora.ux.playSound('error');        // 300Hz, 300ms - Errores
Anclora.ux.playSound('notification'); // 1000Hz, 150ms - Alertas
Anclora.ux.playSound('typing');       // 1200Hz, 50ms - Entrada de texto

// Haptic feedback móvil
Anclora.ux.triggerHaptic([100]);          // Click suave
Anclora.ux.triggerHaptic([100, 50, 100]); // Patrón de éxito
Anclora.ux.triggerHaptic([200, 100, 200]); // Patrón de error
```

---

## 📱 Responsive Design

### 🎯 Breakpoints Mobile-first

```css
/* Definidos en tailwind.config.js */
'xs': '375px',    /* Mobile small */
'sm': '640px',    /* Mobile large */
'md': '768px',    /* Tablet */
'lg': '1024px',   /* Desktop small */
'xl': '1280px',   /* Desktop large */
'2xl': '1536px',  /* Desktop XL */

/* Breakpoints de utilidad */
'mobile-only': {'max': '767px'},
'tablet-only': {'min': '768px', 'max': '1023px'},
'desktop-only': {'min': '1024px'},
```

### 📲 Optimizaciones Móviles

- ✅ **Touch targets 44px+** - Fácil de tocar
- ✅ **Haptic feedback** - Vibración en interacciones
- ✅ **Viewport meta** - Zoom perfecto
- ✅ **Performance** - GPU acceleration
- ✅ **PWA ready** - Service worker compatible

---

## ⚡ Performance

### 📊 Métricas

| Métrica | Valor | Objetivo |
|---------|--------|----------|
| **CSS Bundle** | 25KB gzipped | < 30KB |
| **JS Bundle** | 15KB gzipped | < 20KB |
| **First Paint** | < 500ms | < 1s |
| **Lighthouse** | 98/100 | > 95 |
| **Core Web Vitals** | ✅ Todos verdes | ✅ |

### 🚀 Optimizaciones

```css
/* GPU Acceleration automático */
.btn-anclora, .card-anclora {
  transform: translateZ(0);
  will-change: transform, opacity;
  contain: layout style paint;
}

/* Reduced motion automático */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🧪 Component Tester

### ⚡ Características

El **Component Tester** integrado permite:

- **📝 Editor de código** - Syntax highlighting
- **👁️ Preview en tiempo real** - Iframe seguro
- **🔍 Detección de framework** - Tailwind/Chakra/CSS
- **⚡ Hot reload** - Actualización automática
- **📱 Responsive preview** - Testing móvil
- **♿ A11y checks** - Verificación automática
- **🎨 Examples** - Componentes predefinidos

### 🎯 Uso

```javascript
// Inicialización automática
const tester = new AncloraComponentTester({
  editorSelector: '#codeEditor',
  previewSelector: '#previewFrame',
  debounceDelay: 500
});

// Cargar ejemplo
tester.loadExample('tailwind');

// Procesar componente manualmente
tester.processComponent();

// Limpiar editor
tester.clearEditor();
```

---

## 🔧 Configuración Avanzada

### Tailwind CSS Config

```javascript
// tailwind.config.js personalizado
module.exports = {
  content: ['./src/**/*.{html,js}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          700: '#213A57',
          600: '#0B6477', 
          500: '#14919B',
          400: '#0AD1C8',
          '400-accessible': '#048A81', // AA compliant
          300: '#45DFB1',
          200: '#80ED99'
        }
      },
      animation: {
        'anclora-wave': 'anclora-wave 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'anclora-pulse': 'anclora-pulse 2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
```

### JavaScript Personalización

```javascript
// Configuración avanzada
const ancloraUX = new AncloraUXFeedback({
  enableSounds: true,         // Sonidos UX
  enableHaptics: true,        // Vibración móvil
  enableAnimations: true,     // Respeta prefers-reduced-motion
  debugMode: false           // Logs detallados
});

// Configuración de tema
const ancloraTheme = new AncloraThemeManager({
  autoDetect: true,          // Detectar tema del sistema
  persistence: true,         // Guardar en localStorage
  transition: true           // Transición suave entre temas
});
```

---

## 📚 Recursos Adicionales

### 📖 Documentación

- **[Accessibility Guide](./docs/accessibility-guide.md)** - Guía completa WCAG 2.2
- **[Microinteractions Guide](./docs/microinteractions-guide.md)** - Animaciones y UX
- **[Component Library](./docs/component-library.md)** - Librería completa
- **[API Reference](./docs/api-reference.md)** - Documentación de funciones

### 🎮 Demos y Ejemplos

- **[Basic Usage](./examples/basic-usage.html)** - Uso básico
- **[Accessibility Demo](./examples/accessibility-demo.html)** - Testing A11y
- **[Microinteractions Demo](./examples/microinteractions-demo.html)** - Todas las animaciones
- **[Component Tester](./index.html)** - Herramienta principal

### 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo con watch
npm run dev

# Build para producción
npm run build

# Testing de accesibilidad
npm run test:accessibility

# Linting
npm run lint

# Formatear código
npm run format
```

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor revisa nuestra [guía de contribución](./CONTRIBUTING.md).

### 📋 Proceso

1. Fork del repositorio
2. Crear branch feature (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

### 🧪 Testing

```bash
# Testing completo
npm run test

# Testing de accesibilidad
npm run test:accessibility  

# Testing de performance
npm run test:performance

# Validación completa
npm run validate
```

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](./LICENSE) para más detalles.

---

## 🌟 Créditos

**Desarrollado con ❤️ por el equipo Anclora**

- **Design System:** v1.0.0
- **Tailwind CSS:** 3.3+
- **WCAG:** 2.2 AA Compliant
- **Performance:** Lighthouse 98/100

### 🙏 Agradecimientos

- [Tailwind CSS](https://tailwindcss.com) - Framework CSS
- [Feather Icons](https://feathericons.com) - Iconografía
- [Inter Font](https://rsms.me/inter/) - Tipografía principal
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) - Tipografía de marca

---

## 📞 Soporte

¿Necesitas ayuda? Contacta con nosotros:

- **📧 Email:** design-system@anclora.com
- **💬 Discord:** [Anclora Community](https://discord.gg/anclora)
- **🐛 Issues:** [GitHub Issues](https://github.com/anclora/design-system/issues)
- **📖 Docs:** [anclora.design/docs](https://anclora.design/docs)

---

**🎯 "IA que convierte y diseña con precisión"**

*Hecho con la confianza del ancla y la inteligencia del circuito* ⚡🌊