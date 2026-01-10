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
    }
    
    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
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
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        // Скрываем все вкладки
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Показываем выбранную вкладку
        document.getElementById(`${tabId}-tab`).classList.add('active');
        
        // Обновляем текущую вкладку
        this.currentTab = tabId;
        
        // Если FoivManager существует, обновляем список для текущей вкладки
        if (window.foivManager) {
            window.foivManager.updateListForCurrentTab();
        }
        
        // Обновляем высоту контейнера
        this.updateContentHeight();
    }
    
    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const breadcrumbs = document.querySelector('.breadcrumbs');
        
        if (menuToggle && breadcrumbs) {
            menuToggle.addEventListener('click', function() {
                breadcrumbs.classList.toggle('active');
            });
            
            // Закрытие меню при клике на ссылку
            document.querySelectorAll('.breadcrumbs a').forEach(link => {
                link.addEventListener('click', () => {
                    breadcrumbs.classList.remove('active');
                });
            });
            
            // Закрытие меню при клике вне его
            document.addEventListener('click', (e) => {
                if (!breadcrumbs.contains(e.target) && !menuToggle.contains(e.target)) {
                    breadcrumbs.classList.remove('active');
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
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.tabManager = new TabManager();
    
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
    
    // Через 100мс показываем элементы
    setTimeout(() => {
        document.querySelectorAll('.legend-category').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }, 100);
});
