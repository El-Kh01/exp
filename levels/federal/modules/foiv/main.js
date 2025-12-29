// main.js - Управление загрузкой модулей

class ModuleManager {
    constructor() {
        this.currentModule = null;
        this.init();
    }
    
    init() {
        // Загружаем модуль из URL или по умолчанию
        const urlParams = new URLSearchParams(window.location.search);
        const moduleParam = urlParams.get('module');
        
        if (moduleParam && ['system', 'structure', 'spheres'].includes(moduleParam)) {
            this.loadModule(moduleParam);
        } else {
            // Оставляем приветственный экран
        }
        
        this.setupEventListeners();
    }
    
    async loadModule(moduleName) {
        try {
            // Показываем индикатор загрузки
            document.getElementById('module-container').innerHTML = `
                <div class="loading-module">
                    <div class="loading-spinner">
                        <i class="fas fa-spinner fa-spin"></i>
                    </div>
                    <p>Загрузка модуля "${moduleName}"...</p>
                </div>
            `;
            
            // Загружаем модуль
            const response = await fetch(`modules/${moduleName}.html`);
            if (!response.ok) throw new Error('Модуль не найден');
            
            const moduleHTML = await response.text();
            
            // Вставляем модуль в контейнер
            document.getElementById('module-container').innerHTML = moduleHTML;
            
            // Обновляем активные кнопки
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.tab === moduleName) {
                    btn.classList.add('active');
                }
            });
            
            // Инициализируем модуль
            setTimeout(() => this.initModule(moduleName), 100);
            
            // Обновляем URL без перезагрузки
            history.pushState({ module: moduleName }, '', `?module=${moduleName}`);
            
        } catch (error) {
            console.error('Ошибка загрузки модуля:', error);
            document.getElementById('module-container').innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Ошибка загрузки</h3>
                    <p>Не удалось загрузить модуль: ${error.message}</p>
                    <button onclick="loadModule('system')" class="btn-retry">
                        <i class="fas fa-redo"></i> Попробовать снова
                    </button>
                </div>
            `;
        }
    }
    
    initModule(moduleName) {
        // Инициализируем специфичные для модуля компоненты
        const moduleScript = document.createElement('script');
        moduleScript.src = `js/module.js?v=${Date.now()}`;
        moduleScript.onload = () => {
            if (window.ModuleController) {
                new window.ModuleController(moduleName);
            }
        };
        document.head.appendChild(moduleScript);
    }
    
    setupEventListeners() {
        // Обработка кнопок навигации
        document.addEventListener('click', (e) => {
            if (e.target.closest('.tab-btn') && !e.target.closest('.tab-btn').classList.contains('active')) {
                const tabBtn = e.target.closest('.tab-btn');
                const moduleName = tabBtn.dataset.tab;
                this.loadModule(moduleName);
            }
        });
        
        // Обработка истории браузера
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.module) {
                this.loadModule(event.state.module);
            }
        });
    }
}

// Глобальная функция для кнопок
window.loadModule = function(moduleName) {
    if (!window.moduleManager) {
        window.moduleManager = new ModuleManager();
    }
    window.moduleManager.loadModule(moduleName);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.moduleManager = new ModuleManager();
});
