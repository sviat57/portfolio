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

            // Проверяем, какой язык сейчас включен (положение ползунка)
            const currentLang = document.getElementById('lang-toggle').checked ? 'en' : 'de';

            // Меняем текст подсказки и обновляем атрибут i18n
            if (isOpen) {
                hint.setAttribute('data-i18n', 'proj-close-hint');
                hint.innerHTML = translations['proj-close-hint'][currentLang];
            } else {
                hint.setAttribute('data-i18n', 'proj-click-hint');
                hint.innerHTML = translations['proj-click-hint'][currentLang];
            }
        });
    });
    // --- Логика кнопки "Наверх" ---
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Если прокрутили больше 400px, добавляем класс 'show'
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Плавный скролл наверх при клике
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    // --- Плавное появление контента (Intersection Observer) ---
    // Выбираем ВСЕ секции, которые должны анимироваться
    const revealElements = document.querySelectorAll('.skills-section, .education-section, .projects-section, .cv-section, .contact-section');

    // Создаем наблюдателя
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Если секция появилась на экране - показываем
                entry.target.classList.add('active');
            } else {
                // Если секция ушла с экрана - скрываем обратно (чтобы анимация повторялась)
                entry.target.classList.remove('active');
            }
        });
    }, {
        // Настройки наблюдателя
        threshold: 0.15 // Анимация сработает, когда хотя бы 15% секции появится на экране
    });

    // Указываем наблюдателю следить за каждой нашей секцией
    revealElements.forEach(el => observer.observe(el));
    // --- Система перевода (i18n) ---
    // Словарь с нашими переводами
    const translations = {
    // Навигация и Герой
    "nav-about": { de: "Über mich", en: "About me" },
    "nav-skills": { de: "Fähigkeiten", en: "Skills" },
    "nav-edu": { de: "Werdegang", en: "Education" },
    "nav-proj": { de: "Projekte", en: "Projects" },
    "nav-cv": { de: "Lebenslauf", en: "CV" },
    "nav-contact": { de: "Kontakt", en: "Contact" },
    "hero-hello": { de: "Hallo, ich bin", en: "Hello, I am" },
    "hero-desc": { de: "Ein vielseitiger Entwickler und 3D-Künstler mit Fokus auf IT-Lösungen und kreative Gestaltung.", en: "A versatile developer and 3D artist with a focus on IT solutions and creative design." },
    "btn-proj": { de: "Projekte ansehen", en: "View Projects" },
    "btn-pdf": { de: "PDF Herunterladen", en: "Download CV" },

    // Секция: Навыки
    "skills-title": { de: "Meine Fähigkeiten & Stärken <br><span class=\"subtitle\">(Klicken zum Umdrehen)</span>", en: "My Skills & Strengths <br><span class=\"subtitle\">(Click to flip)</span>" },
    
    "skill-1-front-title": { de: "Programmierung", en: "Programming" },
    "skill-1-front-desc": { de: "Python, HTML, CSS & JS.", en: "Python, HTML, CSS & JS." },
    "skill-1-back-title": { de: "Python & Web", en: "Python & Web" },
    "skill-1-back-desc": { de: "Fokus auf Clean Code. Praktische Erfahrung in der Erstellung von Automatisierungsscripten und Datenstrukturen.", en: "Focus on clean code. Practical experience in creating automation scripts and data structures." },

    "skill-2-front-title": { de: "3D-Modellierung", en: "3D Modeling" },
    "skill-2-front-desc": { de: "Blender: Modelle & Renderings.", en: "Blender: Models & Renders." },
    "skill-2-back-title": { de: "Blender 3D", en: "Blender 3D" },
    "skill-2-back-desc": { de: "Sicherer Umgang mit polygonaler Modellierung, sauberer Topologie, UV-Layouts und finalem Rendering.", en: "Proficient in polygonal modeling, clean topology, UV layouts, and final rendering." },

    "skill-3-front-title": { de: "Microsoft 365", en: "Microsoft 365" },
    "skill-3-front-desc": { de: "Word, Excel und PowerPoint.", en: "Word, Excel & PowerPoint." },
    "skill-3-back-title": { de: "Office Tools", en: "Office Tools" },
    "skill-3-back-desc": { de: "Sehr gute Kenntnisse in komplexer Dokumentenformatierung (Word) und Arbeiten mit Formeln (Excel).", en: "Excellent knowledge of complex document formatting (Word) and working with formulas (Excel)." },

    "skill-4-front-title": { de: "Hardware", en: "Hardware" },
    "skill-4-front-desc": { de: "IT-Hardware & Diagnose.", en: "IT Hardware & Diagnostics." },
    "skill-4-back-title": { de: "Systembetreuung", en: "System Support" },
    "skill-4-back-desc": { de: "Gute praktische Kenntnisse in der PC-Montage, Fehlerdiagnose und Behebung von Hardware-Problemen.", en: "Good practical knowledge in PC assembly, troubleshooting, and resolving hardware issues." },

    "skill-5-front-title": { de: "Sprachen", en: "Languages" },
    "skill-5-front-desc": { de: "Deutsch, Englisch, UA/RU.", en: "German, English, UA/RU." },
    "skill-5-back-title": { de: "Kommunikation", en: "Communication" },
    "skill-5-back-desc": { de: "Deutsch (B2) – fließend für den Alltag. Englisch (B1) – gut für IT-Dokus. Ukrainisch/Russisch (Muttersprache).", en: "German (B2) – fluent for daily use. English (B1) – good for IT docs. Ukrainian/Russian (Native)." },

    "skill-6-front-title": { de: "Soft Skills", en: "Soft Skills" },
    "skill-6-front-desc": { de: "Zuverlässigkeit, Teamfähigkeit.", en: "Reliability, Teamwork." },
    "skill-6-back-title": { de: "Persönlichkeit", en: "Personality" },
    "skill-6-back-desc": { de: "Ich zeichne mich durch Zuverlässigkeit aus und bewahre auch in stressigen Situationen einen kühlen Kopf.", en: "I am highly reliable and keep a cool head even in stressful situations." },

    // Секция: Образование
    "edu-title": { de: "Bildungsweg & Erfahrung <br><span class=\"subtitle\">(Punkte anklicken für Details)</span>", en: "Education & Experience <br><span class=\"subtitle\">(Click dots for details)</span>" },
    
    "edu-1-title": { de: "Praktikant im IT-Service", en: "IT Service Intern" },
    "edu-1-date": { de: "04.2026 - Heute | Alice Salomon Hochschule, Berlin", en: "04.2026 - Present | Alice Salomon Hochschule, Berlin" },
    "edu-1-desc": { de: "Entwicklung und Pflege der Hochschul-Webseite. Erstellung von 3D-Modellen mit Blender und Durchführung von 3D-Drucken. Vorbereitung von Hardware, Unterstützung bei Server-Wartung sowie Programmierung und Automatisierung mit Python.", en: "Development and maintenance of the university website. Creation of 3D models with Blender and execution of 3D printing. Hardware preparation, server maintenance support, as well as programming and automation with Python." },

    "edu-2-title": { de: "Vorbereitungskurs Schulversuch", en: "Preparatory Course Pilot Project" },
    "edu-2-date": { de: "2025 - 2026 | Victor-Klemperer-Kolleg Berlin", en: "2025 - 2026 | Victor-Klemperer-Kolleg Berlin" },
    "edu-2-desc": { de: "Das VKK ist eine renommierte staatliche Schule des Zweiten Bildungswegs. Im Vorbereitungskurs vertiefe ich intensiv meine Deutschkenntnisse (Ziel B2) sowie Mathematik und Englisch, um mich optimal auf den Erwerb des Abiturs vorzubereiten.", en: "The VKK is a renowned state school for second-chance education. In this preparatory course, I am intensively deepening my German skills (target B2) as well as Math and English to optimally prepare for the Abitur." },

    "edu-3-title": { de: "Willkommensklasse", en: "Welcome Class" },
    "edu-3-date": { de: "2024 - 2025 | Ruth-Cohn-Schule Berlin", en: "2024 - 2025 | Ruth-Cohn-Schule Berlin" },
    "edu-3-desc": { de: "Besuch der Willkommensklasse an diesem Oberstufenzentrum für Sozialwesen. Der Fokus lag auf intensiver sprachlicher Integration und der Vorbereitung auf das berufliche Ausbildungssystem in Deutschland.", en: "Attended the welcome class at this upper secondary center for social affairs. The focus was on intensive language integration and preparation for the vocational training system in Germany." },

    "edu-4-title": { de: "Praktische Erfahrung & Nebenjobs", en: "Practical Experience & Part-time Jobs" },
    "edu-4-date": { de: "Laufend | Programmierung, 3D-Design & Service", en: "Ongoing | Programming, 3D Design & Service" },
    "edu-4-desc": { de: "Erfolgreiche Umsetzung kleinerer Auftragsarbeiten (3D und Code). Zudem konnte ich durch Nebenjobs (Supermarkt, Gastronomie) meine Kommunikations- und Teamfähigkeit in der Praxis unter Beweis stellen.", en: "Successful completion of small freelance projects (3D and code). Additionally, I proved my communication and teamwork skills in practice through part-time jobs (supermarket, gastronomy)." },

    "edu-5-title": { de: "Sekundäres Polytechnisches Lyzeum", en: "Secondary Polytechnic Lyceum" },
    "edu-5-date": { de: "2017 - 2024 | Ukraine", en: "2017 - 2024 | Ukraine" },
    "edu-5-desc": { de: "Erwerb des Mittleren Schulabschlusses (MSA) in der Ukraine mit einer starken naturwissenschaftlich-technischen Grundausbildung.", en: "Obtained the Intermediate School Leaving Certificate (MSA equivalent) in Ukraine with a strong foundation in science and technology." },

    // Секция: Проекты
    "proj-title": { de: "Meine Projekte", en: "My Projects" },
    "proj-click-hint": { de: "Klicken für Details", en: "Click for details" },
    "proj-close-hint": { de: "Schließen", en: "Close" },
    "proj-details-title": { de: "Projekt-Details", en: "Project Details" },
    "proj-btn-link": { de: "Auf ArtStation ansehen →", en: "View on ArtStation →" },
    
    "proj-1-desc": { de: "Eine fotorealistische 3D-Visualisierung eines Innenraums mit Fokus auf Licht und Atmosphäre.", en: "A photorealistic 3D visualization of an interior space with a focus on lighting and atmosphere." },
    "proj-1-li-1": { de: "<strong>Beleuchtung:</strong> Einsatz von HDRI-Maps und Area Lights.", en: "<strong>Lighting:</strong> Use of HDRI maps and Area Lights." },
    "proj-1-li-2": { de: "<strong>Materialien:</strong> Erstellung von komplexen PBR-Shadern.", en: "<strong>Materials:</strong> Creation of complex PBR shaders." },
    "proj-1-li-3": { de: "<strong>Fokus:</strong> Realistische Lichtführung und Texturierung.", en: "<strong>Focus:</strong> Realistic lighting and texturing." },

    "proj-2-desc": { de: "Ein kreatives Konzept einer stilisierten Tastatur mit Fokus auf Materialstudien.", en: "A creative concept of a stylized keypad focusing on material studies." },
    "proj-2-li-1": { de: "<strong>Geometrie:</strong> Saubere Hard-Surface Topologie.", en: "<strong>Geometry:</strong> Clean hard-surface topology." },
    "proj-2-li-2": { de: "<strong>Shader:</strong> Prozedurale Effekte für leuchtende Tasten.", en: "<strong>Shaders:</strong> Procedural effects for glowing keys." },
    "proj-2-li-3": { de: "<strong>Stil:</strong> Kombination aus Realismus und stilisiertem Design.", en: "<strong>Style:</strong> Combination of realism and stylized design." },

    // Секция: Резюме
    "cv-title": { de: "Lebenslauf & Zertifikate", en: "CV & Certificates" },
    "cv-address": { de: "<strong>Adresse:</strong> Stollbergerstraße 87, Berlin 12627", en: "<strong>Address:</strong> Stollbergerstraße 87, 12627 Berlin" },
    "cv-phone": { de: "<strong>Telefon:</strong> +49 151 72298206", en: "<strong>Phone:</strong> +49 151 72298206" },
    "cv-email": { de: "<strong>E-Mail:</strong> kyselovsviatoslav@gmail.com", en: "<strong>Email:</strong> kyselovsviatoslav@gmail.com" },
    "cv-profile-title": { de: "Profil", en: "Profile" },
    "cv-profile-text": { de: "Ein zielstrebiger Entwickler mit starker Lernbereitschaft. Zu meinen Stärken zählen Zuverlässigkeit, Pünktlichkeit, Teamfähigkeit und Problemlösungsfähigkeit.", en: "A goal-oriented developer with a strong willingness to learn. My strengths include reliability, punctuality, teamwork, and problem-solving skills." },
    "cv-exp-title": { de: "Erfahrung", en: "Experience" },
    "cv-exp-1": { de: "<strong>Praktikant im IT-Service</strong> (Alice Salomon Hochschule, 04.2026 - Heute): Webentwicklung, 3D-Druck/Modellierung (Blender), IT-Support und Python-Automatisierung.", en: "<strong>IT Service Intern</strong> (Alice Salomon Hochschule, 04.2026 - Present): Web development, 3D printing/modeling (Blender), IT support, and Python automation." },
    "cv-exp-2": { de: "Auftragsarbeiten als Programmierer und in der 3D-Modellierung.", en: "Freelance work as a programmer and in 3D modeling." },
    "cv-exp-3": { de: "Arbeit als Mitarbeiter im Supermarkt (Nebenjob).", en: "Supermarket employee (part-time job)." },
    "cv-exp-4": { de: "Aushilfe in der Bäckerei (Ferienjob).", en: "Bakery assistant (holiday job)." },
    "cv-exp-5": { de: "Küchenhilfe im asiatischen Restaurant (Nebenjob).", en: "Kitchen assistant in an Asian restaurant (part-time job)." },
    "cert-title": { de: "Meine Zertifikate", en: "My Certificates" },
    // Сертификаты
    "cert-1-title": { de: "Deutsch B2.1", en: "German B2.1" },
    "cert-1-desc": { de: "Sprachzertifikat", en: "Language Certificate" },
    
    "cert-2-title": { de: "Anerkannter MSA", en: "Recognized MSA" },
    "cert-2-desc": { de: "Senatsverwaltung Berlin", en: "Berlin Senate Department" },
    
    "cert-3-title": { de: "Vorbereitungskurs", en: "Preparatory Course" },
    "cert-3-desc": { de: "Victor-Klemperer-Kolleg", en: "Victor-Klemperer-Kolleg" },
    
    "cert-4-title": { de: "Zeugnis (Ukraine)", en: "School Certificate" },
    "cert-4-desc": { de: "Mittelschulbildung (Übersetzt)", en: "Secondary Education (Translated)" },
    
    "btn-pdf-view": { de: "PDF Ansehen", en: "View PDF" },

    // Секция: Контакты и Футер
    "contact-title": { de: "Kontakt", en: "Contact" },
    "contact-desc": { de: "Haben Sie ein Projekt im Kopf oder möchten Sie einfach nur Hallo sagen? Ich freue mich auf Ihre Nachricht!", en: "Do you have a project in mind or just want to say hi? I look forward to hearing from you!" },
    "contact-loc": { de: "<strong>Ort:</strong> Berlin, Deutschland", en: "<strong>Location:</strong> Berlin, Germany" },
    
    // Плейсхолдеры для формы
    "form-label-name": { de: "Name", en: "Name" },
    "form-ph-name": { de: "Ihr Name", en: "Your Name" },
    "form-label-email": { de: "E-Mail", en: "Email" },
    "form-ph-email": { de: "ihre@email.de", en: "your@email.com" },
    "form-label-msg": { de: "Nachricht", en: "Message" },
    "form-ph-msg": { de: "Wie kann ich Ihnen helfen?", en: "How can I help you?" },
    "form-btn": { de: "Absenden", en: "Send Message" },
    
    "footer-text": { de: "&copy; 2024 Sviatoslav Kyselov. Alle Rechte vorbehalten.", en: "&copy; 2024 Sviatoslav Kyselov. All rights reserved." }
};

    const langToggle = document.getElementById('lang-toggle');
    const labelDe = document.getElementById('label-de');
    const labelEn = document.getElementById('label-en');

    // Функция переключения текста
    function updateLanguage(lang) {
        if (lang === 'en') {
            labelEn.classList.add('active');
            labelDe.classList.remove('active');
        } else {
            labelDe.classList.add('active');
            labelEn.classList.remove('active');
        }

        // Перевод обычного текста и HTML
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang]) {
                el.innerHTML = translations[key][lang]; // Изменили textContent на innerHTML
            }
        });

        // Перевод плейсхолдеров (подсказок) в формах ввода
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            if (translations[key] && translations[key][lang]) {
                el.placeholder = translations[key][lang];
            }
        });
    }

    // Проверяем память браузера (localStorage) при загрузке страницы
    const currentLang = localStorage.getItem('portfolio_lang') || 'de';
    if (currentLang === 'en') {
        langToggle.checked = true; // Сдвигаем рычажок, если сохранен английский
    }
    updateLanguage(currentLang); // Применяем язык

    // Слушаем клик по переключателю
    langToggle.addEventListener('change', (e) => {
        const newLang = e.target.checked ? 'en' : 'de';
        localStorage.setItem('portfolio_lang', newLang); // Запоминаем выбор
        updateLanguage(newLang); // Обновляем текст
    });
    // --- Система Темной/Светлой темы ---
    const themeToggle = document.getElementById('theme-toggle');
    const iconLight = document.getElementById('theme-icon-light');
    const iconDark = document.getElementById('theme-icon-dark');
    const htmlElement = document.documentElement;

    // Функция для обновления иконок (солнце/луна)
    function updateThemeIcons(isDark) {
        if (isDark) {
            iconLight.style.opacity = '0.5';
            iconDark.style.opacity = '1';
        } else {
            iconLight.style.opacity = '1';
            iconDark.style.opacity = '0.5';
        }
    }

    // 1. Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('portfolio_theme');
    
    // 2. Проверяем системные настройки компьютера
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 3. Устанавливаем начальную тему
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
        updateThemeIcons(true);
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeToggle.checked = false;
        updateThemeIcons(false);
    }

    // 4. Слушаем ручное переключение
    themeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('portfolio_theme', 'dark');
            updateThemeIcons(true);
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('portfolio_theme', 'light');
            updateThemeIcons(false);
        }
    });

    // 5. Синхронизация: слушаем изменения настроек компьютера в реальном времени
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Меняем тему автоматически ТОЛЬКО если пользователь не выбирал ее вручную
        if (!localStorage.getItem('portfolio_theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            themeToggle.checked = e.matches;
            updateThemeIcons(e.matches);
        }
    });
});