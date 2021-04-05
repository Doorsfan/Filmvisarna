export default class Footer {
  render() {
    let footer = $(/*html*/ `
      <footer>
      <div class="footer-container">
        <div class="footer-column">
          <p>TEST</p>
        </div>
        <div class="footer-column">
          <p>TEST</p>
        </div>
        <div class="footer-column">
          <p>TEST</p>
        </div>
      </div>
      <p class="footer-group">Grupp 5, Java21v Plushögskolan Lund ©2021.</p>      
      </footer>
    `);
    return footer;
  }
}
