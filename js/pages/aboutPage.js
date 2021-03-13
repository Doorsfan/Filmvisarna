export default class AboutPage {
  constructor(movieTitle) {
    this.movie = movieTitle;
  }
  async read() {
    this.movies = await $.getJSON('/json/movies.json');
  }

  async createPage() {
    if (!this.movies) {
      await read();
    }

    let html = $(/*html*/ `
    <div class="video-trailer"></div>
    `);

    html.append(/*html*/ `
    <iframe width="420" height="315"
    src="https://www.youtube.com/embed/tgbNymZ7vqY">
    </iframe>
    `);
  }

  render() {
    return `${this.movie}<iframe width="420" height="315"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>`;
  }
}
