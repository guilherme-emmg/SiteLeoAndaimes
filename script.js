/**
 * ==========================================================================
 * LÉO ANDAIMES - LÓGICA E INTERAÇÕES (script.js)
 * JavaScript puro (Vanilla JS) para a landing page institucional
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização de módulos
  initHeader();
  initMobileNav();
  initSmoothScroll();
  initGalleryFilters();
  initGalleryLightbox();
  initContactForm();
  initScrollReveal();
  initStatCounters();
  initBackToTop();
});

/* ==========================================================================
   1. HEADER STICKY & HIGHLIGHT DE NAVEGAÇÃO
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!header) return;

  window.addEventListener('scroll', () => {
    // Adiciona sombra e reduz altura ao rolar
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Ativa o link correspondente à seção visível
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. MENU MOBILE (HAMBURGUER)
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  function toggleMenu() {
    const isActive = hamburger.classList.contains('active');
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', !isActive);
    document.body.style.overflow = !isActive ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fechar ao clicar fora do menu
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. SCROLL SUAVE PARA LINKS INTERNOS
   ========================================================================== */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   4. FILTROS DA GALERIA DE PROJETOS
   ========================================================================== */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.portfolio-card');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualizar estado ativo dos botões
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'todos' || itemCategory === filterValue) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   5. LIGHTBOX / MODAL DA GALERIA
   ========================================================================== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.portfolio-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const closeBtn = document.getElementById('lightboxClose');

  if (!lightboxModal) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.portfolio-img');
      const title = item.querySelector('.portfolio-title');
      const category = item.querySelector('.portfolio-category-badge');
      const desc = item.querySelector('.portfolio-desc');

      if (img && title && category && desc) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || title.textContent;
        lightboxTitle.textContent = title.textContent;
        lightboxCategory.textContent = category.textContent;
        lightboxDesc.textContent = desc.getAttribute('data-full-desc') || desc.textContent;

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   6. ATENDIMENTO DIRETO
   ========================================================================== */
function initContactForm() {
  // Redirecionamento direto via botões do WhatsApp e E-mail
}

/* ==========================================================================
   7. ANIMAÇÃO SCROLL REVEAL
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   8. ANIMAÇÃO DE CONTADORES NUMÉRICOS
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(counter => {
          const target = counter.getAttribute('data-target');
          if (!target) return;

          // Se for string com símbolo (ex: 100%)
          if (target.includes('%')) {
            counter.textContent = '100%';
            return;
          }

          const targetNum = parseInt(target.replace(/\D/g, ''), 10);
          const prefix = target.includes('+') ? '+' : '';
          let current = 0;
          const increment = Math.ceil(targetNum / 40);

          const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
              counter.textContent = `${prefix}${targetNum}`;
              clearInterval(timer);
            } else {
              counter.textContent = `${prefix}${current}`;
            }
          }, 40);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   9. BOTÃO VOLTAR AO TOPO
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');

  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
