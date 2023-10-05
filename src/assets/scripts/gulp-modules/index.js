import '../modules/loader/loader';
import Swiper from 'swiper';
import { Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import '../modules/effects/imgParallax';
import { gsap, ScrollTrigger } from 'gsap/all';
import Lenis from '@studio-freight/lenis';
import { executeFrame } from '../modules/effects/teamStars';
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
  lerp: 0.1,
  infinite: false,
  smoothWheel: true,
});
executeFrame();
lenis.on('scroll', () => ScrollTrigger.update());

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
const swiper = new Swiper('.swiper', {
  modules: [Scrollbar],
  speed: 1000,
  spaceBetween: 50,
  // Navigation arrows
  slidesPerView: 1,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 1.5,
    },
    1366: {
      slidesPerView: 2,
    },
  },
});

const heroTl = gsap.timeline();

heroTl
  .fromTo('.section-bg', { scale: 1.2, opacity: 0 }, { scale: 1.0, opacity: 1, duration: 1 })
  .from(
    '.hero__title span',
    {
      autoAlpha: 0,
      xPercent: 50,
      duration: 1.2,
    },
    '<0.2',
  )
  .from(
    '.hero__title h1',
    {
      autoAlpha: 0,
      xPercent: -50,
      duration: 1.2,
    },
    '<',
  )
  .from(
    '.hero__title div',
    {
      scale: 0,
      duration: 1.2,
    },
    '<',
  )
  .from(
    '.header',
    {
      scale: 0.5,
      opacity: 0,
      duration: 1,
    },
    '<',
  );

//Анімована поява тексту по літері

// Функція для анімації тексту посимвольно
function animateText(selector) {
  const animatedText = document.querySelector(`${selector} .section-title__text`);

  // Розділяємо текст на окремі букви
  const textCharacters = animatedText.innerText.split('');

  // Очищаємо вміст елементу, щоб додати анімований текст
  animatedText.innerText = '';
  textCharacters.forEach((char, index) => {
    const charElement = document.createElement('span');
    charElement.textContent = char;
    charElement.style.opacity = '0';

    // Використовуємо GSAP для анімації з'явлення тексту
    gsap.to(charElement, {
      opacity: 1,
      duration: 0.05,
      delay: index * 0.08, // Затримка між буквами
      scrollTrigger: {
        trigger: selector,
        start: 'top+=200px center',
        end: '+=10%',
      },
      onComplete: () => {
        if (index === textCharacters.length - 1) {
          // Анімація завершена
        }
      },
    });

    animatedText.appendChild(charElement);
  });
}

// Запускаємо анімацію при завантаженні сторінки

//
const aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.about',
    start: 'top center',
    end: '+=10%',
  },
});
aboutTl
  .from('.about .section-title', { scale: 0, duration: 0.3 })
  .add(animateText('.about'), '<0.2')
  .from('.about__descr-container p', { yPercent: -100, opacity: 0, duration: 1.2 }, '<0.5')
  .from(
    '.about__advantage',
    { autoAlpha: 0, duration: 1.2, stagger: 0.2 },

    '<0.5',
  );

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.img-wrap__small-img',
      start: 'top center',
      end: '+=50%',
    },
  })
  .fromTo(
    '.img-wrap__small-img img',
    {
      clipPath: 'polygon(0 0, 0 0, 100% 0, 100% 0)',
      opacity: 0,
      scale: 1.5,
    },
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
      scale: 1,
      opacity: 1,
    },
  );
gsap
  .timeline({
    scrollTrigger: {
      trigger: '.img-wrap__big-img',
      start: 'top center',
      end: '+=50%',
    },
  })
  .fromTo(
    '.img-wrap__big-img img',
    { clipPath: 'polygon(0 0, 0 0, 100% 100%, 0 0)', opacity: 0 },
    { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', scale: 1.5, opacity: 1 },
    '<',
  )
  .from('.img-wrap__text .anim__text', { xPercent: -700, opacity: 0 }, '<').from;

const missionTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.mission',
    start: 'top center',
    end: '+=10%',
  },
});

missionTl
  .from('.mission .section-title', { scale: 0, duration: 0.3 })
  .add(animateText('.mission'), '<0.2')
  .from('.mission__img-container', { scale: 0.2, opacity: 0.4 }, '<')
  .from('.mission__descr-container p', { yPercent: -100, opacity: 0, duration: 1.2 }, '<');

const teamTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.team',
    start: 'top center',
    end: '+=10%',
  },
});

gsap.timeline().to('.founder-card-decsr-1 span', {
  scrollTrigger: {
    trigger: '.founder-card-1',
    start: '10% 20%',
    end: '+=20%',
    scrub: 1,
  },
  maxHeight: 500,
});
gsap.timeline().to('.founder-card-decsr-2 span', {
  scrollTrigger: {
    trigger: '.founder-card-2',
    start: '10% 20%',
    end: '+=20%',
    scrub: 1,
  },
  maxHeight: 500,
});
teamTl.from('.team .section-title', { scale: 0, duration: 0.3 }).add(animateText('.team'), '<0.2');

document.querySelectorAll('.member-content__wrap').forEach((member, index, array) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: array[index],
        start: 'top bottom',
        end: '+=30%',

        scrub: 1,
      },
    })
    .fromTo(
      member,
      {
        scale: 0.6,
        opacity: 0,
        y: (100 + Math.random() * -200) * 2,
        // delay: 0.1 * Math.random() * 1,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        delay: 0.1 * Math.random() * 1,
      },
    );
});
const fillerTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.filler',
    start: 'top+=10% center',
    end: '+=50%',
  },
});
fillerTl
  .fromTo(
    '.filler-title h2',
    {
      autoAlpha: 0,
      xPercent: -50,
      duration: 1.2,
    },
    {
      autoAlpha: 1,
      xPercent: 0,
    },
  )
  .fromTo(
    '.filler__second-title',
    {
      autoAlpha: 0,
      xPercent: 50,
      duration: 1.2,
    },
    {
      autoAlpha: 1,
      xPercent: 0,
      duration: 1.2,
    },
    '<',
  );

const projectsTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.projects',
    start: 'top center',
    end: '+=10%',
  },
});
projectsTl
  .from('.projects .section-title', { scale: 0, duration: 0.3 })
  .add(animateText('.projects'), '<0.2')
  .from('.projects__descr-container p', { yPercent: -100, opacity: 0, duration: 1.2 }, '<0.5')
  .from(
    '.projects__advantages-wrap p',
    { autoAlpha: 0, duration: 1.2, stagger: 0.2 },

    '<0.5',
  )
  .to('.swiper-wrapper', { x: -100 }, '<')
  .to('.swiper-wrapper', { x: 0 });
