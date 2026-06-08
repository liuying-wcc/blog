/* ============================================
   Sakura Dream · 博客交互脚本
   ============================================ */

'use strict';

// ========================================================================
// 1. Page Loader
// ========================================================================
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 700);
  }
  initSkillsAnimation();
});

// ========================================================================
// 2. Firefly Particles — 流萤飞舞
// ========================================================================
(function initFireflies() {
  const container = document.getElementById('sakura-container');
  if (!container) return;

  const count = window.innerWidth < 768 ? 12 : 25;

  for (let i = 0; i < count; i++) {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefly.style.left = Math.random() * 100 + '%';
    firefly.style.animationDuration = 10 + Math.random() * 14 + 's';
    firefly.style.animationDelay = Math.random() * 20 + 's';
    // Vary the green glow slightly
    const glow = 200 + Math.random() * 55; // 200-255
    firefly.style.background = `rgba(0, ${glow}, 136, 0.9)`;
    firefly.style.boxShadow = `0 0 8px rgba(0, ${glow}, 136, 0.6), 0 0 16px rgba(0, ${glow}, 136, 0.3)`;
    container.appendChild(firefly);
  }
})();

// ========================================================================
// 3. Sparkle Background — 闪烁星光
// ========================================================================
(function initSparkles() {
  const count = window.innerWidth < 768 ? 10 : 20;
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 6 + 's';
    sparkle.style.animationDuration = 3 + Math.random() * 4 + 's';
    document.body.appendChild(sparkle);
  }
})();

// ========================================================================
// 4. Tab Switching — 选项卡切换
// ========================================================================
const tabs = document.querySelectorAll('.tab');
const tabContents = {
  home: document.getElementById('home'),
  blog: document.getElementById('blog'),
  projects: document.getElementById('projects'),
  gallery: document.getElementById('gallery'),
  about: document.getElementById('about'),
};

// Expose switchTab globally for inline onclick
window.switchTab = function (tabId) {
  // Update tab buttons
  tabs.forEach(btn => {
    const isActive = btn.dataset.tab === tabId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive);
  });

  // Update tab content
  Object.entries(tabContents).forEach(([id, el]) => {
    if (!el) return;
    const isActive = id === tabId;
    el.classList.toggle('active', isActive);
    // Re-trigger animation
    if (isActive) {
      el.style.animation = 'none';
      void el.offsetHeight; // force reflow
      el.style.animation = '';
    }
  });

  // Close mobile nav
  document.getElementById('tabNav')?.classList.remove('open');

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger reveal animations for the new section
  setTimeout(() => initRevealObserver(), 50);
};

tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    if (tabId) switchTab(tabId);
  });
});

// ========================================================================
// 5. Mobile Hamburger Menu — 移动端菜单
// ========================================================================
const hamburger = document.getElementById('hamburger');
const tabNav = document.getElementById('tabNav');

if (hamburger && tabNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = tabNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    const icon = hamburger.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    }
  });
}

// ========================================================================
// 6. Header Scroll Effect — 表头滚动效果
// ========================================================================
const header = document.getElementById('header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  lastScrollY = scrollY;
}, { passive: true });

// ========================================================================
// 7. Typing Animation — 打字效果
// ========================================================================
(function initTyping() {
  const typedTextEl = document.getElementById('typedText');
  if (!typedTextEl) return;

  const phrases = [
    '🦋 「带我飞向天空吧」 —— 流萤',
    '🔥 SAM 机甲 · 变身！',
    '💚 就算终将化为灰烬，也要照亮夜空',
    '🌸 崩坏：星穹铁道 · 流萤单推人',
    '✨ 萤火虽微，愿为其芒',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isPaused) {
      setTimeout(type, 2000);
      isPaused = false;
      return;
    }

    if (!isDeleting) {
      // Typing forward
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        // Pause at end
        isPaused = true;
        isDeleting = true;
        setTimeout(type, 2500);
        return;
      }
      setTimeout(type, 60 + Math.random() * 80);
    } else {
      // Deleting
      typedTextEl.textContent = currentPhrase.substring(0, charIndex);
      charIndex--;

      if (charIndex < 0) {
        isDeleting = false;
        charIndex = 0;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 30 + Math.random() * 50);
    }
  }

  // Start typing after page loads
  setTimeout(type, 1200);
})();

// ========================================================================
// 8. Scroll Reveal Animation — 滚动动画
// ========================================================================
let revealObserver = null;

function initRevealObserver() {
  const elements = document.querySelectorAll('.reveal:not(.observed)');

  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.add('observed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  elements.forEach(el => {
    el.classList.add('observed');
    revealObserver.observe(el);
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initRevealObserver();
});

// ========================================================================
// 9. Skills Bar Animation — 技能条动画
// ========================================================================
function initSkillsAnimation() {
  const skillItems = document.querySelectorAll('.skill-item[data-percent]');
  if (!skillItems.length) return;

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const percent = entry.target.dataset.percent;
        const fill = entry.target.querySelector('.skill-bar-fill');
        if (fill) {
          fill.style.width = percent + '%';
        }
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillItems.forEach(item => skillObserver.observe(item));
}

// ========================================================================
// 10. Gallery Lightbox — 相册灯箱
// ========================================================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.querySelector('.lightbox-close');

// Open lightbox on gallery item click
document.addEventListener('click', (e) => {
  const galleryItem = e.target.closest('.gallery-item');
  if (!galleryItem || !lightbox || !lightboxImg) return;

  // Get placeholder emoji as "image"
  const placeholder = galleryItem.querySelector('.gallery-placeholder');
  const overlay = galleryItem.querySelector('.gallery-overlay h4');
  const text = placeholder ? placeholder.textContent.trim() : '🌸';
  const title = overlay ? overlay.textContent : 'Image';

  // For real images, we'd use img src. For placeholders, show emoji enlarged.
  lightboxImg.alt = title;

  // Create a temporary canvas to render emoji
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, 400, 400);
  grad.addColorStop(0, '#fce4ec');
  grad.addColorStop(1, '#e8eaf6');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 400, 400);

  // Emoji text
  ctx.font = '160px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 200, 200);

  lightboxImg.src = canvas.toDataURL();
  lightbox.classList.add('active');
});

// Close lightbox
if (lightboxClose && lightbox) {
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
}

// ========================================================================
// 11. Back to Top — 返回顶部
// ========================================================================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========================================================================
// 12. Keyboard Navigation — 键盘导航
// ========================================================================
document.addEventListener('keydown', (e) => {
  // Ctrl+1 through Ctrl+5 for tabs
  if (e.ctrlKey && e.key >= '1' && e.key <= '5') {
    e.preventDefault();
    const tabOrder = ['home', 'blog', 'projects', 'gallery', 'about'];
    const idx = parseInt(e.key) - 1;
    if (tabOrder[idx]) {
      switchTab(tabOrder[idx]);
    }
  }
});

// ========================================================================
// 13. Console Easter Egg — 彩蛋
// ========================================================================
console.log(
  '%c🦋 Firefly Blog · 流萤 %c🦋',
  'font-size:20px; font-weight:bold; color:#00ff88;',
  'font-size:14px; color:#a0e0ff;'
);
console.log('%c「就算终将化为灰烬，也要在燃尽之前照亮夜空」', 'font-size:14px; color:#a0aab8;');
console.log('%c🔥 SAM 机甲 · 全武装启动', 'font-size:12px; color:#6a7282;');
