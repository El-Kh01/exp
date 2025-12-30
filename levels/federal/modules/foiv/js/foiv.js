// foiv.js - Основной файл для модуля ФОИВ

// Массив данных ФОИВов - ТОЛЬКО ДЛЯ ПРИМЕРА, ПОДКЛЮЧИТЕ ВАШ JSON ФАЙЛ
const foivData = [
    {
        "id": "minpromtorg",
        "name": "Министерство промышленности и торговли Российской Федерации",
        "shortName": "Минпромторг России",
        "sphere": "economic",
        "officialWebsite": "https://minpromtorg.gov.ru"
    },
    {
        "id": "mid",
        "name": "Министерство иностранных дел Российской Федерации",
        "shortName": "МИД России",
        "sphere": "political",
        "officialWebsite": "https://mid.ru"
    },
    {
        "id": "minzdrav",
        "name": "Министерство здравоохранения Российской Федерации",
        "shortName": "Минздрав России",
        "sphere": "social",
        "officialWebsite": "https://minzdrav.gov.ru"
    }
    // ... добавьте остальные ФОИВы из вашего JSON
];

// Определяем тип ФОИВ по названию
function getFoivType(name) {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('министерство')) return 'ministry';
    if (lowerName.includes('служба')) return 'service';
    if (lowerName.includes('агентство') || lowerName.includes('академия')) return 'agency';
    return 'other';
}

// Определяем подчинение ФОИВ (президент/правительство)
function getFoivLeader(id) {
    // ФОИВы под руководством Президента
    const presidentFoivs = ['fsb', 'mid', 'rosgvardiya', 'fsin', 'fssp', 'roskomnadzor', 'mchs'];
    return presidentFoivs.includes(id) ? 'president' : 'government';
}

// Определяем полномочия по типу ФОИВ
function getFoivPowers(type) {
    switch(type) {
        case 'ministry':
            return ['НПА'];
        case 'service':
            return ['АН'];
        case 'agency':
            return ['ГИ', 'ГУ'];
        default:
            return [];
    }
}

// Обновляем счетчики в hero-секции
function updateHeroCounters() {
    const totalFoivs = foivData.length;
    const ministries = foivData.filter(foiv => getFoivType(foiv.name) === 'ministry').length;
    const services = foivData.filter(foiv => getFoivType(foiv.name) === 'service').length;
    const agencies = foivData.filter(foiv => getFoivType(foiv.name) === 'agency').length;

    console.log('Обновление счетчиков:', { totalFoivs, ministries, services, agencies });

    // Обновляем цифры в hero-секции
    const heroStats = document.querySelectorAll('.hero-stat-item .number');
    
    if (heroStats.length >= 4) {
        // Общий счетчик ФОИВов
        heroStats[0].textContent = totalFoivs;
        // Министерства
        heroStats[1].textContent = ministries;
        // Службы
        heroStats[2].textContent = services;
        // Агентства
        heroStats[3].textContent = agencies;
    }
}

// Получаем цвет сферы
function getSphereColor(sphere) {
    switch(sphere) {
        case 'political': return 'var(--political)';
        case 'economic': return 'var(--economic)';
        case 'social': return 'var(--social)';
        case 'security': return 'var(--political)';
        default: return 'var(--detroit-dark-gray)';
    }
}

// Создаем элемент списка ФОИВ
function createFoivListItem(foiv) {
    const type = getFoivType(foiv.name);
    const leader = getFoivLeader(foiv.id);
    const powers = getFoivPowers(type);
    const sphereColor = getSphereColor(foiv.sphere);
    const leaderIcon = leader === 'president' ? 'fa-user-tie' : 'fa-landmark';
    const leaderClass = leader === 'president' ? 'president' : 'government';

    const item = document.createElement('div');
    item.className = 'foiv-list-item';
    item.dataset.id = foiv.id;
    item.dataset.type = type;
    item.dataset.sphere = foiv.sphere;
    item.dataset.leader = leader;

    // Создаем значки полномочий
    let powersHTML = '';
    powers.forEach(power => {
        powersHTML += `<div class="foiv-power-badge" style="background: var(--detroit-dark-gray);"><span>${power}</span></div>`;
    });

    item.innerHTML = `
        <div class="foiv-name">${foiv.name}</div>
        <div class="foiv-badges">
            <div class="foiv-sphere-badge" style="background: ${sphereColor};"></div>
            <div class="foiv-powers">
                ${powersHTML}
            </div>
            <div class="foiv-leader-badge ${leaderClass}">
                <i class="fas ${leaderIcon}"></i>
            </div>
        </div>
    `;

    // Добавляем обработчик клика
    item.addEventListener('click', function() {
        // Убираем активный класс у всех элементов
        document.querySelectorAll('.foiv-list-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Добавляем активный класс текущему элементу
        this.classList.add('active');
        
        // Загружаем детальную информацию
        loadFoivDetails(foiv.id);
    });

    return item;
}

// Загружаем детальную информацию о ФОИВе
async function loadFoivDetails(foivId) {
    try {
        const contentArea = document.querySelector('.tab-pane.active .content');
        if (!contentArea) return;

        // Показываем состояние загрузки
        contentArea.innerHTML = `
            <div class="loading-state">
                <div class="placeholder-icon">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <h3>Загрузка информации...</h3>
                <p>Пожалуйста, подождите</p>
            </div>
        `;

        // Загружаем HTML файл
        const response = await fetch(`foivs/${foivId}.html`);
        
        if (!response.ok) {
            throw new Error(`HTML файл не найден: foivs/${foivId}.html`);
        }
        
        const html = await response.text();
        
        // Создаем контейнер для контента
        contentArea.innerHTML = `
            <div class="foiv-content-container">
                ${html}
            </div>
        `;

        // Добавляем обработчики для аккордеона
        const sectionHeaders = contentArea.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const sectionContent = this.nextElementSibling;
                const icon = this.querySelector('.toggle-icon');
                
                if (sectionContent) {
                    sectionContent.classList.toggle('active');
                    icon.textContent = sectionContent.classList.contains('active') ? '▲' : '▼';
                }
            });
        });

        // Автоматически открываем первый раздел
        const firstSection = contentArea.querySelector('.section-content');
        if (firstSection) {
            firstSection.classList.add('active');
            const firstIcon = contentArea.querySelector('.toggle-icon');
            if (firstIcon) {
                firstIcon.textContent = '▲';
            }
        }

        // Прокручиваем к началу контента
        contentArea.scrollTop = 0;

    } catch (error) {
        console.error('Ошибка загрузки:', error);
        const contentArea = document.querySelector('.tab-pane.active .content');
        if (contentArea) {
            contentArea.innerHTML = `
                <div class="error-state">
                    <div class="placeholder-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3>Ошибка загрузки</h3>
                    <p>Не удалось загрузить информацию об органе.</p>
                    <p class="error-message">${error.message}</p>
                    <p>Создайте файл <strong>foivs/${foivId}.html</strong> для этого ФОИВа</p>
                </div>
            `;
        }
    }
}

// Инициализируем список ФОИВов для вкладки
function initializeTabList(tabId, listId, countId) {
    const listContainer = document.getElementById(listId);
    const countElement = document.getElementById(countId);
    
    if (!listContainer) {
        console.error('Контейнер списка не найден:', listId);
        return;
    }
    
    // Очищаем список
    listContainer.innerHTML = '';
    
    // Добавляем все ФОИВы
    foivData.forEach(foiv => {
        const listItem = createFoivListItem(foiv);
        listContainer.appendChild(listItem);
    });
    
    // Обновляем счетчик
    if (countElement) {
        countElement.textContent = foivData.length;
    }
}

// Фильтруем список ФОИВов
function filterList(listId, filterType, filterValue) {
    const listContainer = document.getElementById(listId);
    if (!listContainer) return;
    
    const items = listContainer.querySelectorAll('.foiv-list-item');
    let visibleCount = 0;
    
    items.forEach(item => {
        let showItem = false;
        
        switch(filterType) {
            case 'type':
                showItem = filterValue === 'all' || item.dataset.type === filterValue;
                break;
            case 'leader':
                showItem = filterValue === 'all' || item.dataset.leader === filterValue;
                break;
            case 'sphere':
                if (filterValue === 'all') {
                    showItem = true;
                } else if (filterValue === 'security') {
                    showItem = item.dataset.sphere === 'security';
                } else {
                    showItem = item.dataset.sphere === filterValue;
                }
                break;
        }
        
        item.style.display = showItem ? 'flex' : 'none';
        if (showItem) visibleCount++;
    });
    
    // Обновляем счетчик видимых элементов
    const tabPrefix = listId.replace('List', '');
    const countElement = document.getElementById(`${tabPrefix}Count`);
    if (countElement) {
        countElement.textContent = visibleCount;
    }
}

// Инициализируем поиск
function initializeSearch(inputId, listId) {
    const searchInput = document.getElementById(inputId);
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const listContainer = document.getElementById(listId);
        if (!listContainer) return;
        
        const items = listContainer.querySelectorAll('.foiv-list-item');
        let visibleCount = 0;
        
        items.forEach(item => {
            const foivName = item.querySelector('.foiv-name').textContent.toLowerCase();
            const isVisible = searchTerm === '' || foivName.includes(searchTerm);
            
            item.style.display = isVisible ? 'flex' : 'none';
            if (isVisible) visibleCount++;
        });
        
        // Обновляем счетчик
        const tabPrefix = listId.replace('List', '');
        const countElement = document.getElementById(`${tabPrefix}Count`);
        if (countElement) {
            countElement.textContent = visibleCount;
        }
    });
}

// Основная функция инициализации
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализация модуля ФОИВ...');
    
    // 1. Обновляем счетчики в hero-секции
    updateHeroCounters();
    
    // 2. Инициализируем переключение вкладок
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Убираем активный класс у всех кнопок и вкладок
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке и вкладке
            this.classList.add('active');
            const tabPane = document.getElementById(`${tabId}-tab`);
            if (tabPane) {
                tabPane.classList.add('active');
            }
        });
    });
    
    // 3. Инициализируем все вкладки
    ['system', 'structure', 'spheres'].forEach(tab => {
        initializeTabList(`${tab}-tab`, `${tab}List`, `${tab}Count`);
        initializeSearch(`search${tab.charAt(0).toUpperCase() + tab.slice(1)}`, `${tab}List`);
    });
    
    // 4. Инициализируем фильтры
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.dataset.filter;
            const filterGroup = this.closest('.filter-buttons');
            const listContainer = this.closest('.sidebar').querySelector('.foiv-list');
            if (!listContainer) return;
            
            const listId = listContainer.id;
            
            // Определяем тип фильтрации
            let filterType = 'type';
            if (filterValue === 'president' || filterValue === 'government') {
                filterType = 'leader';
            } else if (['political', 'economic', 'social', 'security'].includes(filterValue)) {
                filterType = 'sphere';
            }
            
            // Убираем активный класс у всех кнопок в группе
            filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Применяем фильтр
            filterList(listId, filterType, filterValue);
        });
    });
    
    // 5. Активируем первую вкладку
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
    
    // 6. Инициализируем кнопку "В начало страницы"
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    console.log('Модуль ФОИВ инициализирован');
});
