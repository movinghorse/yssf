// YSSF Theme JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeroSlider();
  initRoomCards();
  initRoomFilters();
  initSeasonalMenu();
  initTransportTabs();
  initBookingForm();
  initScrollAnimations();
  initSeasonalTheme();
  initCustomerService();
  initBackToTop();
  initWechatModal();
});

// Navigation
function initNavigation() {
  const nav = document.querySelector('.nav-main');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');
  let lastScroll = 0;

  if (!nav) return;

  // Scroll show/hide
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      nav.classList.remove('scroll-up');
      return;
    }
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
      nav.classList.remove('scroll-up');
      nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
      nav.classList.remove('scroll-down');
      nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }

  // Smooth scroll to section
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      // Only handle anchor links
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const targetSection = document.querySelector(href);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        // Close mobile menu
        if (window.innerWidth <= 768) {
          mobileToggle.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
        updateActiveNavItem(item);
      }
    });
  });

  window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });
}

function updateActiveNavItem(activeItem) {
  document.querySelectorAll('.nav-links a').forEach(item => item.classList.remove('active'));
  activeItem.classList.add('active');
}

function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.pageYOffset + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (activeLink) updateActiveNavItem(activeLink);
    }
  });
}

// Hero Slider
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  let currentSlide = 0;
  setInterval(() => {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

// Room Cards (mouse + touch)
function initRoomCards() {
  const cards = document.querySelectorAll('.room-card');
  cards.forEach(card => {
    // Mouse events (desktop)
    card.addEventListener('mouseenter', () => card.classList.add('flipped'));
    card.addEventListener('mouseleave', () => card.classList.remove('flipped'));
    // Touch events (mobile)
    card.addEventListener('touchstart', (e) => {
      // Toggle flip on tap
      const isFlipped = card.classList.contains('flipped');
      // Close all other cards first
      cards.forEach(c => c.classList.remove('flipped'));
      if (!isFlipped) card.classList.add('flipped');
    }, { passive: true });
  });
}

// Room Filter Buttons
function initRoomFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const roomCards = document.querySelectorAll('.room-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      roomCards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
          card.style.display = '';
          card.style.opacity = '1';
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

// Seasonal Menu Tabs
function initSeasonalMenu() {
  const seasonTabs = document.querySelectorAll('.season-tab');
  const menuContents = document.querySelectorAll('.menu-content');
  if (!seasonTabs.length) return;

  seasonTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const season = tab.dataset.season;
      // Update tab active state
      seasonTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // Show corresponding menu content
      menuContents.forEach(content => {
        content.classList.toggle('active', content.dataset.season === season);
      });
    });
  });

  // Auto-select current season
  const month = new Date().getMonth();
  let currentSeason = 'spring';
  if ([5, 6, 7].includes(month)) currentSeason = 'summer';
  else if ([8, 9, 10].includes(month)) currentSeason = 'autumn';
  else if ([11, 0, 1].includes(month)) currentSeason = 'winter';

  const activeTab = document.querySelector(`.season-tab[data-season="${currentSeason}"]`);
  if (activeTab) activeTab.click();
}

// Transport Tabs
function initTransportTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tabPanes.forEach(pane => {
        pane.classList.toggle('active', pane.dataset.tab === tabId);
      });
    });
  });
}

// Booking Form
function initBookingForm() {
  const form = document.querySelector('.booking-form');
  if (!form) return;

  const dateInputs = form.querySelectorAll('input[type="date"]');
  const roomSelect = form.querySelector('select[name="room"]');
  const priceDisplay = form.querySelector('.price-display .price');

  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(input => { input.min = today; });

  // Price calculation
  let pricePerNight = 0;
  let nights = 0;

  function updatePrice() {
    if (priceDisplay && pricePerNight > 0 && nights > 0) {
      priceDisplay.textContent = `¥${pricePerNight * nights}`;
    } else if (priceDisplay) {
      priceDisplay.textContent = '¥0';
    }
  }

  if (roomSelect) {
    roomSelect.addEventListener('change', () => {
      const selectedOption = roomSelect.options[roomSelect.selectedIndex];
      pricePerNight = parseInt(selectedOption.dataset.price) || 0;
      updatePrice();
    });
  }

  dateInputs.forEach(input => {
    input.addEventListener('change', () => {
      const checkIn = form.querySelector('input[name="check-in"]').value;
      const checkOut = form.querySelector('input[name="check-out"]').value;
      if (checkIn && checkOut) {
        const d1 = new Date(checkIn);
        const d2 = new Date(checkOut);
        nights = Math.max(0, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
        // Ensure check-out > check-in
        if (nights <= 0) {
          nights = 0;
          form.querySelector('input[name="check-out"]').min = checkIn;
        }
        updatePrice();
      }
    });
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const bookingData = {
      check_in: formData.get('check-in'),
      check_out: formData.get('check-out'),
      room: formData.get('room'),
      guests: parseInt(formData.get('guests')),
      name: formData.get('name'),
      phone: formData.get('phone'),
      special_requests: formData.get('special-requests'),
      created_at: new Date().toISOString(),
      status: 'pending'
    };

    // Check if Supabase is configured
    if (typeof window.__supabase !== 'undefined' && window.__supabase) {
      try {
        const { data, error } = await window.__supabase
          .from('bookings')
          .insert([bookingData])
          .select();
        if (error) {
          console.error('Supabase error:', error);
          showModal('预订失败', '抱歉，预订过程中出现错误，请稍后重试或联系客服。');
        } else {
          showModal('预订成功', '感谢您的预订，我们将尽快与您联系确认详情。');
          form.reset();
        }
      } catch (error) {
        console.error('Booking error:', error);
        showModal('预订失败', '抱歉，预订过程中出现错误，请稍后重试或联系客服。');
      }
    } else {
      // Supabase not configured - show info modal
      showModal('预订提示', '在线预订系统暂未启用，请通过电话或微信联系我们进行预订。');
    }
  });
}

// Scroll Animations
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// Seasonal Theme (body class)
function initSeasonalTheme() {
  const month = new Date().getMonth();
  let currentSeason = 'spring';
  if ([5, 6, 7].includes(month)) currentSeason = 'summer';
  else if ([8, 9, 10].includes(month)) currentSeason = 'autumn';
  else if ([11, 0, 1].includes(month)) currentSeason = 'winter';
  document.body.classList.add(`theme-${currentSeason}`);
}

// Customer Service Panel
function initCustomerService() {
  const csButton = document.getElementById('csButton');
  const closeCsPanel = document.getElementById('closeCsPanel');
  const csPanel = document.getElementById('csPanel');
  if (!csButton || !csPanel) return;

  csButton.addEventListener('click', () => csPanel.classList.toggle('active'));
  if (closeCsPanel) {
    closeCsPanel.addEventListener('click', () => csPanel.classList.remove('active'));
  }
  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.customer-service')) {
      csPanel.classList.remove('active');
    }
  });
}

// Back to Top
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.pageYOffset > window.innerHeight);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// WeChat QR Modal
function initWechatModal() {
  const wechatLink = document.getElementById('wechatLink');
  const modal = document.getElementById('wechatModal');
  if (!wechatLink || !modal) return;

  wechatLink.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
  });

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

// VR Buttons
function initVRButtons() {
  document.querySelectorAll('.btn-vr').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const vrUrl = btn.dataset.vr;
      showModal('VR全景看房', 'VR全景功能即将上线，敬请期待！如需提前了解房间详情，请联系客服。');
    });
  });
}

// Generic Modal Helper
function showModal(title, message) {
  // Remove existing modal if any
  const existing = document.querySelector('.modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <h3>${title}</h3>
      <p>${message}</p>
      <button class="btn btn-primary">确定</button>
    </div>
  `;
  document.body.appendChild(overlay);
  // Force reflow for animation
  requestAnimationFrame(() => overlay.classList.add('active'));

  const closeBtn = overlay.querySelector('.btn');
  const close = () => {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  };
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
}
