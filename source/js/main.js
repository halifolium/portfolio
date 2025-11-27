/* ============================================
   БАЗОВЫЕ НАСТРОЙКИ И УТИЛИТЫ
   ============================================ */

// Проверка готовности DOM
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initThemeToggle();
    initScrollToTop();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initActiveNavigation();
    initFormHandler();
    initHeaderScroll();
    initAnimeAnimations();
    initHoverAnimations();
    initHeartFountain();
    initTypingAnimation();
    initMagneticButtons();
    initTestimonialsCarousel();
    initLazyLoading();
    initServiceWorker();
});

/* ============================================
   ПРЕЛОАДЕР
   ============================================ */

function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    window.addEventListener('load', () => {
        // Используем anime.js для красивого исчезновения
        if (typeof anime !== 'undefined') {
            const tl = anime.timeline({
                easing: 'easeOutExpo',
                delay: 500
            });
            
            tl.add({
                targets: '.preloader-content',
                opacity: 0,
                scale: 0.8,
                duration: 800
            })
            .add({
                targets: preloader,
                opacity: 0,
                duration: 800,
                complete: () => {
                    preloader.remove();
                }
            }, '-=400');
        } else {
            // Fallback если anime.js не загрузился
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => preloader.remove(), 500);
            }, 800);
        }
    });
}

/* ============================================
   КАСТОМНЫЙ КУРСОР
   ============================================ */

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursor || !cursorDot || !cursorOutline) return;
    
    // Проверяем поддержку hover (не тач-устройство)
    if (window.matchMedia('(hover: none)').matches) {
        cursor.style.display = 'none';
        return;
    }
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Плавное следование outline за курсором
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Hover эффект на интерактивных элементах
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-tag, .project-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    // Скрываем курсор при выходе за пределы окна
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

/* ============================================
   ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
   ============================================ */

function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    
    // Проверяем сохранённую тему
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Анимация кнопки
        if (typeof anime !== 'undefined') {
            anime({
                targets: toggle,
                scale: [1, 0.8, 1.1, 1],
                duration: 400,
                easing: 'easeInOutQuad'
            });
        }
    });
}

/* ============================================
   SCROLL TO TOP
   ============================================ */

function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-top');
    if (!scrollBtn) return;
    
    // Показываем кнопку при скролле
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            if (!scrollBtn.classList.contains('visible')) {
                scrollBtn.classList.add('visible');
                anime({
                    targets: scrollBtn,
                    scale: [0, 1],
                    opacity: [0, 1],
                    duration: 400,
                    easing: 'easeOutBack'
                });
            }
        } else {
            if (scrollBtn.classList.contains('visible')) {
                scrollBtn.classList.remove('visible');
                anime({
                    targets: scrollBtn,
                    scale: [1, 0],
                    opacity: [1, 0],
                    duration: 300,
                    easing: 'easeInBack'
                });
            }
        }
    });
    
    // Скролл наверх при клике
    scrollBtn.addEventListener('click', () => {
        const scrollElement = document.scrollingElement || document.documentElement;
        anime({
            targets: scrollElement,
            scrollTop: 0,
            duration: 1000,
            easing: 'easeInOutQuart'
        });
    });
}

/* ============================================
   TYPING ANIMATION
   ============================================ */

function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const words = JSON.parse(typingElement.dataset.words || '[]');
    if (words.length === 0) return;
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentWord = '';
    
    function type() {
        const word = words[wordIndex];
        
        if (isDeleting) {
            currentWord = word.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentWord = word.substring(0, charIndex + 1);
            charIndex++;
        }
        
        typingElement.textContent = currentWord;
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === word.length) {
            typeSpeed = 2000; // Пауза в конце слова
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Пауза перед новым словом
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Запуск с задержкой после загрузки
    setTimeout(type, 1500);
}

/* ============================================
   MAGNETIC BUTTONS
   ============================================ */

function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    if (window.matchMedia('(hover: none)').matches) return;
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 0.3;
            // Используем anime.set для мгновенной реакции
            anime.set(el, {
                translateX: x * strength,
                translateY: y * strength
            });
        });
        
        el.addEventListener('mouseleave', () => {
            // Эластичный возврат
            anime({
                targets: el,
                translateX: 0,
                translateY: 0,
                duration: 800,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    });
}

/* ============================================
   TESTIMONIALS CAROUSEL
   ============================================ */

function initTestimonialsCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonials-dots .dot');
    
    if (cards.length === 0) return;
    
    let currentIndex = 0;
    let isAnimating = false;
    let autoPlayInterval;
    
    // Инициализация: показываем первую карточку
    // (стили CSS скрывают все, кроме active, но мы будем управлять через JS для плавности)
    
    function showCard(index) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;
        
        const currentCard = cards[currentIndex];
        const nextCard = cards[index];
        
        // Обновляем точки сразу
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Анимация исчезновения текущей карточки
        anime({
            targets: currentCard,
            opacity: [1, 0],
            translateX: [0, -20],
            duration: 400,
            easing: 'easeInQuad',
            complete: () => {
                currentCard.classList.remove('active');
                
                // Подготовка следующей карточки
                nextCard.classList.add('active');
                // Сброс стилей перед анимацией появления (важно, если anime.js оставил inline стили)
                nextCard.style.opacity = '0';
                
                // Анимация появления следующей
                anime({
                    targets: nextCard,
                    opacity: [0, 1],
                    translateX: [20, 0],
                    duration: 600,
                    easing: 'easeOutQuad',
                    complete: () => {
                        isAnimating = false;
                        currentIndex = index;
                    }
                });
            }
        });
    }
    
    function nextCard() {
        showCard((currentIndex + 1) % cards.length);
    }
    
    // Автопрокрутка
    function startAutoPlay() {
        // Очищаем предыдущий интервал, чтобы избежать накладок
        stopAutoPlay();
        autoPlayInterval = setInterval(nextCard, 6000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Клик по точкам
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            showCard(index);
            startAutoPlay();
        });
    });
    
    // Пауза при наведении мыши
    const container = document.querySelector('.testimonials-carousel');
    if (container) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Запуск
    startAutoPlay();
}

/* ============================================
   LAZY LOADING
   ============================================ */

function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
}

/* ============================================
   SERVICE WORKER (PWA)
   ============================================ */

function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(() => {
                // Service worker registration failed, but that's okay
            });
        });
    }
}

/* ============================================
   ФОНТАН СЕРДЕЧЕК
   ============================================ */

function initHeartFountain() {
    const heart = document.getElementById('footer-heart');
    const container = document.getElementById('footer-heart-container');
    
    if (!heart || !container || typeof anime === 'undefined') return;
    
    const heartEmojis = ['❤️', '💖', '💗', '💓', '💕', '💘', '🩷', '💝', '💞', '🌸'];
    
    function createFountain() {
        // Анимация основного сердечка
        anime({
            targets: heart,
            scale: [1, 1.4, 1],
            rotate: [0, -10, 10, 0],
            duration: 400,
            easing: 'easeOutElastic(1, .5)'
        });
        
        // Создаём фонтан из 12-15 сердечек
        const heartCount = 12 + Math.floor(Math.random() * 4);
        
        for (let i = 0; i < heartCount; i++) {
            const flyingHeart = document.createElement('span');
            flyingHeart.className = 'flying-heart';
            flyingHeart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            flyingHeart.style.fontSize = (0.8 + Math.random() * 0.8) + 'em';
            
            // Начальная позиция в центре
            flyingHeart.style.transform = 'translate(-50%, -50%) scale(0)';
            flyingHeart.style.opacity = '0';
            
            container.appendChild(flyingHeart);
            
            // Параметры фонтана
            const angle = -90 + (Math.random() - 0.5) * 100; // Угол вверх с разбросом
            const velocity = 60 + Math.random() * 80; // Начальная скорость
            const radians = angle * Math.PI / 180;
            
            // Конечные точки траектории
            const peakX = Math.cos(radians) * velocity;
            const peakY = Math.sin(radians) * velocity;
            const endX = peakX * 1.3;
            const endY = peakY + 50 + Math.random() * 30; // Падение вниз из-за гравитации
            
            const duration = 1000 + Math.random() * 500;
            const delay = i * 25;
            const peakScale = 1 + Math.random() * 0.5;
            const rotation = (Math.random() - 0.5) * 360;
            
            // Запускаем анимацию с задержкой
            setTimeout(() => {
                // Фаза 1: Взлёт
                anime({
                    targets: flyingHeart,
                    translateX: [0, peakX],
                    translateY: [0, peakY],
                    scale: [0.3, peakScale],
                    rotate: [0, rotation * 0.5],
                    opacity: [1, 1],
                    duration: duration * 0.5,
                    easing: 'easeOutQuad',
                    complete: () => {
                        // Фаза 2: Падение
                        anime({
                            targets: flyingHeart,
                            translateX: [peakX, endX],
                            translateY: [peakY, endY],
                            scale: [peakScale, 0.2],
                            rotate: [rotation * 0.5, rotation],
                            opacity: [1, 0],
                            duration: duration * 0.5,
                            easing: 'easeInQuad',
                            complete: () => flyingHeart.remove()
                        });
                    }
                });
            }, delay);
        }
    }
    
    // События
    heart.addEventListener('click', createFountain);
    
    // Клавиатурная доступность
    heart.tabIndex = 0;
    heart.setAttribute('role', 'button');
    heart.setAttribute('aria-label', 'Celebrate with hearts');
    heart.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            createFountain();
            e.preventDefault();
        }
    });
}

/* ============================================
   ANIME.JS АНИМАЦИИ
   ============================================ */

function initAnimeAnimations() {
    if (typeof anime === 'undefined') return;
    
    // Анимация логотипа 🌸
    const logoKanji = document.querySelector('.logo-kanji');
    if (logoKanji) {
        // Плавная пульсация
        anime({
            targets: logoKanji,
            scale: [1, 1.1, 1],
            filter: [
                'drop-shadow(0 0 12px rgba(244, 165, 184, 0.4))',
                'drop-shadow(0 0 25px rgba(244, 165, 184, 0.6)) drop-shadow(0 0 50px rgba(244, 165, 184, 0.3))',
                'drop-shadow(0 0 12px rgba(244, 165, 184, 0.4))'
            ],
            duration: 4000,
            easing: 'easeInOutSine',
            loop: true
        });
        
        // Лёгкое покачивание
        anime({
            targets: logoKanji,
            rotate: [-3, 3, -3],
            duration: 6000,
            easing: 'easeInOutSine',
            loop: true
        });
    }
    
    // Анимация текста логотипа
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        anime({
            targets: logoText,
            backgroundPosition: ['200% 0', '0% 0', '200% 0'],
            duration: 8000,
            easing: 'easeInOutQuad',
            loop: true
        });
    }
    
    // Анимация точки
    const logoDot = document.querySelector('.logo-dot');
    if (logoDot) {
        anime({
            targets: logoDot,
            scale: [1, 1.4, 1],
            opacity: [0.6, 1, 0.6],
            boxShadow: [
                '0 0 10px rgba(244, 165, 184, 0.4)',
                '0 0 20px rgba(244, 165, 184, 0.8)',
                '0 0 10px rgba(244, 165, 184, 0.4)'
            ],
            duration: 2500,
            easing: 'easeInOutSine',
            loop: true
        });
    }
    
    // Анимация Hero при загрузке
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        anime.timeline({ easing: 'easeOutExpo' })
            .add({
                targets: '.hero-greeting',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 1000
            })
            .add({
                targets: '.hero-title',
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 1200
            }, '-=600')
            .add({
                targets: '.hero-subtitle',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 1000
            }, '-=800')
            .add({
                targets: '.hero-cta .btn',
                opacity: [0, 1],
                translateY: [20, 0],
                scale: [0.9, 1],
                delay: anime.stagger(150),
                duration: 800
            }, '-=600');
    }
    
    // Hover эффект для кнопок
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            anime({
                targets: btn,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            anime({
                targets: btn,
                scale: 1,
                duration: 400,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Hover для социальных ссылок
    document.querySelectorAll('#contact > ul li a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link.querySelector('.social-icon'),
                rotate: [0, -10, 10, 0],
                duration: 400,
                easing: 'easeInOutSine'
            });
        });
    });
}

/* ============================================
   МОБИЛЬНОЕ МЕНЮ
   ============================================ */

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    const overlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('header nav a');
    
    if (!menuToggle || !nav) return;
    
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    }
    
    function closeMenu() {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    // Закрываем меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Закрываем при изменении размера экрана
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

/* ============================================
   ПЛАВНАЯ ПРОКРУТКА
   ============================================ */

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Пропускаем пустые якоря
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                const scrollElement = document.scrollingElement || document.documentElement;
                
                anime({
                    targets: scrollElement,
                    scrollTop: targetPosition,
                    duration: 1000,
                    easing: 'easeInOutQuart',
                    complete: () => {
                        // Подсветка секции при переходе
                        highlightSection(target);
                    }
                });
            }
        });
    });
}

// Функция подсветки секции
function highlightSection(section) {
    section.classList.add('section-highlight');
    
    setTimeout(() => {
        section.classList.remove('section-highlight');
    }, 2000);
}

/* ============================================
   HOVER ANIMATIONS (ANIME.JS)
   ============================================ */

function initHoverAnimations() {
    if (typeof anime === 'undefined') return;

    // Универсальная функция для добавления ховер-эффекта
    const addHoverEffect = (selector, enterAnim, leaveAnim) => {
        // Используем делегирование событий или навешиваем на существующие элементы
        // (для простоты навешиваем на существующие)
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                anime.remove(el); // Останавливаем текущую анимацию
                anime({
                    targets: el,
                    ...enterAnim,
                    easing: 'easeOutElastic(1, .6)', // Пружинистый эффект
                    duration: 800
                });
            });
            
            el.addEventListener('mouseleave', () => {
                anime.remove(el);
                anime({
                    targets: el,
                    ...leaveAnim,
                    easing: 'easeOutQuad', // Плавный возврат
                    duration: 600
                });
            });
        });
    };

    // 1. Bento Items (Карточки секций)
    // Легкое увеличение и подъем
    addHoverEffect('.bento-item', 
        { scale: 1.015, translateY: -5 },
        { scale: 1, translateY: 0 }
    );

    // 2. Project Items (Список проектов)
    // Сдвиг вправо и небольшое увеличение
    addHoverEffect('#projects ul li', 
        { translateX: 8, scale: 1.01 },
        { translateX: 0, scale: 1 }
    );

    // 3. Skill Tags (Теги навыков)
    // Увеличение и поворот
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            anime.remove(tag);
            anime({
                targets: tag,
                scale: 1.15,
                rotate: anime.random(-3, 3), // Случайный наклон добавляет живости
                duration: 800,
                easing: 'easeOutElastic(1, .6)'
            });
        });
        
        tag.addEventListener('mouseleave', () => {
            anime.remove(tag);
            anime({
                targets: tag,
                scale: 1,
                rotate: 0,
                duration: 600,
                easing: 'easeOutQuad'
            });
        });
    });

    // 4. Timeline Items (Опыт работы)
    // Анимируем маркер и контент отдельно
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const marker = item.querySelector('.timeline-marker');
        const content = item.querySelector('.timeline-content');
        
        if (!marker || !content) return;
        
        item.addEventListener('mouseenter', () => {
            // Маркер пульсирует
            anime.remove(marker);
            anime({
                targets: marker,
                scale: 1.3,
                backgroundColor: '#ff7eb6', // var(--accent-primary)
                boxShadow: '0 0 20px rgba(255, 126, 182, 0.6)',
                easing: 'easeOutElastic(1, .5)',
                duration: 800
            });
            
            // Контент сдвигается
            anime.remove(content);
            anime({
                targets: content,
                translateX: 10,
                borderColor: '#ff7eb6',
                easing: 'easeOutElastic(1, .8)',
                duration: 800
            });
        });
        
        item.addEventListener('mouseleave', () => {
            // Возврат маркера
            anime.remove(marker);
            anime({
                targets: marker,
                scale: 1,
                backgroundColor: '#1a1a2e', // var(--bg-deep) - примерно, лучше брать из CSS
                boxShadow: 'none',
                easing: 'easeOutQuad',
                duration: 500,
                complete: () => {
                     marker.style.boxShadow = ''; // Сброс инлайн стилей
                     marker.style.backgroundColor = '';
                }
            });
            
            // Возврат контента
            anime.remove(content);
            anime({
                targets: content,
                translateX: 0,
                borderColor: 'rgba(255, 255, 255, 0.1)', // var(--border-subtle)
                easing: 'easeOutQuad',
                duration: 500,
                complete: () => {
                    content.style.borderColor = '';
                }
            });
        });
    });
    
    // 5. Avatar (Аватар)
    // Поворот и увеличение
    const avatar = document.querySelector('.about-avatar');
    if (avatar) {
        avatar.addEventListener('mouseenter', () => {
            anime.remove(avatar);
            anime({
                targets: avatar,
                scale: 1.05,
                rotate: 3,
                boxShadow: '0 20px 40px rgba(255, 126, 182, 0.3)',
                easing: 'easeOutElastic(1, .5)'
            });
        });
        
        avatar.addEventListener('mouseleave', () => {
            anime.remove(avatar);
            anime({
                targets: avatar,
                scale: 1,
                rotate: 0,
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)', // Примерный дефолт
                easing: 'easeOutQuad'
            });
        });
    }

    // 6. Hero Image (Главный баннер)
    // Очень плавное увеличение (Cinematic zoom)
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-bg img');
    
    if (heroSection && heroImage) {
        heroSection.addEventListener('mouseenter', () => {
            anime.remove(heroImage);
            anime({
                targets: heroImage,
                scale: 1.05,
                duration: 2000, // Медленно и плавно
                easing: 'easeOutQuad'
            });
        });
        
        heroSection.addEventListener('mouseleave', () => {
            anime.remove(heroImage);
            anime({
                targets: heroImage,
                scale: 1,
                duration: 2000,
                easing: 'easeOutQuad'
            });
        });
    }
}

/* ============================================
   АНИМАЦИИ ПРИ СКРОЛЛЕ
   ============================================ */

function initScrollAnimations() {
    if (typeof anime === 'undefined') return;

    const observerOptions = {
        threshold: 0.15, // Чуть увеличили порог срабатывания
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Анимация появления
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [50, 0],
                    scale: [0.95, 1],
                    duration: 1000,
                    delay: entry.target.dataset.delay || 0, // Можно задавать задержку через data-attr
                    easing: 'easeOutExpo'
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за секциями
    const sections = document.querySelectorAll('.bento-item, section');
    sections.forEach((item, index) => {
        // Устанавливаем начальные стили
        item.style.opacity = '0';
        item.dataset.delay = index * 100; 
        observer.observe(item);
        
        // Fallback: если анимация не сработала через 3 секунды, показываем принудительно
        setTimeout(() => {
            if (getComputedStyle(item).opacity === '0') {
                item.style.opacity = '1';
                item.style.transform = 'none';
            }
        }, 3000);
    });
    
    // Стили для подсветки оставляем в CSS
    if (!document.querySelector('#scroll-animations-style')) {
        const style = document.createElement('style');
        style.id = 'scroll-animations-style';
        style.textContent = `
            /* Подсветка секции при переходе */
            .section-highlight {
                border-color: var(--accent-primary) !important;
                box-shadow: 0 0 0 2px var(--accent-glow), 
                            0 20px 50px rgba(0, 0, 0, 0.5),
                            0 0 40px var(--accent-glow) !important;
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

/* ============================================
   АКТИВНАЯ НАВИГАЦИЯ ПРИ СКРОЛЛЕ
   ============================================ */

function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    
    function updateActiveNav() {
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Вызываем сразу для начального состояния
}

/* ============================================
   ОБРАБОТКА ФОРМЫ
   ============================================ */

function initFormHandler() {
    const form = document.querySelector('#contact form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Валидация
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
                
                // Анимация тряски при ошибке
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: input,
                        translateX: [0, -10, 10, -10, 10, 0],
                        duration: 500,
                        easing: 'easeInOutQuad'
                    });
                }
                
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 3000);
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Показываем состояние загрузки
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        
        // Восстанавливаем кнопку через некоторое время (если форма не отправилась)
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
        }, 5000);
    });
    
    // Убираем ошибки при вводе
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
}

/* ============================================
   ЭФФЕКТ ШАПКИ ПРИ СКРОЛЛЕ
   ============================================ */

function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ============================================
   УТИЛИТЫ
   ============================================ */

// Функция для показа уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 16px;
        background: ${type === 'error' ? '#c41e3a' : 'linear-gradient(135deg, #c41e3a, #d4a574)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${type === 'error' ? 'rgba(196, 30, 58, 0.3)' : 'rgba(196, 30, 58, 0.25)'};
        z-index: 10000;
        font-weight: 500;
        font-family: 'Outfit', sans-serif;
        animation: slideIn 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    `;
    
    // Добавляем анимацию, если её ещё нет
    if (!document.querySelector('#notification-animation')) {
        const style = document.createElement('style');
        style.id = 'notification-animation';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Функция для debounce (задержка выполнения)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Экспорт функций для использования в других скриптах
window.PortfolioApp = {
    showNotification,
    debounce
};

