import '../modules/loader/loader';
import Swiper from 'swiper';
import { Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import '../modules/effects/imgParallax';
import { gsap, ScrollTrigger } from 'gsap/all';
import Lenis from '@studio-freight/lenis';
import '../modules/loader/loader';
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
  lerp: 0.1,
  infinite: false,
  smoothWheel: true,
});

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
    1366: {
      slidesPerView: 2,
    },
  },
});

const heroTl = gsap.timeline();
heroTl
  .from('.hero__title span', {
    autoAlpha: 0,
    xPercent: 50,
    duration: 1.2,
  })
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
    start: 'top+=20% center',
    end: '+=10%',
  },
});
aboutTl
  .from('.about .section-title', { scale: 0, duration: 0.3 })
  .add(animateText('.about'), '<0.2')
  .from('.about__descr-container p', { yPercent: -100, opacity: 0, duration: 1.2 }, '<0.5')
  .from(
    '.about__advantages-wrap p',
    { autoAlpha: 0, duration: 1.2, stagger: 0.2 },

    '<0.5',
  );

const aboutImgTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.about__img-wrap',
    start: 'top center',
    end: '+=50%',

    scrub: 1,
  },
});

aboutImgTl
  .fromTo(
    '.img-wrap__small-img img',
    { clipPath: 'polygon(0 0, 0 0, 100% 0, 100% 0)', opacity: 0 },
    { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', scale: 1.5, opacity: 1 },
  )
  .fromTo(
    '.img-wrap__big-img img',
    { clipPath: 'polygon(0 0, 0 0, 100% 100%, 0 0)', opacity: 0 },
    { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', scale: 1.5, opacity: 1 },
    '<',
  )
  .from('.img-wrap__text .anim__text', { xPercent: -700 }, '<').from;

const missionTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.mission',
    start: 'top+=20% center',
    end: '+=10%',
  },
});

missionTl
  .from('.mission .section-title', { scale: 0, duration: 0.3 })
  .add(animateText('.mission'), '<0.2')
  .from('.mission__img-container', { scale: 0.2, opacity: 0.4 }, '<')
  .from('.mission__descr-container p', { yPercent: -100, opacity: 0, duration: 1.2 })
  .fromTo(
    '.mission__img-container img',
    { clipPath: 'polygon(0 0, 100% 0%, 100% 0, 0 0)', opacity: 0 },
    { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', opacity: 1 },
    '<',
  );

const teamTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.team',
    start: 'top center',
    end: '+=10%',
  },
});

teamTl
  .from('.team .section-title', { scale: 0, duration: 0.3 })
  .add(animateText('.team'), '<0.2')
  .from('.mission__descr-container p', { yPercent: -100, opacity: 0, duration: 1.2 }, '<0.5')
  .fromTo(
    '.founders-card',
    { xPercent: 100, autoAlpha: 0, stagger: 0.3, duration: 2 },
    { xPercent: 0, autoAlpha: 1 },
    '<',
  );

// const teamMembersTl = gsap.timeline({
//   scrollTrigger: {
//     trigger: '.team',
//     start: 'top center',
//     end: '+=10%',
//
//   },
// });
document.querySelectorAll('.member-card').forEach((member, index, array) => {
  // if (index < 4) {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: array[index],
        start: 'top 70%',
        end: '+=50%',
      },
    })
    .fromTo(
      member,
      {
        opacity: 0,
        y: (100 + Math.random() * -200) * 2,
        delay: 0.1 * Math.random() * 4,
        rotateY: -45,
        rotateX: 15,
        rotateY: 45,
        clipPath: 'polygon(0 0, 0 100%, 100% 0, 0% 100%)',
      },
      {
        opacity: 1,
        y: 0,
        delay: 0.1 * Math.random() * 4,
        rotateY: 0,
        rotateX: 0,
        rotateY: 0,
        clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.7,
      },
    );
  // }
  // if (4 <= index && index < 7) {
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: array[5],
  //         start: 'top 80%',
  //         end: '+=50%',
  //       },
  //     })
  //     .from(member, { opacity: 0, y: -100, delay: index * 0.2 });
  // }
  // if (7 <= index && index < 10) {
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: array[8],
  //         start: 'top 80%',
  //         end: '+=50%',
  //       },
  //     })
  //     .from(member, { opacity: 0, x: 100, delay: Math.pow(0.2, index - 7) });
  // }
  // if (10 <= index && index < 12) {
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: array[10],
  //         start: 'top 80%',
  //         end: '+=50%',
  //       },
  //     })
  //     .from(member, { opacity: 0, y: 100, delay: index * 0.01 });
  // }
  // return;
});
const fillerTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.filler',
    start: 'top+=10% center',
    end: '+=50%',
  },
});
fillerTl
  .from('.filler-title h2', {
    autoAlpha: 0,
    xPercent: -50,
    duration: 1.2,
  })
  .from(
    '.filler__second-title',
    {
      autoAlpha: 0,
      xPercent: 50,
      duration: 1.2,
    },
    '<',
  );

const projectsTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.projects',
    start: 'top+=20% center',
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
