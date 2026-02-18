document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Sandwich category accordion
    const clickableTitles = document.querySelectorAll('.clickable-title');
    clickableTitles.forEach(title => {
        title.addEventListener('click', function () {
            this.classList.toggle('collapsed');
            const menuItems = this.nextElementSibling;
            if (menuItems && menuItems.classList.contains('menu-items')) {
                menuItems.classList.toggle('collapsed');
            }
        });
    });

    // Main menu section accordion
    const mainSectionTitles = document.querySelectorAll('.main-section-title');
    mainSectionTitles.forEach(title => {
        title.addEventListener('click', function () {
            this.classList.toggle('collapsed');
            const content = this.nextElementSibling;
            if (content && content.classList.contains('main-section-content')) {
                content.classList.toggle('collapsed');
            }
        });
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu when link is clicked
            hamburger.classList.remove('active');
            nav.classList.remove('active');

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 90;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.sandwich-category, .pizza-card, .plat-card, .poulet-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    const cards = document.querySelectorAll('.pizza-card, .plat-card, .sandwich-category, .poulet-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    const whatsappButton = document.querySelector('.whatsapp-button');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 300) {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.pointerEvents = 'all';
        } else {
            whatsappButton.style.opacity = '0.6';
        }

        lastScroll = currentScroll;
    });
});
