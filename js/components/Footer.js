export default class Footer {
  render() {
    let footer = $(/*html*/ `
      <footer>
      <div class="footer-container">
        <div class="footer-column">
          <p class="footer-title">Social Media</p>
          <a href="#"class="footer-link">Twitter</a>
          <a href="#"class="footer-link">Instagram</a>
          <a href="#"class="footer-link">Facebook</a>
        </div>
        <div class="footer-column">
          <p class="footer-title">Gäster</p>
          <a href="#"class="footer-link">Boka film</a>
        </div>
        <div class="footer-column">
          <p class="footer-title">Medlemmar</p>
          <a href="#"class="footer-link">Logga in</a>
        </div>
      </div>
      <p class="footer-group">Grupp 5, Java21v Plushögskolan Lund ©2021.</p>      
      </footer>
    `);
    return footer;
  }
}
