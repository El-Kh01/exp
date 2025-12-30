// foiv.js - Управление данными ФОИВов

class FoivManager {
    constructor() {
        this.allFoivs = [];
        this.currentTab = 'system';
        this.init();
    }
    
    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.renderAllLists();
    }
    
    async loadData() {
        try {
            const response = await fetch('data/foivs.json');
            if (!response.ok) {
                throw new Error('Файл с данными не найден');
            }
            this.allFoivs = await response.json();
            
            // Обновляем счетчики в герое
            this.updateHeroCounters();
            
        } catch (error) {
            console.error('Ошибка загрузки данных ФОИВ:', error);
            this.showError('Не удалось загрузить данные. Проверьте наличие файла data/foivs.json');
        }
    }
    
    updateHeroCounters() {
        const ministries = this.allFoivs.filter(f => f.type === 'ministry').length;
        const services = this.allFoivs.filter(f => f.type === 'service').length;
        const agencies = this.allFoivs.filter(f => f.type === 'agency').length;
        const total = this.allFoivs.length;
        
        this.animateCounter('.hero-stat-single .number', total);
        this.animateCounter('.hero-stat-row .hero-stat-item:nth-child(1) .number', ministries);
        this.animateCounter('.hero-stat-row .hero-stat-item:nth-child(2) .number', services);
        this.animateCounter('.hero-stat-row .hero-stat-item:nth-child(3) .number', agencies);
    }
    
    animateCounter(selector, target) {
        const element = document.querySelector(selector);
        if (!element) return;
        
        const current = parseInt(element.textContent) || 0;
        const increment = (target - current) / 30;
        let currentValue = current;
        
        const update = () => {
            currentValue += increment;
            if ((increment > 0 && currentValue >= target) || (increment < 0 && currentValue <= target)) {
                element.textContent = target;
                return;
            }
            element.textContent = Math.round(currentValue);
            requestAnimationFrame(update);
        };
        
        update();
    }
    
    setupEventListeners() {
        this.setupFilterButtons('system-tab', 'type');
        this.setupFilterButtons('structure-tab', 'leader');
        this.setupFilterButtons('spheres-tab', 'sphere');
        this.setupSearch();
    }
    
    setupFilterButtons(tabId, filterType) {
        const filterButtons = document.querySelectorAll(`#${tabId} .filter-btn`);
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filterGroup = e.target.closest('.filter-group');
                filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                e.target.classList.add('active');
                this.filterCurrentList(filterType, e.target.dataset.filter);
            });
        });
    }
    
    setupSearch() {
        ['searchSystem', 'searchStructure', 'searchSpheres'].forEach(searchId => {
            const searchInput = document.getElementById(searchId);
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const tabId = searchId.replace('search', '').toLowerCase();
                    this.filterCurrentList('search', e.target.value.toLowerCase(), tabId);
                });
            }
        });
    }
    
    renderAllLists() {
        this.renderList('system', this.allFoivs);
        this.renderList('structure', this.allFoivs);
        this.renderList('spheres', this.allFoivs);
        
        this.updateCount('system', this.allFoivs.length);
        this.updateCount('structure', this.allFoivs.length);
        this.updateCount('spheres', this.allFoivs.length);
    }
    
    renderList(tabId, data) {
        const listContainer = document.getElementById(`${tabId}List`);
        if (!listContainer) return;
        
        if (!data || data.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-list">
                    <i class="fas fa-search"></i>
                    <p>По вашему запросу ничего не найдено</p>
                </div>
            `;
            return;
        }
        
        listContainer.innerHTML = '';
        
        data.forEach(foiv => {
            const listItem = this.createListItem(foiv);
            listContainer.appendChild(listItem);
            
            listItem.addEventListener('click', () => {
                this.selectFoiv(foiv.id, tabId);
            });
        });
    }
    
    createListItem(foiv) {
        const div = document.createElement('div');
        div.className = 'foiv-list-item';
        div.dataset.id = foiv.id;
        div.dataset.type = foiv.type;
        div.dataset.sphere = foiv.sphere;
        div.dataset.leader = foiv.leader;
        
        const sphereColor = this.getSphereColor(foiv.sphere);
        const leaderIcon = foiv.leader === 'president' ? 'fas fa-user-tie' : 'fas fa-landmark';
        const leaderClass = foiv.leader === 'president' ? 'president' : 'government';
        
        let powersHTML = '';
        if (foiv.powers && Array.isArray(foiv.powers)) {
            foiv.powers.forEach(power => {
                const powerColor = this.getPowerColor(power);
                const powerText = this.getPowerText(power);
                powersHTML += `
                    <div class="foiv-power-badge" style="background: ${powerColor};" 
                         title="${power === 'npa' ? 'Нормативные правовые акты' : 
                                power === 'supervision' ? 'Административный надзор' : 
                                power === 'property' ? 'Государственное имущество' : 
                                'Государственные услуги'}">
                        <span>${powerText}</span>
                    </div>
                `;
            });
        } else {
            const powers = this.getPowersByType(foiv.type);
            powers.forEach(power => {
                const powerColor = this.getPowerColor(power);
                const powerText = this.getPowerText(power);
                powersHTML += `
                    <div class="foiv-power-badge" style="background: ${powerColor};" 
                         title="${power === 'npa' ? 'Нормативные правовые акты' : 
                                power === 'supervision' ? 'Административный надзор' : 
                                power === 'property' ? 'Государственное имущество' : 
                                'Государственные услуги'}">
                        <span>${powerText}</span>
                    </div>
                `;
            });
        }
        
        div.innerHTML = `
            <div class="foiv-name">${foiv.shortName}</div>
            <div class="foiv-badges">
                <div class="foiv-sphere-badge" style="background: ${sphereColor};" 
                     title="${foiv.sphere === 'political' ? 'Политическая сфера' : 
                            foiv.sphere === 'economic' ? 'Экономическая сфера' : 
                            foiv.sphere === 'social' ? 'Социальная сфера' : 
                            foiv.sphere === 'security' ? 'Сфера безопасности' : 'Неизвестная сфера'}"></div>
                <div class="foiv-powers">${powersHTML}</div>
                <div class="foiv-leader-badge ${leaderClass}" 
                     title="${foiv.leader === 'president' ? 'Подчиняется Президенту РФ' : 'Подчиняется Правительству РФ'}">
                    <i class="${leaderIcon}"></i>
                </div>
            </div>
        `;
        
        return div;
    }
    
    getSphereColor(sphere) {
        const colors = {
            'political': '#e80909',
            'economic': '#1013e3',
            'social': '#f5d442',
            'security': '#e80909'
        };
        return colors[sphere] || '#2A2D34';
    }
    
    getPowerColor(power) {
        const colors = {
            'npa': '#1e3c72',
            'supervision': '#2a5298',
            'property': '#408BC9',
            'services': '#5DA9E9'
        };
        return colors[power] || '#2A2D34';
    }
    
    getPowerText(power) {
        const texts = {
            'npa': 'НПА',
            'supervision': 'АН',
            'property': 'ГИ',
            'services': 'ГУ'
        };
        return texts[power] || '';
    }
    
    getPowersByType(type) {
        const powers = {
            'ministry': ['npa'],
            'service': ['supervision'],
            'agency': ['property', 'services']
        };
        return powers[type] || [];
    }
    
    filterCurrentList(filterType, filterValue, specificTab = null) {
        const tabId = specificTab || window.tabManager.currentTab;
        let filteredData = [...this.allFoivs];
        
        if (filterType === 'search' && filterValue) {
            filteredData = filteredData.filter(foiv => 
                foiv.name.toLowerCase().includes(filterValue) ||
                foiv.shortName.toLowerCase().includes(filterValue)
            );
        } else if (filterType !== 'search' && filterValue && filterValue !== 'all') {
            filteredData = filteredData.filter(foiv => foiv[filterType] === filterValue);
        }
        
        this.renderList(tabId, filteredData);
        this.updateCount(tabId, filteredData.length);
    }
    
    updateListForCurrentTab() {
        this.filterCurrentList('all', 'all', window.tabManager.currentTab);
    }
    
    updateCount(tabId, count) {
        const countElement = document.getElementById(`${tabId}Count`);
        if (countElement) {
            countElement.textContent = count;
        }
    }
    
    async selectFoiv(foivId, tabId) {
        const foiv = this.allFoivs.find(f => f.id === foivId);
        if (!foiv) return;
        
        const listItems = document.querySelectorAll(`#${tabId}List .foiv-list-item`);
        listItems.forEach(item => item.classList.remove('active'));
        
        const selectedItem = document.querySelector(`#${tabId}List .foiv-list-item[data-id="${foivId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }
        
        await this.showFoivDetails(foiv, tabId);
    }
    
    async showFoivDetails(foiv, tabId) {
        const contentContainer = document.getElementById(`${tabId}Content`);
        if (!contentContainer) return;
        
        try {
            // Плавное исчезновение старого контента
            contentContainer.style.opacity = '0.5';
            contentContainer.style.transition = 'opacity 0.3s ease';
            
            setTimeout(async () => {
                contentContainer.innerHTML = `
                    <div class="loading-list">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Загрузка информации...</p>
                    </div>
                `;
                contentContainer.style.opacity = '1';
                
                try {
                    // Пробуем загрузить HTML-файл ФОИВа из папки foivs
                    const response = await fetch(`foivs/${foiv.id}.html`);
                    
                    if (response.ok) {
                        const content = await response.text();
                        
                        // Создаем новый контейнер для контента
                        const container = document.createElement('div');
                        container.className = 'foiv-content-container';
                        container.innerHTML = content;
                        
                        // Заменяем содержимое contentContainer
                        contentContainer.innerHTML = '';
                        contentContainer.appendChild(container);
                        
                        // Выполняем скрипты внутри загруженного контента
                        this.executeScriptsInContent(container);
                        
                        // Инициализируем раскрывающиеся секции
                        this.initAccordions();
                        
                        // Обновляем высоту контейнера
                        setTimeout(() => {
                            if (window.tabManager && window.tabManager.updateContentHeight) {
                                window.tabManager.updateContentHeight();
                            }
                        }, 100);
                        
                    } else {
                        // Если файла нет, показываем сообщение
                        contentContainer.innerHTML = this.generateFallbackContent(foiv);
                    }
                } catch (error) {
                    console.error('Ошибка загрузки контента:', error);
                    contentContainer.innerHTML = this.generateFallbackContent(foiv);
                }
                
                contentContainer.style.opacity = '1';
                
            }, 300);
            
        } catch (error) {
            console.error('Ошибка загрузки контента:', error);
            contentContainer.innerHTML = this.generateFallbackContent(foiv);
            contentContainer.style.opacity = '1';
        }
    }
    
    // Выполнение скриптов внутри загруженного контента
    executeScriptsInContent(container) {
        const scripts = container.getElementsByTagName('script');
        for (let script of scripts) {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }
            newScript.async = false;
            document.body.appendChild(newScript);
        }
    }
    
    // Инициализация раскрывающихся секций
    initAccordions() {
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            // Если у header уже есть обработчик, не добавляем новый
            if (header.dataset.hasListener) return;
            
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('.toggle-icon');
                
                if (content) {
                    content.classList.toggle('active');
                    
                    if (icon) {
                        icon.textContent = content.classList.contains('active') ? '▲' : '▼';
                    }
                }
            });
            
            header.dataset.hasListener = 'true';
        });
    }
    
    generateFallbackContent(foiv) {
        const sphereText = {
            'political': 'Административно-политическая сфера',
            'economic': 'Экономическая сфера',
            'social': 'Социально-культурная сфера',
            'security': 'Сфера безопасности (оборона и безопасность)'
        };
        
        const typeText = {
            'ministry': 'Федеральное министерство',
            'service': 'Федеральная служба',
            'agency': 'Федеральное агентство'
        };
        
        const leaderText = {
            'president': 'Президенту Российской Федерации',
            'government': 'Правительству Российской Федерации'
        };
        
        const powers = foiv.powers || this.getPowersByType(foiv.type);
        const powersText = powers.map(power => {
            const texts = {
                'npa': 'Принятие нормативных правовых актов',
                'supervision': 'Административный надзор и контроль',
                'property': 'Управление государственным имуществом',
                'services': 'Оказание государственных услуг'
            };
            return texts[power];
        });
        
        return `
            <div class="foiv-content-container">
                <div class="foiv-detail-header">
                    <div class="foiv-detail-title">${foiv.name}</div>
                    <div class="foiv-detail-subtitle">${foiv.shortName}</div>
                    <div class="foiv-meta">
                        <div class="foiv-sphere-badge" style="background: ${this.getSphereColor(foiv.sphere)};">
                            ${sphereText[foiv.sphere] || foiv.sphere}
                        </div>
                    </div>
                    ${foiv.officialWebsite ? `
                        <a href="${foiv.officialWebsite}" target="_blank" class="foiv-official-link">
                            <i class="fas fa-external-link-alt"></i> Официальный сайт
                        </a>
                    ` : ''}
                </div>
                
                <div class="foiv-info-grid">
                    <div class="foiv-info-card">
                        <h4><i class="fas fa-info-circle"></i> Общая информация</h4>
                        <ul class="foiv-info-list">
                            <li><strong>Тип органа:</strong> ${typeText[foiv.type]}</li>
                            <li><strong>Сфера деятельности:</strong> ${sphereText[foiv.sphere] || foiv.sphere}</li>
                            <li><strong>Подчинение:</strong> ${leaderText[foiv.leader]}</li>
                            <li><strong>Краткое наименование:</strong> ${foiv.shortName}</li>
                        </ul>
                    </div>
                    
                    <div class="foiv-info-card">
                        <h4><i class="fas fa-gavel"></i> Полномочия</h4>
                        <ul class="foiv-info-list">
                            ${powersText.map(power => `<li><i class="fas fa-check-circle" style="color: var(--detroit-blue);"></i> ${power}</li>`).join('')}
                        </ul>
                    </div>
                    
                    ${foiv.officialWebsite ? `
                    <div class="foiv-info-card">
                        <h4><i class="fas fa-external-link-alt"></i> Ресурсы</h4>
                        <ul class="foiv-info-list">
                            <li>
                                <a href="${foiv.officialWebsite}" target="_blank" class="text-link">
                                    <i class="fas fa-globe"></i> Официальный сайт
                                </a>
                            </li>
                        </ul>
                    </div>
                    ` : ''}
                </div>
                
                <div class="foiv-info-card">
                    <h4><i class="fas fa-file-alt"></i> Подробная информация</h4>
                    <p>Для получения полной информации о структуре, функциях и полномочиях данного федерального органа исполнительной власти рекомендуется обратиться к его официальному сайту.</p>
                    ${foiv.officialWebsite ? `
                    <a href="${foiv.officialWebsite}" target="_blank" class="foiv-official-link" style="margin-top: 1rem;">
                        <i class="fas fa-external-link-alt"></i> Перейти на официальный сайт
                    </a>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    showError(message) {
        ['systemList', 'structureList', 'spheresList'].forEach(listId => {
            const list = document.getElementById(listId);
            if (list) {
                list.innerHTML = `
                    <div class="error-list">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>${message}</p>
                    </div>
                `;
            }
        });
        
        this.updateCount('system', 0);
        this.updateCount('structure', 0);
        this.updateCount('spheres', 0);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.foivManager = new FoivManager();
});
