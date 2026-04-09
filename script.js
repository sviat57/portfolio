// Ждем, пока вся страница загрузится
document.addEventListener('DOMContentLoaded', () => {
    
    // Находим все ссылки, которые начинаются с решетки (#)
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем стандартный резкий прыжок

            // Получаем ID блока, к которому нужно прокрутить
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Плавно прокручиваем к этому блоку
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log("Die Website wurde erfolgreich geladen!");
});