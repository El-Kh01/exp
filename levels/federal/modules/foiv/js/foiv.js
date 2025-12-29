// foiv.js - Управление данными ФОИВов

class FoivManager {
    constructor() {
        this.allFoivs = [];
        this.filteredFoivs = [];
        this.currentTab = 'system';
        this.currentFilter = 'all';
        this.init();
    }
    
    async init() {
        await this.loadData();
        this.setupEventListeners();
    }
    
    async loadData() {
        try {
            const response = await fetch('data/foivs.json');
            this.allFoivs = await response.json();
            
            // Инициализируем отображение для текущей вкладки
            this.updateListForCurrentTab();
            
        } catch (error) {
            console.error('Ошибка загрузки данных ФОИВ:', error);
        }
    }
    
    setupEventListeners() {
        // Фильтры по типам
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const filterValue = e.target.getAttribute('data-filter');
                this.currentFilter = filterValue;
                this.filterCurrentList();
            });
        });
        
        // Поиск
        document.querySelectorAll('.search-box input').forEach(input => {
            input.addEventListener('input', (e) => {
                this.filterCurrentList(e.target.value);
            });
        });
    }
    
    updateListForCurrentTab() {
        if (!window.tabManager) return;
        
        this.currentTab = window.tabManager.currentTab;
        this.filterCurrentList();
    }
    
    filterCurrentList(searchTerm = '') {
        // Получаем текущую вкладку
        if (!window.tabManager) return;
        const tabId = window.tabManager.currentTab;
        
        // Фильтруем данные
        let filtered = this.allFoivs.filter(foiv => {
            // Фильтр по типу (для вкладки "Система")
            if (tabId === 'system' && this.currentFilter !== 'all') {
                if (foiv.type !== this.currentFilter) {
                    return false;
                }
            }
            
            // Фильтр по подчинению (для вкладки "Структура")
            if (tabId === 'structure' && this.currentFilter !== 'all') {
                if (foiv.leader !== this.currentFilter) {
                    return false;
                }
            }
            
            // Фильтр по сфере (для вкладки "Сферы")
            if (tabId === 'spheres' && this.currentFilter !== 'all') {
                if (foiv.sphere !== this.currentFilter) {
                    return false;
                }
            }
            
            // Поиск
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                return foiv.name.toLowerCase().includes(searchLower) ||
                       foiv.shortName.toLowerCase().includes(searchLower);
            }
            
            return true;
        });
        
        this.filteredFoivs = filtered;
        
        // Обновляем отображение
        this.renderList(tabId, filtered);
        
        // Обновляем счетчик
        if (window.tabManager) {
            window.tabManager.updateCount(tabId, filtered.length);
        }
    }
    
    renderList(tabId, data) {
        const listContainer = document.getElementById(`${tabId}List`);
        if (!listContainer) return;
        
        if (data.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-list">
                    <i class="fas fa-search"></i>
                    <p>По вашему запросу ничего не найдено</p>
                    <button class="reset-filter">Сбросить фильтры</button>
                </div>
            `;
            
            // Добавляем обработчик кнопки сброса
            const resetBtn = listContainer.querySelector('.reset-filter');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    this.resetFilters(tabId);
                });
            }
            
            return;
        }
        
        // Используем метод из TabManager для создания элементов
        if (window.tabManager) {
            listContainer.innerHTML = data.map(item => window.tabManager.createListItem(tabId, item)).join('');
            window.tabManager.setupListItems(tabId);
        }
    }
    
    resetFilters(tabId) {
        // Сбрасываем активные фильтры
        const filterGroup = document.querySelector(`#${tabId}-tab .filter-group`);
        if (filterGroup) {
            const buttons = filterGroup.querySelectorAll('.filter-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            const allBtn = filterGroup.querySelector('[data-filter="all"]');
            if (allBtn) {
                allBtn.classList.add('active');
            }
        }
        
        // Сбрасываем поиск
        const searchInput = document.querySelector(`#${tabId}-tab .search-box input`);
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Сбрасываем текущий фильтр
        this.currentFilter = 'all';
        
        // Обновляем список
        this.filterCurrentList();
    }
    
    getFoivById(id) {
        return this.allFoivs.find(foiv => foiv.id === id);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.foivManager = new FoivManager();
});
