document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Плавная прокрутка для меню
    const links = document.querySelectorAll('nav a[href^="#"], .hero-buttons a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 2. Логика для 3D Flip карточек (Навыки)
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            // Переворачиваем карточку по клику
            card.classList.toggle('flipped');
        });
    });

    // 3. Логика для раздвигающейся шкалы времени (Education)
    const timelineContainer = document.getElementById('timeline-container');
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        const dot = item.querySelector('.dot');
        
        // Клик работает только по точке (dot), как ты и просил
        dot.addEventListener('click', (e) => {
            e.stopPropagation(); // Останавливаем клик, чтобы он не шел дальше

            // Проверяем, открыт ли уже этот элемент
            const isCurrentlyExpanded = item.classList.contains('expanded');

            // Сначала закрываем все элементы
            timelineItems.forEach(el => el.classList.remove('expanded'));
            timelineContainer.classList.remove('has-expanded');

            // Если он не был открыт, то открываем его (раздвигаем соседей)
            if (!isCurrentlyExpanded) {
                item.classList.add('expanded');
                timelineContainer.classList.add('has-expanded'); // Дает сигнал затемнить остальные
            }
        });
    });
    // Выбираем все карточки проектов
    // Логика для карточек проектов (Независимое открытие)
   const projectCards = document.querySelectorAll('.interactive-card');

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Игнорируем клик, если нажали на ссылку
            if (e.target.closest('.project-link-btn')) return;

            const expandBlock = card.querySelector('.project-details-expand');
            const hint = card.querySelector('.click-hint');
            
            // Просто переключаем состояние текущей карточки
            const isOpen = expandBlock.classList.toggle('open');

            // Меняем текст подсказки
            if (isOpen) {
                hint.textContent = 'Schließen';
            } else {
                hint.textContent = 'Klicken für Details';
            }
        });
    });

});