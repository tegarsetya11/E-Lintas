/**
 * ==============================================================================
 * E-LINTAS - MAIN APPLICATION MODULE (app.js)
 * ==============================================================================
 * Mengatur Single Page Application (SPA) view switching, navigasi antarmuka,
 * integrasi siklus hidup halaman simulasi, dan aksesibilitas tautan.
 * ==============================================================================
 */

(function () {
  'use strict';

  // Daftar nama tampilan yang tersedia
  const VALID_VIEWS = ['home', 'quiz-1', 'quiz-2', 'simulation', 'information'];
  let currentView = 'home';

  /**
   * Inisialisasi Aplikasi Saat Halaman Selesai Dimuat
   */
  function initApp() {
    setupNavigationListeners();
    setupMenuCardListeners();
    setupBackHomeButtons();
    setupFooterLinkListeners();
    setupSimulationGuidelines();
    setupHashRouting();

    if (window.location.hash) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
    switchView('home', false);
  }

  /**
   * Fungsi Utama Perpindahan Tampilan (View Switching)
   * @param {string} targetView - ID nama view ('home', 'quiz-1', 'quiz-2', 'simulation', 'information')
   * @param {boolean} updateHistory - Apakah mengubah hash pada history peramban
   */
  function switchView(targetView, updateHistory = true) {
    if (!VALID_VIEWS.includes(targetView)) {
      targetView = 'home';
    }

    const previousView = currentView;
    currentView = targetView;

    if (previousView.startsWith('quiz-') && targetView !== previousView) {
      window.ELintasQuiz?.stop();
    }

    // 1. Matikan atau hidupkan siklus hidup simulasi canvas jika berpindah
    if (window.ELintasSimulation) {
      if (previousView === 'simulation' && targetView !== 'simulation') {
        window.ELintasSimulation.stop();
      } else if (targetView === 'simulation') {
        window.ELintasSimulation.stop();
      }
    }

    const guidelinesOverlay = document.getElementById('sim-guidelines-overlay');
    if (guidelinesOverlay) {
      guidelinesOverlay.classList.toggle('hidden', targetView !== 'simulation');
      if (targetView === 'simulation') {
        document.getElementById('btn-accept-sim-guidelines')?.focus();
      }
    }

    // 2. Sembunyikan semua section view dan tampilkan view yang dituju
    document.querySelectorAll('.app-view').forEach((section) => {
      section.classList.remove('active');
    });

    const activeSection = document.getElementById(`view-${targetView}`);
    if (activeSection) {
      activeSection.classList.add('active');
      // Gulir ke atas dengan mulus saat berganti halaman
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 3. Perbarui status tombol aktif pada Navbar
    updateNavbarState(targetView);

    // 4. Perbarui hash URL jika diizinkan
    if (updateHistory) {
      history.pushState(null, '', `#${targetView}`);
    }
  }

  function setupSimulationGuidelines() {
    const overlay = document.getElementById('sim-guidelines-overlay');
    const acceptButton = document.getElementById('btn-accept-sim-guidelines');
    if (!overlay || !acceptButton) return;

    acceptButton.addEventListener('click', () => {
      overlay.classList.add('hidden');
      if (window.ELintasSimulation) {
        window.ELintasSimulation.start();
      }
      document.getElementById('btn-sim-play-pause')?.focus();
    });
  }

  /**
   * Perbarui Status Tombol Navigasi Header
   */
  function updateNavbarState(activeView) {
    const navButtons = document.querySelectorAll('.app-nav .nav-btn');
    navButtons.forEach((btn) => {
      const target = btn.getAttribute('data-target');
      if (target === activeView) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /**
   * Pasang Event Listener untuk Navigasi Header
   */
  function setupNavigationListeners() {
    const navButtons = document.querySelectorAll('.app-nav .nav-btn');
    navButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.getAttribute('data-target');
        if (target) switchView(target);
      });
    });

    // Logo brand klik -> kembali ke beranda
    const brandLogo = document.getElementById('brand-logo');
    if (brandLogo) {
      brandLogo.addEventListener('click', (e) => {
        e.preventDefault();
        switchView('home');
      });
    }
  }

  /**
   * Pasang Event Listener untuk 4 Kartu Menu Utama di Beranda
   */
  function setupMenuCardListeners() {
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach((card) => {
      const target = card.getAttribute('data-target');
      if (!target) return;

      // Klik mouse
      card.addEventListener('click', () => {
        switchView(target);
      });

      // Aksesibilitas Keyboard (Enter atau Spasi)
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          switchView(target);
        }
      });
    });
  }

  /**
   * Pasang Event Listener untuk Seluruh Tombol "Kembali ke Beranda"
   */
  function setupBackHomeButtons() {
    const backButtons = document.querySelectorAll('.btn-back-home');
    backButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.getAttribute('data-target') || 'home';
        switchView(target);
      });
    });
  }

  /**
   * Pasang Event Listener untuk Tautan di Bagian Footer
   */
  function setupFooterLinkListeners() {
    const footerButtons = document.querySelectorAll('.footer-link-btn');
    footerButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.getAttribute('data-target');
        if (target) switchView(target);
      });
    });
  }

  /**
   * Pasang Event Listener untuk Hash Routing Peramban (Mendukung tombol Back/Forward browser)
   */
  function setupHashRouting() {
    window.addEventListener('popstate', () => {
      const hash = window.location.hash.replace('#', '');
      if (VALID_VIEWS.includes(hash)) {
        switchView(hash, false);
      } else {
        switchView('home', false);
      }
    });
  }

  // Eksekusi inisialisasi saat file dimuat
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
