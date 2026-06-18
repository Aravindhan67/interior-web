// main.js

document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 800);
  }

  // Dark/Light Mode Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      let theme = body.getAttribute('data-theme');
      if (theme === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
      } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
      }
    });
  }

  function updateThemeIcon(theme) {
    if(!themeToggle) return;
    if (theme === 'dark') {
      themeToggle.innerHTML = '☀️'; // Change to sun for light mode switch
    } else {
      themeToggle.innerHTML = '🌙'; // Change to moon for dark mode switch
    }
  }

  // Mobile Menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });
  }

  // Sticky Navbar & Scroll Progress & Back to Top
  const navbar = document.querySelector('.navbar');
  const scrollProgress = document.querySelector('.scroll-progress');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    // Sticky Navbar
    if (window.scrollY > 50) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }

    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = scrolled + '%';
    }

    // Back to Top
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
  });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // Animated Counters
  const counters = document.querySelectorAll('.counter-num');
  
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetNum = +target.getAttribute('data-target');
          let count = 0;
          const speed = 200; // lower is faster
          
          const updateCount = () => {
            const inc = targetNum / speed;
            if (count < targetNum) {
              count += inc;
              target.innerText = Math.ceil(count);
              setTimeout(updateCount, 10);
            } else {
              target.innerText = targetNum;
            }
          };
          
          updateCount();
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  // Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (name && email && message) {
        // Simulate success
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Message Sent ✓';
        btn.style.backgroundColor = '#28a745';
        
        contactForm.reset();
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
        }, 3000);
      }
    });
  }
});
