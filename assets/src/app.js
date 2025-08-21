// Application state
let debounceTimer = null;
let currentCode = '';
let isProcessing = false;

// DOM elements
const codeEditor = document.getElementById('codeEditor');
const previewFrame = document.getElementById('previewFrame');
const charCount = document.getElementById('charCount');
const frameworkBadge = document.getElementById('frameworkBadge');
const previewStatus = document.getElementById('previewStatus');
const testBtn = document.getElementById('testBtn');
const clearBtn = document.getElementById('clearBtn');
const tailwindExampleBtn = document.getElementById('tailwindExampleBtn');
const chakraExampleBtn = document.getElementById('chakraExampleBtn');
const errorModal = document.getElementById('errorModal');
const closeErrorModal = document.getElementById('closeErrorModal');
const dismissErrorBtn = document.getElementById('dismissErrorBtn');
const errorMessage = document.getElementById('errorMessage');
const loadingOverlay = document.getElementById('loadingOverlay');

// Enhanced examples with vibrant color palette
const examples = {
    tailwind: [
        {
            name: "Botón Gradiente Vibrante",
            code: `<div class="p-8 flex items-center justify-center bg-gray-100 rounded-lg">
  <button class="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 ease-in-out hover:rotate-2 hover:shadow-cyan-500/50">
    <span class="flex items-center gap-2">
      ✨ ¡Botón Mágico!
      <svg class="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    </span>
  </button>
</div>`
        },
        {
            name: "Card Glassmorphism Moderna",
            code: `<div class="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8 flex items-center justify-center">
  <div class="backdrop-blur-lg bg-white/20 rounded-3xl shadow-2xl border border-white/30 p-8 max-w-sm transform hover:scale-105 transition-all duration-300">
    <div class="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
      <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>
    <h3 class="text-2xl font-bold text-white mb-4">Diseño Futurista</h3>
    <p class="text-white/80 mb-6 leading-relaxed">Una card con efectos de cristal que combina modernidad y elegancia visual.</p>
    <button class="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-xl hover:from-blue-600 hover:to-cyan-500 transform hover:scale-105 transition-all duration-200 shadow-lg">
      Explorar ✨
    </button>
  </div>
</div>`
        },
        {
            name: "Input Flotante Animado",
            code: `<div class="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-12 min-h-screen flex items-center justify-center">
  <div class="w-full max-w-md space-y-8">
    <div class="relative group">
      <input type="text" id="email" class="peer w-full px-4 py-3 bg-transparent border-2 border-cyan-400/30 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-300" placeholder="tu@email.com" />
      <label for="email" class="absolute left-4 -top-3 text-cyan-400 text-sm bg-gradient-to-r from-indigo-900 to-purple-900 px-2 rounded transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-3 peer-focus:text-cyan-400 peer-focus:text-sm peer-focus:bg-gradient-to-r peer-focus:from-indigo-900 peer-focus:to-purple-900">
        📧 Email Address
      </label>
      <div class="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transform scale-x-0 peer-focus:scale-x-100 transition-transform duration-300"></div>
    </div>
    <button class="w-full py-4 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none">
      🚀 Enviar Magia
    </button>
  </div>
</div>`
        },
        {
            name: "Progress Bar Animado",
            code: `<div class="bg-gray-900 p-12 min-h-screen flex items-center justify-center">
  <div class="w-full max-w-2xl space-y-8">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-4">
        Progreso Increíble ⚡
      </h2>
      <p class="text-gray-300">Barras de progreso con efectos visuales impactantes</p>
    </div>
    
    <div class="space-y-6">
      <div class="relative">
        <div class="flex justify-between items-center mb-2">
          <span class="text-cyan-400 font-semibold">Desarrollo Frontend</span>
          <span class="text-white font-bold">85%</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg shadow-cyan-500/50 animate-pulse" style="width: 85%;"></div>
        </div>
      </div>
      
      <div class="relative">
        <div class="flex justify-between items-center mb-2">
          <span class="text-purple-400 font-semibold">Diseño UI/UX</span>
          <span class="text-white font-bold">92%</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <div class="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-lg shadow-purple-500/50 animate-pulse" style="width: 92%;"></div>
        </div>
      </div>
      
      <div class="relative">
        <div class="flex justify-between items-center mb-2">
          <span class="text-green-400 font-semibold">Optimización</span>
          <span class="text-white font-bold">78%</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <div class="h-full bg-gradient-to-r from-green-500 to-teal-600 rounded-full shadow-lg shadow-green-500/50 animate-pulse" style="width: 78%;"></div>
        </div>
      </div>
    </div>
  </div>
</div>`
        },
        {
            name: "Alert Notification Vibrante",
            code: `<div class="bg-gray-800 p-8 min-h-screen flex items-center justify-center">
  <div class="space-y-6 w-full max-w-md">
    <div class="relative overflow-hidden bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-2xl shadow-2xl shadow-green-500/25 border border-green-300/20 transform hover:scale-105 transition-all duration-300">
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/50 to-transparent animate-pulse"></div>
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
          </div>
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-lg">¡Éxito Total! ✨</h4>
          <p class="text-white/90 text-sm mt-1">Tu componente ha sido creado con efectos visuales increíbles.</p>
        </div>
      </div>
    </div>
    
    <div class="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-2xl shadow-yellow-500/25 border border-yellow-300/20 transform hover:scale-105 transition-all duration-300">
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/50 to-transparent animate-pulse"></div>
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur animate-bounce">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
            </svg>
          </div>
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-lg">¡Atención! ⚠️</h4>
          <p class="text-white/90 text-sm mt-1">Considera optimizar el rendimiento para mejor experiencia.</p>
        </div>
      </div>
    </div>
  </div>
</div>`
        }
    ],
    chakra: [
        {
            name: "Botón con Efectos Vibrantes",
            code: `<div style="font-family: system-ui, sans-serif; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 300px; display: flex; align-items: center; justify-content: center;">
  <button style="
    background: linear-gradient(135deg, #0AD1C8 0%, #45DFB1 100%);
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 25px rgba(10, 209, 200, 0.3), 0 0 0 0 rgba(69, 223, 177, 0.4);
    transform: translateY(0px);
    position: relative;
    overflow: hidden;
  " 
  onmouseover="
    this.style.transform='translateY(-5px) scale(1.05)';
    this.style.boxShadow='0 20px 40px rgba(10, 209, 200, 0.4), 0 0 0 8px rgba(69, 223, 177, 0.2)';
    this.style.background='linear-gradient(135deg, #45DFB1 0%, #80ED99 100%)';
  " 
  onmouseout="
    this.style.transform='translateY(0px) scale(1)';
    this.style.boxShadow='0 10px 25px rgba(10, 209, 200, 0.3), 0 0 0 0 rgba(69, 223, 177, 0.4)';
    this.style.background='linear-gradient(135deg, #0AD1C8 0%, #45DFB1 100%)';
  "
  onmousedown="this.style.transform='translateY(-2px) scale(1.02)'"
  onmouseup="this.style.transform='translateY(-5px) scale(1.05)'">
    <span style="display: flex; align-items: center; gap: 8px;">
      ✨ ¡Experiencia Mágica!
      <span style="display: inline-block; animation: pulse 2s infinite;">🚀</span>
    </span>
  </button>
</div>

<style>
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
</style>`
        },
        {
            name: "Card Premium con Glassmorphism",
            code: `<div style="
  font-family: system-ui, sans-serif; 
  padding: 40px; 
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
  min-height: 500px; 
  display: flex; 
  align-items: center; 
  justify-content: center;
">
  <div style="
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    box-shadow: 0 16px 64px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    max-width: 400px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    position: relative;
  " 
  onmouseover="
    this.style.transform='translateY(-10px)';
    this.style.boxShadow='0 25px 80px rgba(0, 0, 0, 0.3)';
  "
  onmouseout="
    this.style.transform='translateY(0px)';
    this.style.boxShadow='0 16px 64px rgba(0, 0, 0, 0.2)';
  ">
    <div style="
      background: linear-gradient(135deg, #0AD1C8 0%, #45DFB1 100%);
      height: 200px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        font-size: 32px;
      ">
        💎
      </div>
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
        animation: shimmer 3s infinite;
      "></div>
    </div>
    <div style="padding: 24px;">
      <h3 style="
        margin: 0 0 12px 0;
        color: white;
        font-size: 24px;
        font-weight: 700;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      ">Premium Experience</h3>
      <p style="
        margin: 0 0 20px 0;
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
        line-height: 1.6;
      ">Descubre una experiencia visual única con efectos glassmorphism y animaciones suaves.</p>
      <button style="
        width: 100%;
        background: linear-gradient(135deg, #80ED99 0%, #45DFB1 100%);
        color: #213A57;
        border: none;
        padding: 12px;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(128, 237, 153, 0.3);
      "
      onmouseover="
        this.style.transform='scale(1.05)';
        this.style.boxShadow='0 8px 25px rgba(128, 237, 153, 0.5)';
      "
      onmouseout="
        this.style.transform='scale(1)';
        this.style.boxShadow='0 4px 15px rgba(128, 237, 153, 0.3)';
      ">
        🚀 Explorar Ahora
      </button>
    </div>
  </div>
</div>

<style>
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
</style>`
        },
        {
            name: "Dashboard Card Interactivo",
            code: `<div style="
  font-family: system-ui, sans-serif; 
  padding: 32px; 
  background: linear-gradient(135deg, #213A57 0%, #0B6477 100%); 
  min-height: 400px;
">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
    <div style="
      background: rgba(10, 209, 200, 0.1);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(10, 209, 200, 0.2);
      border-radius: 16px;
      padding: 24px;
      transition: all 0.3s ease;
      cursor: pointer;
    " 
    onmouseover="
      this.style.background='rgba(10, 209, 200, 0.15)';
      this.style.transform='translateY(-5px)';
      this.style.boxShadow='0 12px 32px rgba(10, 209, 200, 0.2)';
    "
    onmouseout="
      this.style.background='rgba(10, 209, 200, 0.1)';
      this.style.transform='translateY(0px)';
      this.style.boxShadow='none';
    ">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
        <div style="
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #0AD1C8 0%, #45DFB1 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        ">📊</div>
        <div>
          <h4 style="margin: 0; color: white; font-size: 18px; font-weight: 600;">Analytics</h4>
          <p style="margin: 4px 0 0 0; color: rgba(255, 255, 255, 0.7); font-size: 14px;">Vista detallada</p>
        </div>
      </div>
      <div style="
        font-size: 32px;
        font-weight: 800;
        color: #0AD1C8;
        margin-bottom: 8px;
        text-shadow: 0 0 10px rgba(10, 209, 200, 0.3);
      ">12.5K</div>
      <div style="
        display: flex;
        align-items: center;
        gap: 4px;
        color: #45DFB1;
        font-size: 14px;
        font-weight: 500;
      ">
        <span>↗️</span> +23.5% este mes
      </div>
    </div>

    <div style="
      background: rgba(69, 223, 177, 0.1);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(69, 223, 177, 0.2);
      border-radius: 16px;
      padding: 24px;
      transition: all 0.3s ease;
      cursor: pointer;
    " 
    onmouseover="
      this.style.background='rgba(69, 223, 177, 0.15)';
      this.style.transform='translateY(-5px)';
      this.style.boxShadow='0 12px 32px rgba(69, 223, 177, 0.2)';
    "
    onmouseout="
      this.style.background='rgba(69, 223, 177, 0.1)';
      this.style.transform='translateY(0px)';
      this.style.boxShadow='none';
    ">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
        <div style="
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #45DFB1 0%, #80ED99 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        ">👥</div>
        <div>
          <h4 style="margin: 0; color: white; font-size: 18px; font-weight: 600;">Usuarios</h4>
          <p style="margin: 4px 0 0 0; color: rgba(255, 255, 255, 0.7); font-size: 14px;">Activos hoy</p>
        </div>
      </div>
      <div style="
        font-size: 32px;
        font-weight: 800;
        color: #45DFB1;
        margin-bottom: 8px;
        text-shadow: 0 0 10px rgba(69, 223, 177, 0.3);
      ">8.2K</div>
      <div style="
        display: flex;
        align-items: center;
        gap: 4px;
        color: #80ED99;
        font-size: 14px;
        font-weight: 500;
      ">
        <span>🔥</span> +15.2% vs ayer
      </div>
    </div>
  </div>
</div>`
        }
    ]
};

// Current example indices
let currentTailwindExample = 0;
let currentChakraExample = 0;

// Utility functions
function debounce(func, delay) {
    return function (...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
}

function detectFramework(code) {
    const tailwindClasses = [
        'bg-gradient-to', 'text-', 'p-', 'm-', 'w-', 'h-', 'flex', 'grid', 'hidden', 'block',
        'hover:', 'focus:', 'active:', 'rounded', 'shadow', 'border', 'transition',
        'transform', 'scale-', 'translate-', 'rotate-', 'opacity-', 'duration-',
        'backdrop-blur', 'bg-white/', 'from-', 'to-', 'via-'
    ];
    
    const chakraIndicators = [
        'style=', 'font-family: system-ui', 'linear-gradient', 'rgba(',
        'box-shadow:', 'border-radius:', 'background:', 'padding:',
        'backdrop-filter', 'onmouseover', 'onmouseout'
    ];
    
    const hasTailwind = tailwindClasses.some(cls => code.includes(cls));
    const hasChakra = chakraIndicators.some(ind => code.toLowerCase().includes(ind.toLowerCase()));
    
    if (hasTailwind && hasChakra) return 'mixed';
    if (hasTailwind) return 'tailwind';
    if (hasChakra) return 'chakra';
    return 'none';
}

function updateFrameworkBadge(framework) {
    const badges = {
        tailwind: { 
            icon: '🎨', 
            text: 'Tailwind CSS detectado',
            bgColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 0.4)'
        },
        chakra: { 
            icon: '⚛️', 
            text: 'Chakra UI detectado',
            bgColor: 'rgba(56, 178, 172, 0.2)',
            borderColor: 'rgba(56, 178, 172, 0.4)'
        },
        mixed: { 
            icon: '🔥', 
            text: 'Frameworks mixtos',
            bgColor: 'rgba(147, 51, 234, 0.2)',
            borderColor: 'rgba(147, 51, 234, 0.4)'
        },
        none: { 
            icon: '🔍', 
            text: 'Ningún framework detectado',
            bgColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.2)'
        }
    };
    
    const badge = badges[framework] || badges.none;
    const badgeElement = document.querySelector('.framework-badge');
    const iconElement = document.querySelector('.badge-icon');
    const textElement = document.querySelector('.badge-text');
    
    iconElement.textContent = badge.icon;
    textElement.textContent = badge.text;
    badgeElement.style.background = badge.bgColor;
    badgeElement.style.borderColor = badge.borderColor;
    
    // Add animation effect
    badgeElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        badgeElement.style.transform = 'scale(1)';
    }, 200);
}

function updateCharCount() {
    const count = codeEditor.value.length;
    charCount.textContent = count.toLocaleString();
    
    // Color coding for character count
    if (count > 5000) {
        charCount.style.color = '#ff6b6b';
    } else if (count > 2000) {
        charCount.style.color = '#ffc107';
    } else {
        charCount.style.color = 'white';
    }
}

function updatePreviewStatus(status, type = 'info') {
    const statusEl = document.querySelector('.preview-status');
    statusEl.textContent = status;
    statusEl.className = `preview-status status-${type}`;
    
    // Add pulse effect for important statuses
    if (type === 'success' || type === 'error') {
        statusEl.style.animation = 'pulse-glow 0.6s ease-in-out';
        setTimeout(() => {
            statusEl.style.animation = '';
        }, 600);
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorModal.classList.remove('hidden');
    
    // Add entrance animation
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.animation = 'float 0.3s ease-out';
}

function hideError() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.animation = 'none';
    errorModal.classList.add('hidden');
}

function showLoading(show = true) {
    if (show) {
        loadingOverlay.classList.remove('hidden');
    } else {
        loadingOverlay.classList.add('hidden');
    }
}

function validateHTML(html) {
    const tempDiv = document.createElement('div');
    try {
        tempDiv.innerHTML = html;
        return { isValid: true, error: null };
    } catch (error) {
        return { isValid: false, error: error.message };
    }
}

function updatePreview(code) {
    if (isProcessing) return;
    
    if (!code.trim()) {
        previewFrame.innerHTML = `
            <div class="preview-placeholder">
                <div class="placeholder-content">
                    <div class="placeholder-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-float">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">¡Listo para crear!</h3>
                    <p class="text-white/70">Ingresa código en el editor para ver la magia aquí ✨</p>
                </div>
            </div>
        `;
        previewFrame.classList.remove('has-content');
        updatePreviewStatus('Listo', 'info');
        return;
    }
    
    isProcessing = true;
    updatePreviewStatus('✨ Procesando magia...', 'warning');
    showLoading(true);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
        try {
            const validation = validateHTML(code);
            if (!validation.isValid) {
                showError(`❌ Error en el HTML: ${validation.error}`);
                updatePreviewStatus('Error en el código', 'error');
                showLoading(false);
                isProcessing = false;
                return;
            }
            
            // Create enhanced preview content
            previewFrame.innerHTML = `<div class="preview-content">${code}</div>`;
            previewFrame.classList.add('has-content');
            
            updatePreviewStatus('🎉 ¡Vista previa lista!', 'success');
            
            // Detect and update framework
            const framework = detectFramework(code);
            updateFrameworkBadge(framework);
            
            showLoading(false);
            isProcessing = false;
            
        } catch (error) {
            showError(`⚠️ Error al renderizar: ${error.message}`);
            updatePreviewStatus('Error al renderizar', 'error');
            showLoading(false);
            isProcessing = false;
        }
    }, 800); // Increased delay for better visual feedback
}

function clearEditor() {
    codeEditor.value = '';
    currentCode = '';
    updateCharCount();
    updatePreview('');
    updateFrameworkBadge('none');
    codeEditor.focus();
    
    // Add visual feedback
    updatePreviewStatus('🗑️ Editor limpiado', 'info');
}

function loadTailwindExample() {
    const example = examples.tailwind[currentTailwindExample % examples.tailwind.length];
    
    codeEditor.value = example.code;
    currentCode = example.code;
    updateCharCount();
    updatePreview(example.code);
    
    currentTailwindExample++;
    
    updatePreviewStatus(`🎨 ${example.name}`, 'success');
    
    // Add loading animation
    testBtn.style.background = 'linear-gradient(135deg, #45DFB1 0%, #80ED99 100%)';
    setTimeout(() => {
        testBtn.style.background = 'linear-gradient(135deg, #0AD1C8 0%, #45DFB1 100%)';
    }, 1000);
}

function loadChakraExample() {
    const example = examples.chakra[currentChakraExample % examples.chakra.length];
    
    codeEditor.value = example.code;
    currentCode = example.code;
    updateCharCount();
    updatePreview(example.code);
    
    currentChakraExample++;
    
    updatePreviewStatus(`⚛️ ${example.name}`, 'success');
    
    // Add loading animation
    testBtn.style.background = 'linear-gradient(135deg, #45DFB1 0%, #80ED99 100%)';
    setTimeout(() => {
        testBtn.style.background = 'linear-gradient(135deg, #0AD1C8 0%, #45DFB1 100%)';
    }, 1000);
}

// Enhanced debounced preview update
const debouncedUpdatePreview = debounce((code) => {
    if (code !== currentCode) {
        currentCode = code;
        updatePreview(code);
    }
}, 700); // Slightly longer delay for better performance

// Event listeners
codeEditor.addEventListener('input', (e) => {
    const code = e.target.value;
    updateCharCount();
    debouncedUpdatePreview(code);
});

codeEditor.addEventListener('paste', (e) => {
    setTimeout(() => {
        updateCharCount();
        debouncedUpdatePreview(codeEditor.value);
    }, 10);
});

codeEditor.addEventListener('focus', () => {
    updatePreviewStatus('✍️ Escribiendo código...', 'info');
});

testBtn.addEventListener('click', () => {
    const code = codeEditor.value;
    currentCode = code;
    updatePreview(code);
});

clearBtn.addEventListener('click', clearEditor);

tailwindExampleBtn.addEventListener('click', loadTailwindExample);

chakraExampleBtn.addEventListener('click', loadChakraExample);

// Modal event listeners
closeErrorModal.addEventListener('click', hideError);
dismissErrorBtn.addEventListener('click', hideError);

// Close modal when clicking backdrop
errorModal.addEventListener('click', (e) => {
    if (e.target === errorModal || e.target.classList.contains('modal-backdrop')) {
        hideError();
    }
});

// Enhanced keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to test
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        testBtn.click();
        testBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            testBtn.style.transform = 'scale(1)';
        }, 100);
    }
    
    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        clearEditor();
    }
    
    // Ctrl/Cmd + 1 for Tailwind example
    if ((e.ctrlKey || e.metaKey) && e.key === '1') {
        e.preventDefault();
        loadTailwindExample();
    }
    
    // Ctrl/Cmd + 2 for Chakra example
    if ((e.ctrlKey || e.metaKey) && e.key === '2') {
        e.preventDefault();
        loadChakraExample();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        hideError();
    }
});

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    updateCharCount();
    updatePreviewStatus('🚀 ¡Listo para crear!', 'info');
    updateFrameworkBadge('none');
    
    // Focus on editor with slight delay for better UX
    setTimeout(() => {
        codeEditor.focus();
    }, 500);
    
    // Enhanced button tooltips
    testBtn.title = '⚡ Probar Componente (Ctrl+Enter)';
    clearBtn.title = '🗑️ Limpiar Editor (Ctrl+K)';
    tailwindExampleBtn.title = '🎨 Ejemplo Tailwind (Ctrl+1)';
    chakraExampleBtn.title = '⚛️ Ejemplo Chakra (Ctrl+2)';
    
    // Welcome animation
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    console.log('🎉 Tester de Componentes Vibrante inicializado correctamente!');
    console.log('✨ Características especiales:');
    console.log('  - Gradientes vibrantes');
    console.log('  - Efectos glassmorphism');  
    console.log('  - Animaciones suaves');
    console.log('  - Ejemplos mejorados');
    console.log('  - Atajos de teclado mejorados');
});

// Add some extra visual flair
setInterval(() => {
    const header = document.querySelector('.header');
    if (header && !isProcessing) {
        const randomColor = Math.random() > 0.5 ? '#0AD1C8' : '#45DFB1';
        header.style.boxShadow = `0 8px 32px rgba(33, 58, 87, 0.3), 0 0 20px ${randomColor}15`;
    }
}, 5000);

// Performance optimization
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Adjust layout if needed
        console.log('🔧 Layout optimizado para nueva resolución');
    }, 250);
});