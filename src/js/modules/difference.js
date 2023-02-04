export default class Difference {
  constructor(officer, items) {
    this.officer = document.querySelector(officer);
    try { this.items = this.officer.querySelectorAll(items) } catch(e) {}
    this.counter = 0;
  }

  hideItems(items) {
    items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = 'none';
        item.classList.add('animated', 'fadeOut');
      }
    });
  }

  bindTriggers(container, items, counter) {
    container.querySelector('.plus').addEventListener('click', () => {
      if (counter !== items.length - 2) {
        items[counter].style.display = 'flex';
        items[counter].classList.remove('fadeOut');
        items[counter].classList.add('fadeInUp');
        counter++;
      } else {
        items[counter].style.display = 'flex';
        items[counter].classList.remove('fadeOut');
        items[counter].classList.add('fadeInUp');
        items[items.length - 1].remove();
      }
    });
  }

  init() {
    try {
      this.hideItems(this.items);
      this.bindTriggers(this.officer, this.items, this.counter);
    } catch (e) {}
  }
}