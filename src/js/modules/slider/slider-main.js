import Slider from './slider';

export default class MainSlider extends Slider {
  constructor(btns) {
    super(btns);
  }

  bindTriggers() {
    this.btns.forEach(item => {
      item.addEventListener('click', () => {
        this.changeSlides(1);
      });

      item.parentNode.previousElementSibling.addEventListener('click', (e) => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });

    this.nextModule.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.changeSlides(1);
      });
    });

    this.prevModule.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.changeSlides(-1);
      });
    });
  }

  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = this.slides.length;
    }

    try {
      this.hanson.style.opacity = '0';

      if (n === 3) {
        this.hanson.classList.add('animated');

        setTimeout(() => {
          this.hanson.style.opacity = '1';
          this.hanson.classList.add('slideInUp');
        }, 3000)
      } else {
        this.hanson.classList.remove('slideInUp');
      }
    } catch (e) {}

    this.slides.forEach(slide => {
      slide.style.display = 'none';
      slide.classList.remove('animated', 'fadeIn')
    });

    this.slides[this.slideIndex - 1].style.display = 'block';
    this.slides[this.slideIndex - 1].classList.remove('fadeOut');
    this.slides[this.slideIndex - 1].classList.add('animated', 'fadeIn');
  }

  changeSlides(n) {
    this.showSlides(this.slideIndex += n)
  }

  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector('.hanson');
      } catch(e) {}
  
      this.bindTriggers();
      this.showSlides(this.slideIndex);   
    } 
  }
}