/* ===== Usha's Homely Kitchen - JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== MENU DATA (for Today's Highlight) =====
  const menuData = {
    morning: {
      Monday: 'Pongal, Sambar, Chutney',
      Tuesday: 'Aapam, Kadalai Curry',
      Wednesday: 'Poha Upma, Chutney',
      Thursday: 'Idli, Sambar',
      Friday: 'Poori Potato Kuruma',
      Saturday: 'Paniyaram, 2 Variety Chutney',
    },
    lunch: {
      Monday: 'Rice, Moor Kulambu, Rasam, Porial',
      Tuesday: 'Rice, Puli Kulambu, Rasam, Moor, Porial',
      Wednesday: 'Fish Kulumbu and Fry / Pacha Pairu Kadayal, Rasam, Moor, Porial',
      Thursday: 'Variety Rice, Porial',
      Friday: 'Rice, Sambar, Rasam, Moor, Porial',
      Saturday: 'Veg Pulao and Raita',
    },
    dinner: {
      Monday: 'Kesari, Chutney',
      Tuesday: 'Adai Dosa, 2 Variety Chutney',
      Wednesday: 'Tomato Dosa, 2 Variety Chutney',
      Thursday: 'Uthappam, 2 Variety Chutney',
      Friday: 'Aapam, Kadala Curry',
      Saturday: 'Chapatti, Kuruma',
    }
  };

  // ===== TODAY'S HIGHLIGHT =====
  function setTodaysHighlight() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dayName = days[today.getDay()];
    const dayEl = document.getElementById('today-day');
    const menuEl = document.getElementById('todays-menu');

    dayEl.textContent = dayName;

    if (dayName === 'Sunday') {
      menuEl.innerHTML = `
        <strong>🌿 Sunday is a rest day!</strong><br>
        We're recharging to serve you fresh meals on Monday.
      `;
    } else {
      const morning = menuData.morning[dayName] || '';
      const lunch = menuData.lunch[dayName] || '';
      const dinner = menuData.dinner[dayName] || '';
      menuEl.innerHTML = `
        <strong>🌅 Morning:</strong> ${morning} &nbsp;|&nbsp;
        <strong>🍛 Lunch:</strong> ${lunch} &nbsp;|&nbsp;
        <strong>🌙 Dinner:</strong> ${dinner}
      `;
    }
  }
  setTodaysHighlight();

  // ===== STICKY HEADER =====
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');

  function onScroll() {
    const scrollY = window.scrollY;

    // Header scroll effect
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link tracking
    updateActiveNavLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Back to top click
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== MOBILE NAV TOGGLE =====
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ===== MENU TABS =====
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuContents = document.querySelectorAll('.menu-content');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      menuContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === target) {
          content.classList.add('active');
          // Re-trigger scroll animations for newly visible cards
          content.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => {
              if (isElementInViewport(el)) {
                el.classList.add('visible');
              }
            }, 50);
          });
        }
      });
    });
  });

  // ===== PLAN TOGGLE =====
  const planToggleBtns = document.querySelectorAll('.plan-toggle-btn');
  const planContents = document.querySelectorAll('.plan-content');

  planToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.plan;

      planToggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      planContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === target) {
          content.classList.add('active');
          // Re-trigger scroll animations
          content.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => {
              if (isElementInViewport(el)) {
                el.classList.add('visible');
              }
            }, 50);
          });
        }
      });
    });
  });

  // ===== AVAILABLE TODAY - DYNAMIC GENERATION =====
  const availableIconMap = {
    // Morning icons
    'Pongal': 'fa-bowl-rice',
    'Aapam': 'fa-cookie',
    'Poha': 'fa-bowl-rice',
    'Idly': 'fa-circle',
    'Poori': 'fa-bread-slice',
    'Paniyaram': 'fa-cookie',
    // Lunch icons
    'Rice': 'fa-bowl-food',
    'Fish': 'fa-fish',
    'Pacha Pairu': 'fa-leaf',
    'Variety Rice': 'fa-bowl-rice',
    'Veg Pulao': 'fa-bowl-rice',
    // Dinner icons
    'Kesari': 'fa-bowl-food',
    'Adai Dosa': 'fa-cookie',
    'Dosa': 'fa-plate-wheat',
    'Uthappam': 'fa-circle',
    'Chapatti': 'fa-bread-slice',
  };

  const availableTagMap = {
    'Pongal': 'Comfort Food',
    'Aapam': 'Kerala Style',
    'Poha': 'Light & Healthy',
    'Idly': 'South Indian Classic',
    'Poori': 'Hot & Fresh',
    'Paniyaram': 'Crispy Delight',
    'Rice': 'Full Meals',
    'Fish': 'Non-Veg Special',
    'Pacha Pairu': 'Healthy Protein',
    'Variety Rice': "Chef's Choice",
    'Veg Pulao': 'Fragrant & Tasty',
    'Kesari': 'Sweet Treat',
    'Adai Dosa': 'Traditional Recipe',
    'Dosa': 'Crispy & Delicious',
    'Uthappam': 'South Indian Classic',
    'Chapatti': 'Soft & Warm',
  };

  function getIconForItem(itemName) {
    for (const [key, icon] of Object.entries(availableIconMap)) {
      if (itemName.toLowerCase().includes(key.toLowerCase())) return icon;
    }
    return 'fa-utensils';
  }

  function getTagForItem(itemName) {
    for (const [key, tag] of Object.entries(availableTagMap)) {
      if (itemName.toLowerCase().includes(key.toLowerCase())) return tag;
    }
    return 'Fresh & Homemade';
  }

  function buildAvailableToday() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dayName = days[today.getDay()];
    const grid = document.getElementById('available-grid');
    const sundayMsg = document.getElementById('avl-sunday-msg');
    const filtersContainer = document.querySelector('.available-filters');

    if (!grid) return;

    // Sunday - rest day
    if (dayName === 'Sunday') {
      grid.style.display = 'none';
      if (filtersContainer) filtersContainer.style.display = 'none';
      if (sundayMsg) sundayMsg.style.display = 'block';
      return;
    }

    const categories = [
      {
        key: 'morning',
        label: 'Morning Available',
        cssClass: 'morning',
        icon: 'fa-sun',
        filterKey: 'avl-morning'
      },
      {
        key: 'lunch',
        label: 'Lunch Available',
        cssClass: 'lunch',
        icon: 'fa-cloud-sun',
        filterKey: 'avl-lunch'
      },
      {
        key: 'dinner',
        label: 'Dinner Available',
        cssClass: 'dinner',
        icon: 'fa-moon',
        filterKey: 'avl-dinner'
      }
    ];

    let html = '';

    categories.forEach(cat => {
      const menuStr = menuData[cat.key][dayName] || '';
      if (!menuStr) return;

      // Split menu items by comma
      const items = menuStr.split(',').map(s => s.trim()).filter(s => s.length > 0);

      let itemsHtml = '';
      items.forEach(item => {
        const icon = getIconForItem(item);
        const tag = getTagForItem(item);
        itemsHtml += `
            <div class="avl-item">
              <div class="avl-item-icon"><i class="fas ${icon}"></i></div>
              <div class="avl-item-info">
                <span class="avl-item-name">${item}</span>
                <span class="avl-item-tag">${tag}</span>
              </div>
              <div class="avl-item-status available"><i class="fas fa-check-circle"></i></div>
            </div>`;
      });

      html += `
        <div class="available-category-card animate-on-scroll" data-category="${cat.filterKey}">
          <div class="avl-category-header ${cat.cssClass}">
            <div class="avl-category-icon">
              <i class="fas ${cat.icon}"></i>
            </div>
            <h3 class="avl-category-title">${cat.label}</h3>
            <span class="avl-status-badge"><i class="fas fa-circle"></i> Available Now</span>
          </div>
          <div class="avl-items-list">${itemsHtml}
          </div>
        </div>`;
    });

    grid.innerHTML = html;

    // Re-observe newly generated cards for scroll animation
    grid.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    // Re-bind filter buttons after dynamic content
    bindAvailableFilters();
  }

  function bindAvailableFilters() {
    const filterBtns = document.querySelectorAll('.available-filter-btn');
    const cards = document.querySelectorAll('.available-category-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
            card.classList.remove('visible');
            setTimeout(() => {
              if (isElementInViewport(card)) {
                card.classList.add('visible');
              }
            }, 50);
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ===== AVAILABLE - LAST UPDATED TIME =====
  function setAvailableUpdatedTime() {
    const el = document.getElementById('avl-updated-time');
    if (!el) return;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${displayHours}:${displayMinutes} ${ampm}`;
    el.textContent = dateStr;
  }
  setAvailableUpdatedTime();

  // ===== SCROLL ANIMATIONS (Intersection Observer) =====
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight - 60 &&
      rect.bottom >= 0
    );
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay based on siblings
        const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
        const siblingIndex = Array.from(siblings).indexOf(entry.target);
        entry.target.style.transitionDelay = `${siblingIndex * 0.08}s`;
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Build available today section dynamically (must be after observer is created)
  buildAvailableToday();

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      updateCounter();
    });
  }

  // Observe hero section for counter animation
  const heroSection = document.getElementById('hero');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterObserver.observe(heroSection);

  // ===== HERO PARTICLES =====
  function createParticles() {
    const container = document.getElementById('hero-particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero-particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (4 + Math.random() * 4) + 's';
      particle.style.width = (2 + Math.random() * 4) + 'px';
      particle.style.height = particle.style.width;
      particle.style.opacity = 0.2 + Math.random() * 0.3;
      container.appendChild(particle);
    }
  }
  createParticles();

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // ✅ Only handle proper internal links
    if (!href || href === '#' || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

  // ===== INITIAL SCROLL CHECK =====
  onScroll();

});
