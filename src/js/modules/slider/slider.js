export default class Slider {
  constructor({container = null, 
               btns = null, 
               next = null, 
               prev = null,
               nextModule = null,
               prevModule = null,
               activeClass = '',
               animate = false, 
               autoplay = false} = {}) {
    this.container = document.querySelector(container);
    try { this.slides = this.container.children; } catch(e) {};
    this.animate = animate;
    this.autoplay = autoplay;
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.nextModule = document.querySelectorAll(nextModule);
    this.prevModule = document.querySelectorAll(prevModule);
    this.activeClass = activeClass;
    this.slideIndex = 1;
  }
}