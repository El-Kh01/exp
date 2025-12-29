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
        // Определяем полномочия на основе типа органа
        let powers = [];
        if (item.type === 'ministry') {
            powers = ['npa']; // Нормативные правовые акты
        } else if (item.type === 'service') {
            powers = ['supervision']; // Административный надзор
        } else if (item.type === 'agency') {
            powers = ['property', 'services']; // Управление имуществом и услуги
        }
        
        // Определяем цвет сферы
        let sphereColor;
        if (item.sphere === 'political' || item.sphere === 'security') {
            sphereColor = '#e80909'; // красный
        } else if (item.sphere === 'economic') {
            sphereColor = '#1013e3'; // синий
        } else if (item.sphere === 'social') {
            sphereColor = '#f5d442'; // желтый
        }
        
        // Создаем значки полномочий
        let powersHTML = '';
        powers.forEach(power => {
            let powerColor, powerText, powerTitle;
            if (power === 'npa') {
                powerColor = '#1e3c72';
                powerText = 'НПА';
                powerTitle = 'Нормативные правовые акты';
            } else if (power === 'supervision') {
                powerColor = '#2a5298';
                powerText = 'АН';
                powerTitle = 'Административный надзор';
            } else if (power === 'property') {
                powerColor = '#408BC9';
                powerText = 'ГИ';
                powerTitle = 'Управление государственным имуществом';
            } else if (power === 'services') {
                powerColor = '#5DA9E9';
                powerText = 'ГУ';
                powerTitle = 'Оказание государственных услуг';
            }
            
            powersHTML += `
                <div class="foiv-power-badge" style="background: ${powerColor};" title="${powerTitle}">
                    <span>${powerText}</span>
                </div>
            `;
        });
        
        // Определяем значок подчинения
        const leader = item.leader || 'government';
        const leaderIcon = leader === 'president' ? 'fas fa-user-tie' : 'fas fa-landmark';
        const leaderClass = leader === 'president' ? 'president' : 'government';
        const leaderTitle = leader === 'president' ? 'Подчиняется Президенту РФ' : 'Подчиняется Правительству РФ';
        
        return `
            <div class="foiv-item" data-id="${item.id}">
                <div class="foiv-item-title">${item.name}</div>
                <div class="foiv-item-subtitle">${item.shortName}</div>
                <div class="foiv-item-badges">
                    <div class="foiv-sphere-badge" style="background: ${sphereColor};" title="${item.sphere === 'political' ? 'Политическая сфера' : item.sphere === 'economic' ? 'Экономическая сфера' : item.sphere === 'social' ? 'Социальная сфера' : 'Сфера безопасности'}"></div>
                    <div class="foiv-powers">${powersHTML}</div>
                    <div class="foiv-leader-badge ${leaderClass}" title="${leaderTitle}">
                        <i class="${leaderIcon}"></i>
                    </div>
                </div>
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
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.tabManager = new TabManager();
});
