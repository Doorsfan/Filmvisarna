import ytSlider from '../components/ytCarousellHandler.js';

export default class StartPage {
  constructor() {
    this.yt = new ytSlider();
  }

  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }

  //ugly code
  async render() {
    console.log('rendering StartPage');
    if (!this.movies) {
      await this.read();
    }
    let bigDiv = $(/*html*/ `<div class="big-container"></div>`);
    let html = $('<div class="poster-container"></div>');
    this.movies.forEach((data) => {
      html.append(/*html*/ `
          <div class="start-poster ${data.id}">
            <a href="#"><img src="${data.images[0]}"></a>
          </div>
        `);
    });

    let ytSlider = this.yt.render(this.movies);
    console.log(html);
    let startP = ytSlider.add(html);
    console.log(ytSlider);

    return bigDiv.append(startP);
  }
}
