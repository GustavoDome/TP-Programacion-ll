// ===== VARIABLES GLOBALES =====
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const videoBtn = document.getElementById('video-btn');
const videoModal = document.getElementById('video-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const whatsappBtn = document.getElementById('whatsapp-btn');

// ===== FUNCIONES PRINCIPALES =====

/**
 * Inicializa todas las funcionalidades de la página
 */
function init() {
    setupScrollEffects();
    setupMobileMenu();
    setupVideoModal();
    setupWhatsAppButton();
    setupSmoothScrolling();
    setupIntersectionObserver();
    setupFormValidation();
}

/**
 * Configura los efectos de scroll para el header
 */
function setupScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efecto de transparencia del header
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Efecto de ocultar/mostrar header en scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Configura el menú móvil
 */
function setupMobileMenu() {
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animar las barras del hamburger
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navToggle.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Resetear barras del hamburger
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });
}

/**
 * Configura el modal del video
 */
function setupVideoModal() {
    if (!videoBtn || !videoModal || !modalOverlay || !modalClose) return;
    
    // Abrir modal
    videoBtn.addEventListener('click', () => {
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Autoplay del video
        const iframe = videoModal.querySelector('iframe');
        if (iframe) {
            const currentSrc = iframe.src;
            iframe.src = currentSrc + '&autoplay=1';
        }
    });
    
    // Cerrar modal
    const closeModal = () => {
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Pausar video
        const iframe = videoModal.querySelector('iframe');
        if (iframe) {
            const currentSrc = iframe.src;
            iframe.src = currentSrc.replace('&autoplay=1', '');
        }
    };
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Configura el botón de WhatsApp
 */
function setupWhatsAppButton() {
    if (!whatsappBtn) return;
    
    whatsappBtn.addEventListener('click', () => {
        const phoneNumber = '+5491112345678'; // Cambiar por el número real
        const message = 'Hola! Me interesa conocer más sobre las carreras del Instituto Tecnológico El Molino.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
    });
}

/**
 * Configura el scroll suave para los enlaces internos
 */
function setupSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Configura el observador de intersección para animaciones
 */
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    const animateElements = document.querySelectorAll('.program-card, .service-card, .advantage-item, .gallery-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Configura la validación de formularios
 */
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Aquí puedes agregar lógica de validación y envío
            console.log('Formulario enviado:', form);
            
            // Ejemplo de validación básica
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Enviar formulario
                showSuccessMessage('Formulario enviado correctamente');
            } else {
                showErrorMessage('Por favor, completa todos los campos requeridos');
            }
        });
    });
}

/**
 * Muestra un mensaje de éxito
 */
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

/**
 * Muestra un mensaje de error
 */
function showErrorMessage(message) {
    showNotification(message, 'error');
}

/**
 * Muestra una notificación
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Agregar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Configurar botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

/**
 * Función para hacer scroll suave a una sección
 */
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const headerHeight = header.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Función para mostrar/ocultar elementos basado en scroll
 */
function handleScrollVisibility() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    scrollElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

/**
 * Función para actualizar el año en el footer
 */
function updateFooterYear() {
    const yearElement = document.querySelector('.footer-copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
}

/**
 * Función para manejar el lazy loading de imágenes
 */
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Función para manejar el tema oscuro/claro
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Verificar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Actualizar icono
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.textContent = newTheme === 'light' ? '🌙' : '☀️';
        }
    });
}

/**
 * Función para manejar el scroll infinito (si es necesario)
 */
function setupInfiniteScroll() {
    let isLoading = false;
    
    window.addEventListener('scroll', () => {
        if (isLoading) return;
        
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (scrollTop + windowHeight >= documentHeight - 100) {
            isLoading = true;
            loadMoreContent();
        }
    });
}

/**
 * Función para cargar más contenido (placeholder)
 */
function loadMoreContent() {
    // Aquí puedes implementar la lógica para cargar más contenido
    console.log('Cargando más contenido...');
    
    setTimeout(() => {
        isLoading = false;
    }, 1000);
}

/**
 * Función para manejar el resize de la ventana
 */
function handleResize() {
    // Cerrar menú móvil en resize
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
}

/**
 * Función para manejar el focus de elementos
 */
function setupFocusManagement() {
    // Manejar focus en el modal
    if (videoModal) {
        const focusableElements = videoModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        videoModal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
}

// ===== EVENT LISTENERS =====

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// Event listeners adicionales
window.addEventListener('scroll', handleScrollVisibility);
window.addEventListener('resize', handleResize);

// ===== FUNCIONES DE UTILIDAD =====

/**
 * Función para debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Función para throttle
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Función para obtener la posición del scroll
 */
function getScrollPosition() {
    return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
    };
}

/**
 * Función para verificar si un elemento está en viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== EXPORTAR FUNCIONES PARA USO GLOBAL =====
window.scrollToSection = scrollToSection;
window.showSuccessMessage = showSuccessMessage;
window.showErrorMessage = showErrorMessage;

// ===== CONFIGURACIÓN ADICIONAL =====

// Configurar tooltips
document.addEventListener('DOMContentLoaded', () => {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.875rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            e.target.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', (e) => {
            if (e.target.tooltip) {
                document.body.removeChild(e.target.tooltip);
                e.target.tooltip = null;
            }
        });
    });
});

// Configurar contador de caracteres para textareas
document.addEventListener('DOMContentLoaded', () => {
    const textareas = document.querySelectorAll('textarea[maxlength]');
    
    textareas.forEach(textarea => {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            font-size: 0.75rem;
            color: #6b7280;
            text-align: right;
            margin-top: 0.25rem;
        `;
        
        textarea.parentNode.appendChild(counter);
        
        const updateCounter = () => {
            const remaining = textarea.maxLength - textarea.value.length;
            counter.textContent = `${remaining} caracteres restantes`;
        };
        
        textarea.addEventListener('input', updateCounter);
        updateCounter();
    });
});

console.log('✅ Script cargado correctamente');
console.log('🚀 Instituto Tecnológico El Molino - Página web optimizada');
