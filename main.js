/**
 * ==========================================================================
 * OLIVE GOLD COMPANY — AWARD-WINNING MOTION ENGINE
 * Tech Stack: Vanilla JS • Lenis (Smooth Scroll) • GSAP Core + ScrollTrigger
 * Choreography:
 * 1. Weighty Lenis Smooth Inertia
 * 2. Scrollytelling Word-by-Word Text Illumination
 * 3. Horizontal Pinned Atelier Runway (Lookbook Gallery)
 * 4. Asymmetrical Staggered Service Cards
 * 5. Interactive Real-Time Gold Calculator
 * 6. Sticky Split Testimonials with Settlement Stamps
 * ==========================================================================
 */

// Register ScrollTrigger immediately
gsap.registerPlugin(ScrollTrigger);

/* ==========================================================================
   01. LENIS SMOOTH SCROLL INITIALIZATION
   ========================================================================== */
let lenis;
try {
    lenis = new Lenis({
        duration: 1.4,                                             // 1.4s gives that floaty, high-end Swiss feel
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
} catch (e) {
    console.warn("Lenis initialization skipped:", e);
}


/* ==========================================================================
   02. BESPOKE LUXURY CURSOR & DESKTOP MOUSE MOTION ENGINE
   ========================================================================== */
let cursorDot = document.querySelector('.cursor-dot');
let cursorFollower = document.querySelector('.cursor-follower');

if (window.matchMedia('(pointer: fine)').matches) {
    // 1. Ambient Canvas Spotlight Setup
    let ambientGlow = document.querySelector('.mouse-ambient-glow');
    if (!ambientGlow) {
        ambientGlow = document.createElement('div');
        ambientGlow.className = 'mouse-ambient-glow';
        ambientGlow.setAttribute('aria-hidden', 'true');
        document.body.appendChild(ambientGlow);
    }

    // 2. Cursor Elements Setup
    if (!cursorDot) {
        cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        cursorDot.setAttribute('aria-hidden', 'true');
        document.body.appendChild(cursorDot);
    }

    if (!cursorFollower) {
        cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        cursorFollower.setAttribute('aria-hidden', 'true');
        document.body.appendChild(cursorFollower);
    }

    let cursorLabel = cursorFollower.querySelector('.cursor-label');
    if (!cursorLabel) {
        cursorLabel = document.createElement('span');
        cursorLabel.className = 'cursor-label';
        cursorFollower.appendChild(cursorLabel);
    }

    // 3. Fluid Physics Trackers
    if (cursorDot && cursorFollower) {
        const setDotX = gsap.quickTo(cursorDot, "x", { duration: 0.08, ease: "power2.out" });
        const setDotY = gsap.quickTo(cursorDot, "y", { duration: 0.08, ease: "power2.out" });
        const setFollowerX = gsap.quickTo(cursorFollower, "x", { duration: 0.32, ease: "power2.out" });
        const setFollowerY = gsap.quickTo(cursorFollower, "y", { duration: 0.32, ease: "power2.out" });

        let isCursorActive = false;

        window.addEventListener('mousemove', (e) => {
            if (!isCursorActive) {
                isCursorActive = true;
                document.body.classList.add('mouse-active');
                gsap.to([cursorDot, cursorFollower], { opacity: 1, duration: 0.25 });
            }

            setDotX(e.clientX);
            setDotY(e.clientY);
            setFollowerX(e.clientX);
            setFollowerY(e.clientY);

            // Update ambient spotlight coordinates
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        });

        document.addEventListener('mouseleave', () => {
            isCursorActive = false;
            document.body.classList.remove('mouse-active');
            gsap.to([cursorDot, cursorFollower], { opacity: 0, duration: 0.3 });
        });

        document.addEventListener('mouseenter', () => {
            isCursorActive = true;
            document.body.classList.add('mouse-active');
            gsap.to([cursorDot, cursorFollower], { opacity: 1, duration: 0.3 });
        });

        // Click Pulse Compression
        window.addEventListener('mousedown', () => {
            if (!cursorFollower.classList.contains('has-label')) {
                gsap.to(cursorFollower, { scale: 0.75, duration: 0.15, ease: 'power2.out' });
            }
        });

        window.addEventListener('mouseup', () => {
            if (!cursorFollower.classList.contains('has-label')) {
                gsap.to(cursorFollower, { scale: 1, duration: 0.4, ease: 'elastic.out(1.2, 0.4)' });
            }
        });

        // 4. Contextual Adaptive Hover States
        // A) Visual Cards & Gallery Slides (Badge Expands with "EXPLORE")
        const galleryTargets = document.querySelectorAll('.gallery-runway-slide, .hero-feature-img, .gallery-page-card, .atelier-card, .video-preview-tile');
        galleryTargets.forEach((card) => {
            card.addEventListener('mouseenter', () => {
                const labelText = card.getAttribute('data-cursor-label') || 'EXPLORE';
                if (cursorLabel) cursorLabel.textContent = labelText;
                cursorFollower.classList.add('has-label');
                gsap.to(cursorDot, { opacity: 0, duration: 0.2 });
            });

            card.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('has-label');
                gsap.to(cursorDot, { opacity: 1, duration: 0.2 });
            });
        });

        // B) Calculator Card ("VALUATE" badge)
        const calcCard = document.querySelector('.calc-card');
        if (calcCard) {
            calcCard.addEventListener('mouseenter', () => {
                if (cursorLabel) cursorLabel.textContent = 'VALUATE';
                cursorFollower.classList.add('has-label');
                gsap.to(cursorDot, { opacity: 0, duration: 0.2 });
            });
            calcCard.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('has-label');
                gsap.to(cursorDot, { opacity: 1, duration: 0.2 });
            });
        }

        // C) Standard Interactive Elements (Expanding Gold Halo)
        const interactables = document.querySelectorAll('a, button, .nav-link, .btn-gilded-solid, .btn-gilded-outline, .brand-logo-badge, .faq-question, .footer-social-icon, .form-control');
        interactables.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                if (!cursorFollower.classList.contains('has-label')) {
                    cursorFollower.classList.add('is-hovering');
                    gsap.to(cursorFollower, { scale: 1.65, duration: 0.28, ease: 'power2.out' });
                    gsap.to(cursorDot, { scale: 0.6, duration: 0.2 });
                }
            });

            el.addEventListener('mouseleave', () => {
                if (!cursorFollower.classList.contains('has-label')) {
                    cursorFollower.classList.remove('is-hovering');
                    gsap.to(cursorFollower, { scale: 1, duration: 0.32, ease: 'power2.out' });
                    gsap.to(cursorDot, { scale: 1, duration: 0.2 });
                }
            });
        });
    }

    // 5. Magnetic Pull Physics on Primary Buttons & Interactive Badges
    const magnetics = document.querySelectorAll(
        '.btn-gilded-solid, .btn-forest-outline, .btn-lock-rate, .btn-cash-primary, .btn-cash-secondary, .gallery-full-archive-btn, .test-google-action-btn, .flagship-action, .karat-pill-btn, .brand-logo-badge, .btn-header-call, .footer-social-icon'
    );
    magnetics.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.35;
            const deltaY = (e.clientY - centerY) * 0.35;

            gsap.to(el, {
                x: deltaX,
                y: deltaY,
                duration: 0.26,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.75,
                ease: 'elastic.out(1.15, 0.35)',
                overwrite: 'auto'
            });
        });
    });

    // 6. Interactive 3D Card Tilt with Dynamic Specular Glare & Inner Icon Elevation
    const tiltTargets = document.querySelectorAll(
        '.hero-visual-sculpture, .hero-feature-img, .flagship-service-card, .light-service-card, .service-card-third, .testimonial-card-right, .story-card-editorial, .gallery-page-card, .bento-gallery-card'
    );
    tiltTargets.forEach((card) => {
        const icon = card.querySelector('.card-top-icon, .flagship-badge-pill, .bento-card-badge');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const normX = (x / rect.width - 0.5) * 2;
            const normY = (y / rect.height - 0.5) * 2;

            const rotateX = -normY * 7;
            const rotateY = normX * 7;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1100,
                duration: 0.3,
                ease: 'power1.out',
                overwrite: 'auto'
            });

            if (icon) {
                gsap.to(icon, {
                    x: normX * 8,
                    y: normY * 8,
                    duration: 0.3,
                    ease: 'power1.out',
                    overwrite: 'auto'
                });
            }

            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            card.style.setProperty('--glare-x', `${glareX}%`);
            card.style.setProperty('--glare-y', `${glareY}%`);
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.45)',
                overwrite: 'auto'
            });

            if (icon) {
                gsap.to(icon, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: 'elastic.out(1, 0.45)',
                    overwrite: 'auto'
                });
            }
        });
    });

    // 7. Hero Section Mouse Parallax Floating Accents & 3D Lookbook Tilt
    const heroSection = document.querySelector('.hero-editorial-section');
    if (heroSection) {
        const floatBadges = heroSection.querySelectorAll('.hero-floating-seal, .strip-stat-item, .hero-meta-badge');
        const heroVisual = heroSection.querySelector('.hero-visual-sculpture');
        const heroFrame = heroSection.querySelector('.lookbook-image-frame');

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const normX = (e.clientX - rect.left) / rect.width - 0.5;
            const normY = (e.clientY - rect.top) / rect.height - 0.5;

            if (floatBadges.length > 0) {
                gsap.to(floatBadges, {
                    x: normX * 24,
                    y: normY * 24,
                    duration: 0.6,
                    ease: 'power1.out',
                    overwrite: 'auto'
                });
            }

            if (heroFrame) {
                gsap.to(heroFrame, {
                    rotationY: normX * 9,
                    rotationX: -normY * 9,
                    transformPerspective: 1000,
                    duration: 0.5,
                    ease: 'power1.out',
                    overwrite: 'auto'
                });
            }

            if (heroVisual) {
                gsap.to(heroVisual, {
                    x: -normX * 14,
                    y: -normY * 14,
                    duration: 0.6,
                    ease: 'power1.out',
                    overwrite: 'auto'
                });
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            if (floatBadges.length > 0) {
                gsap.to(floatBadges, { x: 0, y: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
            }
            if (heroFrame) {
                gsap.to(heroFrame, { rotationY: 0, rotationX: 0, duration: 0.9, ease: 'power2.out', overwrite: 'auto' });
            }
            if (heroVisual) {
                gsap.to(heroVisual, { x: 0, y: 0, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
            }
        });
    }
}


/* ==========================================================================
   03. FLOATING STICKY NAVIGATION BAR & MOBILE DRAWER
   ========================================================================== */
function initFloatingNavbar() {
    const siteHeader = document.querySelector('.site-header');
    if (!siteHeader) return;

    function updateHeaderFloat() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop || (typeof lenis !== 'undefined' && lenis ? lenis.scroll : 0);
        if (scrollY > 35) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeaderFloat, { passive: true });
    if (typeof lenis !== 'undefined' && lenis) {
        lenis.on('scroll', updateHeaderFloat);
    }
    updateHeaderFloat();
}
initFloatingNavbar();

const mobileToggle = document.querySelector('.mobile-toggle-btn');
const mobileDrawer = document.querySelector('.mobile-nav-drawer');
const drawerClose = document.querySelector('.drawer-close');

function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (drawerClose) drawerClose.focus();
}

function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
    }
    document.body.style.overflow = '';
}

if (mobileToggle && mobileDrawer) {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileToggle.addEventListener('click', openDrawer);
}

if (drawerClose && mobileDrawer) {
    drawerClose.addEventListener('click', closeDrawer);
}

document.querySelectorAll('.drawer-link').forEach((link) => {
    link.addEventListener('click', closeDrawer);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeDrawer();
    }
});


/* ==========================================================================
   04. HERO SECTION: EDITORIAL CHOREOGRAPHY
   ========================================================================== */
function initHeroChoreography() {
    const heroTitle = document.querySelector('.hero-editorial-headline');
    if (!heroTitle) return;

    const tl = gsap.timeline({
        defaults: { ease: "power4.out" }
    });

    gsap.set('.headline-line-inner', { yPercent: 125, opacity: 0 });
    gsap.set('.meta-accent-bar', { width: 0 });
    gsap.set('.hero-meta-badge', { opacity: 0, x: -12 });
    gsap.set('.hero-editorial-lead', { y: 24, opacity: 0 });
    gsap.set('.hero-action-cluster', { y: 20, opacity: 0 });
    gsap.set('.lookbook-image-frame', { scale: 0.94, opacity: 0, rotate: 2 });

    tl
        .to('.meta-accent-bar', { width: 32, duration: 0.7, ease: "power2.inOut" }, 0.1)
        .to('.hero-meta-badge', { opacity: 1, x: 0, duration: 0.6 }, 0.2)

        // Split headline staggered lines
        .to('.headline-line-inner', {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.14,
            ease: "power4.out"
        }, 0.25)

        .to('.hero-editorial-lead', { y: 0, opacity: 1, duration: 0.9 }, "-=0.6")
        .to('.hero-action-cluster', { y: 0, opacity: 1, duration: 0.9 }, "-=0.7")

        // Right Hero Visual Sculpture
        .to('.lookbook-image-frame', {
            scale: 1,
            opacity: 1,
            rotate: 0.8,
            duration: 1.4,
            ease: "expo.out"
        }, 0.3);

    // Smooth Hero Scroll Parallax
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isReducedMotion && typeof ScrollTrigger !== 'undefined') {
        gsap.to('.hero-visual-sculpture', {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.2
            },
            y: 75,
            ease: 'none'
        });

        gsap.to('.hero-editorial-text', {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            },
            y: 35,
            ease: 'none'
        });
    }
}


/* ==========================================================================
   04B. SOVEREIGN PERFORMANCE STATS: GSAP SCROLLTRIGGER ANIMATION
   ========================================================================== */
function initSovereignStatsScrollAnimation() {
    const statsSection = document.querySelector('.sovereign-stats-section');
    if (!statsSection) return;

    const statCards = statsSection.querySelectorAll('.sovereign-stat-card');
    const statValues = statsSection.querySelectorAll('.stat-value-highlight');

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typeof ScrollTrigger !== 'undefined') {
        // 1. Staggered card entrance: fade up with luxurious easing only when scrolled into view
        if (!isReduced && statCards.length > 0) {
            gsap.from(statCards, {
                scrollTrigger: {
                    trigger: statsSection,
                    start: "top 82%",
                    once: true
                },
                y: 45,
                opacity: 0,
                duration: 0.9,
                stagger: 0.16,
                ease: "power3.out"
            });
        }

        // 2. Animated numbers roll only when section enters the viewport
        ScrollTrigger.create({
            trigger: statsSection,
            start: "top 80%",
            once: true,
            onEnter: () => {
                if (statValues.length >= 3) {
                    // Stat 1: 0% -> 100% Non-Destructive
                    const counter1 = { val: 0 };
                    gsap.to(counter1, {
                        val: 100,
                        duration: 1.6,
                        ease: "power2.out",
                        onUpdate: () => {
                            if (statValues[0]) statValues[0].textContent = Math.round(counter1.val) + '%';
                        }
                    });

                    // Stat 2: 5.0% -> 0.0% Melting Deduction
                    const counter2 = { val: 5.0 };
                    gsap.to(counter2, {
                        val: 0.0,
                        duration: 1.4,
                        ease: "power2.out",
                        onUpdate: () => {
                            if (statValues[1]) statValues[1].textContent = counter2.val.toFixed(1) + '%';
                        }
                    });

                    // Stat 3: 0 Min -> 15 Min Instant Settlement
                    const counter3 = { val: 0 };
                    gsap.to(counter3, {
                        val: 15,
                        duration: 1.3,
                        ease: "power2.out",
                        onUpdate: () => {
                            if (statValues[2]) statValues[2].textContent = Math.round(counter3.val) + ' Min';
                        }
                    });
                }
            }
        });
    } else {
        // Fallback if ScrollTrigger is unavailable
        if (statValues.length >= 3) {
            statValues[0].textContent = '100%';
            statValues[1].textContent = '0.0%';
            statValues[2].textContent = '15 Min';
        }
    }
}


/* ==========================================================================
   05. SCROLLYTELLING WORD-BY-WORD ILLUMINATION (FEEL THE SCROLL)
   ========================================================================== */
function initScrollytellingManifesto() {
    const manifestoSection = document.querySelector('.manifesto-scroll-section');
    const words = document.querySelectorAll('.word-reveal');

    if (!manifestoSection || words.length === 0) return;

    // Stagger word opacity tied directly to scroll progress
    gsap.to(words, {
        scrollTrigger: {
            trigger: manifestoSection,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.8, // Smooth trailing illumination behind scrollbar
        },
        opacity: 1,
        stagger: 0.05,
        ease: "none"
    });

    const preTag = manifestoSection.querySelector('.manifesto-pre-tag');
    if (preTag) {
        gsap.from(preTag, {
            scrollTrigger: {
                trigger: manifestoSection,
                start: "top 82%",
                toggleActions: "play none none none"
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all"
        });
    }
}


/* ==========================================================================
   06. MINIMALIST BENTO GALLERY & LIGHTBOX ENGINE
   ========================================================================== */
function initHomeGallery() {
    const gallerySection = document.getElementById('gallery');
    if (!gallerySection) return;

    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const cards = document.querySelectorAll('.bento-gallery-card');

    // 1. Live Filter Switching
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach((card) => {
                const category = card.getAttribute('data-category');
                const isMatch = filter === 'all' || category === filter;

                if (isMatch) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.45,
                        ease: "power2.out",
                        onStart: () => {
                            card.style.display = '';
                        }
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.94,
                        duration: 0.35,
                        ease: "power2.in",
                        onComplete: () => {
                            card.style.display = 'none';
                            ScrollTrigger.refresh();
                        }
                    });
                }
            });

            setTimeout(() => ScrollTrigger.refresh(), 400);
        });
    });

    // 2. Bento Card Subtle 3D Tilt on Desktop
    if (window.matchMedia('(pointer: fine)').matches) {
        cards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const rotX = -(y / (rect.height / 2)) * 3.5;
                const rotY = (x / (rect.width / 2)) * 3.5;

                gsap.to(card, {
                    rotationX: rotX,
                    rotationY: rotY,
                    transformPerspective: 1000,
                    ease: "power1.out",
                    duration: 0.3
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    ease: "power2.out",
                    duration: 0.6
                });
            });
        });
    }

    // 3. Editorial Lightbox Modal
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTag = document.getElementById('lightboxTag');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxCloseBtn');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');

    function openLightbox(card) {
        if (!lightbox || !lightboxImg) return;
        const imgSrc = card.getAttribute('data-img');
        const tag = card.getAttribute('data-tag') || '';
        const title = card.getAttribute('data-title') || '';
        const location = card.getAttribute('data-location') || '';
        const sub = card.querySelector('.bento-sub')?.textContent || '';

        lightboxImg.src = imgSrc;
        lightboxImg.alt = title;
        if (lightboxTag) lightboxTag.textContent = tag;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxCaption) {
            let descHtml = '';
            if (location) {
                descHtml += '<div class="lightbox-location-strip"><i class="fas fa-shield-halved"></i> ' + location + '</div>';
            }
            if (sub) {
                descHtml += '<p class="lightbox-desc-text">' + sub + '</p>';
            }
            lightboxCaption.innerHTML = descHtml || location;
        }

        lightbox.classList.add('is-active');
        lightbox.setAttribute('aria-hidden', 'false');
        if (lenis) lenis.stop();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('is-active');
        lightbox.setAttribute('aria-hidden', 'true');
        if (lenis) lenis.start();
    }

    cards.forEach((card) => {
        card.addEventListener('click', () => openLightbox(card));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-active')) {
            closeLightbox();
        }
    });

    // 4. Enhanced Scroll Appear Animations for Atelier Archive & Bento Gallery
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isReducedMotion) {
        // Header elements stagger reveal (eyebrow, headline, description)
        const galleryHeaderLeft = gallerySection.querySelector('.gallery-header-left');
        if (galleryHeaderLeft) {
            gsap.from(galleryHeaderLeft.children, {
                scrollTrigger: {
                    trigger: galleryHeaderLeft,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 40,
                opacity: 0,
                duration: 0.95,
                stagger: 0.14,
                ease: "power3.out",
                clearProps: "all"
            });
        }

        // Filter pills entrance
        const filterPills = gallerySection.querySelectorAll('.gallery-filter-btn');
        if (filterPills.length > 0) {
            gsap.from(filterPills, {
                scrollTrigger: {
                    trigger: '.gallery-filter-bar',
                    start: "top 88%",
                    toggleActions: "play none none none"
                },
                scale: 0.88,
                opacity: 0,
                duration: 0.6,
                stagger: 0.07,
                ease: "back.out(1.4)",
                clearProps: "all"
            });
        }

        // Individual Bento Card scroll appear with subtle image un-crop & caption reveal
        cards.forEach((card) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    toggleActions: "play none none none"
                },
                y: 65,
                opacity: 0,
                scale: 0.96,
                duration: 1.05,
                ease: "power3.out",
                onComplete: () => {
                    gsap.set(card, { clearProps: "transform" });
                }
            });

            const img = card.querySelector('.bento-img');
            if (img) {
                gsap.from(img, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        toggleActions: "play none none none"
                    },
                    scale: 1.15,
                    duration: 1.4,
                    ease: "power2.out",
                    clearProps: "scale"
                });

                // Continuous scrub parallax across card scroll travel
                gsap.fromTo(img, 
                    { yPercent: -8 },
                    {
                        yPercent: 8,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.2
                        }
                    }
                );
            }

            const badge = card.querySelector('.bento-card-badge');
            if (badge) {
                gsap.from(badge, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        toggleActions: "play none none none"
                    },
                    scale: 0.8,
                    opacity: 0,
                    delay: 0.18,
                    duration: 0.65,
                    ease: "back.out(1.5)",
                    clearProps: "all"
                });

                // Floating badge scrub parallax
                gsap.to(badge, {
                    y: -14,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.8
                    }
                });
            }

            const captionMeta = card.querySelector('.bento-caption-meta');
            if (captionMeta) {
                gsap.from(captionMeta, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        toggleActions: "play none none none"
                    },
                    y: 20,
                    opacity: 0,
                    delay: 0.22,
                    duration: 0.8,
                    ease: "power2.out",
                    clearProps: "all"
                });
            }
        });

        // Gallery Archive Footer Navigation Strip
        const galleryArchiveFooter = gallerySection.querySelector('.gallery-archive-footer');
        if (galleryArchiveFooter) {
            const infoText = galleryArchiveFooter.querySelector('.archive-info-text');
            const actionBtn = galleryArchiveFooter.querySelector('.gallery-full-archive-btn');

            if (infoText) {
                gsap.from(infoText, {
                    scrollTrigger: {
                        trigger: galleryArchiveFooter,
                        start: "top 92%",
                        toggleActions: "play none none none"
                    },
                    x: -30,
                    opacity: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    clearProps: "all"
                });
            }

            if (actionBtn) {
                gsap.from(actionBtn, {
                    scrollTrigger: {
                        trigger: galleryArchiveFooter,
                        start: "top 92%",
                        toggleActions: "play none none none"
                    },
                    x: 30,
                    opacity: 0,
                    duration: 0.9,
                    delay: 0.1,
                    ease: "power3.out",
                    clearProps: "all"
                });
            }
        }
    }
}


/* ==========================================================================
   07. EDITORIAL SCROLL REVEALS FOR ALL SECTIONS
   ========================================================================== */
function initEditorialScrollReveals() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    // 1. Live Gold Calculator Section Reveal
    const calcSection = document.querySelector('.calculator-section');
    if (calcSection) {
        const calcContent = calcSection.querySelector('.calc-content');
        if (calcContent) {
            gsap.from(calcContent.children, {
                scrollTrigger: {
                    trigger: calcSection,
                    start: 'top 82%',
                    toggleActions: 'play none none none'
                },
                y: 35,
                opacity: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                clearProps: "all"
            });
        }

        const calcResultPanel = calcSection.querySelector('.calc-result-panel');
        if (calcResultPanel) {
            gsap.from(calcResultPanel, {
                scrollTrigger: {
                    trigger: calcSection,
                    start: 'top 82%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                scale: 0.96,
                duration: 1.0,
                ease: "power3.out",
                clearProps: "all"
            });
        }
    }

    // 2. Services Section Header & Cards Stagger
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        const servicesHeader = servicesSection.querySelector('.section-head-center');
        if (servicesHeader) {
            gsap.from(servicesHeader.children, {
                scrollTrigger: {
                    trigger: servicesHeader,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 35,
                opacity: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                clearProps: "all"
            });
        }

        const serviceCards = gsap.utils.toArray('.services-editorial-grid > article');
        serviceCards.forEach((card) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                scale: 0.97,
                duration: 1.0,
                ease: "power3.out",
                onComplete: () => {
                    gsap.set(card, { clearProps: "transform" });
                }
            });
        });
    }

    // 3. Comparison Section Header & Table Row Stagger
    const compSection = document.querySelector('.comparison-section');
    if (compSection) {
        const compHeader = compSection.querySelector('.section-head-center');
        if (compHeader) {
            gsap.from(compHeader.children, {
                scrollTrigger: {
                    trigger: compHeader,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 35,
                opacity: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                clearProps: "all"
            });
        }

        const compTable = compSection.querySelector('.comparison-table');
        if (compTable) {
            gsap.from(compTable.querySelectorAll('tbody tr'), {
                scrollTrigger: {
                    trigger: compTable,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                x: -25,
                opacity: 0,
                duration: 0.7,
                stagger: 0.09,
                ease: "power2.out",
                clearProps: "all"
            });

            const checks = compTable.querySelectorAll('td.olive-col i.check');
            if (checks.length > 0) {
                gsap.from(checks, {
                    scrollTrigger: {
                        trigger: compTable,
                        start: 'top 82%',
                        toggleActions: 'play none none none'
                    },
                    scale: 0,
                    rotation: -45,
                    opacity: 0,
                    duration: 0.65,
                    stagger: 0.1,
                    ease: "back.out(2.2)",
                    clearProps: "all"
                });
            }
        }
    }

    // 4. FAQ Section Header & Cards Stagger
    const faqSection = document.getElementById('faq');
    if (faqSection) {
        const faqHeader = faqSection.querySelector('.section-head-center');
        if (faqHeader) {
            gsap.from(faqHeader.children, {
                scrollTrigger: {
                    trigger: faqHeader,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 35,
                opacity: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                clearProps: "all"
            });
        }

        const faqCards = gsap.utils.toArray('.faq-accordion-list .faq-card');
        if (faqCards.length > 0) {
            gsap.from(faqCards, {
                scrollTrigger: {
                    trigger: '.faq-accordion-list',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 35,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "all"
            });
        }
    }

    // 5. Site Footer Column Entrance
    const footerContainer = document.querySelector('.site-footer .footer-container');
    if (footerContainer) {
        gsap.from(footerContainer.children, {
            scrollTrigger: {
                trigger: '.site-footer',
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all"
        });
    }
}


/* ==========================================================================
   07C. INNER PAGES EDITORIAL SCROLL REVEALS
   Powers bespoke scroll appear animations for About, Services, Gallery,
   Contact & Terms pages while keeping performance silky smooth.
   ========================================================================== */
function initInnerPageScrollReveals() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    // 1. Inner Hero Banners (About, Gallery, Terms)
    const manifestoContainers = document.querySelectorAll('.manifesto-scroll-section .manifesto-container');
    manifestoContainers.forEach((container) => {
        gsap.from(container.children, {
            scrollTrigger: {
                trigger: container,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "all"
        });
    });

    // 2. Section Center Headers (.section-head-center on inner pages)
    const sectionHeaders = document.querySelectorAll('main .section-head-center');
    sectionHeaders.forEach((header) => {
        // Skip if inside #services or #comparison (handled by home reveals)
        if (header.closest('#services') || header.closest('#comparison') || header.closest('#faq')) return;
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            y: 35,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "all"
        });
    });

    // 3. Editorial Two-Column Story Grids (.hero-editorial-grid on About, Services, Contact)
    const editorialGrids = document.querySelectorAll('main .hero-editorial-grid');
    editorialGrids.forEach((grid) => {
        // Text Column
        const textCol = grid.querySelector('.hero-editorial-text');
        if (textCol) {
            gsap.from(textCol.children, {
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 0.95,
                stagger: 0.12,
                ease: "power3.out",
                clearProps: "all"
            });
        }

        // Image Column Frame & Subtle Zoom
        const imgFrame = grid.querySelector('.lookbook-image-frame, .service-lookbook-frame');
        if (imgFrame) {
            gsap.from(imgFrame, {
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                },
                y: 45,
                opacity: 0,
                scale: 0.96,
                duration: 1.1,
                ease: "power2.out",
                clearProps: "all"
            });

            const innerImg = imgFrame.querySelector('img');
            if (innerImg) {
                gsap.from(innerImg, {
                    scrollTrigger: {
                        trigger: grid,
                        start: 'top 95%',
                        toggleActions: 'play none none none'
                    },
                    scale: 1.12,
                    duration: 1.4,
                    ease: "power2.out",
                    clearProps: "transform"
                });
            }
        }
    });

    // 4. Core Pillars & Checklist Grids (.pillars-grid on About & Services)
    const pillarGrids = document.querySelectorAll('.pillars-grid');
    pillarGrids.forEach((pGrid) => {
        const cards = pGrid.querySelectorAll('.pillar-card, .checklist-card-dark');
        if (cards.length > 0) {
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: pGrid,
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                },
                y: 45,
                opacity: 0,
                scale: 0.96,
                duration: 0.9,
                stagger: 0.14,
                ease: "power3.out",
                onComplete: () => {
                    cards.forEach(c => gsap.set(c, { clearProps: "transform" }));
                }
            });
        }
    });

    // 5. Gallery Archive Grid (.gallery-archive-grid on Gallery Page)
    const galleryGrids = document.querySelectorAll('.gallery-archive-grid');
    galleryGrids.forEach((gGrid) => {
        const galleryCards = gGrid.querySelectorAll('.archive-gallery-card');
        if (galleryCards.length > 0) {
            gsap.from(galleryCards, {
                scrollTrigger: {
                    trigger: gGrid,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                scale: 0.96,
                duration: 0.95,
                stagger: 0.12,
                ease: "power3.out",
                onComplete: () => {
                    galleryCards.forEach(c => gsap.set(c, { clearProps: "transform" }));
                }
            });

            // Gentle image un-crop zoom effect
            const cardImgs = gGrid.querySelectorAll('.archive-card-img-wrap img');
            cardImgs.forEach((img) => {
                gsap.from(img, {
                    scrollTrigger: {
                        trigger: img.closest('.archive-gallery-card') || img,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    },
                    scale: 1.15,
                    duration: 1.3,
                    ease: "power2.out",
                    clearProps: "transform"
                });
            });
        }
    });

    // 6. Contact Page Elements (.contact-layout-grid, form fields, branches & map)
    const contactLayout = document.querySelector('.contact-layout-grid');
    if (contactLayout) {
        const formBox = contactLayout.querySelector('.contact-card-box');
        if (formBox) {
            gsap.from(formBox, {
                scrollTrigger: {
                    trigger: contactLayout,
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                },
                y: 45,
                opacity: 0,
                duration: 1.0,
                ease: "power3.out",
                clearProps: "all"
            });

            const formFields = formBox.querySelectorAll('.contact-form-grid > div');
            if (formFields.length > 0) {
                gsap.from(formFields, {
                    scrollTrigger: {
                        trigger: formBox,
                        start: 'top 95%',
                        toggleActions: 'play none none none'
                    },
                    y: 20,
                    opacity: 0,
                    duration: 0.65,
                    stagger: 0.06,
                    delay: 0.2,
                    ease: "power2.out",
                    clearProps: "all"
                });
            }
        }

        const branchCard = contactLayout.querySelector('.branch-info-card');
        if (branchCard) {
            gsap.from(branchCard, {
                scrollTrigger: {
                    trigger: contactLayout,
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                },
                y: 45,
                opacity: 0,
                duration: 1.0,
                delay: 0.15,
                ease: "power3.out",
                clearProps: "all"
            });

            const branchItems = branchCard.querySelectorAll('.branch-item');
            if (branchItems.length > 0) {
                gsap.from(branchItems, {
                    scrollTrigger: {
                        trigger: branchCard,
                        start: 'top 95%',
                        toggleActions: 'play none none none'
                    },
                    x: 25,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    delay: 0.3,
                    ease: "power2.out",
                    clearProps: "all"
                });
            }
        }

        // Map Embed Frame
        const mapWrapper = document.querySelector('main iframe')?.closest('div');
        if (mapWrapper) {
            gsap.from(mapWrapper, {
                scrollTrigger: {
                    trigger: mapWrapper,
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                scale: 0.98,
                duration: 1.0,
                ease: "power2.out",
                clearProps: "all"
            });
        }
    }

    // 7. Terms Page Editorial Container & Cascade Items
    const termsBox = document.querySelector('.terms-editorial-box');
    if (termsBox) {
        gsap.from(termsBox, {
            scrollTrigger: {
                trigger: termsBox,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            y: 45,
            opacity: 0,
            duration: 1.0,
            ease: "power3.out",
            clearProps: "all"
        });

        const termsItems = termsBox.querySelectorAll('.terms-section-item');
        termsItems.forEach((item) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.85,
                ease: "power2.out",
                clearProps: "all"
            });
        });
    }

    // 8. Inner Page CTA Callouts (About, Services, Gallery, Contact bottom callout boxes)
    const innerCtaBoxes = document.querySelectorAll('.calculator-section .calc-container, .inner-cta-light .inner-cta-card');
    innerCtaBoxes.forEach((box) => {
        // Only if this isn't the home page calculator
        if (box.querySelector('#calcWeightInput')) return;
        gsap.from(box, {
            scrollTrigger: {
                trigger: box,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            scale: 0.97,
            duration: 1.0,
            ease: "power3.out",
            clearProps: "all"
        });
    });
}


/* ==========================================================================
   07B. PINNED TESTIMONIAL LOOKBOOK DECK ANIMATION
   Locks the screen and cascades verified stories with 3D depth and stepper progress
   ========================================================================== */
function initTestimonialsPinAnimation() {
    const testimonialSection = document.querySelector('.testimonial-editorial-section');
    const cards = gsap.utils.toArray('.test-deck-card');
    const stepPills = gsap.utils.toArray('.test-step-pill');

    if (!testimonialSection || cards.length === 0) return;

    ScrollTrigger.matchMedia({
        // Desktop Pinning Experience (min-width: 1025px)
        "(min-width: 1025px)": function() {
            const numCards = cards.length;
            const scrollDistance = Math.max(2400, numCards * 750);

            // Initial state: Card 0 in place, Cards 1..N-1 waiting below
            cards.forEach((card, i) => {
                if (i === 0) {
                    gsap.set(card, { yPercent: 0, opacity: 1, scale: 1, zIndex: 1 });
                } else {
                    gsap.set(card, { yPercent: 125, opacity: 0, scale: 0.94, zIndex: i + 1 });
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: testimonialSection,
                    start: "top top",
                    end: `+=${scrollDistance}`,
                    pin: true,
                    scrub: 1.0,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const p = self.progress;
                        const activeIdx = Math.min(numCards - 1, Math.floor(p * numCards));
                        stepPills.forEach((pill, idx) => {
                            if (idx === activeIdx) {
                                pill.classList.add('active');
                            } else {
                                pill.classList.remove('active');
                            }
                        });
                    }
                }
            });

            // Dynamically construct cascade transitions for each card transition
            const stepDuration = 1.0;
            const holdDuration = 0.35;
            let currentTime = 0;

            for (let i = 0; i < numCards - 1; i++) {
                const prevCard = cards[i];
                const nextCard = cards[i + 1];
                const prevPill = stepPills[i];

                tl.to(prevCard, {
                    yPercent: -12,
                    scale: 0.94,
                    opacity: 0.35,
                    duration: stepDuration,
                    ease: "power2.inOut"
                }, currentTime)
                .to(nextCard, {
                    yPercent: 0,
                    opacity: 1,
                    scale: 1,
                    duration: stepDuration,
                    ease: "power2.out"
                }, currentTime);

                if (prevPill) {
                    const barFill = prevPill.querySelector('.bar-fill');
                    if (barFill) {
                        tl.to(barFill, {
                            width: "100%",
                            duration: stepDuration,
                            ease: "none"
                        }, currentTime);
                    }
                }

                currentTime += stepDuration;

                if (i < numCards - 2) {
                    tl.to({}, { duration: holdDuration });
                    currentTime += holdDuration;
                }
            }

            // Fill final pill bar on last transition
            const lastPill = stepPills[numCards - 1];
            if (lastPill) {
                const lastBar = lastPill.querySelector('.bar-fill');
                if (lastBar) {
                    tl.to(lastBar, {
                        width: "100%",
                        duration: 0.6,
                        ease: "none"
                    }, currentTime - 0.4);
                }
            }

            // Final slight hold before unpinning
            tl.to({}, { duration: 0.3 });

            // Allow clicking step pills to smoothly scroll to that story
            stepPills.forEach((pill, idx) => {
                pill.addEventListener('click', () => {
                    const st = tl.scrollTrigger;
                    if (!st) return;
                    const targetScroll = st.start + (st.end - st.start) * (idx / Math.max(1, numCards - 1));
                    window.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth'
                    });
                });
            });

            // 3D Card Tilt on Pointer Hover
            if (window.matchMedia('(pointer: fine)').matches) {
                cards.forEach((card) => {
                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;
                        const rotX = -(y / (rect.height / 2)) * 5;
                        const rotY = (x / (rect.width / 2)) * 5;

                        gsap.to(card, {
                            rotationX: rotX,
                            rotationY: rotY,
                            transformPerspective: 900,
                            ease: "power1.out",
                            duration: 0.3
                        });
                    });

                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, {
                            rotationX: 0,
                            rotationY: 0,
                            ease: "power2.out",
                            duration: 0.5
                        });
                    });
                });
            }
        },

        // Mobile & Tablet fallback: natural unpinned scroll
        "(max-width: 1024px)": function() {
            gsap.set(cards, { clearProps: "all" });
            cards.forEach((card) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    y: 35,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });
        }
    });
}


/* ==========================================================================
   08. INTERACTIVE GOLD VALUATION CALCULATOR & LIVE CHENNAI RATE ENGINE
   ========================================================================== */
function initGoldCalculator() {
    // 1. CONFIGURATION: Live Cloudflare Worker / Serverless Proxy URL & Local Fallback
    // When you deploy your Cloudflare Worker, paste your worker URL below:
    const LIVE_WORKER_URL = 'https://olivegold-rates-api.olivegoldsnj.workers.dev';
    const LOCAL_FEED_URL = './data/gold-rates.json';
    const CACHE_KEY = 'olivegold_chennai_gold_rates_v1';
    const CACHE_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

    // Official 2026 Chennai Domestic Benchmarks (MJDMA / IBJA Live Feed)
    const DEFAULT_RATES = {
        '24k': 15551,
        '22k': 14255,
        '18k': 12025
    };

    let activeRates = { ...DEFAULT_RATES };
    let selectedKarat = '22k';
    let currentTotal = 0;

    // DOM Elements
    const karatButtons = document.querySelectorAll('.karat-pill-btn');
    const weightInput = document.getElementById('calcWeightInput');
    const grandTotalDisplay = document.getElementById('calcGrandTotal');
    const currentRateDisplay = document.getElementById('calcCurrentRate');
    const currentKaratLabel = document.getElementById('calcKaratLabel');
    const liveDateElements = document.querySelectorAll('.live-gold-date, .calc-live-date');
    const liveRate22kElements = document.querySelectorAll('.live-rate-22k');
    const liveRate24kElements = document.querySelectorAll('.live-rate-24k');

    // 2. Format & Display Today's Local Indian Business Date
    function updateLiveDates(dateStr) {
        let displayDate = dateStr;
        if (!displayDate) {
            const now = new Date();
            const day = now.getDate();
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            displayDate = `${day} ${months[now.getMonth()]} ${now.getFullYear()}`;
        }
        liveDateElements.forEach((el) => {
            el.textContent = displayDate;
        });
    }

    // 3. Sync Rate Displays in Header Ticker and DOM
    function syncHeaderTicker() {
        liveRate22kElements.forEach((el) => {
            el.textContent = `₹${activeRates['22k'].toLocaleString('en-IN')}/g`;
        });
        liveRate24kElements.forEach((el) => {
            el.textContent = `₹${activeRates['24k'].toLocaleString('en-IN')}/g`;
        });
    }

    // 4. Update Calculator Payout Calculation
    function updateCalculation(animate = true) {
        if (!weightInput || !grandTotalDisplay) return;

        const weight = parseFloat(weightInput.value) || 0;
        const ratePerGram = activeRates[selectedKarat] || activeRates['22k'];
        const totalValue = Math.round(weight * ratePerGram);

        if (animate && typeof gsap !== 'undefined') {
            const counter = { val: currentTotal };
            gsap.fromTo(grandTotalDisplay, { scale: 1.05 }, { scale: 1, duration: 0.45, ease: "back.out(2)", overwrite: "auto" });
            gsap.to(counter, {
                val: totalValue,
                duration: 0.6,
                ease: "power2.out",
                overwrite: "auto",
                onUpdate: () => {
                    grandTotalDisplay.textContent = '₹ ' + Math.round(counter.val).toLocaleString('en-IN');
                },
                onComplete: () => {
                    currentTotal = totalValue;
                    grandTotalDisplay.textContent = '₹ ' + totalValue.toLocaleString('en-IN');
                }
            });
        } else {
            currentTotal = totalValue;
            grandTotalDisplay.textContent = '₹ ' + totalValue.toLocaleString('en-IN');
        }

        if (currentRateDisplay) {
            currentRateDisplay.textContent = '₹ ' + ratePerGram.toLocaleString('en-IN');
        }
        if (currentKaratLabel) {
            currentKaratLabel.textContent = selectedKarat.toUpperCase();
        }
    }

    // 5. Fetch Real-Time Rates with Browser Caching & Resilient Fallback
    async function fetchLiveRates() {
        // A) Check localStorage cache first
        try {
            const cachedRaw = localStorage.getItem(CACHE_KEY);
            if (cachedRaw) {
                const cached = JSON.parse(cachedRaw);
                const isFresh = (Date.now() - cached.timestamp) < CACHE_TTL_MS;
                if (isFresh && cached.rates && cached.rates['22k']) {
                    activeRates = { ...DEFAULT_RATES, ...cached.rates };
                    updateLiveDates(cached.formattedDate);
                    syncHeaderTicker();
                    updateCalculation(false);
                    return;
                }
            }
        } catch (e) {
            // continue to network fetch
        }

        // B) Fetch from Cloudflare Worker or Local Feed
        const fetchTarget = LIVE_WORKER_URL ? LIVE_WORKER_URL : LOCAL_FEED_URL;

        try {
            const response = await fetch(fetchTarget, { cache: 'no-cache' });
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            const data = await response.json();

            if (data && data.rates && data.rates['22k']) {
                activeRates = {
                    '24k': Number(data.rates['24k']) || DEFAULT_RATES['24k'],
                    '22k': Number(data.rates['22k']) || DEFAULT_RATES['22k'],
                    '18k': Number(data.rates['18k']) || DEFAULT_RATES['18k']
                };

                // Cache in localStorage
                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        rates: activeRates,
                        formattedDate: data.formattedDate || null,
                        timestamp: Date.now()
                    }));
                } catch (err) {
                    // ignore
                }

                updateLiveDates(data.formattedDate);
                syncHeaderTicker();
                updateCalculation(true);
            }
        } catch (err) {
            console.info('Olive Gold Rate Engine: Running on calibrated Chennai market baseline.', err.message);
            activeRates = { ...DEFAULT_RATES };
            updateLiveDates();
            syncHeaderTicker();
            updateCalculation(false);
        }
    }

    // Initial date & header setup immediately (zero layout shift)
    updateLiveDates();
    syncHeaderTicker();

    // Event listeners
    karatButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            karatButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            selectedKarat = btn.dataset.karat || '22k';
            updateCalculation(true);

            // Button micro-bounce on click
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(btn, { scale: 0.93 }, { scale: 1, duration: 0.35, ease: "back.out(2)" });
            }
        });
    });

    if (weightInput) {
        weightInput.addEventListener('input', () => updateCalculation(true));
    }

    // Fetch live feed
    fetchLiveRates();

    // Animate rolling count on first scroll entrance
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isReducedMotion && typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            trigger: '#calculator',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                currentTotal = 0;
                updateCalculation(true);
            }
        });
    } else {
        updateCalculation(false);
    }
}


/* ==========================================================================
   09. INTERACTIVE FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
    const faqCards = document.querySelectorAll('.faq-card');

    faqCards.forEach((card) => {
        if (card.tagName.toLowerCase() === 'details') {
            card.addEventListener('toggle', () => {
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                }
            });
            return;
        }

        const questionBtn = card.querySelector('.faq-question-btn');
        if (!questionBtn) return;

        questionBtn.addEventListener('click', () => {
            const isCurrentlyActive = card.classList.contains('active');
            faqCards.forEach((c) => c.classList.remove('active'));

            if (!isCurrentlyActive) {
                card.classList.add('active');
            }

            setTimeout(() => {
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                }
            }, 360);
        });
    });
}


/* ==========================================================================
   10. CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById('oliveContactForm');
    const formFeedback = document.getElementById('formFeedbackNotice');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';
        }

        setTimeout(() => {
            if (formFeedback) {
                formFeedback.innerHTML = '<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10B981; color: #065F46; padding: 14px; border-radius: 8px; font-weight: 600; text-align: center;"><i class="fas fa-check-circle"></i> Thank you! Your valuation enquiry has been received. Our senior appraiser will call you within 15 minutes.</div>';
            }
            contactForm.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        }, 1100);
    });
}


/* ==========================================================================
   10B. 3D "CASH FOR GOLD" INTERACTIVE PERSPECTIVE ENGINE
   ========================================================================== */
function initCashForGold3D() {
    const section = document.getElementById('cash-for-gold');
    if (!section) return;

    const card = document.getElementById('cash3dCard');
    const wrapper = document.getElementById('cash3dWrapper');
    const img = section.querySelector('.cash-3d-img');
    const badges = section.querySelectorAll('.cash-float-badge');

    if (!card || !wrapper) return;

    // 1. Mouse Parallax & 3D Tilt on Desktop
    if (window.matchMedia('(pointer: fine)').matches) {
        let bounds = card.getBoundingClientRect();

        const updateBounds = () => {
            bounds = card.getBoundingClientRect();
        };

        window.addEventListener('resize', updateBounds, { passive: true });
        window.addEventListener('scroll', updateBounds, { passive: true });

        wrapper.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;

            const normX = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
            const normY = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

            const rotX = -normY * 12; // tilt degrees
            const rotY = normX * 12;

            gsap.to(card, {
                rotationX: rotX,
                rotationY: rotY,
                ease: "power2.out",
                duration: 0.4,
                overwrite: "auto"
            });

            if (img) {
                gsap.to(img, {
                    x: -normX * 14,
                    y: -normY * 14,
                    ease: "power2.out",
                    duration: 0.4,
                    overwrite: "auto"
                });
            }

            badges.forEach((badge) => {
                const depth = parseFloat(badge.getAttribute('data-depth')) || 50;
                const factor = depth / 60;
                gsap.to(badge, {
                    x: normX * 18 * factor,
                    y: normY * 18 * factor,
                    ease: "power2.out",
                    duration: 0.45,
                    overwrite: "auto"
                });
            });
        });

        wrapper.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                ease: "power2.out",
                duration: 0.8
            });

            if (img) {
                gsap.to(img, {
                    x: 0,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.8
                });
            }

            badges.forEach((badge) => {
                gsap.to(badge, {
                    x: 0,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.8
                });
            });
        });
    }

    // 2. Continuous Ambient Levitation Physics (Idle floating when mouse is stationary)
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isReducedMotion && typeof gsap !== 'undefined') {
        badges.forEach((badge, idx) => {
            const floatDist = idx % 2 === 0 ? 8 : -8;
            const duration = 3.2 + idx * 0.7;
            gsap.to(badge, {
                y: `+=${floatDist}`,
                duration: duration,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: idx * 0.3
            });
        });

        if (img) {
            gsap.to(img, {
                y: "+=7",
                duration: 3.8,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        }
    }

    // 3. Scroll Trigger Reveal & Background Parallax
    if (!isReducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const ambientGlow = section.querySelector('.cash-ambient-glow');
        const gridMesh = section.querySelector('.cash-grid-mesh');
        if (ambientGlow) {
            gsap.to(ambientGlow, {
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                },
                y: 70,
                ease: "none"
            });
        }
        if (gridMesh) {
            gsap.to(gridMesh, {
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.0
                },
                y: 35,
                ease: "none"
            });
        }

        const contentCol = section.querySelector('.cash-content-column');
        if (contentCol) {
            gsap.from(contentCol.children, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true
                },
                y: 35,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power2.out"
            });
        }

        if (card) {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true
                },
                scale: 0.88,
                opacity: 0,
                duration: 1.1,
                ease: "power2.out"
            });
        }

        if (badges.length > 0) {
            gsap.from(badges, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    once: true
                },
                scale: 0.75,
                opacity: 0,
                duration: 0.8,
                stagger: 0.18,
                delay: 0.3,
                ease: "back.out(1.7)"
            });
        }
    }
}


/* ==========================================================================
   12. BESPOKE WHATSAPP CHATBOT & FLOATING CONCIERGE DOCK
   ========================================================================== */
function initWhatsAppChatbot() {
    if (document.getElementById('ogWaDock')) return; // Avoid duplicate

    const phone = '919090737313';
    
    // 1. Create HTML Structure
    const widgetWrap = document.createElement('div');
    widgetWrap.id = 'ogWaWidgetWrap';
    widgetWrap.setAttribute('data-lenis-prevent', 'true');
    widgetWrap.innerHTML = `
        <!-- Floating Chat Window -->
        <div id="ogWaChatWindow" class="og-wa-window" role="dialog" aria-modal="true" aria-label="Olive Gold WhatsApp Concierge Chat" aria-hidden="true" data-lenis-prevent="true">
            <div class="og-wa-header" data-lenis-prevent="true">
                <div class="og-wa-header-brand">
                    <div class="og-wa-header-icon-badge" aria-hidden="true">
                        <i class="fab fa-whatsapp"></i>
                    </div>
                    <div>
                        <h3 class="og-wa-header-title">OLIVE GOLD</h3>
                        <p class="og-wa-header-status">
                            <span class="live-dot" aria-hidden="true"></span>
                            <span>Typically replies instantly</span>
                        </p>
                    </div>
                </div>
                <button type="button" id="ogWaCloseBtn" class="og-wa-close-btn" aria-label="Close WhatsApp chat">&times;</button>
            </div>

            <div id="ogWaBody" class="og-wa-body" data-lenis-prevent="true">
                <!-- Initial Bot Message -->
                <div class="og-wa-msg-bot">
                    <p>Hi! 👋 Welcome to <strong>Olive Gold Company</strong>.</p>
                    <p>How can we help you today?</p>
                    <span class="og-wa-msg-time" id="ogWaInitTime"></span>
                </div>

                <!-- Quick Replies List -->
                <div id="ogWaQuickWrap" class="og-wa-quick-wrap" data-lenis-prevent="true">
                    <span class="og-wa-quick-label">Quick Messages</span>
                    <button type="button" class="og-wa-quick-btn" data-query="I want to sell my gold">
                        <span>I want to sell my gold</span>
                        <i class="fas fa-chevron-right" aria-hidden="true"></i>
                    </button>
                    <button type="button" class="og-wa-quick-btn" data-query="What is today's gold rate?">
                        <span>What is today's gold rate?</span>
                        <i class="fas fa-chevron-right" aria-hidden="true"></i>
                    </button>
                    <button type="button" class="og-wa-quick-btn" data-query="I need doorstep service">
                        <span>I need doorstep service</span>
                        <i class="fas fa-chevron-right" aria-hidden="true"></i>
                    </button>
                    <button type="button" class="og-wa-quick-btn" data-query="Release my pledged gold">
                        <span>Release my pledged gold</span>
                        <i class="fas fa-chevron-right" aria-hidden="true"></i>
                    </button>
                </div>
            </div>

            <!-- Footer Message Input -->
            <form id="ogWaForm" class="og-wa-footer" onsubmit="return false;" data-lenis-prevent="true">
                <input type="text" id="ogWaInput" class="og-wa-input" placeholder="Type a message..." aria-label="Type your message to Olive Gold">
                <button type="submit" id="ogWaSendBtn" class="og-wa-send-btn" aria-label="Send message to WhatsApp">
                    <i class="fas fa-paper-plane" aria-hidden="true"></i>
                </button>
            </form>
        </div>

        <!-- Floating Dock Capsule -->
        <div id="ogWaDock" class="og-wa-dock">
            <button type="button" id="ogWaToggleBtn" class="og-wa-btn" aria-label="Open WhatsApp Live Chat" aria-expanded="false">
                <i class="fab fa-whatsapp" aria-hidden="true"></i>
                <span class="og-wa-btn-dot" aria-hidden="true"></span>
                <span id="ogWaBadge" class="og-wa-badge" aria-hidden="true">1</span>
            </button>
            <div class="og-wa-dock-divider" aria-hidden="true"></div>
            <a href="tel:9090737313" class="og-wa-call-btn" aria-label="Call Olive Gold Concierge Now">
                <i class="fas fa-phone-alt" aria-hidden="true"></i>
            </a>
        </div>
    `;

    document.body.appendChild(widgetWrap);

    // 2. Format Initial Message Time
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const initTimeEl = document.getElementById('ogWaInitTime');
    if (initTimeEl) initTimeEl.textContent = timeStr;

    // 3. Elements
    const chatWindow = document.getElementById('ogWaChatWindow');
    const toggleBtn = document.getElementById('ogWaToggleBtn');
    const closeBtn = document.getElementById('ogWaCloseBtn');
    const badge = document.getElementById('ogWaBadge');
    const body = document.getElementById('ogWaBody');
    const quickWrap = document.getElementById('ogWaQuickWrap');
    const form = document.getElementById('ogWaForm');
    const input = document.getElementById('ogWaInput');

    let isOpen = false;

    // 4. Open / Close Toggle Handlers
    function toggleChat(open) {
        isOpen = (typeof open === 'boolean') ? open : !isOpen;
        if (isOpen) {
            chatWindow.classList.add('active');
            chatWindow.setAttribute('aria-hidden', 'false');
            toggleBtn.setAttribute('aria-expanded', 'true');
            if (badge) badge.style.display = 'none';
            if (typeof lenis !== 'undefined' && lenis && window.innerWidth <= 600) {
                lenis.stop();
            }
            setTimeout(() => input.focus(), 300);
        } else {
            chatWindow.classList.remove('active');
            chatWindow.setAttribute('aria-hidden', 'true');
            toggleBtn.setAttribute('aria-expanded', 'false');
            if (typeof lenis !== 'undefined' && lenis) {
                lenis.start();
            }
        }
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleChat();
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleChat(false);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (isOpen && !chatWindow.contains(e.target) && !toggleBtn.contains(e.target)) {
            toggleChat(false);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            toggleChat(false);
        }
    });

    // Complete Scroll Isolation: prevent background page from scrolling while inside chatbot
    chatWindow.addEventListener('wheel', (e) => {
        e.stopPropagation();

        const isBody = e.target.closest('#ogWaBody');
        if (!isBody) {
            // If mouse is hovering over header, footer, or buttons, route scroll into body
            if (body && body.scrollHeight > body.clientHeight) {
                body.scrollTop += e.deltaY;
            }
            e.preventDefault();
            return;
        }

        // Inside body: allow native body scroll but prevent scroll chaining to parent window at edges
        const { scrollTop, scrollHeight, clientHeight } = body;
        const isScrollingUp = e.deltaY < 0;
        const isScrollingDown = e.deltaY > 0;

        if (isScrollingUp && scrollTop <= 0) {
            e.preventDefault();
        } else if (isScrollingDown && Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
            e.preventDefault();
        }
    }, { passive: false });

    chatWindow.addEventListener('touchmove', (e) => {
        e.stopPropagation();
        const isBody = e.target.closest('#ogWaBody');
        if (!isBody) {
            e.preventDefault();
        }
    }, { passive: false });

    // 5. Contextual Bot Responses Map
    const responseKnowledge = {
        "I want to sell my gold": {
            botReply: "We purchase all old gold, ancestral jewellery, coins, and scrap with <strong>0.0% melting deductions</strong> and German XRF laser spectrometry in Pondy Bazaar, T. Nagar. Let's provide you with an exact spot quote on WhatsApp!",
            waText: "Hi Olive Gold, I want to sell my gold. Please provide live valuation and appointment details."
        },
        "What is today's gold rate?": {
            botReply: "Today's live Chennai Bullion benchmark is approx <strong>₹14,255/g (22K)</strong> and <strong>₹15,551/g (24K)</strong>. Connect directly on WhatsApp to lock in your live spot rate without market fluctuations.",
            waText: "Hi Olive Gold, what is today's exact live gold rate per gram in Chennai?"
        },
        "I need doorstep service": {
            botReply: "We provide private, insured doorstep gold valuation across Chennai with portable German XRF spectrometers and spot RTGS/cash settlements. Share your locality on WhatsApp to book a senior appraiser.",
            waText: "Hi Olive Gold, I would like to book a private doorstep gold valuation in Chennai."
        },
        "Release my pledged gold": {
            botReply: "We clear your bank or pawnbroker gold loan in full with <strong>zero pre-funding</strong> from you, recover your jewels securely, and release the remaining surplus market cash equity to you immediately.",
            waText: "Hi Olive Gold, I need assistance releasing my pledged gold from bank/pawnbroker and collecting surplus cash."
        }
    };

    // 6. Handle User Selection / Sending
    function handleUserMessage(queryText) {
        if (!queryText || !queryText.trim()) return;
        const text = queryText.trim();

        // 1. Append User Message
        const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userMsgEl = document.createElement('div');
        userMsgEl.className = 'og-wa-msg-user';
        userMsgEl.innerHTML = `<p>${escapeHtml(text)}</p><span class="og-wa-msg-time" style="color: rgba(255,255,255,0.65);">${userTime}</span>`;
        body.appendChild(userMsgEl);

        // Hide quick messages after user interacts
        if (quickWrap) quickWrap.style.display = 'none';

        // Clear input
        input.value = '';
        body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });

        // 2. Show Typing Indicator
        const typingEl = document.createElement('div');
        typingEl.className = 'og-wa-typing';
        typingEl.innerHTML = `<span class="og-wa-typing-dot"></span><span class="og-wa-typing-dot"></span><span class="og-wa-typing-dot"></span>`;
        body.appendChild(typingEl);
        body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });

        // 3. Resolve Answer & WhatsApp Text
        const answer = responseKnowledge[text] || {
            botReply: "Thank you for reaching out! Connecting you with our senior Chennai valuation concierge on WhatsApp with your query...",
            waText: `Hi Olive Gold, ${text}`
        };

        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(answer.waText)}`;

        // 4. Reveal Bot Reply after brief realistic delay
        setTimeout(() => {
            if (typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);

            const botMsgEl = document.createElement('div');
            botMsgEl.className = 'og-wa-msg-bot';
            const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            botMsgEl.innerHTML = `
                <p>${answer.botReply}</p>
                <a href="${waUrl}" target="_blank" rel="noopener" class="og-wa-action-btn">
                    <i class="fab fa-whatsapp"></i>
                    <span>Continue on WhatsApp &rarr;</span>
                </a>
                <span class="og-wa-msg-time">${botTime}</span>
            `;
            body.appendChild(botMsgEl);
            body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });

            // Auto-redirect to WhatsApp after 1.4s
            setTimeout(() => {
                window.open(waUrl, '_blank');
            }, 1400);
        }, 650);
    }

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, m => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m]));
    }

    // Quick Message Buttons Click
    document.querySelectorAll('.og-wa-quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            handleUserMessage(query);
        });
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleUserMessage(input.value);
    });
}


/* ==========================================================================
   14. VERIFIED CUSTOMER VIDEO TESTIMONIAL CONTROLS
   ========================================================================== */
function initCustomerVideoReview() {
    const video = document.getElementById('ogCustomerReviewVideo');
    const overlay = document.getElementById('ogVideoPlayOverlay');
    const audioBtn = document.getElementById('ogVideoAudioToggle');
    const audioIcon = document.getElementById('ogAudioIcon');
    const progressFill = document.getElementById('ogVideoProgressFill');
    if (!video || !overlay) return;
    video.controls = false;
    video.removeAttribute('controls');

    function playVideo() {
        video.play().then(() => {
            overlay.classList.add('playing');
        }).catch(() => {
            video.muted = true;
            video.play();
            overlay.classList.add('playing');
        });
    }

    function pauseVideo() {
        video.pause();
        overlay.classList.remove('playing');
    }

    overlay.addEventListener('click', (e) => {
        e.stopPropagation();
        playVideo();
    });

    video.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
            playVideo();
        } else {
            pauseVideo();
        }
    });

    video.addEventListener('play', () => {
        overlay.classList.add('playing');
    });

    video.addEventListener('pause', () => {
        overlay.classList.remove('playing');
    });

    video.addEventListener('ended', () => {
        overlay.classList.remove('playing');
        if (progressFill) progressFill.style.width = '0%';
    });

    video.addEventListener('timeupdate', () => {
        if (progressFill && video.duration) {
            const pct = (video.currentTime / video.duration) * 100;
            progressFill.style.width = pct + '%';
        }
    });

    if (audioBtn) {
        audioBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
            if (audioIcon) {
                audioIcon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            }
        });
    }

    // Animate section into view with GSAP
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const sec = document.getElementById('video-review');
        if (sec) {
            const content = sec.querySelector('.video-review-content');
            const mockup = sec.querySelector('.video-phone-mockup');
            if (content) {
                gsap.from(content, {
                    scrollTrigger: {
                        trigger: sec,
                        start: 'top 82%',
                        toggleActions: 'play none none none'
                    },
                    x: -40,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
            }
            if (mockup) {
                gsap.from(mockup, {
                    scrollTrigger: {
                        trigger: sec,
                        start: 'top 82%',
                        toggleActions: 'play none none none'
                    },
                    y: 60,
                    scale: 0.94,
                    opacity: 0,
                    duration: 1.1,
                    ease: 'power3.out'
                });
            }
        }
    }
}


/* ==========================================================================
   15. GALLERY ARCHIVE MASONRY.JS INTEGRATION
   ========================================================================== */
function initGalleryMasonry() {
    const grid = document.querySelector('.gallery-archive-grid');
    if (!grid || typeof Masonry === 'undefined') return;

    const msnry = new Masonry(grid, {
        itemSelector: '.archive-gallery-card',
        columnWidth: '.gallery-grid-sizer',
        percentPosition: true,
        gutter: 30,
        transitionDuration: '0.35s'
    });

    if (typeof imagesLoaded !== 'undefined') {
        imagesLoaded(grid).on('progress', () => {
            msnry.layout();
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        });
        imagesLoaded(grid).on('always', () => {
            msnry.layout();
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        });
    }

    window.addEventListener('resize', () => {
        msnry.layout();
    });
}


/* ==========================================================================
   12B. PINNED SCROLLTRIGGER SMOOTH MOTION PROCESS TIMELINE ANIMATION
   Locks the viewport and scrub-animates the 4-step gold valuation journey
   ========================================================================== */
function initProcessMotionTimeline() {
    const processSection = document.querySelector('.process-motion-section');
    if (!processSection) return;

    const cards = gsap.utils.toArray('.process-scrolly-card');
    const navBtns = gsap.utils.toArray('.process-nav-btn');
    const laserFill = processSection.querySelector('.process-spine-laser');
    const telemetryVal = document.getElementById('processTelemetryVal');
    const telemetrySub = document.getElementById('processTelemetrySub');

    if (cards.length === 0) return;

    const TELEMETRY_DATA = [
        {
            val: "⚖ Laboratory Balance: 0.000g Calibrated Accuracy",
            sub: "Supervised pre-inspection with zero stone or structural damage"
        },
        {
            val: "🔬 German XRF Laser: 0.0% Melting Loss Verified",
            sub: "45-second multi-element scan without touchstone scraping or fire"
        },
        {
            val: "📈 Live Bullion Index: Real-Time IBJA Market Parity",
            sub: "Transparent formula: Net Weight (g) × Karat Purity (%) × Live Spot Rate"
        },
        {
            val: "⚡ Instant Treasury Transfer: Direct Bank RTGS / Cash",
            sub: "Disbursed in < 15 minutes with official GST tax invoice"
        }
    ];

    let currentStepIdx = 0;

    function updateStepState(idx) {
        if (idx < 0 || idx >= cards.length) return;
        currentStepIdx = idx;

        // 1. Update Navigation Buttons
        navBtns.forEach((btn, i) => {
            btn.classList.remove('active', 'completed');
            if (i < idx) {
                btn.classList.add('completed');
            } else if (i === idx) {
                btn.classList.add('active');
            }
        });

        // 2. Update Active Card Class
        cards.forEach((card, i) => {
            if (i === idx) {
                card.classList.add('is-active');
            } else {
                card.classList.remove('is-active');
            }
        });

        // 3. Update Telemetry Readout
        if (telemetryVal && TELEMETRY_DATA[idx]) {
            telemetryVal.textContent = TELEMETRY_DATA[idx].val;
        }
        if (telemetrySub && TELEMETRY_DATA[idx]) {
            telemetrySub.textContent = TELEMETRY_DATA[idx].sub;
        }
    }

    // Set initial state
    updateStepState(0);

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    ScrollTrigger.matchMedia({
        // Desktop Pinned Scrollytelling (min-width: 1025px)
        "(min-width: 1025px)": function() {
            const numSteps = cards.length;
            const scrollDistance = 2800; // Comfortable scroll distance for 4 steps

            // Initial card positioning
            cards.forEach((card, i) => {
                if (i === 0) {
                    gsap.set(card, { opacity: 1, y: 0, scale: 1, zIndex: 10 });
                } else {
                    gsap.set(card, { opacity: 0, y: 50, scale: 0.94, zIndex: 10 - i });
                }
            });

            // Master Pinned Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: processSection,
                    start: "top top",
                    end: "+=" + scrollDistance,
                    pin: true,
                    scrub: 1.0,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const p = self.progress;
                        // Smoothly advance the vertical laser beam fill
                        if (laserFill) {
                            laserFill.style.height = Math.min(100, Math.max(0, p * 100)) + "%";
                        }
                        // Calculate active step based on peak cross-fade windows
                        let activeIndex = 0;
                        if (p >= 0.79) {
                            activeIndex = 3;
                        } else if (p >= 0.48) {
                            activeIndex = 2;
                        } else if (p >= 0.165) {
                            activeIndex = 1;
                        } else {
                            activeIndex = 0;
                        }

                        if (activeIndex !== currentStepIdx) {
                            updateStepState(activeIndex);
                        }
                    }
                }
            });

            // Build smooth cross-fade card choreographies
            for (let i = 0; i < numSteps - 1; i++) {
                const currentCard = cards[i];
                const nextCard = cards[i + 1];

                tl.to(currentCard, {
                    opacity: 0,
                    y: -40,
                    scale: 0.94,
                    duration: 1,
                    ease: "power2.inOut"
                })
                .fromTo(nextCard, {
                    opacity: 0,
                    y: 50,
                    scale: 0.94
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power2.inOut"
                }, "-=0.6");

                // Hold time on each card for reading
                if (i < numSteps - 2) {
                    tl.to({}, { duration: 0.6 });
                }
            }

            // Click-to-step navigation on desktop nav buttons (peaks: 0.0, 0.33, 0.63, 0.95)
            const STEP_TARGET_PROGRESS = [0.0, 0.33, 0.63, 0.95];
            navBtns.forEach((btn, idx) => {
                btn.addEventListener('click', () => {
                    const st = tl.scrollTrigger;
                    if (!st) return;
                    const targetProgress = STEP_TARGET_PROGRESS[idx] !== undefined ? STEP_TARGET_PROGRESS[idx] : (idx / (numSteps - 1));
                    const targetScroll = st.start + (st.end - st.start) * targetProgress;
                    if (typeof lenis !== 'undefined' && lenis && typeof lenis.scrollTo === 'function') {
                        lenis.scrollTo(targetScroll, { duration: 1.2 });
                    } else {
                        window.scrollTo({
                            top: targetScroll,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        },

        // Mobile & Tablet Scrollytelling Fallback (max-width: 1024px)
        "(max-width: 1024px)": function() {
            // Clear desktop transforms
            cards.forEach(card => {
                gsap.set(card, { clearProps: "all" });
            });

            // Mobile click-to-card smooth scroll
            navBtns.forEach((btn, idx) => {
                btn.addEventListener('click', () => {
                    if (cards[idx]) {
                        if (typeof lenis !== 'undefined' && lenis && typeof lenis.scrollTo === 'function') {
                            lenis.scrollTo(cards[idx], { offset: -90, duration: 0.9 });
                        } else {
                            cards[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                });
            });

            // Track scroll through section to fill laser beam
            if (laserFill) {
                ScrollTrigger.create({
                    trigger: processSection,
                    start: "top 60%",
                    end: "bottom 80%",
                    scrub: true,
                    onUpdate: (self) => {
                        laserFill.style.height = (self.progress * 100) + "%";
                    }
                });
            }

            // Reveal cards one by one with smooth stagger
            cards.forEach((card, idx) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top 75%",
                    onEnter: () => updateStepState(idx),
                    onEnterBack: () => updateStepState(idx)
                });

                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.85,
                    ease: "power2.out",
                    clearProps: "transform,opacity"
                });
            });
        }
    });

    // Deep-dive elements on dedicated process page
    const deepdiveElements = document.querySelectorAll('.comparison-matrix-card, .payout-card, .kyc-doc-item, .process-split-layout');
    deepdiveElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 35,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "transform,opacity"
        });
    });
}


/* ==========================================================================
   13. LIFECYCLE INITIALIZER
   ========================================================================== */
let _featuresInitialized = false;

function initAllFeatures() {
    // Guard: prevent double execution from DOMContentLoaded + readyState race
    if (_featuresInitialized) return;
    _featuresInitialized = true;

    // Clear any existing ScrollTriggers AND revert their DOM changes (pin-spacers)
    // This prevents duplicate pins and huge gaps during Live Server hot-reloads
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill(true));
    }

    // Phase 1: Non-scroll features
    initFloatingNavbar();
    initHeroChoreography();
    initGoldCalculator();
    initFaqAccordion();
    initCashForGold3D();
    initContactForm();
    initWhatsAppChatbot();

    // Phase 2: Pinned scroll animations (must initialize BEFORE reveal animations)
    initSovereignStatsScrollAnimation();
    initScrollytellingManifesto();
    initHomeGallery();
    initProcessMotionTimeline();       // Pinned section
    initTestimonialsPinAnimation();    // Pinned section
    initCustomerVideoReview();
    initGalleryMasonry();

    // Phase 3: Scroll reveal animations (AFTER pins so positions are accurate)
    // Defer to next frame so GSAP pin-spacers have been fully injected into the DOM
    requestAnimationFrame(() => {
        initEditorialScrollReveals();
        initInnerPageScrollReveals();

        // Final refresh to recalculate all trigger positions after pin-spacers exist
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllFeatures);
} else {
    initAllFeatures();
}
