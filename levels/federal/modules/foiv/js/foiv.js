// foiv.js - Основной файл для модуля ФОИВ
// ВАШ СПИСОК ОРГАНОВ - редактируйте ТОЛЬКО этот массив
const foivData = [
    {
        "id": "fsb",
        "name": "Федеральная служба безопасности Российской Федерации",
        "shortName": "ФСБ России",
        "sphere": "political",
        "topics": ["безопасность", "государственная безопасность", "внутренние дела"],
        "officialWebsite": "https://www.fsb.ru"
    },
    {
        "id": "mid",
        "name": "Министерство иностранных дел Российской Федерации",
        "shortName": "МИД России",
        "sphere": "political",
        "topics": ["иностранные дела", "внешняя политика"],
        "officialWebsite": "https://mid.ru"
    },
    {
        "id": "mchs",
        "name": "Министерство Российской Федерации по делам гражданской обороны, чрезвычайным ситуациям и ликвидации последствий стихийных бедствий",
        "shortName": "МЧС России",
        "sphere": "political",
        "topics": ["безопасность", "гражданская оборона", "чрезвычайные ситуации"],
        "officialWebsite": "https://www.mchs.gov.ru"
    },
    {
        "id": "minpromtorg",
        "name": "Министерство промышленности и торговли Российской Федерации",
        "shortName": "Минпромторг России",
        "sphere": "economic_social",
        "topics": ["промышленность", "торговля", "экономика", "внешняя торговля", "энергетика", "транспорт"],
        "officialWebsite": "https://minpromtorg.gov.ru"
    }
];

// ========================
// НЕ ТРОГАЙТЕ КОД НИЖЕ
// ========================

// Определяем тип ФОИВ по названию
function getFoivType(name) {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('министерство')) return 'ministry';
    if (lowerName.includes('служба')) return 'service';
    if (lowerName.includes('агентство') || lowerName.includes('академия')) return 'agency';
    return 'other';
}

// Определяем подчинение ФОИВ
function getFoivLeader(id) {
    const presidentFoivs = ['fsb', 'mid', 'rosgvardiya', 'fsin', 'fssp', 'roskomnadzor', 'mchs'];
    return presidentFoivs.includes(id) ? 'president' : 'government';
}

// Определяем полномочия по типу ФОИВ
function getFoivPowers(type) {
    switch(type) {
        case 'ministry': return ['НПА'];
        case 'service': return ['АН'];
        case 'agency': return ['ГИ', 'ГУ'];
        default: return [];
    }
}

// Получаем цвет сферы
function getSphereColor(sphere) {
    switch(sphere) {
        case 'political': return 'var(--political)';
        case 'economic': return 'var(--economic)';
        case 'social': return 'var(--social)';
        case 'security': return 'var(--political)';
        case 'economic_social': return '#90EE90'; // Светло-зеленый для Минпромторга
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
    item.dataset.topics = foiv.topics ? foiv.topics.join(',') : '';

    // Создаем значки полномочий
    let powersHTML = '';
    powers.forEach(power => {
        powersHTML += `<div class="foiv-power-badge"><span>${power}</span></div>`;
    });

    item.innerHTML = `
        <div class="foiv-name">${foiv.name}</div>
        <div class="foiv-badges">
            <div class="foiv-sphere-badge" style="background: ${sphereColor};"></div>
            <div class="foiv-powers">${powersHTML}</div>
            <div class="foiv-leader-badge ${leaderClass}">
                <i class="fas ${leaderIcon}"></i>
            </div>
        </div>
    `;

    // Добавляем обработчик клика
    item.addEventListener('click', function() {
        document.querySelectorAll('.foiv-list-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        loadFoivDetails(foiv.id);
    });

    return item;
}

// Загружаем детальную информацию о ФОИВе
async function loadFoivDetails(foivId) {
    try {
        const contentArea = document.querySelector('.tab-pane.active .content');
        if (!contentArea) return;

        // Показываем загрузку
        contentArea.innerHTML = `
            <div class="loading-state">
                <div class="placeholder-icon"><i class="fas fa-spinner fa-spin"></i></div>
                <h3>Загрузка информации...</h3>
                <p>Пожалуйста, подождите</p>
            </div>
        `;

        // Загружаем HTML файл
        const response = await fetch(`foivs/${foivId}.html`);
        
        if (!response.ok) {
            throw new Error(`Файл foivs/${foivId}.html не найден`);
        }
        
        const html = await response.text();
        
        // Вставляем контент
        contentArea.innerHTML = `<div class="foiv-content-container">${html}</div>`;

        // Добавляем обработчики для аккордеона
        contentArea.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('.toggle-icon');
                if (content) {
                    content.classList.toggle('active');
                    icon.textContent = content.classList.contains('active') ? '▲' : '▼';
                }
            });
        });

        // Автоматически открываем первый раздел
        const firstSection = contentArea.querySelector('.section-content');
        if (firstSection) {
            firstSection.classList.add('active');
            const firstIcon = contentArea.querySelector('.toggle-icon');
            if (firstIcon) firstIcon.textContent = '▲';
        }

    } catch (error) {
        console.error('Ошибка:', error);
        const contentArea = document.querySelector('.tab-pane.active .content');
        if (contentArea) {
            contentArea.innerHTML = `
                <div class="error-state">
                    <div class="placeholder-icon"><i class="fas fa-exclamation-triangle"></i></div>
                    <h3>Ошибка загрузки</h3>
                    <p>Создайте файл: foivs/${foivId}.html</p>
                </div>
            `;
        }
    }
}

// Инициализируем список ФОИВов
function initializeTabList(listId, countId) {
    const listContainer = document.getElementById(listId);
    const countElement = document.getElementById(countId);
    
    if (!listContainer) return;
    
    // Очищаем и заполняем список
    listContainer.innerHTML = '';
    foivData.forEach(foiv => {
        listContainer.appendChild(createFoivListItem(foiv));
    });
    
    // Обновляем счетчик
    if (countElement) {
        countElement.textContent = foivData.length;
    }
}

// Обновляем счетчики в hero-секции
function updateHeroCounters() {
    const totalFoivs = foivData.length;
    const ministries = foivData.filter(f => getFoivType(f.name) === 'ministry').length;
    const services = foivData.filter(f => getFoivType(f.name) === 'service').length;
    const agencies = foivData.filter(f => getFoivType(f.name) === 'agency').length;

    const heroStats = document.querySelectorAll('.hero-stat-item .number');
    if (heroStats.length >= 4) {
        heroStats[0].textContent = totalFoivs;
        heroStats[1].textContent = ministries;
        heroStats[2].textContent = services;
        heroStats[3].textContent = agencies;
    }
}

// Фильтрация по теме (подтеме)
function filterByTopic(topic, listId) {
    const listContainer = document.getElementById(listId);
    if (!listContainer) return;
    
    const items = listContainer.querySelectorAll('.foiv-list-item');
    let visibleCount = 0;
    
    items.forEach(item => {
        const topics = item.dataset.topics ? item.dataset.topics.split(',') : [];
        const showItem = topics.includes(topic);
        
        item.style.display = showItem ? 'flex' : 'none';
        if (showItem) visibleCount++;
    });
    
    // Обновляем счетчик
    const tabPrefix = listId.replace('List', '');
    const countElement = document.getElementById(`${tabPrefix}Count`);
    if (countElement) countElement.textContent = visibleCount;
    
    // Показываем активную тему
    const activeTopicElement = document.getElementById('activeTopic');
    if (activeTopicElement) {
        activeTopicElement.textContent = topic;
        activeTopicElement.style.display = 'inline';
    }
}

// Фильтрация
function filterList(listId, filterType, filterValue) {
    const listContainer = document.getElementById(listId);
    if (!listContainer) return;
    
    const items = listContainer.querySelectorAll('.foiv-list-item');
    let visibleCount = 0;
    
    items.forEach(item => {
        let showItem = false;
        
        switch(filterType) {
            case 'type': showItem = filterValue === 'all' || item.dataset.type === filterValue; break;
            case 'leader': showItem = filterValue === 'all' || item.dataset.leader === filterValue; break;
            case 'sphere': 
                if (filterValue === 'all') {
                    showItem = true;
                } else if (filterValue === 'economic') {
                    // Минпромторг показывается и в экономической сфере
                    showItem = item.dataset.sphere === 'economic' || item.dataset.sphere === 'economic_social';
                } else if (filterValue === 'social') {
                    // Минпромторг показывается и в социальной сфере
                    showItem = item.dataset.sphere === 'social' || item.dataset.sphere === 'economic_social';
                } else {
                    showItem = item.dataset.sphere === filterValue;
                }
                break;
        }
        
        item.style.display = showItem ? 'flex' : 'none';
        if (showItem) visibleCount++;
    });
    
    // Скрываем активную тему при обычной фильтрации
    const activeTopicElement = document.getElementById('activeTopic');
    if (activeTopicElement) {
        activeTopicElement.style.display = 'none';
    }
    
    // Обновляем счетчик
    const tabPrefix = listId.replace('List', '');
    const countElement = document.getElementById(`${tabPrefix}Count`);
    if (countElement) countElement.textContent = visibleCount;
}

// Поиск
function initializeSearch(inputId, listId) {
    const searchInput = document.getElementById(inputId);
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        const listContainer = document.getElementById(listId);
        if (!listContainer) return;
        
        const items = listContainer.querySelectorAll('.foiv-list-item');
        let visibleCount = 0;
        
        items.forEach(item => {
            const name = item.querySelector('.foiv-name').textContent.toLowerCase();
            const isVisible = term === '' || name.includes(term);
            item.style.display = isVisible ? 'flex' : 'none';
            if (isVisible) visibleCount++;
        });
        
        const tabPrefix = listId.replace('List', '');
        const countElement = document.getElementById(`${tabPrefix}Count`);
        if (countElement) countElement.textContent = visibleCount;
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // 1. Обновляем счетчики
    updateHeroCounters();
    
    // 2. Инициализируем все вкладки
    ['system', 'structure', 'spheres'].forEach(tab => {
        initializeTabList(`${tab}List`, `${tab}Count`);
        initializeSearch(`search${tab.charAt(0).toUpperCase() + tab.slice(1)}`, `${tab}List`);
    });
    
    // 3. Инициализируем фильтры
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.dataset.filter;
            const filterGroup = this.closest('.filter-buttons');
            const listContainer = this.closest('.sidebar').querySelector('.foiv-list');
            if (!listContainer) return;
            
            const listId = listContainer.id;
            let filterType = 'type';
            if (filterValue === 'president' || filterValue === 'government') {
                filterType = 'leader';
            } else if (['political', 'economic', 'social'].includes(filterValue)) {
                filterType = 'sphere';
            }
            
            // Активируем кнопку
            filterGroup.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Применяем фильтр
            filterList(listId, filterType, filterValue);
        });
    });
    
    // 4. Инициализируем переключение вкладок
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Убираем активный класс
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Добавляем активный класс
            this.classList.add('active');
            const tabPane = document.getElementById(`${tabId}-tab`);
            if (tabPane) tabPane.classList.add('active');
        });
    });
    
    // 5. Активируем первую вкладку
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) firstTab.click();
    
    // 6. Инициализируем кнопки подтем
    document.querySelectorAll('.sphere-subtopic-btn').forEach(button => {
        button.addEventListener('click', function() {
            const topic = this.dataset.topic;
            const filter = this.dataset.filter;
            const listId = 'spheresList';
            
            // Сбрасываем активные фильтры
            const filterGroup = document.querySelector('#spheres-tab .filter-buttons');
            if (filterGroup) {
                filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.filter === filter) {
                        btn.classList.add('active');
                    }
                });
            }
            
            // Применяем фильтр по теме
            filterByTopic(topic, listId);
            
            // Прокручиваем к списку
            const listContainer = document.getElementById(listId);
            if (listContainer) {
                listContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
