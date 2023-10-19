import gsap from 'gsap';

const preloaderRef = document.querySelector('.loader-wrap');
export const preloader = {
  el: preloaderRef,
  subscribers: [],
  animate() {
    gsap
      .timeline()
      .to('.loader-cube', { opacity: 1, scale: 1, duration: 0.1 })
      .to('.loader-cube', { rotate: 45, scale: 0.5, duration: 0.4, y: -20 })
      .to('.loader-cube', { rotate: 90, scale: 1, duration: 0.4, y: 0 })
      .to('.loader-cube', { rotate: 135, scale: 0.5, duration: 0.4, y: -20 })
      .to('.loader-cube', { rotate: 180, scale: 1, duration: 0.4, y: 0 })
      .to('.loader-cube', {
        height: 2,
        duration: 1,
        y: 0,
      })
      .to('.loader-wrap', { backgroundColor: '#ffffff00', duration: 1.2 }, '<0.5')
      .to('.loader-cube', { width: '40%', height: 2, duration: 0.7, scale: 1, opacity: 0 }, '<');
  },
  remove() {
    if (preloaderRef) {
      setTimeout(() => {
        this.el.remove();
      }, 3000);
      // gsap.to(preloaderRef, {
      //   opacity: 0,
      //   duration: 0.5,
      //   onComplete: () => {
      //     this.subscribers.forEach(fn => fn());
      //     this.el.remove();
      //   },
      // });
    }
  },
  onRemove(fn) {
    this.subscribers.push(fn);
  },
};

window.addEventListener('load', () => {
  preloader.animate();
  setTimeout(() => {
    preloader.remove();
  }, 3000);
});

export default preloader;
