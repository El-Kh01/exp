// Модуль для работы с ФОИВами
const FOIVModule = {
    // Инициализация модуля
    init: function() {
        if (!window.FOIV_DATA) {
            console.error('Данные ФОИВов не загружены!');
            return;
        }
        
        // Обновляем статистику
        this.updateStatistics();
        
        // Заполняем все списки
        this.fillSystemLists();
        this.fillStructureLists();
        this.fillSphereLists();
        
        // Добавляем обработчики
        this.addEventListeners();
    },
    
    // Обновление статистики
    updateStatistics: function() {
        const foivs = window.FOIV_DATA;
        const ministries = foivs.filter(f => f.type === 'ministry').length;
        const services = foivs.filter(f => f.type === 'service').length;
        const agencies = foivs.filter(f => f.type === 'agency').length;
        const total = foivs.length;
        
        // Обновляем числа в герое
        const statNumbers = document.querySelectorAll('.hero-stat-item .number');
        if (statNumbers.length >= 4) {
            statNumbers[0].textContent = total;
            statNumbers[1].textContent = ministries;
            statNumbers[2].textContent = services;
            statNumbers[3].textContent = agencies;
        }
    },
    
    // Заполнение списков в разделе "Система"
    fillSystemLists: function() {
        const foivs = window.FOIV_DATA;
        
        // Министерства
        const ministries = foivs.filter(f => f.type === 'ministry');
        this.renderList('ministries-list', ministries, 'ministry');
        
        // Службы
        const services = foivs.filter(f => f.type === 'service');
        this.renderList('services-list', services, 'service');
        
        // Агентства
        const agencies = foivs.filter(f => f.type === 'agency');
        this.renderList('agencies-list', agencies, 'agency');
    },
    
    // Заполнение списков в разделе "Структура"
    fillStructureLists: function() {
        const foivs = window.FOIV_DATA;
        
        // Подчиненные Президенту
        const presidentFOIVs = foivs.filter(f => f.structure === 'president');
        this.renderStructureList('president-list', presidentFOIVs, 'president');
        
        // Подчиненные Правительству
        const governmentFOIVs = foivs.filter(f => f.structure === 'government');
        this.renderStructureList('government-list', governmentFOIVs, 'government');
    },
    
    // Заполнение списков в разделе "Сферы"
    fillSphereLists: function() {
        const foivs = window.FOIV_DATA;
        
        // Экономическая сфера
        const economicFOIVs = foivs.filter(f => f.sphere === 'economic');
        this.renderSphereList('economic-list', economicFOIVs, 'economic');
        
        // Социально-культурная сфера
        const socialFOIVs = foivs.filter(f => f.sphere === 'social');
        this.renderSphereList('social-list', socialFOIVs, 'social');
        
        // Административно-политическая сфера
        const politicalFOIVs = foivs.filter(f => f.sphere === 'political');
        this.renderSphereList('political-list', politicalFOIVs, 'political');
    },
    
    // Рендер обычного списка
    renderList: function(containerId, items, type) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = items.map(item => `
            <li>
                <a href="foiv/${item.id}.html" class="text-link">
                    <i class="fas fa-${this.getTypeIcon(type)}"></i>
                    ${item.name}
                </a>
            </li>
        `).join('');
    },
    
    // Рендер списка структуры
    renderStructureList: function(containerId, items, structure) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = items.map(item => `
            <div class="structure-item">
                <div class="structure-icon" style="background: ${this.getStructureColor(structure)};">
                    <i class="fas fa-${structure === 'president' ? 'user-tie' : 'landmark'}"></i>
                </div>
                <a href="foiv/${item.id}.html" class="structure-link">${item.name}</a>
                <span class="structure-type">${this.getTypeLabel(item.type)}</span>
            </div>
        `).join('');
    },
    
    // Рендер списка сфер
    renderSphereList: function(containerId, items, sphere) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = items.map(item => `
            <div class="sphere-item">
                <div class="sphere-color-indicator" style="background: ${this.getSphereColor(sphere)};"></div>
                <a href="foiv/${item.id}.html">
                    ${item.name}
                    <span class="sphere-subtype">${this.getTypeLabel(item.type)}</span>
                </a>
            </div>
        `).join('');
    },
    
    // Получение иконки для типа
    getTypeIcon: function(type) {
        const icons = {
            'ministry': 'landmark',
            'service': 'shield-alt',
            'agency': 'cogs'
        };
        return icons[type] || 'building';
    },
    
    // Получение метки типа
    getTypeLabel: function(type) {
        const labels = {
            'ministry': 'Министерство',
            'service': 'Федеральная служба',
            'agency': 'Федеральное агентство'
        };
        return labels[type] || type;
    },
    
    // Получение цвета структуры
    getStructureColor: function(structure) {
        const colors = {
            'president': 'var(--president-red)',
            'government': 'var(--government-cyan)'
        };
        return colors[structure] || '#ccc';
    },
    
    // Получение цвета сферы
    getSphereColor: function(sphere) {
        const colors = {
            'political': 'var(--political)',
            'economic': 'var(--economic)',
            'social': 'var(--social)'
        };
        return colors[sphere] || '#ccc';
    },
    
    // Добавление обработчиков событий
    addEventListeners: function() {
        // Обработка кликов по ссылкам
        document.querySelectorAll('.system-details a').forEach(link => {
            link.addEventListener('click', function(e) {
                // Здесь можно добавить логику для открытия модальных окон и т.д.
                console.log('Клик по ФОИВу:', this.textContent);
            });
        });
        
        // Анимация при скролле
        this.initScrollAnimations();
    },
    
    // Анимации при скролле
    initScrollAnimations: function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        // Наблюдаем за карточками
        document.querySelectorAll('.classification-block').forEach(el => {
            observer.observe(el);
        });
    }
};

// Экспорт модуля
window.FOIVModule = FOIVModule;
