'use strict';

// Initialize EmailJS
emailjs.init('8pWLTJvdnntz5YyUO');

// Utility function to toggle 'active' class
const toggleActive = (elem) => elem.classList.toggle('active');

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener('click', () => toggleActive(sidebar));
  }

  // Navbar navigation
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('article[data-page]');

  navLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));

      link.classList.add('active');
      if (pages[index]) pages[index].classList.add('active');

      window.scrollTo(0, 0);
    });
  });

  // Contact form interaction
  const form = document.querySelector('[data-form]');
  const formInputs = form ? form.querySelectorAll('[data-form-input]') : [];
  const submitBtn = document.querySelector('[data-form-btn]');
  
  if (form && formInputs.length && submitBtn) {
    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        submitBtn.disabled = !form.checkValidity();
      });
    });
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = form.querySelector('input[name="name"]').value;
      const email = form.querySelector('input[name="email"]').value;
      const message = form.querySelector('textarea[name="message"]').value;
  
      emailjs.sendForm('service_k78pom8', 'template_s1unvwh', form)
        .then(() => {
          toastr.success('Message sent successfully!');
          
          emailjs.send('service_k78pom8', 'template_53j9v61', {
            to_email: email,
            name: name,
            message: message
          })
          .then(() => {
            console.log('Auto-reply email sent to user.');
          })
          .catch((err) => {
            console.error('Failed to send auto-reply email:', err);
          });
  
          form.reset();
          submitBtn.disabled = true;
        })
        .catch((error) => {
          toastr.error('An error occurred. Please try again.');
          console.error('Email.js error', error);
        });
    });
  }

  // Portfolio filtering
  const filterBtns = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-item]');
  const select = document.querySelector('[data-select]');
  const selectValue = document.querySelector('[data-selecct-value]');
  const selectItems = document.querySelectorAll('[data-select-item]');

  function filterFunc(category) {
    const cat = category.toLowerCase();
    filterItems.forEach(item => {
      const itemCat = item.dataset.category.toLowerCase();
      if (cat === 'all' || itemCat === cat) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  if (select && selectValue) {
    select.addEventListener('click', () => {
      toggleActive(select);
    });
  }

  if (selectItems.length) {
    selectItems.forEach(item => {
      item.addEventListener('click', () => {
        const category = item.textContent.trim();
        selectValue.textContent = category;
        select.classList.remove('active');
        filterFunc(category);
        filterBtns.forEach(btn => {
          btn.classList.toggle('active', btn.textContent.trim() === category);
        });
      });
    });
  }

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.textContent.trim();
        filterFunc(category);
        selectValue.textContent = category;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (select) select.classList.remove('active');
      });
    });
  }

  filterFunc('All');
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === 'all');
  });
  if (selectValue) selectValue.textContent = 'All';

  // Service Modal and Carousel
  let currentlyPlayingVideo = null;
  let serviceSwiper = null;

  // Modal data
  const modalData = {
    'social-events': {
      title: 'Social Events & Cause',
      subtitle: 'Tradition with a Purpose, Powered by Youth',
      content: `
        <div class="modal-section">
          <h4 style="color: #4B0082; font-weight: bold; margin-bottom: 15px; font-size: var(--fs-4);">Dahi Handi: Tradition with a Purpose, Powered by Youth</h4>
          <video class="modal-video" controls data-video-id="dahi-handi">
            <source src="./assets/videos/DahiHandi.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <p class="modal-text">
            As part of India's vibrant Janmashtami celebration — marking the birth of Lord Krishna — Dahi Handi is a thrilling ritual where human pyramids form to break a clay pot hung high above the street, symbolizing teamwork, agility, and devotion.
          </p>
          <p class="modal-text">
            I took the lead in organizing this event in Pune, not just as a festive competition, but as a <strong>charity-driven celebration</strong>. Along with my core team, we managed every element: city permissions, sponsorships, stage and safety setups, crowd control, and prize planning. But beyond the spectacle, the real impact came from the cause — all funds raised were directed toward animal rescue support and food relief in slum communities.
          </p>
          <p class="modal-text">
            We introduced a "Charity Handi" round where locals could contribute directly, turning entertainment into empowerment. The result: a high-energy cultural event that blended tradition, youth spirit, and social change — right at street level.
          </p>
        </div>
        <div class="modal-section">
          <h4 style="color: #4B0082; font-weight: bold; margin-bottom: 15px; font-size: var(--fs-4);">Ganapati Festival: 10 Days of Culture, Devotion & Community Impact</h4>
          <video class="modal-video" controls data-video-id="ganpati">
            <source src="./assets/videos/Ganpati.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <p class="modal-text">
            In the heart of Pune, I led the complete organization of a 10-day Ganesh Chaturthi celebration — one of the most important festivals in Hindu culture, honouring Lord Ganesha, the remover of obstacles and symbol of wisdom. For many in India, this festival represents new beginnings, prosperity, and togetherness.
          </p>
          <p class="modal-text">
            With a <strong>40-member youth team</strong>, we transformed our neighbourhood into a vibrant cultural space. From managing local authority permissions and raising funds to curating daily events, setting up eco-friendly decor, and coordinating rituals, every detail was handled by us. Each day featured not just devotional aartis and music, but also purpose-driven activities — school supply drives, food distribution for the underprivileged, and awareness campaigns on sustainable idol immersion.
          </p>
          <p class="modal-text">
            For the local community, it was a spiritual celebration. For us, it was a platform to bring people together, empower youth, and give back — blending tradition with impact.
          </p>
        </div>
      `
    },
    'volunteering': {
      title: 'Volunteering with D.A.R.T.',
      subtitle: 'Serving the Voiceless with Action & Compassion',
      content: `
        <div class="modal-section">
          <img src="./assets/images/Dart.jpeg" alt="D.A.R.T. Volunteering" class="modal-image">
          <p class="modal-text">
            As an active member of <strong>D.A.R.T. (Dodo Animal Rescue Team)</strong>, an animal welfare initiative based in Pune, I contributed across several critical functions — turning compassion into impact on the ground.
          </p>
          <p class="modal-text">
            My responsibilities extended from rescuing injured stray animals, coordinating with local vets, and ensuring post-care shelter, to managing digital outreach across Instagram and Facebook to amplify awareness and support. I also took charge of food drives during peak summer and monsoon seasons, ensuring daily meals reached <strong>over 50+ strays</strong> across zones.
          </p>
          <p class="modal-text">
            Behind the scenes, I helped streamline fund allocation, handled financial tracking, and worked on small-scale revenue generation strategies such as donation campaigns and merchandise tie-ups. Transparency, empathy, and structure were the pillars of my work.
          </p>
          <p class="modal-text">
            For me, this wasn't just volunteering — it was <strong>building a system to protect those who cannot ask for help</strong>.
          </p>
          <p class="modal-text" style="font-style: italic; text-align: center; color: #4B0082;">
            "Working for the betterment of voiceless souls" — not just a tagline, but a mission I've lived and led.
          </p>
        </div>
      `
    },
    'marshals': {
      title: 'Marshals Football Club',
      subtitle: 'Founded at 13. Fueled by vision. Built with grit.',
      content: `
        <div class="modal-section">
          <img src="./assets/images/MarshalSquad.jpeg" alt="Marshals Football Club" class="modal-image">
          <h4 style="color: #4B0082; margin-bottom: 15px; font-size: var(--fs-4);">⚽ Marshalls Football Club – Built From the Ground, Grown With Heart</h4>
          <p class="modal-text">
            Back when I was just 13, I didn't have a stadium, a coach, or a sponsor. What I did have was a football, a few determined friends, and a simple idea — to start something of our own. That idea turned into <strong>Marshalls Football Club</strong>, a team I founded from scratch during my school days in Pune. What began as casual evening kickabouts soon became a structured, competitive club of <strong>over 40 players</strong>.
          </p>
          <p class="modal-text">
            Setting up Marshalls was never just about playing the game — it was about building something real. I started by reaching out to friends and classmates who shared a passion for football. We held informal trials to form a balanced squad, and I personally approached a local coach, convincing him to train us part-time. Next came the logistics: requesting access to a local community ground, arranging permissions from municipal authorities, and collecting funds to buy footballs, cones, and portable goalposts.
          </p>
          <p class="modal-text">
            I also negotiated with a neighborhood sportswear store, and they agreed to sponsor our first set of jerseys — a moment that felt bigger than any goal we scored. Once we had the basics, I organized training sessions three times a week. We split the squad into age groups (U14 and U17), ran drills, worked on formations, and built discipline into our routines.
          </p>
          <p class="modal-text">
            As we grew, I introduced rotating captaincies to help develop leadership across the team. I also created basic fitness benchmarks and started holding weekend practice matches. <strong>From street kicks to a 40-player force</strong> — I turned a childhood dream into a full-fledged football community.
          </p>
        </div>
      `
    }
  };

  // Initialize Swiper Carousel
  function initServiceCarousel() {
    if (typeof Swiper !== 'undefined' && document.querySelector('.service-carousel')) {
      serviceSwiper = new Swiper('.service-carousel', {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        speed: 800,
        
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        
        effect: 'slide',
        
        navigation: {
          nextEl: '.carousel-next',
          prevEl: '.carousel-prev',
        },
        
        pagination: {
          el: '.carousel-pagination',
          clickable: true,
          dynamicBullets: false,
        },
        
        keyboard: {
          enabled: true,
        },
        
        on: {
          init: function() {
            console.log('Service carousel initialized successfully');
          }
        }
      });

      // Pause on hover
      const swiperContainer = document.querySelector('.service-carousel');
      if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', () => {
          if (serviceSwiper && serviceSwiper.autoplay) {
            serviceSwiper.autoplay.stop();
          }
        });
        
        swiperContainer.addEventListener('mouseleave', () => {
          if (serviceSwiper && serviceSwiper.autoplay) {
            serviceSwiper.autoplay.start();
          }
        });
      }
    }
  }

  // Service Modal Functions
  const modal = document.getElementById('serviceModal');
  const modalContent = document.getElementById('modalContent');
  const closeBtn = document.querySelector('.service-modal-close');
  const overlayBg = document.querySelector('.service-overlay-bg');

  function stopAllVideos() {
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
      video.pause();
      video.currentTime = 0;
    });
    currentlyPlayingVideo = null;
  }

  function openModal(serviceType) {
    const data = modalData[serviceType];
    if (data && modal && modalContent) {
      stopAllVideos();
      
      modalContent.innerHTML = `
        <div class="modal-header">
          <h2 class="modal-title">${data.title}</h2>
          <p class="modal-subtitle">${data.subtitle}</p>
        </div>
        ${data.content}
      `;
      
      const modalVideos = modalContent.querySelectorAll('video');
      modalVideos.forEach(video => {
        video.addEventListener('play', function() {
          if (currentlyPlayingVideo && currentlyPlayingVideo !== this) {
            currentlyPlayingVideo.pause();
            currentlyPlayingVideo.currentTime = 0;
          }
          currentlyPlayingVideo = this;
        });
        
        video.addEventListener('pause', function() {
          if (currentlyPlayingVideo === this) {
            currentlyPlayingVideo = null;
          }
        });
      });
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
      stopAllVideos();
    }
  }

  // Event listeners for service items (using event delegation for dynamic content)
  document.addEventListener('click', function(e) {
    const serviceItem = e.target.closest('.service-item[data-service]');
    if (serviceItem) {
      const serviceType = serviceItem.getAttribute('data-service');
      openModal(serviceType);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (overlayBg) {
    overlayBg.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Initialize carousel after a short delay to ensure Swiper library is loaded
  setTimeout(initServiceCarousel, 500);
});
