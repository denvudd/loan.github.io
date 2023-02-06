export default class VideoPlayer {
  constructor(triggers, popup) {
    this.btns = document.querySelectorAll(triggers);
    this.popup = document.querySelector(popup);
    this.close = this.popup.querySelector('.close');
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blockedElem = btn.closest('.module__video-item').nextElementSibling;

        if (i % 2 == 0) {
          blockedElem.setAttribute('data-disabled', 'true');
        }
      } catch(e) {}

      btn.addEventListener('click', () => {
        if (!btn.closest('.module__video-item') ||
             btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
          this.activeBtn = btn;

          if (document.querySelector('iframe#videoframe')) {
            this.popup.style.display = 'flex';
            this.popup.classList.remove('fadeOut');
            this.popup.classList.add('animated', 'fadeInDown');

            if (this.path !== btn.getAttribute('data-url')) {
              this.path = btn.getAttribute('data-url');

              this.player.loadVideoById({videoId: this.path});
              this.player.pauseVideo();
            }
          } else {
            this.path = btn.getAttribute('data-url');

            this.createPlayer(this.path);
          }
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

    this.popup.addEventListener('click', () => {
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
      events: {
        "onStateChange": this.onPlayerStateChange
      }
    });

    console.log(this.player);
    this.popup.style.display = 'flex';
    this.popup.classList.remove('fadeOut');
    this.popup.classList.add('animated', 'fadeInDown');
  }

  onPlayerStateChange(state) {
    try {
      const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
      const playBtn = this.activeBtn.querySelector('svg').cloneNode(true); // full copied node

      if (state.data === 0) {
        if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
          blockedElem.querySelector('.play__circle').classList.remove('closed');
          blockedElem.querySelector('svg').remove();
          blockedElem.querySelector('.play__circle').appendChild(playBtn);
          blockedElem.querySelector('.play__text').textContent = 'Play video';
          blockedElem.querySelector('.play__text').classList.remove('attention');
          blockedElem.setAttribute('data-disabled', 'false');

          blockedElem.style.cssText = `
            transition: all 2s ease-in-out;
            opacity: 1;
            filter: none;
          `;
        }
      }
    } catch(e) {}
  }

  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.bindTriggers();
      this.bindCloseTrigger();
    }
  }
}