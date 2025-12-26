// Enhanced Language Switcher - Replace existing one
// Delete old translations object and functions, use this instead

let currentLang = 'es';
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang === currentLang) return;

        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        switchLanguage(lang);
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
    });
});

function switchLanguage(lang) {
    const trans = completeTranslations[lang];

    // Navigation
    document.querySelectorAll('[data-lang-es][data-lang-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-lang-${lang}`);
    });

    // ALL SECTIONS - Comprehensive Translation
    const elements = {
        // Hero
        '.hero-badge span:last-child': 'hero-badge',
        '.hero-description': 'hero-description',
        '.hero-cta .btn-primary span': 'hero-btn-1',
        '.hero-cta .btn-secondary': 'hero-btn-2',

        // Stats
        '.stat-label:nth-of-type(1)': 'stat-1',
        '.stat-label:nth-of-type(2)': 'stat-2',
        '.stat-label:nth-of-type(3)': 'stat-3',

        // Programs
        '.programs .section-tag': 'programs-tag',
        '.programs .section-description': 'programs-desc',

        // Cards
        '.card-badge': 'badge-popular',
        '.program-card:nth-of-type(1) .card-title': 'card-1-title',
        '.program-card:nth-of-type(1) .card-description': 'card-1-desc',
        '.program-card:nth-of-type(1) .card-button span': 'card-1-btn',
        '.program-card:nth-of-type(2) .card-title': 'card-2-title',
        '.program-card:nth-of-type(2) .card-description': 'card-2-desc',
        '.program-card:nth-of-type(2) .card-button span': 'card-2-btn',
        '.program-card:nth-of-type(3) .card-title': 'card-3-title',
        '.program-card:nth-of-type(3) .card-description': 'card-3-desc',
        '.program-card:nth-of-type(3) .card-button span': 'card-3-btn',

        // Pricing
        '.subsection-title': 'in-person-title',
        '.pricing-badge': 'pricing-badge',
        '.pricing-card:nth-of-type(1) .pricing-title': 'pricing-1-title',
        '.pricing-card:nth-of-type(2) .pricing-title': 'pricing-2-title',
        '.pricing-card:nth-of-type(3) .pricing-title': 'pricing-3-title',

        // Video Library
        '.video-showcase .section-tag': 'video-tag',
        '.video-showcase .section-description': 'video-desc',

        // About
        '.about .section-tag': 'about-tag',
        '.about .btn-primary span': 'about-btn',

        // Testimonials
        '.testimonials .section-tag': 'testimonials-tag',
        '.testimonials .section-description': 'testimonials-desc',

        // Contact
        '.contact .section-tag': 'contact-tag',
        '.contact-description': 'contact-desc',
        '.method-content h4:nth-of-type(1)': 'contact-email-label',
        '.footer-description': 'footer-desc',
        '.footer-newsletter-text': 'footer-newsletter-desc'
    };

    // Apply simple element translations
    Object.entries(elements).forEach(([selector, key]) => {
        const el = document.querySelector(selector);
        if (el && trans[key]) el.textContent = trans[key];
    });

    // Complex elements with HTML
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = trans['hero-title'] + '<br><span class="gradient-text">' + trans['hero-title-gradient'] + '</span>';
    }

    const programsTitle = document.querySelector('.programs .section-title');
    if (programsTitle) {
        programsTitle.innerHTML = trans['programs-title'] + '<span class="gradient-text">' + trans['programs-title-gradient'] + '</span>';
    }

    const videoTitle = document.querySelector('.video-showcase .section-title');
    if (videoTitle) {
        videoTitle.innerHTML = trans['video-title'] + '<span class="gradient-text">' + trans['video-title-gradient'] + '</span>';
    }

    const aboutTitle = document.querySelector('.about .section-title');
    if (aboutTitle) {
        aboutTitle.innerHTML = trans['about-title'] + '<span class="gradient-text">' + trans['about-title-gradient'] + '</span>';
    }

    const testimonialsTitle = document.querySelector('.testimonials .section-title');
    if (testimonialsTitle) {
        testimonialsTitle.innerHTML = trans['testimonials-title'] + '<span class="gradient-text">' + trans['testimonials-title-gradient'] + '</span>';
    }

    const contactTitle = document.querySelector('.contact .section-title');
    if (contactTitle) {
        contactTitle.innerHTML = trans['contact-title'] + '<span class="gradient-text">' + trans['contact-title-gradient'] + '</span>';
    }

    // Features Lists
    translateList('.program-card:nth-of-type(1) .card-features li', ['card-1-feat-1', 'card-1-feat-2', 'card-1-feat-3', 'card-1-feat-4']);
    translateList('.program-card:nth-of-type(2) .card-features li', ['card-2-feat-1', 'card-2-feat-2', 'card-2-feat-3', 'card-2-feat-4']);
    translateList('.program-card:nth-of-type(3) .card-features li', ['card-3-feat-1', 'card-3-feat-2', 'card-3-feat-3', 'card-3-feat-4']);
    translateList('.pricing-card:nth-of-type(1) .pricing-features li', ['pricing-1-feat-1', 'pricing-1-feat-2', 'pricing-1-feat-3', 'pricing-1-feat-4']);
    translateList('.pricing-card:nth-of-type(2) .pricing-features li', ['pricing-2-feat-1', 'pricing-2-feat-2', 'pricing-2-feat-3', 'pricing-2-feat-4']);
    translateList('.pricing-card:nth-of-type(3) .pricing-features li', ['pricing-3-feat-1', 'pricing-3-feat-2', 'pricing-3-feat-3', 'pricing-3-feat-4']);

    // About text paragraphs
    const aboutTexts = document.querySelectorAll('.about-text');
    if (aboutTexts[0]) aboutTexts[0].textContent = trans['about-text-1'];
    if (aboutTexts[1]) aboutTexts[1].textContent = trans['about-text-2'];

    // Highlights
    const highlightTitles = document.querySelectorAll('.highlight-item h4');
    if (highlightTitles[0]) highlightTitles[0].textContent = trans['about-highlight-1-title'];
    if (highlightTitles[1]) highlightTitles[1].textContent = trans['about-highlight-2-title'];

    const highlightDescs = document.querySelectorAll('.highlight-item p');
    if (highlightDescs[0]) highlightDescs[0].textContent = trans['about-highlight-1-desc'];
    if (highlightDescs[1]) highlightDescs[1].textContent = trans['about-highlight-2-desc'];

    // Testimonials
    const testimonialTexts = document.querySelectorAll('.testimonial-text');
    if (testimonialTexts[0]) testimonialTexts[0].textContent = trans['testimonial-1-text'];
    if (testimonialTexts[1]) testimonialTexts[1].textContent = trans['testimonial-2-text'];
    if (testimonialTexts[2]) testimonialTexts[2].textContent = trans['testimonial-3-text'];

    const testimonialNames = document.querySelectorAll('.author-name');
    if (testimonialNames[0]) testimonialNames[0].textContent = trans['testimonial-1-name'];
    if (testimonialNames[1]) testimonialNames[1].textContent = trans['testimonial-2-name'];
    if (testimonialNames[2]) testimonialNames[2].textContent = trans['testimonial-3-name'];

    const testimonialTitles = document.querySelectorAll('.author-title');
    if (testimonialTitles[0]) testimonialTitles[0].textContent = trans['testimonial-1-title'];
    if (testimonialTitles[1]) testimonialTitles[1].textContent = trans['testimonial-2-title'];
    if (testimonialTitles[2]) testimonialTitles[2].textContent = trans['testimonial-3-title'];

    // Contact methods
    const methodTitles = document.querySelectorAll('.method-content h4');
    if (methodTitles[0]) methodTitles[0].textContent = trans['contact-email-label'];
    if (methodTitles[1]) methodTitles[1].textContent = trans['contact-phone-label'];
    if (methodTitles[2]) methodTitles[2].textContent = trans['contact-location-label'];

    const locationText = document.querySelectorAll('.method-content p')[2];
    if (locationText) locationText.textContent = trans['contact-location-text'];

    // Form
    const formLabels = document.querySelectorAll('.contact-form label');
    if (formLabels[0]) formLabels[0].textContent = trans['form-name'];
    if (formLabels[1]) formLabels[1].textContent = trans['form-email'];
    if (formLabels[2]) formLabels[2].textContent = trans['form-phone'];
    if (formLabels[3]) formLabels[3].textContent = trans['form-program'];
    if (formLabels[4]) formLabels[4].textContent = trans['form-message'];

    const programSelect = document.querySelector('#program');
    if (programSelect && programSelect.options) {
        programSelect.options[0].textContent = trans['form-program-select'];
        programSelect.options[1].textContent = trans['form-program-coaching'];
        programSelect.options[2].textContent = trans['form-program-courses'];
        programSelect.options[3].textContent = trans['form-program-encyclo'];
        programSelect.options[4].textContent = trans['form-program-in-person'];
    }

    const formSubmitBtn = document.querySelector('.contact-form .btn-primary span');
    if (formSubmitBtn) formSubmitBtn.textContent = trans['form-submit'];

    // Pricing buttons
    document.querySelectorAll('.pricing-button').forEach(btn => btn.textContent = trans['pricing-btn']);

    // Footer
    const footerTitles = document.querySelectorAll('.footer-title');
    if (footerTitles[0]) footerTitles[0].textContent = trans['footer-links-title'];
    if (footerTitles[1]) footerTitles[1].textContent = trans['footer-programs-title'];
    if (footerTitles[2]) footerTitles[2].textContent = trans['footer-newsletter-title'];

    const newsletterInput = document.querySelector('.footer-newsletter-form input');
    if (newsletterInput) newsletterInput.placeholder = trans['footer-newsletter-placeholder'];

    const footerText = document.querySelector('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    if (footerText) {
        footerText.textContent = `© ${currentYear} Sons of Calisthenics. ${trans['footer-copyright']}`;
    }

    const footerLinks = document.querySelectorAll('.footer-bottom-links a');
    if (footerLinks[0]) footerLinks[0].textContent = trans['footer-link-privacy'];
    if (footerLinks[1]) footerLinks[1].textContent = trans['footer-link-terms'];
    if (footerLinks[2]) footerLinks[2].textContent = trans['footer-link-cookies'];

    function translateList(selector, keys) {
        const items = document.querySelectorAll(selector);
        keys.forEach((key, i) => {
            if (items[i] && trans[key]) items[i].textContent = trans[key];
        });
    }
}

// Load saved language
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'es') {
        const btn = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
        if (btn) {
            btn.classList.add('active');
            document.querySelector('.lang-btn[data-lang="es"]').classList.remove('active');
            switchLanguage(savedLang);
            currentLang = savedLang;
        }
    }
});
