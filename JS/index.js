"use strict";

/* WAIT FOR DOM TO BE READY */
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing...');

  /* THEME TOGGLE */
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');

  if (themeToggle && sunIcon && moonIcon) {
    console.log('Theme toggle found');
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }

    themeToggle.addEventListener('click', () => {
      console.log('Theme toggle clicked');
      document.body.classList.toggle('dark-mode');
      
      // Switch hero logo based on theme
      const heroLogo = document.getElementById('hero-logo');
      const navbarLogo = document.getElementById('navbar-logo');
      if (heroLogo) {
        if (document.body.classList.contains('dark-mode')) {
          heroLogo.src = 'IMAGES/viral international_blancoi.png';
        } else {
          heroLogo.src = 'IMAGES/viral international.png';
        }
      }
      if (navbarLogo) {
        if (document.body.classList.contains('dark-mode')) {
          navbarLogo.src = 'IMAGES/viral international_blancoi.png';
        } else {
          navbarLogo.src = 'IMAGES/viral international.png';
        }
      }
      
      if (document.body.classList.contains('dark-mode')) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        localStorage.setItem('theme', 'dark');
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
      }
    });
  } else {
    console.error('Theme toggle elements not found');
  }

  /* LANGUAGE TOGGLE */
  const langToggle = document.getElementById('lang-toggle');
  const langText = document.querySelector('.lang-text');
  let currentLang = localStorage.getItem('language') || 'es';

  if (langToggle && langText) {
    console.log('Language toggle found');
    
    // Set initial language
    if (currentLang === 'en') {
      langText.textContent = 'ES';
      switchLanguage('en');
    } else {
      langText.textContent = 'EN';
    }

    langToggle.addEventListener('click', () => {
      console.log('Language toggle clicked');
      if (currentLang === 'es') {
        currentLang = 'en';
        langText.textContent = 'ES';
        switchLanguage('en');
      } else {
        currentLang = 'es';
        langText.textContent = 'EN';
        switchLanguage('es');
      }
      localStorage.setItem('language', currentLang);
    });
  } else {
    console.error('Language toggle elements not found');
  }

  function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-es]');
    console.log(`Switching to ${lang}, found ${elements.length} elements`);
    
    elements.forEach(el => {
      const text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
      
      // Handle different element types
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (el.tagName === 'IMG') {
        el.alt = text;
      } else {
        // Use innerHTML if text contains HTML tags, otherwise textContent
        if (text.includes('<')) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });
  }

  /* MOBILE MENU */
  const hamburger = document.querySelector(".hamburger_menu");
  const navList = document.querySelector(".nav_list_container");

  if (hamburger && navList) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navList.classList.toggle("active");
      
      const bars = hamburger.querySelectorAll(".bar");
      if (hamburger.classList.contains("active")) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });
    
    // Close menu when clicking nav links
    document.querySelectorAll(".nav_list_container a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navList.classList.remove("active");
        const bars = hamburger.querySelectorAll(".bar");
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      });
    });
  }

  /* SMOOTH SCROLL FOR ANCHOR LINKS */
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

  /* HEADER HIDE ON SCROLL */
  let lastScroll = 0;
  const header = document.querySelector("header");

  if (header) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        if (currentScroll > lastScroll) {
          header.style.transform = "translateY(-100%)";
        } else {
          header.style.transform = "translateY(0)";
        }
      }
      
      lastScroll = currentScroll;
    });
  }

  console.log('Initialization complete');

  /* FAQ ACCORDION - Click handlers */
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      faqItem.classList.toggle('active');
    });
  });

  /* SCROLL REVEAL ANIMATIONS */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optional: unobserve after reveal for performance
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.scroll-reveal, .fade-in-left, .fade-in-right, .scale-up, .stagger-children'
  );
  
  animatedElements.forEach(el => observer.observe(el));

  console.log(`Observing ${animatedElements.length} animated elements`);

  /* GSAP SCROLL ANIMATIONS */
  // Check if GSAP and ScrollTrigger are loaded
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    console.log('GSAP ScrollTrigger initialized');

    // Animate section headers
    gsap.utils.toArray('.section-header').forEach((header) => {
      gsap.fromTo(header, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    });

    // Animate service boxes with stagger
    gsap.fromTo('.service-box',
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );

    // Animate stats with counter effect
    gsap.utils.toArray('.stat-item').forEach((stat) => {
      gsap.fromTo(stat,
        { scale: 0.8, opacity: 0 },
        {
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)'
        }
      );
    });

    // Animate plan cards
    gsap.fromTo('.plan-card',
      { y: 80, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.plans-grid',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out'
      }
    );

    // Animate FAQ items
    gsap.fromTo('.faq-item',
      { x: -50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.faq-container',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );

    // Animate about content
    gsap.fromTo('.about-text',
      { x: -80, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }
    );

    gsap.fromTo('.about-image',
      { x: 80, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }
    );

    // Animate contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      gsap.fromTo(contactForm,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: contactForm,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    }

    // Animate footer
    const footerContent = document.querySelector('footer .footer_content');
    if (footerContent) {
      gsap.fromTo(footerContent,
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: 'footer',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out'
        }
      );
    }

    // Animate Instagram cards
    gsap.fromTo('.instagram-card',
      { y: 60, opacity: 0, scale: 0.9 },
      {
        scrollTrigger: {
          trigger: '.instagram-grid',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)'
      }
    );

    console.log('GSAP animations applied to all sections');
  } else {
    console.warn('GSAP or ScrollTrigger not loaded, using fallback animations');
  }

  /* RESULTS CAROUSEL AUTO-ROTATION */
  const resultsCarousel = document.getElementById('resultsCarousel');
  if (resultsCarousel) {
    let autoScrollInterval;
    let isPaused = false;
    const scrollAmount = 370; // Width of one card + gap
    const autoScrollDelay = 4000; // 4 seconds between scrolls
    
    function startAutoScroll() {
      if (!isPaused) {
        autoScrollInterval = setInterval(() => {
          const maxScroll = resultsCarousel.scrollWidth - resultsCarousel.clientWidth;
          
          if (resultsCarousel.scrollLeft >= maxScroll - 10) {
            // Reached the end, scroll back to start
            resultsCarousel.scrollTo({
              left: 0,
              behavior: 'smooth'
            });
          } else {
            // Scroll to next card
            resultsCarousel.scrollBy({
              left: scrollAmount,
              behavior: 'smooth'
            });
          }
        }, autoScrollDelay);
      }
    }
    
    function stopAutoScroll() {
      clearInterval(autoScrollInterval);
    }
    
    // Pause on hover
    resultsCarousel.addEventListener('mouseenter', () => {
      isPaused = true;
      stopAutoScroll();
    });
    
    resultsCarousel.addEventListener('mouseleave', () => {
      isPaused = false;
      startAutoScroll();
    });
    
    // Pause when user manually scrolls
    let manualScrollTimeout;
    resultsCarousel.addEventListener('scroll', () => {
      isPaused = true;
      stopAutoScroll();
      
      // Resume auto-scroll after 3 seconds of inactivity
      clearTimeout(manualScrollTimeout);
      manualScrollTimeout = setTimeout(() => {
        isPaused = false;
        startAutoScroll();
      }, 3000);
    });
    
    // Start auto-scroll after page load
    setTimeout(startAutoScroll, 2000);
    
    console.log('Results carousel auto-rotation enabled');
  }
});



