export default class VideoPlayer {
  constructor(triggers, popup) {
    this.btns = document.querySelectorAll(triggers);
    this.popup = document.querySelector(popup);
    this.close = this.popup.querySelector('.close');
  }

  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (document.querySelector('iframe#videoframe')) {
          this.popup.style.display = 'flex';
          this.popup.classList.remove('fadeOut');
          this.popup.classList.add('animated', 'fadeInDown');
        } else {
          const path = btn.getAttribute('data-url');

          this.createPlayer(path);
        }
      });
    });
  }

  bindCloseTrigger() {
    this.close.addEventListener('click', () => {
      this.popup.style.display = 'none';
      this.popup.classList.remove('fadeInDown');

      this.player.stopVideo();
      this.player.clearVideo();
    });
  }

  createPlayer(url) {
    this.player = new YT.Player('videoframe', {
      height: '100%',
      width: '100%',
      videoId: `${url}`,
    });

    console.log(this.player);
    this.popup.style.display = 'flex';
    this.popup.classList.remove('fadeOut');
    this.popup.classList.add('animated', 'fadeInDown');
  }

  init() {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindTriggers();
    this.bindCloseTrigger();
  }
}