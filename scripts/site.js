// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de entrada para elementos cuando aparecen en viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Actualizar año dinámicamente en el footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Observar secciones y cards para animaciones
    const elementsToAnimate = document.querySelectorAll('.skill-card, .about-content, .contact-text');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Efecto parallax sutil en el hero
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const hero = document.querySelector('.hero-content');
    
    if (hero && currentScrollY < window.innerHeight) {
        hero.style.transform = `translateY(${currentScrollY * 0.3}px)`;
        hero.style.opacity = 1 - (currentScrollY / window.innerHeight);
    }
    
    lastScrollY = currentScrollY;
}, { passive: true });

// Agregar clase cuando se hace scroll
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            document.body.classList.toggle('scrolled', window.scrollY > 50);
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });