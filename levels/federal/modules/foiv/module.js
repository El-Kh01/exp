// module.js - Управление содержимым модуля

class ModuleController {
    constructor(moduleName) {
        this.moduleName = moduleName;
        this.data = [];
        this.currentItem = null;
        this.filters = {};
        this.init();
    }
    
    async init() {
        await this.loadData();
        this.renderModule();
        this.setupEventListeners();
    }
    
    async loadData() {
        try {
            // Загружаем данные для модуля
            const response = await fetch(`data/${this.moduleName}.json`);
            this.data = await response.json();
        } catch (error) {
            console.error(`Ошибка загрузки данных модуля ${this.moduleName}:`, error);
            this.data = [];
        }
    }
    
    renderModule() {
        // Рендерим список в зависимости от модуля
        const listContainer = document.querySelector('.module-list');
        if (!listContainer) return;
        
        listContainer.innerHTML = this.data.map(item => this.renderItem(item)).join('');
        
        // Добавляем обработчики кликов
        document.querySelectorAll('.module-item').forEach(item => {
            item.addEventListener('click', () => {
                this.loadItemContent(item.dataset.id);
            });
        });
    }
    
    renderItem(item) {
        // Рендерим элемент списка в зависимости от модуля
        switch(this.moduleName) {
            case 'system':
                return this.renderSystemItem(item);
            case 'structure':
                return this.renderStructureItem(item);
            case 'spheres':
                return this.renderSphereItem(item);
            default:
                return '';
        }
    }
    
    renderSystemItem(item) {
        return `
            <li class="module-item" data-id="${item.id}">
                <div class="module-item-title">${item.name}</div>
                <div class="module-item-subtitle">${item.shortName}</div>
                <div class="module-item-meta">
                    <span class="module-badge">${this.getSystemType(item.type)}</span>
                    <span class="module-badge">${this.getSphereName(item.sphere)}</span>
                </div>
            </li>
        `;
    }
    
    renderStructureItem(item) {
        return `
            <li class="module-item" data-id="${item.id}">
                <div class="module-item-title">${item.name}</div>
                <div class="module-item-meta">
                    <span class="module-badge" style="background: ${item.leader === 'president' ? 'rgba(220, 53, 69, 0.1)' : 'rgba(23, 162, 184, 0.1)'}; 
                          color: ${item.leader === 'president' ? '#dc3545' : '#17a2b8'};">
                        <i class="fas fa-${item.leader === 'president' ? 'user-tie' : 'landmark'}"></i>
                        ${item.leader === 'president' ? 'Президент' : 'Правительство'}
                    </span>
                </div>
            </li>
        `;
    }
    
    renderSphereItem(item) {
        const sphereColors = {
            'political': 'rgba(232, 9, 9, 0.1)',
            'economic': 'rgba(16, 19, 227, 0.1)',
            'social': 'rgba(245, 212, 66, 0.1)'
        };
        
        const sphereTextColors = {
            'political': '#e80909',
            'economic': '#1013e3',
            'social': '#f5d442'
        };
        
        return `
            <li class="module-item" data-id="${item.id}">
                <div class="module-item-title">${item.name}</div>
                <div class="module-item-meta">
                    <span class="module-badge" style="background: ${sphereColors[item.sphere]}; color: ${sphereTextColors[item.sphere]}">
                        <i class="fas fa-${this.getSphereIcon(item.sphere)}"></i>
                        ${this.getSphereName(item.sphere)}
                    </span>
                </div>
            </li>
        `;
    }
    
    async loadItemContent(itemId) {
        try {
            // Убираем активный класс у всех элементов
            document.querySelectorAll('.module-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Добавляем активный класс к выбранному
            const selectedItem = document.querySelector(`[data-id="${itemId}"]`);
            if (selectedItem) {
                selectedItem.classList.add('active');
            }
            
            // Загружаем контент ФОИВа
            const response = await fetch(`foivs/${itemId}.html`);
            const content = await response.text();
            
            document.querySelector('.content-body').innerHTML = content;
            this.currentItem = itemId;
            
            // Инициализируем аккордеон
            this.initAccordion();
            
        } catch (error) {
            console.error('Ошибка загрузки контента:', error);
            document.querySelector('.content-body').innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <h4>Ошибка загрузки</h4>
                    <p>Информация о выбранном органе временно недоступна</p>
                </div>
            `;
        }
    }
    
    initAccordion() {
        document.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('.toggle-icon');
                
                if (content) {
                    content.classList.toggle('active');
                    if (icon) {
                        icon.style.transform = content.classList.contains('active') 
                            ? 'rotate(180deg)' 
                            : 'rotate(0deg)';
                    }
                }
            });
        });
    }
    
    getSystemType(type) {
        const types = {
            'ministry': 'Министерство',
            'service': 'Федеральная служба',
            'agency': 'Федеральное агентство'
        };
        return types[type] || type;
    }
    
    getSphereName(sphere) {
        const spheres = {
            'political': 'Административно-политическая',
            'economic': 'Экономическая',
            'social': 'Социально-культурная'
        };
        return spheres[sphere] || sphere;
    }
    
    getSphereIcon(sphere) {
        const icons = {
            'political': 'shield-alt',
            'economic': 'chart-line',
            'social': 'users'
        };
        return icons[sphere] || 'circle';
    }
    
    setupEventListeners() {
        // Фильтрация
        document.querySelectorAll('.module-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Обновляем активную кнопку
                btn.parentNode.querySelectorAll('.module-filter-btn').forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                
                // Применяем фильтр
                this.applyFilter(btn.dataset.filter);
            });
        });
        
        // Поиск
        const searchInput = document.querySelector('.search-box-module input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterItems(e.target.value);
            });
        }
    }
    
    applyFilter(filterValue) {
        // Сохраняем фильтр
        this.filters.type = filterValue;
        this.filterItems();
    }
    
    filterItems(searchTerm = '') {
        const searchTermLower = searchTerm.toLowerCase();
        
        const filteredData = this.data.filter(item => {
            // Применяем фильтр по типу
            if (this.filters.type && this.filters.type !== 'all' && item.type !== this.filters.type) {
                return false;
            }
            
            // Применяем поиск
            if (searchTerm) {
                return item.name.toLowerCase().includes(searchTermLower) ||
                       item.shortName.toLowerCase().includes(searchTermLower);
            }
            
            return true;
        });
        
        // Перерендериваем список
        const listContainer = document.querySelector('.module-list');
        if (listContainer) {
            listContainer.innerHTML = filteredData.map(item => this.renderItem(item)).join('');
            
            // Обновляем обработчики
            document.querySelectorAll('.module-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.loadItemContent(item.dataset.id);
                });
            });
        }
    }
}

// Делаем доступным глобально
window.ModuleController = ModuleController;
