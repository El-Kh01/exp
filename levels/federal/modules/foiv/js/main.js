// main.js - Управление вкладками и базовой функциональностью

class TabManager {
    constructor() {
        this.currentTab = 'system';
        this.init();
    }
    
    init() {
        this.setupTabs();
        this.setupMobileMenu();
        this.setupBackToTop();
        this.setupDynamicHeight();
        this.setupAnimations();
    }
    
    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const tabId = button.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });
    }
    
    switchTab(tabId) {
        // Убираем активный класс со всех кнопок
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Добавляем активный класс нажатой кнопке
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Скрываем все вкладки
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Показываем выбранную вкладку
        const targetTab = document.getElementById(`${tabId}-tab`);
        if (targetTab) {
            targetTab.classList.add('active');
        }
        
        // Обновляем текущую вкладку
        this.currentTab = tabId;
        
        // Обновляем высоту контейнера
        this.updateContentHeight();
        
        // Прокручиваем к началу вкладки
        setTimeout(() => {
            targetTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
    
    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const breadcrumbs = document.querySelector('.breadcrumbs');
        
        if (menuToggle && breadcrumbs) {
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                breadcrumbs.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
            
            // Закрытие меню при клике на ссылку
            document.querySelectorAll('.breadcrumbs a').forEach(link => {
                link.addEventListener('click', () => {
                    breadcrumbs.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
            
            // Закрытие меню при клике вне его
            document.addEventListener('click', (e) => {
                if (!breadcrumbs.contains(e.target) && !menuToggle.contains(e.target)) {
                    breadcrumbs.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        }
    }
    
    setupBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Показывать/скрывать кнопку при скролле
        window.addEventListener('scroll', () => {
            if (backToTopBtn) {
                if (window.scrollY > 300) {
                    backToTopBtn.style.opacity = '1';
                    backToTopBtn.style.visibility = 'visible';
                } else {
                    backToTopBtn.style.opacity = '0';
                    backToTopBtn.style.visibility = 'hidden';
                }
            }
        });
    }
    
    setupDynamicHeight() {
        // Обновляем высоту при изменении размера окна
        window.addEventListener('resize', () => {
            this.updateContentHeight();
        });
        
        // Инициализируем высоту
        setTimeout(() => {
            this.updateContentHeight();
        }, 100);
    }
    
    updateContentHeight() {
        // Автоматически подстраиваем высоту контейнера под содержимое
        const contentContainers = document.querySelectorAll('.content');
        
        contentContainers.forEach(container => {
            const content = container.querySelector('.foiv-content-container, .content-placeholder');
            if (content) {
                container.style.height = 'auto';
                const computedHeight = content.scrollHeight;
                container.style.height = Math.max(500, computedHeight) + 'px';
            }
        });
    }
    
    setupAnimations() {
        // Анимация для легенды при скролле
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Применяем к легенде
        document.querySelectorAll('.legend-category').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
        
        // Анимация для hero-секции
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + (index * 200));
        });
        
        // Анимация для счетчиков
        const counters = document.querySelectorAll('.hero-stat-item .number');
        counters.forEach((counter, index) => {
            const targetValue = parseInt(counter.textContent);
            counter.textContent = '0';
            
            setTimeout(() => {
                this.animateCounter(counter, 0, targetValue, 1500);
            }, 800 + (index * 300));
        });
    }
    
    animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.tabManager = new TabManager();
    
    // Активация первой вкладки по умолчанию
    setTimeout(() => {
        const firstTab = document.querySelector('.tab-btn');
        if (firstTab) {
            firstTab.click();
        }
    }, 100);
    
    // Добавляем обработчики для всех ссылок в футере
    document.querySelectorAll('footer a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#' || this.classList.contains('back-to-top')) {
                e.preventDefault();
            }
        });
    });
    
    // Добавляем обработку внешних ссылок
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Открываем в новой вкладке (уже есть target="_blank")
            // Можно добавить уведомление или аналитику
        });
    });
    
    // Добавляем плавную прокрутку для всех внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Инициализация tooltips для значков
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            
            this._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                delete this._tooltip;
            }
        });
    });
});

// Добавляем стили для tooltips
const tooltipStyles = document.createElement('style');
tooltipStyles.textContent = `
    .tooltip {
        position: fixed;
        background: var(--detroit-dark-gray);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius);
        font-size: 0.85rem;
        z-index: 9999;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--detroit-blue);
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: var(--detroit-dark-gray) transparent transparent transparent;
    }
`;
document.head.appendChild(tooltipStyles);
