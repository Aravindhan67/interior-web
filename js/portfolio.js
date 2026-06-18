// portfolio.js

document.addEventListener('DOMContentLoaded', () => {
  // Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300); // match transition duration
          }
        });
      });
    });
  }

  // Lightbox
  const lightboxItems = document.querySelectorAll('.portfolio-item img');
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  document.body.appendChild(lightbox);

  const lightboxImg = document.createElement('img');
  lightbox.appendChild(lightboxImg);

  const closeBtn = document.createElement('div');
  closeBtn.id = 'lightbox-close';
  closeBtn.innerHTML = '&times;';
  lightbox.appendChild(closeBtn);

  if (lightboxItems.length > 0) {
    lightboxItems.forEach(image => {
      image.addEventListener('click', e => {
        lightbox.classList.add('active');
        const src = image.getAttribute('src');
        lightboxImg.src = src;
      });
    });
  }

  lightbox.addEventListener('click', e => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove('active');
    }
  });
});
