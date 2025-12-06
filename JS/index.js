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

  /* FAQ ACCORDION */
  const faqData = [
    {
      q_es: "¿Qué es Viral International?",
      q_en: "What is Viral International?",
      a_es: "Viral International es una agencia de marketing digital con presencia global, especializada en crecimiento orgánico, posicionamiento de marcas, verificación de cuentas, prensa internacional, branding, IA aplicada al marketing y servicios integrales para creadores, empresas y hoteles. Nuestro enfoque combina estrategias probadas con tecnología avanzada para ofrecer resultados reales y medibles.",
      a_en: "Viral International is a digital marketing agency with a global presence, specialized in organic growth, brand positioning, account verification, international press, branding, AI applied to marketing and comprehensive services for creators, businesses and hotels. Our approach combines proven strategies with advanced technology to deliver real, measurable results."
    },
    {
      q_es: "¿Qué servicios ofrecen?",
      q_en: "What services do you offer?",
      a_es: "Ofrecemos un ecosistema completo de servicios digitales: Crecimiento orgánico, Engagement, Verificación de cuentas, Notas de prensa internacionales, Community management, Diseño gráfico y edición de reels, Branding, Boost AI, Gestión de reputación, Wikipedia, Servicios para hoteles y más.",
      a_en: "We offer a complete ecosystem of digital services: Organic growth, Engagement, Account verification, International press releases, Community management, Graphic design and reels editing, Branding, Boost AI, Reputation management, Wikipedia, Hotel services and more."
    },
    {
      q_es: "¿Trabajan con cualquier país?",
      q_en: "Do you work with any country?",
      a_es: "Sí. Viral International opera de forma global. Contamos con clientes en América, Europa, Medio Oriente y Asia. Todos los servicios son digitales y se pueden implementar desde cualquier parte del mundo.",
      a_en: "Yes. Viral International operates globally. We have clients in America, Europe, the Middle East and Asia. All services are digital and can be implemented from anywhere in the world."
    },
    {
      q_es: "¿Cómo garantizan resultados?",
      q_en: "How do you guarantee results?",
      a_es: "Nuestros procesos se basan en métricas, estrategias comprobadas y herramientas internas de automatización. Cada servicio incluye KPIs claros, seguimiento semanal o mensual, reportes y acceso directo al equipo asignado para asegurar resultados consistentes.",
      a_en: "Our processes are based on metrics, proven strategies and internal automation tools. Each service includes clear KPIs, weekly or monthly tracking, reports and direct access to the assigned team to ensure consistent results."
    },
    {
      q_es: "¿Cuánto tiempo demora ver resultados?",
      q_en: "How long does it take to see results?",
      a_es: "Depende del servicio: Crecimiento orgánico (7-30 días), Engagement (24-48h), Verificación (15-45 días), Notas de prensa (48-72h), Branding (3-10 días), Boost AI (72h).",
      a_en: "It depends on the service: Organic growth (7-30 days), Engagement (24-48h), Verification (15-45 days), Press releases (48-72h), Branding (3-10 days), Boost AI (72h)."
    },
    {
      q_es: "¿Qué es Boost AI?",
      q_en: "What is Boost AI?",
      a_es: "Boost AI es una herramienta exclusiva desarrollada por Viral International que integra inteligencia artificial y automatización para: aumentar alcance, mejorar engagement, optimizar audiencias, crear funnels automatizados y potenciar campañas 24/7. Es una ventaja competitiva que no ofrecen otras agencias tradicionales.",
      a_en: "Boost AI is an exclusive tool developed by Viral International that integrates artificial intelligence and automation to: increase reach, improve engagement, optimize audiences, create automated funnels, and boost campaigns 24/7. It is a competitive advantage that other traditional agencies do not offer."
    },
    {
      q_es: "¿Realmente pueden verificar cuentas?",
      q_en: "Can you really verify accounts?",
      a_es: "Sí, trabajamos con procesos oficiales basados en prensa verificable, reputación online, optimización del perfil y cumplimiento de los requisitos de cada plataforma. No vendemos verificaciones falsas ni métodos no permitidos.",
      a_en: "Yes, we work with official processes based on verifiable press, online reputation, profile optimization and compliance with each platform's requirements. We do not sell fake verifications or unauthorized methods."
    },
    {
      q_es: "¿Qué métodos de pago aceptan?",
      q_en: "What payment methods do you accept?",
      a_es: "Transferencias bancarias, Tarjetas de crédito, PayPal, Criptomonedas seleccionadas, Pago internacional vía Wise o Payoneer.",
      a_en: "Bank transfers, Credit cards, PayPal, Selected cryptocurrencies, International payment via Wise or Payoneer."
    }
  ];

  const faqContainer = document.querySelector('.faq-container');
  if (faqContainer) {
    faqData.forEach((faq, index) => {
      const faqItem = document.createElement('div');
      faqItem.className = 'faq-item';
      faqItem.innerHTML = `
        <div class="faq-question" data-en="${faq.q_en}" data-es="${faq.q_es}">
          ${faq.q_es}
          <span class="faq-icon">+</span>
        </div>
        <div class="faq-answer">
          <p data-en="${faq.a_en}" data-es="${faq.a_es}">${faq.a_es}</p>
        </div>
      `;
      faqContainer.appendChild(faqItem);
    });

    // Add click handlers
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
      });
    });
  }
});
