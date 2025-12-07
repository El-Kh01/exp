// Основная навигация
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    if(menuToggle) {
        menuToggle.addEventListener('click', function() {
            const breadcrumbs = document.querySelector('.breadcrumbs');
            if(breadcrumbs) {
                breadcrumbs.classList.toggle('active');
            }
        });
    }
    
    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if(anchor.getAttribute('href') !== '#') {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    // Добавление активного класса к текущей странице
    const currentPath = window.location.pathname;
    document.querySelectorAll('.breadcrumbs a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if(currentPath.includes(linkPath) && linkPath !== '/') {
            link.classList.add('active');
        }
    });
});

// Поиск (простая реализация)
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if(searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Здесь можно добавить логику поиска
            console.log('Поиск:', searchTerm);
        });
    }
}

// Инициализация при загрузке
window.addEventListener('load', function() {
    initSearch();
});
