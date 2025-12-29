// main.js - Управление вкладками модулей

class TabManager {
    constructor() {
        this.currentTab = 'system';
        this.init();
    }
    
    init() {
        this.setupTabs();
        this.setupFilters();
        this.setupSearch();
    }
    
    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });
        
        // Загружаем начальную вкладку
        this.loadTabContent('system');
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
        
        // Загружаем контент вкладки
        this.loadTabContent(tabId);
    }
    
    async loadTabContent(tabId) {
        this.currentTab = tabId;
        
        // Показываем загрузку
        const listContainer = document.getElementById(`${tabId}List`);
        if (listContainer) {
            listContainer.innerHTML = `
                <div class="loading-list">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Загрузка данных...</p>
                </div>
            `;
        }
        
        // Загружаем данные
        try {
            const data = await this.loadData(tabId);
            this.renderList(tabId, data);
            this.updateCount(tabId, data.length);
        } catch (error) {
            console.error(`Ошибка загрузки данных для вкладки ${tabId}:`, error);
            if (listContainer) {
                listContainer.innerHTML = `
                    <div class="error-list">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Ошибка загрузки данных</p>
                    </div>
                `;
            }
        }
    }
    
    async loadData(tabId) {
        // Загружаем данные из JSON файла
        const response = await fetch('data/foivs.json');
        const allData = await response.json();
        
        // Фильтруем данные в зависимости от вкладки
        switch(tabId) {
            case 'system':
                return allData;
            case 'structure':
                return allData; // Здесь можно добавить фильтрацию
            case 'spheres':
                return allData; // Здесь можно добавить фильтрацию
            default:
                return allData;
        }
    }
    
    renderList(tabId, data) {
        const listContainer = document.getElementById(`${tabId}List`);
        if (!listContainer) return;
        
        if (data.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-list">
                    <i class="fas fa-search"></i>
                    <p>Нет данных для отображения</p>
                </div>
            `;
            return;
        }
        
        listContainer.innerHTML = data.map(item => this.createListItem(tabId, item)).join('');
        
        // Добавляем обработчики кликов
        this.setupListItems(tabId);
    }
    
    createListItem(tabId, item) {
        let badges = '';
        
        switch(tabId) {
            case 'system':
                badges = `
                    <div class="foiv-item-meta">
                        <span class="foiv-badge" style="background: ${this.getTypeColor(item.type)}; color: white;">
                            ${this.getTypeAbbreviation(item.type)}
                        </span>
                        <span class="foiv-badge" style="background: ${this.getSphereColor(item.sphere)};">
                            ${this.getSphereName(item.sphere)}
                        </span>
                    </div>
                `;
                break;
            case 'structure':
                const leader = item.leader || 'government';
                badges = `
                    <div class="foiv-item-meta">
                        <span class="foiv-badge" style="background: ${leader === 'president' ? 'rgba(220, 53, 69, 0.1)' : 'rgba(23, 162, 184, 0.1)'}; 
                              color: ${leader === 'president' ? '#dc3545' : '#17a2b8'};">
                            <i class="fas fa-${leader === 'president' ? 'user-tie' : 'landmark'}"></i>
                            ${leader === 'president' ? 'Президент' : 'Правительство'}
                        </span>
                    </div>
                `;
                break;
            case 'spheres':
                badges = `
                    <div class="foiv-item-meta">
                        <span class="foiv-badge" style="background: ${this.getSphereColor(item.sphere)};">
                            <i class="fas fa-${this.getSphereIcon(item.sphere)}"></i>
                            ${this.getSphereName(item.sphere)}
                        </span>
                    </div>
                `;
                break;
        }
        
        return `
            <div class="foiv-item" data-id="${item.id}">
                <div class="foiv-item-title">${item.name}</div>
                <div class="foiv-item-subtitle">${item.shortName}</div>
                ${badges}
            </div>
        `;
    }
    
    setupListItems(tabId) {
        const items = document.querySelectorAll(`#${tabId}List .foiv-item`);
        
        items.forEach(item => {
            item.addEventListener('click', () => {
                // Убираем активный класс у всех элементов
                items.forEach(i => i.classList.remove('active'));
                
                // Добавляем активный класс выбранному элементу
                item.classList.add('active');
                
                // Загружаем контент ФОИВа
                const foivId = item.getAttribute('data-id');
                this.loadFoivContent(tabId, foivId);
            });
        });
    }
    
    async loadFoivContent(tabId, foivId) {
        const contentContainer = document.getElementById(`${tabId}Content`);
        
        try {
            // Показываем загрузку
            contentContainer.innerHTML = `
                <div class="loading-content">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Загрузка информации...</p>
                </div>
            `;
            
            // Загружаем HTML файл ФОИВа
            const response = await fetch(`foivs/${foivId}.html`);
            
            if (!response.ok) {
                throw new Error('Файл не найден');
            }
            
            const content = await response.text();
            contentContainer.innerHTML = content;
            
            // Инициализируем аккордеон
            this.initAccordion();
            
        } catch (error) {
            console.error('Ошибка загрузки контента:', error);
            contentContainer.innerHTML = `
                <div class="error-content">
                    <i class="fas fa-exclamation-circle"></i>
                    <h4>Ошибка загрузки</h4>
                    <p>Информация о выбранном ФОИВе временно недоступна</p>
                    <p>Попробуйте выбрать другой орган или обновить страницу</p>
                </div>
            `;
        }
    }
    
    initAccordion() {
        const sectionHeaders = document.querySelectorAll('.section-header');
        
        sectionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('.toggle-icon i');
                
                // Переключаем класс active
                content.classList.toggle('active');
                
                // Меняем иконку
                if (icon) {
                    if (content.classList.contains('active')) {
                        icon.className = 'fas fa-chevron-up';
                    } else {
                        icon.className = 'fas fa-chevron-down';
                    }
                }
                
                // Закрываем другие секции (опционально)
                // sectionHeaders.forEach(otherHeader => {
                //     if (otherHeader !== header) {
                //         const otherContent = otherHeader.nextElementSibling;
                //         const otherIcon = otherHeader.querySelector('.toggle-icon i');
                //         otherContent.classList.remove('active');
                //         if (otherIcon) {
                //             otherIcon.className = 'fas fa-chevron-down';
                //         }
                //     }
                // });
            });
        });
    }
    
    setupFilters() {
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const filterGroup = e.target.closest('.filter-group');
                const buttons = filterGroup.querySelectorAll('.filter-btn');
                
                // Убираем активный класс со всех кнопок в группе
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Добавляем активный класс нажатой кнопке
                e.target.classList.add('active');
                
                // Применяем фильтр
                this.applyFilter();
            });
        });
    }
    
    setupSearch() {
        document.querySelectorAll('.search-box input').forEach(input => {
            input.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                this.applyFilter(searchTerm);
            });
        });
    }
    
    applyFilter(searchTerm = '') {
        // Этот метод будет переопределен в foiv.js
        // Здесь просто вызывает метод из FoivManager
        if (window.foivManager) {
            window.foivManager.filterCurrentList(searchTerm);
        }
    }
    
    updateCount(tabId, count) {
        const countElement = document.getElementById(`${tabId}Count`);
        if (countElement) {
            countElement.textContent = count;
        }
    }
    
    // Вспомогательные методы
    getTypeColor(type) {
        const colors = {
            'ministry': '#1e3c72',
            'service': '#2a5298',
            'agency': '#408BC9'
        };
        return colors[type] || '#408BC9';
    }
    
    getTypeAbbreviation(type) {
        const abbreviations = {
            'ministry': 'М',
            'service': 'С',
            'agency': 'А'
        };
        return abbreviations[type] || type.charAt(0).toUpperCase();
    }
    
    getSphereColor(sphere) {
        const colors = {
            'political': 'rgba(232, 9, 9, 0.1)',
            'economic': 'rgba(16, 19, 227, 0.1)',
            'social': 'rgba(245, 212, 66, 0.1)'
        };
        return colors[sphere] || 'rgba(64, 139, 201, 0.1)';
    }
    
    getSphereName(sphere) {
        const names = {
            'political': 'Политическая',
            'economic': 'Экономическая',
            'social': 'Социальная'
        };
        return names[sphere] || sphere;
    }
    
    getSphereIcon(sphere) {
        const icons = {
            'political': 'shield-alt',
            'economic': 'chart-line',
            'social': 'users'
        };
        return icons[sphere] || 'circle';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.tabManager = new TabManager();
});
