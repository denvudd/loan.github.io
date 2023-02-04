import Slider from "./slider";

export default class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
    this.autoplayInterval = false;
  }

  decorizeSlides() {
    this.slides.forEach(slide => {
      slide.classList.remove(this.activeClass);

      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = '0.4';
        slide.querySelector('.card__controls-arrow').style.opacity = '0';
      }
    });

    this.slides[0].classList.add(this.activeClass);

    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = '1';
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
    }
  }

  bindTriggers() {
    this.next.addEventListener('click', () => {
      this.nextSlide();
    });

    this.prev.addEventListener('click', () => {
      this.prevSlide();
    });
  }

  nextSlide() {
    this.container.appendChild(this.slides[0]);
    this.decorizeSlides();
  }

  prevSlide() {
    let active = this.slides[this.slides.length - 1];
    this.container.insertBefore(active, this.slides[0]);
    this.decorizeSlides();
  }

  activateAnimation() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  init() {
    try {
      this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start; 
      overflow: hidden;
      `;

      this.bindTriggers();
      this.decorizeSlides();

      if (this.autoplay) {
        this.activateAnimation();

        this.container.addEventListener('mouseenter', () => {
          console.log('enter');
          clearInterval(this.autoplayInterval);
        });
    
        this.container.addEventListener('mouseleave', () => {
          console.log('leave');
          this.activateAnimation();
        });
      };
    } catch(e) {}
  }
}