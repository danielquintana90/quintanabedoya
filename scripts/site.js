// ========================================
// THEME MANAGEMENT
// ========================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

function setTheme(theme) {
    if (theme === 'dark') {
        htmlElement.classList.add('dark-mode');
    } else {
        htmlElement.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
}

// Load saved theme or default dark
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme || 'dark');

themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.classList.contains('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
});

// ========================================
// FLOATING NAV — Show on scroll
// ========================================
const nav = document.getElementById('main-nav');
let lastScrollY = 0;

function updateNav() {
    const scrollY = window.scrollY;
    const heroHeight = document.getElementById('hero')?.offsetHeight || window.innerHeight;

    if (scrollY > heroHeight * 0.5) {
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }

    lastScrollY = scrollY;
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ========================================
// ACTIVE NAV LINK TRACKING
// ========================================
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// ========================================
// SMOOTH SCROLL for internal links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================================
// SCROLL REVEAL
// ========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    // Dynamic year
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Add reveal class to elements
    const revealTargets = document.querySelectorAll(
        '.about-card, .stat-item, .bento-card, .credential-card, .contact-content, .section-header'
    );

    revealTargets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i % 4 * 0.08}s`;
        revealObserver.observe(el);
    });

    // ========================================
    // COUNTER ANIMATION
    // ========================================
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ========================================
// PARALLAX on hero (subtle)
// ========================================
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    if (!heroContent) return;
    const scrollY = window.scrollY;

    if (scrollY < window.innerHeight) {
        const opacity = 1 - (scrollY / window.innerHeight) * 0.8;
        const translate = scrollY * 0.25;
        heroContent.style.transform = `translateY(${translate}px)`;
        heroContent.style.opacity = opacity;
    }
}, { passive: true });

// ========================================
// SCROLL CLASS on body
// ========================================
let scrollTicking = false;

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            document.body.classList.toggle('scrolled', window.scrollY > 50);
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}, { passive: true });