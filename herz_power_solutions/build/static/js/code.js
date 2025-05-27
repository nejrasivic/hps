  document.addEventListener('DOMContentLoaded', () => {
    //SCROLL REVEAL
    const scrollElements = document.querySelectorAll('.scroll-reveal');

    function elementInView(el, offset = 0) {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
      );
    }

    function displayScrollElement(el, delay) {
      setTimeout(() => {
        el.classList.add('revealed');
      }, delay);
    }

    function hideScrollElement(el) {
      el.classList.remove('revealed');
    }

    function handleScrollAnimation() {
      scrollElements.forEach(el => {
        if (elementInView(el, 100)) {
          const delay = parseInt(el.getAttribute('data-delay')) || 0;
          displayScrollElement(el, delay);
        } else {
          hideScrollElement(el);
        }
      });
    }

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();

    // GALERIJA SLIKA (RUČNO I AUTOMATSKI)
    let index = 0;
    const slides = document.querySelectorAll('.gallery-item');
    const dots = document.querySelectorAll('.dot');
    let autoSlideInterval;

    function moveSlide(step) {
      index += step;
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }
      updateGallery();
    }

    function currentSlide(slideIndex) {
      index = slideIndex;
      updateGallery();
      resetAutoSlide();
    }

    function updateGallery() {
      const newTransform = -index * 100;
      const gallery = document.querySelector('.gallery');
      if (gallery) {
        gallery.style.transform = `translateX(${newTransform}%)`;
      }
      updateDots();
    }

    function updateDots() {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        moveSlide(1);
      }, 5000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    updateGallery();
    startAutoSlide();

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => currentSlide(i));
    });

    // POZADINSKI SLIDER
    const imagePaths = [
      'static/images/bg.jpg',
      'static/images/1.jpg',
      'static/images/2.jpg',
      'static/images/3.jpg'
    ];

    const bgSlides = document.querySelectorAll('.bg-slide');
    let bgCurrent = 0;
    let bgIndex = 0;
    let preloadedImages = [];
    let loaded = 0;

    imagePaths.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        preloadedImages[i] = src;
        loaded++;
        if (loaded === imagePaths.length) {
          startBackgroundSlider();
        }
      };
    });

    function startBackgroundSlider() {
      if (bgSlides.length === 0) return;

      bgSlides[bgCurrent].style.backgroundImage = `url('${preloadedImages[0]}')`;
      bgSlides[bgCurrent].classList.add('active');

      setInterval(() => {
        const next = (bgCurrent + 1) % bgSlides.length;
        bgIndex = (bgIndex + 1) % preloadedImages.length;

        bgSlides[next].style.backgroundImage = `url('${preloadedImages[bgIndex]}')`;
        bgSlides[next].classList.add('active');
        bgSlides[bgCurrent].classList.remove('active');
        bgCurrent = next;
      }, 6000);
    }

    // MOBILNI MENI 
    const toggleBtn = document.querySelector('.js-navcontrol');
    const menu = document.querySelector('.menu ul');
    const menuLinks = document.querySelectorAll('.menu ul li a');

    if (toggleBtn && menu) {
      toggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        menu.classList.toggle('show');
      });

      menuLinks.forEach(link => {
        link.addEventListener('click', function () {
          menu.classList.remove('show');
        });
      });
    }

    //FADE SLIDER ZA .card1
    let cardSlideIndex = 0;
    const cardSlides = document.querySelectorAll('.slider-image');

    function showCardSlides() {
      cardSlides.forEach(slide => slide.classList.remove('active'));
      cardSlideIndex = (cardSlideIndex + 1) % cardSlides.length;
      cardSlides[cardSlideIndex].classList.add('active');
    }

    if (cardSlides.length > 0) {
      cardSlides[0].classList.add('active');
      setInterval(showCardSlides, 3000);
    }
  });

  // TRANSLATE FUNKCIJA 
function translatePage(event) {
  event.preventDefault(); // da spriječi default ponašanje linka
  var currentUrl = window.location.href;
  var translateUrl = "https://translate.google.com/translate?sl=hr&tl=en&u=" + encodeURIComponent(currentUrl);
  window.location.href = translateUrl;
}
