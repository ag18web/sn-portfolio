document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navAnchors = navLinks.querySelectorAll('a');
  const sections = document.querySelectorAll('.page-section');

  // helper: nasconde tutte le sezioni
  function hideAllSections() {
    sections.forEach(s => s.classList.remove('active'));
  }

  // mostra sezione per id
  function showSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.classList.add('active');
    // porta in cima (opzionale)
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // mostra Home all'avvio
  hideAllSections();
  showSection('home');

  // toggle menu (hamburger)
  hamburger.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  // click sui link del menu: mostra sezione, chiude menu (mobile)
  navAnchors.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const href = a.getAttribute('href') || '';
      const id = href.replace('#','') || 'home';
      hideAllSections();
      showSection(id);
      // chiudi menu (se era aperto)
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded','false');
    });
  });

  /* ---------- Portfolio lightbox (semplice) ---------- */
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const overlay = document.getElementById('overlay');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayImages = document.getElementById('overlay-images');
  const overlayClose = document.getElementById('overlay-close');

  // esempio dati - sostituisci questi path con i tuoi file reali in /img/...
  const portfolioData = {
    cosplay: ["img/cosplay1.jpg","img/cosplay2.jpg"],
    scena: ["img/scena1.jpg","img/scena2.jpg"],
    tema: ["img/tema1.jpg","img/tema2.jpg"],
    indumenti: ["img/indumenti1.jpg","img/indumenti2.jpg"],
    oggettistica: ["img/oggettistica1.jpg","img/oggettistica2.jpg"],
    quadri: ["img/quadri1.jpg","img/quadri2.jpg"]
  };

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const cat = item.getAttribute('data-category');
      overlayTitle.textContent = item.textContent;
      overlayImages.innerHTML = '';
      const imgs = portfolioData[cat] || [];
      if (imgs.length === 0) {
        overlayImages.innerHTML = '<p>Nessuna immagine per questa categoria (usa immagini reali nella cartella /img)</p>';
      } else {
        imgs.forEach(src => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = item.textContent;
          overlayImages.appendChild(img);
        });
      }
      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden','false');
    });
  });

  overlayClose.addEventListener('click', () => {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden','true');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden','true');
    }
  });

});
