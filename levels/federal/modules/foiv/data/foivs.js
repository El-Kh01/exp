// foiv.js - Основной файл для модуля ФОИВ

// Массив данных ФОИВов
const foivData = [
    {
        "id": "fsb",
        "name": "Федеральная служба безопасности Российской Федерации",
        "shortName": "ФСБ России",
        "sphere": "security",
        "officialWebsite": "https://www.fsb.ru"
    },
    {
        "id": "mid",
        "name": "Министерство иностранных дел Российской Федерации",
        "shortName": "МИД России",
        "sphere": "political",
        "officialWebsite": "https://mid.ru"
    },
    {
        "id": "mincifry",
        "name": "Министерство цифрового развития, связи и массовых коммуникаций Российской Федерации",
        "shortName": "Минцифры России",
        "sphere": "economic",
        "officialWebsite": "https://digital.gov.ru"
    },
    {
        "id": "minzdrav",
        "name": "Министерство здравоохранения Российской Федерации",
        "shortName": "Минздрав России",
        "sphere": "social",
        "officialWebsite": "https://minzdrav.gov.ru"
    },
    {
        "id": "minobrnauki",
        "name": "Министерство науки и высшего образования Российской Федерации",
        "shortName": "Минобрнауки России",
        "sphere": "social",
        "officialWebsite": "https://minobrnauki.gov.ru"
    },
    {
        "id": "minsport",
        "name": "Министерство спорта Российской Федерации",
        "shortName": "Минспорт России",
        "sphere": "social",
        "officialWebsite": "https://www.minsport.gov.ru"
    },
    {
        "id": "mineconomy",
        "name": "Министерство экономического развития Российской Федерации",
        "shortName": "Минэкономразвития России",
        "sphere": "economic",
        "officialWebsite": "https://www.economy.gov.ru"
    },
    {
        "id": "ran",
        "name": "Российская академия наук",
        "shortName": "РАН",
        "sphere": "social",
        "officialWebsite": "https://www.ras.ru"
    },
    {
        "id": "minjust",
        "name": "Министерство юстиции Российской Федерации",
        "shortName": "Минюст России",
        "sphere": "political",
        "officialWebsite": "https://minjust.gov.ru"
    },
    {
        "id": "rosmolodezh",
        "name": "Федеральное агентство по делам молодежи",
        "shortName": "Росмолодежь",
        "sphere": "social",
        "officialWebsite": "https://fadm.gov.ru"
    },
    {
        "id": "rosgvardiya",
        "name": "Федеральная служба войск национальной гвардии Российской Федерации",
        "shortName": "Росгвардия",
        "sphere": "security",
        "officialWebsite": "https://rosguard.gov.ru"
    },
    {
        "id": "roszdravnadzor",
        "name": "Федеральная служба по надзору в сфере здравоохранения",
        "shortName": "Росздравнадзор",
        "sphere": "social",
        "officialWebsite": "https://roszdravnadzor.gov.ru"
    },
    {
        "id": "rosakkreditatsiya",
        "name": "Федеральная служба по аккредитации",
        "shortName": "Росаккредитация",
        "sphere": "economic",
        "officialWebsite": "https://fsa.gov.ru"
    },
    {
        "id": "rosreestr",
        "name": "Федеральная служба государственной регистрации, кадастра и картографии",
        "shortName": "Росреестр",
        "sphere": "economic",
        "officialWebsite": "https://rosreestr.gov.ru"
    },
    {
        "id": "mintrud",
        "name": "Министерство труда и социальной защиты Российской Федерации",
        "shortName": "Минтруд России",
        "sphere": "social",
        "officialWebsite": "https://mintrud.gov.ru"
    },
    {
        "id": "fsin",
        "name": "Федеральная служба исполнения наказаний",
        "shortName": "ФСИН России",
        "sphere": "security",
        "officialWebsite": "https://fsin.gov.ru"
    },
    {
        "id": "fssp",
        "name": "Федеральная служба судебных приставов Российской Федерации",
        "shortName": "ФССП России",
        "sphere": "security",
        "officialWebsite": "https://fssp.gov.ru"
    },
    {
        "id": "fas",
        "name": "Федеральная антимонопольная служба",
        "shortName": "ФАС России",
        "sphere": "economic",
        "officialWebsite": "https://fas.gov.ru"
    },
    {
        "id": "minenergo",
        "name": "Министерство энергетики Российской Федерации",
        "shortName": "Минэнерго России",
        "sphere": "economic",
        "officialWebsite": "https://minenergo.gov.ru"
    },
    {
        "id": "agriculture",
        "name": "Министерство сельского хозяйства Российской Федерации",
        "shortName": "Минсельхоз России",
        "sphere": "economic",
        "officialWebsite": "https://mcx.gov.ru"
    },
    {
        "id": "minfin",
        "name": "Министерство финансов Российской Федерации",
        "shortName": "Минфин России",
        "sphere": "economic",
        "officialWebsite": "https://minfin.gov.ru"
    },
    {
        "id": "minpromtorg",
        "name": "Министерство промышленности и торговли Российской Федерации",
        "shortName": "Минпромторг России",
        "sphere": "economic",
        "officialWebsite": "https://minpromtorg.gov.ru"
    },
    {
        "id": "rosprirodnadzor",
        "name": "Федеральная служба по надзору в сфере природопользования",
        "shortName": "Росприроднадзор",
        "sphere": "economic",
        "officialWebsite": "https://rpn.gov.ru"
    },
    {
        "id": "fts",
        "name": "Федеральная таможенная служба",
        "shortName": "ФТС России",
        "sphere": "economic",
        "officialWebsite": "https://customs.gov.ru"
    },
    {
        "id": "roskomnadzor",
        "name": "Федеральная служба по надзору в сфере связи, информационных технологий и массовых коммуникаций",
        "shortName": "Роскомнадзор",
        "sphere": "security",
        "officialWebsite": "https://rkn.gov.ru"
    },
    {
        "id": "fns",
        "name": "Федеральная налоговая служба",
        "shortName": "ФНС России",
        "sphere": "economic",
        "officialWebsite": "https://nalog.gov.ru"
    },
    {
        "id": "minprirody",
        "name": "Министерство природных ресурсов и экологии Российской Федерации",
        "shortName": "Минприроды России",
        "sphere": "economic",
        "officialWebsite": "https://mnr.gov.ru"
    },
    {
        "id": "mintrans",
        "name": "Министерство транспорта Российской Федерации",
        "shortName": "Минтранс России",
        "sphere": "economic",
        "officialWebsite": "https://mintrans.gov.ru"
    },
    {
        "id": "rosgidromet",
        "name": "Федеральная служба по гидрометеорологии и мониторингу окружающей среды",
        "shortName": "Росгидромет",
        "sphere": "economic",
        "officialWebsite": "https://meteorf.gov.ru"
    },
    {
        "id": "mincult",
        "name": "Министерство культуры Российской Федерации",
        "shortName": "Минкультуры России",
        "sphere": "social",
        "officialWebsite": "https://culture.gov.ru"
    },
    {
        "id": "rostrud",
        "name": "Федеральная служба по труду и занятости",
        "shortName": "Роструд",
        "sphere": "social",
        "officialWebsite": "https://rostrud.gov.ru"
    },
    {
        "id": "mchs",
        "name": "Министерство Российской Федерации по делам гражданской обороны, чрезвычайным ситуациям и ликвидации последствий стихийных бедствий",
        "shortName": "МЧС России",
        "sphere": "security",
        "officialWebsite": "https://www.mchs.gov.ru"
    }
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

    // Обновляем цифры в hero-секции
    const singleStat = document.querySelector('.hero-stat-single .number');
    const ministryStat = document.querySelectorAll('.hero-stat-row .number')[0];
    const serviceStat = document.querySelectorAll('.hero-stat-row .number')[1];
    const agencyStat = document.querySelectorAll('.hero-stat-row .number')[2];

    if (singleStat) singleStat.textContent = totalFoivs;
    if (ministryStat) ministryStat.textContent = ministries;
    if (serviceStat) serviceStat.textContent = services;
    if (agencyStat) agencyStat.textContent = agencies;
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

// Получаем иконку лидера
function getLeaderIcon(leader) {
    return leader === 'president' ? 'fa-user-tie' : 'fa-landmark';
}

// Создаем элемент списка ФОИВ
function createFoivListItem(foiv) {
    const type = getFoivType(foiv.name);
    const leader = getFoivLeader(foiv.id);
    const powers = getFoivPowers(type);
    const sphereColor = getSphereColor(foiv.sphere);
    const leaderIcon = getLeaderIcon(leader);
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

    return item;
}

// Загружаем детальную информацию о ФОИВе
async function loadFoivDetails(foivId) {
    try {
        // Показываем состояние загрузки
        const contentArea = document.querySelector('.tab-pane.active .content');
        contentArea.innerHTML = `
            <div class="content-placeholder">
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
                const sectionId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
                const section = document.getElementById(sectionId);
                const icon = this.querySelector('.toggle-icon');
                
                section.classList.toggle('active');
                icon.textContent = section.classList.contains('active') ? '▲' : '▼';
            });
        });

        // Прокручиваем к началу контента
        contentArea.scrollTop = 0;

    } catch (error) {
        console.error('Ошибка загрузки:', error);
        const contentArea = document.querySelector('.tab-pane.active .content');
        contentArea.innerHTML = `
            <div class="content-placeholder">
                <div class="placeholder-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Ошибка загрузки</h3>
                <p>Не удалось загрузить информацию об органе. Проверьте наличие файла.</p>
                <p class="error-message">${error.message}</p>
            </div>
        `;
    }
}

// Инициализируем список ФОИВов для вкладки
function initializeTabList(tabId, listId, countId) {
    const listContainer = document.getElementById(listId);
    const countElement = document.getElementById(countId);
    
    if (!listContainer) return;
    
    // Очищаем список
    listContainer.innerHTML = '';
    
    // Добавляем все ФОИВы
    foivData.forEach(foiv => {
        const listItem = createFoivListItem(foiv);
        
        // Добавляем обработчик клика
        listItem.addEventListener('click', function() {
            // Убираем активный класс у всех элементов
            document.querySelectorAll('.foiv-list-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Добавляем активный класс текущему элементу
            this.classList.add('active');
            
            // Загружаем детальную информацию
            loadFoivDetails(foiv.id);
        });
        
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
        const searchTerm = this.value.toLowerCase();
        const listContainer = document.getElementById(listId);
        const items = listContainer.querySelectorAll('.foiv-list-item');
        let visibleCount = 0;
        
        items.forEach(item => {
            const foivName = item.querySelector('.foiv-name').textContent.toLowerCase();
            const isVisible = foivName.includes(searchTerm);
            
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
    // Обновляем счетчики в hero-секции
    updateHeroCounters();
    
    // Инициализируем переключение вкладок
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Убираем активный класс у всех кнопок и вкладок
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке и вкладке
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // Инициализируем список для активной вкладки
            initializeTabList(`${tabId}-tab`, `${tabId}List`, `${tabId}Count`);
            
            // Инициализируем поиск для активной вкладки
            initializeSearch(`search${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`, `${tabId}List`);
        });
    });
    
    // Инициализируем все вкладки при загрузке
    ['system', 'structure', 'spheres'].forEach(tab => {
        initializeTabList(`${tab}-tab`, `${tab}List`, `${tab}Count`);
        initializeSearch(`search${tab.charAt(0).toUpperCase() + tab.slice(1)}`, `${tab}List`);
    });
    
    // Инициализируем фильтры
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.dataset.filter;
            const filterGroup = this.closest('.filter-buttons');
            const listContainer = this.closest('.sidebar').querySelector('.foiv-list');
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
    
    // Активируем первую вкладку
    tabButtons[0].click();
    
    // Инициализируем кнопку "В начало страницы"
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
