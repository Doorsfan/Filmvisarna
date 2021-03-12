export default class Footer {
  render() {
    let footer = $(/*html*/ `
      <footer>
      <h2>Filmvisarna</h2>
      <h3>Abborrstigen 17<br>
      221 20 Småstad</h3>
      <p>Grupp 5, Java21v Plushögskolan Lund ©2021.</p>
      </footer>
    `);
    return footer;
  }
}