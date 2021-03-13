import ytSlider from '../components/ytCarousellHandler.js';

export default class StartPage {
  yt = new ytSlider();

  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }

  async render() {
    console.log('rendering StartPage');
    if (!this.movies) {
      await this.read();
    }

    this.html = $('<div class="poster-container"></div>');
    this.movies.forEach((data) => {
      this.html.append(/*html*/ `
          <div class="movie-poster ${data.id}">
            <a href="#"><img src="${data.images[0]}"></a>
          </div>
        `);
    });
    this.fis = this.yt.render(this.movies);
    console.log(this.fis.after(this.html));

    return this.fis.add(this.html);
  }
}
