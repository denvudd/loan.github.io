export default class Download {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
  }

  downloadItem(path) {
    const linkEl = document.createElement('a');

    linkEl.setAttribute('href', path);
    linkEl.setAttribute('download', this.path.slice(0, this.path.replace(/^\w+\//g, ''))); // cut to first "/"

    linkEl.style.display = 'none';
    document.body.appendChild(linkEl);

    linkEl.click();

    document.body.removeChild(linkEl);
  }

  init() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.path = btn.getAttribute('data-download');
        this.downloadItem(this.path);
      });
    });
  }
}