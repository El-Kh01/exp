// create-organ.js - простой скрипт для создания файла органа
const fs = require('fs');

function createOrganFile(organData) {
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${organData.name} - ${organData.abbreviation}</title>
    
    <!-- ПОДКЛЮЧАЕМ СТИЛИ -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet">
    
    <style>
        /* ВСТАВЬТЕ СЮДА ВСЕ СТИЛИ ИЗ ВАШЕГО index.html */
        /* Копируйте все стили, начиная от :root и до конца */
    </style>
</head>
<body>
    <!-- ШАПКА -->
    <header class="site-header">
        <div class="container">
            <div class="header-wrapper">
                <a href="https://el-kh01.github.io/exp/index.html" class="logo">
                    <div class="logo-icon">
                        <i class="fas fa-flag"></i>
                    </div>
                    <div class="logo-text">
                        <h1>Федеральный уровень</h1>
                        <p class="logo-subtitle">Субъекты государственного управления РФ</p>
                    </div>
                </a>
                
                <nav class="breadcrumbs">
                    <a href="https://el-kh01.github.io/exp/index.html"><i class="fas fa-home"></i> Главная</a>
                    <span class="separator">/</span>
                    <a href="../index.html"><i class="fas fa-landmark"></i> ФОИВ</a>
                    <span class="separator">/</span>
                    <span class="current">${organData.abbreviation}</span>
                </nav>
            </div>
        </div>
    </header>

    <main class="main-content">
        <div class="organ-page-container">
            <div class="organ-breadcrumbs">
                <a href="../index.html">
                    <i class="fas fa-arrow-left"></i> Назад к модулю ФОИВ
                </a>
            </div>
            
            <div class="organ-header">
                <div class="organ-title">
                    <div class="organ-icon-large" style="background: ${organData.color};">
                        <i class="fas fa-${getIcon(organData.system)}"></i>
                    </div>
                    <div class="organ-title-text">
                        <h1>${organData.name}</h1>
                        <div class="organ-abbreviation">${organData.abbreviation}</div>
                    </div>
                </div>
                
                <p class="organ-description">${organData.description}</p>
                
                <div class="organ-badges">
                    ${generateBadges(organData)}
                </div>
            </div>
            
            <div class="organ-content">
                <div>
                    <div class="organ-section">
                        <h2><i class="fas fa-info-circle"></i> Основные сведения</h2>
                        <div class="organ-details">
                            <div class="detail-row">
                                <div class="detail-label">Статус:</div>
                                <div class="detail-value" id="organ-status">Информация появится позже</div>
                            </div>
                            <div class="detail-row">
                                <div class="detail-label">Руководитель:</div>
                                <div class="detail-value" id="organ-leader">Информация появится позже</div>
                            </div>
                            <div class="detail-row">
                                <div class="detail-label">Официальный сайт:</div>
                                <div class="detail-value">
                                    <a href="${organData.website}" target="_blank">${organData.website}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="organ-section">
                        <h2><i class="fas fa-sitemap"></i> Классификация</h2>
                        <div class="organ-details">
                            <div class="detail-row">
                                <div class="detail-label">Система:</div>
                                <div class="detail-value">${getSystemLabel(organData.system)}</div>
                            </div>
                            <div class="detail-row">
                                <div class="detail-label">Структура:</div>
                                <div class="detail-value">${getStructureLabel(organData.structure)}</div>
                            </div>
                            <div class="detail-row">
                                <div class="detail-label">Сферы:</div>
                                <div class="detail-value">${organData.spheres.join(', ')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="organ-actions">
                ${organData.website ? `<a href="${organData.website}" class="btn-website" target="_blank"><i class="fas fa-external-link-alt"></i> Официальный сайт</a>` : ''}
                <a href="../index.html" class="btn-back"><i class="fas fa-arrow-left"></i> Назад к модулю ФОИВ</a>
            </div>
        </div>
    </main>

    <!-- ПОДВАЛ -->
    <footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Федеральный уровень</h4>
                    <p>Изучение органов государственной власти Российской Федерации</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Субъекты государственного управления РФ.</p>
            </div>
        </div>
    </footer>

    <script>
        // Мобильное меню
        document.querySelector('.menu-toggle').addEventListener('click', function() {
            document.querySelector('.breadcrumbs').classList.toggle('active');
        });
    </script>
</body>
</html>`;

  return html;
}

function getIcon(system) {
  switch(system) {
    case 'ministry': return 'landmark';
    case 'service': return 'shield-alt';
    case 'agency': return 'cogs';
    default: return 'building';
  }
}

function getSystemLabel(system) {
  switch(system) {
    case 'ministry': return 'Министерство';
    case 'service': return 'Федеральная служба';
    case 'agency': return 'Федеральное агентство';
    default: return system;
  }
}

function getStructureLabel(structure) {
  switch(structure) {
    case 'president': return 'Подчинено Президенту РФ';
    case 'government': return 'Подчинено Правительству РФ';
    default: return structure;
  }
}

function generateBadges(organ) {
  let badges = [];
  
  // Сфера
  if (organ.spheres.length > 1) {
    badges.push(`<div class="organ-badge" style="background: ${organ.color};">
        <i class="fas fa-globe-americas"></i> Смешанная сфера (${organ.spheres.join(' + ')})
    </div>`);
  } else {
    badges.push(`<div class="organ-badge" style="background: ${organ.color};">
        <i class="fas fa-globe-americas"></i> ${organ.spheres[0]} сфера
    </div>`);
  }
  
  // Структура
  const structureColor = organ.structure === 'president' ? '#dc3545' : '#2a5298';
  badges.push(`<div class="organ-badge" style="background: ${structureColor};">
      <i class="fas fa-${organ.structure === 'president' ? 'user-tie' : 'landmark'}"></i> ${getStructureLabel(organ.structure)}
  </div>`);
  
  // Система
  const systemColor = organ.system === 'ministry' ? '#1e3c72' : organ.system === 'service' ? '#17a2b8' : '#28a745';
  badges.push(`<div class="organ-badge" style="background: ${systemColor};">
      <i class="fas fa-${getIcon(organ.system)}"></i> ${getSystemLabel(organ.system)}
  </div>`);
  
  // Полномочия
  if (organ.powers && organ.powers.length > 0) {
    organ.powers.forEach(power => {
      const powerColor = getPowerColor(power);
      badges.push(`<div class="organ-badge" style="background: ${powerColor};">
          <i class="fas fa-file-contract"></i> ${power}
      </div>`);
    });
  }
  
  return badges.join('\n');
}

function getPowerColor(power) {
  switch(power) {
    case 'НПА': return '#6f42c1';
    case 'АН': return '#fd7e14';
    case 'ГИ': return '#20c997';
    case 'ГУ': return '#17a2b8';
    default: return '#6c757d';
  }
}

// Пример использования:
const organExample = {
  id: "test",
  name: "Тестовое министерство",
  abbreviation: "ТестМин",
  description: "Тестовое описание",
  system: "ministry",
  structure: "government",
  spheres: ["economic", "social"],
  color: "#90EE90",
  powers: ["НПА"],
  file: "test.html",
  website: "https://example.com"
};

// Чтобы создать файл:
// fs.writeFileSync('organs/test.html', createOrganFile(organExample));

console.log('Скрипт готов. Используйте fs.writeFileSync для создания файлов.');
