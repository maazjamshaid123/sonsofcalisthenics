// ================================
// NAVIGATION
// ================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ================================
// SCROLL TO TOP BUTTON
// ================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================
// CONTACT FORM HANDLING
// ================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    console.log('Form submitted:', data);

    // Show success message (you can customize this)
    alert('¡Gracias por contactarnos! Te responderemos pronto.');

    // Reset form
    contactForm.reset();
});

// ================================
// NEWSLETTER FORM HANDLING
// ================================
const newsletterForm = document.querySelector('.footer-newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = newsletterForm.querySelector('input[type="email"]').value;

        // Here you would typically send the email to a server
        console.log('Newsletter subscription:', email);

        // Show success message
        alert('¡Gracias por suscribirte! Recibirás nuestras novedades pronto.');

        // Reset form
        newsletterForm.reset();
    });
}

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================
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

// Observe all cards and sections
document.querySelectorAll('.program-card, .pricing-card, .testimonial-card, .highlight-item, .contact-method').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ================================
// PARALLAX EFFECT FOR HERO
// ================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ================================
// DYNAMIC YEAR IN FOOTER
// ================================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.textContent = `© ${currentYear} Sons of Calisthenics. Todos los derechos reservados.`;
}

// ================================
// LOADING ANIMATION
// ================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ================================
// CURSOR ANIMATION ON BUTTONS
// ================================
document.querySelectorAll('.btn, .card-button, .pricing-button').forEach(button => {
    button.addEventListener('mouseenter', function (e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transition = 'width 0.6s, height 0.6s, opacity 0.6s';
        ripple.style.opacity = '1';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        setTimeout(() => {
            ripple.style.width = size * 2 + 'px';
            ripple.style.height = size * 2 + 'px';
            ripple.style.opacity = '0';
        }, 0);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ================================
// STATS COUNTER ANIMATION
// ================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+');
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const target = entry.target.textContent.replace(/[^0-9]/g, '');
            animateCounter(entry.target, parseInt(target));
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ================================
// ACTIVE LINK HIGHLIGHTING
// ================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ================================
// LAZY LOADING IMAGES
// ================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ================================
// LANGUAGE SWITCHER
// ================================
const translations = {
    es: {
        // Navigation
        navHome: 'Inicio',
        navPrograms: 'Programas',
        navAbout: 'Sobre Mí',
        navTestimonials: 'Testimonios',
        navContact: 'Contacto',
        navCTA: 'Empezar Ahora',

        // Hero Section
        heroBadge: 'Entrenamiento profesional de calistenia',
        heroTitle: 'Transforma Tu Cuerpo',
        heroTitleGradient: 'Con Calistenia',
        heroDescription: 'Alcanza tus objetivos fitness con programas personalizados, coaching online, y entrenamientos presenciales diseñados por expertos en calistenia.',
        heroButton1: 'Explorar Programas',
        heroButton2: 'Conocer Más',
        stat1Label: 'Alumnos Activos',
        stat2Label: 'Años Experiencia',
        stat3Label: 'Satisfacción',

        // Programs Section
        programsTag: 'Nuestros Servicios',
        programsTitle: 'Programas de ',
        programsTitleGradient: 'Entrenamiento',
        programsDescription: 'Elige el programa que mejor se adapte a tus necesidades y objetivos. Todos diseñados para llevarte al siguiente nivel.',

        // Footer
        footerText: 'Todos los derechos reservados.',
        newsletterText: 'Recibe tips, consejos y ofertas exclusivas',

        // Alerts
        contactSuccess: '¡Gracias por contactarnos! Te responderemos pronto.',
        newsletterSuccess: '¡Gracias por suscribirte! Recibirás nuestras novedades pronto.'
    },
    en: {
        // Navigation
        navHome: 'Home',
        navPrograms: 'Programs',
        navAbout: 'About',
        navTestimonials: 'Testimonials',
        navContact: 'Contact',
        navCTA: 'Start Now',

        // Hero Section
        heroBadge: 'Professional calisthenics training',
        heroTitle: 'Transform Your Body',
        heroTitleGradient: 'With Calisthenics',
        heroDescription: 'Achieve your fitness goals with personalized programs, online coaching, and in-person training designed by calisthenics experts.',
        heroButton1: 'Explore Programs',
        heroButton2: 'Learn More',
        stat1Label: 'Active Students',
        stat2Label: 'Years Experience',
        stat3Label: 'Satisfaction',

        // Programs Section
        programsTag: 'Our Services',
        programsTitle: '',
        programsTitleGradient: 'Training Programs',
        programsDescription: 'Choose the program that best fits your needs and goals. All designed to take you to the next level.',

        // Footer
        footerText: 'All rights reserved.',
        newsletterText: 'Receive tips, advice and exclusive offers',

        // Alerts
        contactSuccess: 'Thank you for contacting us! We will respond soon.',
        newsletterSuccess: 'Thank you for subscribing! You will receive our news soon.'
    }
};

let currentLang = 'es';

// Language switcher buttons
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;

        if (lang === currentLang) return;

        // Update active button
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Switch language
        switchLanguage(lang);
        currentLang = lang;

        // Save preference
        localStorage.setItem('preferredLanguage', lang);
    });
});

function switchLanguage(lang) {
    // Update elements with data-lang attributes
    document.querySelectorAll('[data-lang-es][data-lang-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-lang-${lang}`);
    });

    // Update specific elements
    const trans = translations[lang];

    // Hero Section
    const heroBadge = document.querySelector('.hero-badge span:last-child');
    if (heroBadge) heroBadge.textContent = trans.heroBadge;

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = trans.heroTitle + '<br><span class="gradient-text">' + trans.heroTitleGradient + '</span>';
    }

    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) heroDesc.textContent = trans.heroDescription;

    const heroBtn1 = document.querySelector('.hero-cta .btn-primary span');
    if (heroBtn1) heroBtn1.textContent = trans.heroButton1;

    const heroBtn2 = document.querySelector('.hero-cta .btn-secondary');
    if (heroBtn2) heroBtn2.textContent = trans.heroButton2;

    // Stats
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels[0]) statLabels[0].textContent = trans.stat1Label;
    if (statLabels[1]) statLabels[1].textContent = trans.stat2Label;
    if (statLabels[2]) statLabels[2].textContent = trans.stat3Label;

    // Programs Section
    const programsTag = document.querySelector('.programs .section-tag');
    if (programsTag) programsTag.textContent = trans.programsTag;

    const programsTitle = document.querySelector('.programs .section-title');
    if (programsTitle) {
        programsTitle.innerHTML = trans.programsTitle + '<span class="gradient-text">' + trans.programsTitleGradient + '</span>';
    }

    const programsDesc = document.querySelector('.programs .section-description');
    if (programsDesc) programsDesc.textContent = trans.programsDescription;

    // Footer
    const footerText = document.querySelector('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    if (footerText) {
        footerText.textContent = `© ${currentYear} Sons of Calisthenics. ${trans.footerText}`;
    }

    const newsletterText = document.querySelector('.footer-newsletter-text');
    if (newsletterText) newsletterText.textContent = trans.newsletterText;
}

// Load preferred language from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'es') {
        const btn = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
        if (btn) btn.click();
    }
});

console.log('Sons of Calisthenics - Website Loaded Successfully! 💪');
