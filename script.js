// Данные по умолчанию (можно заменить JSON-файлами)
const defaultData = {
    foi: [
        {
            id: 1,
            name: "Министерство иностранных дел",
            shortName: "МИД России",
            subordination: "president",
            sphere: "foreign",
            functions: "Разработка и реализация внешней политики, международные отношения",
            legalBase: "Указ Президента РФ от 11.07.2004 N 865",
            website: "https://mid.ru",
            content: `## Основные задачи
1. Разработка стратегии внешней политики
2. Обеспечение дипломатических отношений
3. Защита интересов граждан за рубежом

## Структура
- Центральный аппарат
- Дипломатические представительства
- Консульские учреждения`
        }
    ],
    services: [],
    agencies: []
};

// Инициализация данных
let appData = JSON.parse(localStorage.getItem('ap_data')) || defaultData;

// DOM элементы
const elements = {
    foiGrid: document.getElementById('foiGrid'),
    servicesGrid: document.getElementById('servicesGrid'),
    agenciesGrid: document.getElementById('agenciesGrid'),
    adminModal: document.getElementById('adminModal'),
    addForm: document.getElementById('addForm'),
    globalSearch: document.getElementById('globalSearch')
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadAllData();
    setupEventListeners();
    loadTheme();
});

// Загрузка данных
function loadAllData() {
    renderFOI();
    renderServices();
    renderAgencies();
}

// Рендер ФОИВ
function renderFOI() {
    if (!elements.foiGrid) return;
    
    elements.foiGrid.innerHTML = appData.foi.map(org => `
        <div class="org-card" data-sphere="${org.sphere}" data-subordination="${org.subordination}">
            <div class="org-header">
                <h3 class="org-name">${org.name}</h3>
                <div class="org-meta">
                    <span class="org-subordination ${org.subordination}">
                        ${org.subordination === 'president' ? 'Президенту' : 'Правительству'}
                    </span>
                    <span class="org-sphere">${getSphereLabel(org.sphere)}</span>
                </div>
            </div>
            <div class="org-content">
                <p class="org-functions">${org.functions}</p>
                <div class="org-info">
                    <small><i class="fas fa-gavel"></i> ${org.legalBase}</small>
                </div>
            </div>
            <div class="org-actions">
                <button class="btn btn-outline" onclick="viewOrg('foi', ${org.id})">
                    <i class="fas fa-eye"></i> Подробнее
                </button>
                <button class="btn btn-secondary" onclick="editOrg('foi', ${org.id})">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Рендер служб
function renderServices() {
    if (!elements.servicesGrid) return;
    
    elements.servicesGrid.innerHTML = appData.services.map(service => `
        <div class="org-card">
            <div class="org-header">
                <h3 class="org-name">${service.name}</h3>
            </div>
            <div class="org-content">
                <p class="org-functions">${service.functions}</p>
            </div>
        </div>
    `).join('');
}

// Рендер агентств
function renderAgencies() {
    if (!elements.agenciesGrid) return;
    
    elements.agenciesGrid.innerHTML = appData.agencies.map(agency => `
        <div class="org-card">
            <div class="org-header">
                <h3 class="org-name">${agency.name}</h3>
            </div>
            <div class="org-content">
                <p class="org-functions">${agency.functions}</p>
            </div>
        </div>
    `).join('');
}

// Получение метки сферы
function getSphereLabel(sphere) {
    const spheres = {
        foreign: 'Международные отношения',
        internal: 'Внутренние дела',
        economic: 'Экономика',
        social: 'Социальная сфера',
        defense: 'Оборона',
        justice: 'Правосудие'
    };
    return spheres[sphere] || sphere;
}

// Навигация
function navigateTo(section) {
    document.getElementById(section).scrollIntoView({
        behavior: 'smooth'
    });
}

// Открыть панель администратора
function openAdminPanel() {
    elements.adminModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрыть панель администратора
function closeAdminPanel() {
    elements.adminModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    elements.addForm.reset();
}

// Сохранение нового органа
elements.addForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const orgData = {
        id: Date.now(),
        name: document.getElementById('orgName').value,
        shortName: document.getElementById('orgShortName').value,
        subordination: document.getElementById('orgSubordination').value,
        sphere: document.getElementById('orgSphere').value,
        functions: document.getElementById('orgFunctions').value,
        legalBase: document.getElementById('orgLegalBase').value,
        website: document.getElementById('orgWebsite').value,
        content: document.getElementById('orgContent').value,
        createdAt: new Date().toISOString()
    };
    
    const tab = document.querySelector('.form-tab.active').dataset.tab;
    
    switch(tab) {
        case 'foi':
            appData.foi.push(orgData);
            break;
        case 'service':
            appData.services.push(orgData);
            break;
        case 'agency':
            appData.agencies.push(orgData);
            break;
    }
    
    saveData();
    loadAllData();
    closeAdminPanel();
    
    showNotification('Орган успешно добавлен!', 'success');
});

// Сохранение данных
function saveData() {
    localStorage.setItem('ap_data', JSON.stringify(appData));
}

// Загрузка темы
function loadTheme() {
    const theme = localStorage.getItem('ap_theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    
    const icon = document.querySelector('.theme-toggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Переключение темы
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ap_theme', newTheme);
    
    const icon = document.querySelector('.theme-toggle i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Показать уведомление
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        z-index: 1002;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Настройка обработчиков событий
function setupEventListeners() {
    // Фильтрация
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterOrgs(filter);
        });
    });
    
    // Вкладки формы
    document.querySelectorAll('.form-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Глобальный поиск
    elements.globalSearch?.addEventListener('input', function(e) {
        searchOrgs(e.target.value);
    });
    
    // Закрытие модального окна по клику вне
    elements.adminModal?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeAdminPanel();
        }
    });
}

// Фильтрация органов
function filterOrgs(filter) {
    const cards = document.querySelectorAll('.org-card');
    
    cards.forEach(card => {
        switch(filter) {
            case 'all':
                card.style.display = 'block';
                break;
            case 'president':
            case 'government':
                card.style.display = card.dataset.subordination === filter ? 'block' : 'none';
                break;
            case 'sphere':
                // Показать группировку по сферам
                groupBySphere();
                return;
        }
    });
}

// Группировка по сферам
function groupBySphere() {
    const spheres = {};
    
    appData.foi.forEach(org => {
        if (!spheres[org.sphere]) {
            spheres[org.sphere] = [];
        }
        spheres[org.sphere].push(org);
    });
    
    elements.foiGrid.innerHTML = Object.entries(spheres).map(([sphere, orgs]) => `
        <div class="sphere-group">
            <h4>${getSphereLabel(sphere)}</h4>
            <div class="orgs-in-sphere">
                ${orgs.map(org => `
                    <div class="org-card">
                        <h5>${org.name}</h5>
                        <p>${org.functions.substring(0, 100)}...</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Поиск органов
function searchOrgs(query) {
    if (!query.trim()) {
        loadAllData();
        return;
    }
    
    const results = {
        foi: appData.foi.filter(org => 
            org.name.toLowerCase().includes(query.toLowerCase()) ||
            org.functions.toLowerCase().includes(query.toLowerCase()) ||
            org.legalBase.toLowerCase().includes(query.toLowerCase())
        ),
        services: appData.services.filter(service =>
            service.name.toLowerCase().includes(query.toLowerCase())
        ),
        agencies: appData.agencies.filter(agency =>
            agency.name.toLowerCase().includes(query.toLowerCase())
        )
    };
    
    renderSearchResults(results);
}

// Рендер результатов поиска
function renderSearchResults(results) {
    if (results.foi.length > 0) {
        elements.foiGrid.innerHTML = results.foi.map(org => `
            <div class="org-card">
                <div class="org-header">
                    <h3 class="org-name">${org.name}</h3>
                </div>
                <div class="org-content">
                    <p class="org-functions">${org.functions}</p>
                </div>
            </div>
        `).join('');
    }
}

// Экспорт данных
function exportData() {
    const dataStr = JSON.stringify(appData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `ap-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Данные экспортированы!', 'success');
}

// Импорт данных
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            appData = importedData;
            saveData();
            loadAllData();
            showNotification('Данные успешно импортированы!', 'success');
        } catch (error) {
            showNotification('Ошибка при импорте данных!', 'danger');
        }
    };
    reader.readAsText(file);
}

// Просмотр органа
function viewOrg(type, id) {
    const org = appData[type].find(o => o.id === id);
    if (!org) return;
    
    const pageName = `${type}-${id}.html`;
    const pageContent = generateOrgPage(org, type);
    
    // Сохраняем страницу в localStorage для временного доступа
    localStorage.setItem('temp_org_page', pageContent);
    
    // Открываем в новой вкладке
    const blob = new Blob([pageContent], {type: 'text/html'});
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}

// Генерация страницы органа
function generateOrgPage(org, type) {
    return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${org.name} - Особенная часть АП</title>
        <style>
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 2rem; }
            .container { max-width: 800px; margin: 0 auto; }
            .org-header { border-bottom: 2px solid #2563eb; padding-bottom: 1rem; margin-bottom: 2rem; }
            .org-title { color: #2563eb; }
            .section { margin: 2rem 0; }
            .markdown-content { line-height: 1.8; }
            .btn { display: inline-block; padding: 0.5rem 1rem; background: #2563eb; color: white; 
                   text-decoration: none; border-radius: 4px; margin-top: 1rem; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="org-header">
                <h1 class="org-title">${org.name}</h1>
                <p><strong>Сокращенное название:</strong> ${org.shortName || 'Не указано'}</p>
                <p><strong>Подчиненность:</strong> ${org.subordination === 'president' ? 'Президенту РФ' : 'Правительству РФ'}</p>
                <p><strong>Сфера:</strong> ${getSphereLabel(org.sphere)}</p>
            </div>
            
            <div class="section">
                <h2>Основные функции</h2>
                <p>${org.functions}</p>
            </div>
            
            <div class="section">
                <h2>Правовая база</h2>
                <p>${org.legalBase}</p>
            </div>
            
            ${org.website ? `
            <div class="section">
                <h2>Официальный сайт</h2>
                <a href="${org.website}" target="_blank">${org.website}</a>
            </div>` : ''}
            
            ${org.content ? `
            <div class="section">
                <h2>Подробная информация</h2>
                <div class="markdown-content">
                    ${marked.parse(org.content)}
                </div>
            </div>` : ''}
            
            <a href="javascript:window.print()" class="btn">Распечатать</a>
            <a href="javascript:window.close()" class="btn">Закрыть</a>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    </body>
    </html>`;
}

// Показать иерархию
function showHierarchy() {
    const hierarchyContent = `
    <div class="hierarchy">
        <h3><i class="fas fa-sitemap"></i> Иерархия подчинения</h3>
        <div class="hierarchy-tree">
            <div class="level">
                <div class="node president">Президент РФ</div>
                <div class="children">
                    ${appData.foi.filter(o => o.subordination === 'president').map(org => `
                        <div class="node org">${org.name}</div>
                    `).join('')}
                </div>
            </div>
            <div class="level">
                <div class="node government">Правительство РФ</div>
                <div class="children">
                    ${appData.foi.filter(o => o.subordination === 'government').map(org => `
                        <div class="node org">${org.name}</div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>`;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            ${hierarchyContent}
        </div>
    `;
    document.body.appendChild(modal);
}

// Загрузка Markdown парсера (CDN)
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
document.head.appendChild(script);

// Печать страницы
function printPage() {
    window.print();
}

// Редактирование органа
function editOrg(type, id) {
    const org = appData[type].find(o => o.id === id);
    if (!org) return;
    
    openAdminPanel();
    
    // Заполняем форму данными органа
    document.getElementById('orgName').value = org.name;
    document.getElementById('orgShortName').value = org.shortName || '';
    document.getElementById('orgSubordination').value = org.subordination;
    document.getElementById('orgSphere').value = org.sphere;
    document.getElementById('orgFunctions').value = org.functions;
    document.getElementById('orgLegalBase').value = org.legalBase;
    document.getElementById('orgWebsite').value = org.website || '';
    document.getElementById('orgContent').value = org.content || '';
    
    // Устанавливаем нужную вкладку
    document.querySelectorAll('.form-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === type) {
            tab.classList.add('active');
        }
    });
    
    // Изменяем обработчик формы для обновления
    elements.addForm.onsubmit = function(e) {
        e.preventDefault();
        
        Object.assign(org, {
            name: document.getElementById('orgName').value,
            shortName: document.getElementById('orgShortName').value,
            subordination: document.getElementById('orgSubordination').value,
            sphere: document.getElementById('orgSphere').value,
            functions: document.getElementById('orgFunctions').value,
            legalBase: document.getElementById('orgLegalBase').value,
            website: document.getElementById('orgWebsite').value,
            content: document.getElementById('orgContent').value,
            updatedAt: new Date().toISOString()
        });
        
        saveData();
        loadAllData();
        closeAdminPanel();
        showNotification('Орган успешно обновлен!', 'success');
    };
}
