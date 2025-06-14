// YSSF Theme JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initNavigation();
  initHeroSlider();
  initRoomCards();
  initBookingForm();
  initScrollAnimations();
  initSeasonalTheme();
});

// Navigation
function initNavigation() {
  const nav = document.querySelector('.nav-main');
  let lastScroll = 0;

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
  });
}

// Hero Slider
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  // Auto-advance slides
  setInterval(nextSlide, 5000);
}

// Room Cards
function initRoomCards() {
  const cards = document.querySelectorAll('.room-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('flipped');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('flipped');
    });
  });
}

// Booking Form
function initBookingForm() {
  const form = document.querySelector('.booking-form');
  const dateInputs = form.querySelectorAll('input[type="date"]');
  const roomSelect = form.querySelector('select[name="room"]');
  const priceDisplay = form.querySelector('.price-display');
  
  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(input => {
    input.min = today;
  });
  
  // Update price on room selection
  roomSelect.addEventListener('change', () => {
    const selectedOption = roomSelect.options[roomSelect.selectedIndex];
    const price = selectedOption.dataset.price;
    priceDisplay.textContent = `¥${price}/晚`;
  });
  
  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        showBookingConfirmation();
      } else {
        showBookingError();
      }
    } catch (error) {
      console.error('Booking error:', error);
      showBookingError();
    }
  });
}

// Scroll Animations
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(element => observer.observe(element));
}

// Seasonal Theme
function initSeasonalTheme() {
  const today = new Date();
  const month = today.getMonth();
  
  // Define seasonal themes
  const seasons = {
    spring: { months: [2, 3, 4], theme: 'spring' },
    summer: { months: [5, 6, 7], theme: 'summer' },
    autumn: { months: [8, 9, 10], theme: 'autumn' },
    winter: { months: [11, 0, 1], theme: 'winter' }
  };
  
  // Set current season
  let currentSeason = 'spring';
  for (const [season, data] of Object.entries(seasons)) {
    if (data.months.includes(month)) {
      currentSeason = season;
      break;
    }
  }
  
  // Apply seasonal theme
  document.body.classList.add(`theme-${currentSeason}`);
  
  // Update seasonal content
  updateSeasonalContent(currentSeason);
}

// Helper Functions
function showBookingConfirmation() {
  const modal = document.createElement('div');
  modal.className = 'modal booking-confirmation';
  modal.innerHTML = `
    <div class="modal-content">
      <h3>预订成功</h3>
      <p>感谢您的预订，我们将尽快与您联系确认详情。</p>
      <button class="btn" onclick="this.closest('.modal').remove()">确定</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function showBookingError() {
  const modal = document.createElement('div');
  modal.className = 'modal booking-error';
  modal.innerHTML = `
    <div class="modal-content">
      <h3>预订失败</h3>
      <p>抱歉，预订过程中出现错误，请稍后重试或联系客服。</p>
      <button class="btn" onclick="this.closest('.modal').remove()">确定</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function updateSeasonalContent(season) {
  const seasonalContent = {
    spring: {
      title: '春意盎然',
      description: '春暖花开，品茗赏花',
      activities: ['采茶制茶', '赏花踏青', '品春茶']
    },
    summer: {
      title: '夏日清凉',
      description: '避暑纳凉，享受清凉',
      activities: ['避暑纳凉', '品夏茶', '观星赏月']
    },
    autumn: {
      title: '秋色宜人',
      description: '秋高气爽，品蟹赏月',
      activities: ['品蟹宴', '赏秋色', '品秋茶']
    },
    winter: {
      title: '冬日暖阳',
      description: '围炉煮茶，赏雪品茗',
      activities: ['围炉煮茶', '赏雪景', '品冬茶']
    }
  };
  
  const content = seasonalContent[season];
  const seasonalSection = document.querySelector('.seasonal-content');
  
  if (seasonalSection) {
    seasonalSection.querySelector('h2').textContent = content.title;
    seasonalSection.querySelector('p').textContent = content.description;
    
    const activitiesList = seasonalSection.querySelector('.activities-list');
    activitiesList.innerHTML = content.activities
      .map(activity => `<li>${activity}</li>`)
      .join('');
  }
} 