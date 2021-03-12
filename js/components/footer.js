
export default class Footer {
  render() {
    let footer = $(/*html*/ `
      <footer>
      <h2>Filmvisarna</h2>
      <h3>Abborrstigen 17<br>
      220 20 Lund</h3>
      <p>Grupp 5, Java21v Plushögskolan Lund ©2020.</p>
      </footer>
    `);
    return footer;
  }
}