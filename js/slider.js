// slider.js

document.addEventListener('DOMContentLoaded', () => {
  // Testimonials Slider
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let currentSlide = 0;

  if (slides.length > 0) {
    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      
      if (index >= slides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = index;
      }
      
      slides[currentSlide].classList.add('active');
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
      });

      nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
      });
    }

    // Auto slide
    setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  // Featured Projects Carousel
  const track = document.querySelector('.carousel-track');
  
  if (track) {
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.classList.add('active');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.classList.remove('active');
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.classList.remove('active');
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2; // scroll-fast
      track.scrollLeft = scrollLeft - walk;
    });
  }
});
