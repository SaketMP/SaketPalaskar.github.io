// Swiper.js Configuration for Service Carousel - 1 Slide Only
let serviceSwiper3;

// Initialize Swiper after DOM is loaded
setTimeout(() => {
  if (document.querySelector('.service-swiper-3')) {
    serviceSwiper3 = new Swiper('.service-swiper-3', {
      // Basic settings - 1 slide only
      slidesPerView: 1,
      spaceBetween: 0, // No space between slides
      centeredSlides: true,
      loop: true,
      
      // Autoplay
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      
      // Use slide effect instead of coverflow for true 1-slide display
      effect: 'slide', // Changed from coverflow to slide
      
      // Navigation
      navigation: {
        nextEl: '.service-next',
        prevEl: '.service-prev',
      },
      
      // Pagination
      pagination: {
        el: '.service-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      
      // Keyboard control
      keyboard: {
        enabled: true,
      },
      
      // Mouse wheel control
      mousewheel: {
        invert: false,
      },
      
      // Touch settings
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: true,
      
      // Callbacks
      on: {
        init: function() {
          console.log('Service Swiper initialized - 1 slide mode');
        },
        slideChange: function() {
          // Optional: Add any slide change logic here
        }
      }
    });
    
    // Pause autoplay on hover
    const swiperContainer = document.querySelector('.service-swiper-3');
    if (swiperContainer && serviceSwiper3) {
      swiperContainer.addEventListener('mouseenter', () => {
        serviceSwiper3.autoplay.stop();
      });
      
      swiperContainer.addEventListener('mouseleave', () => {
        serviceSwiper3.autoplay.start();
      });
    }
  }
}, 100);
