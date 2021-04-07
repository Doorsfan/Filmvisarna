export default class Footer {
  render() {
    let footer = $(/*html*/ `
      <footer>
      <div class="footer-container">
        <div class="footer-column">
          <p class="footer-title">Social Media</p>
            <div class="footer-content">
              <a href="#"class="footer-link">Twitter <img src="../../images/twitter_icon.png"/></a>
              <a href="#"class="footer-link link-insta">Instagram<img src="../../images/insta_icon.png"/></a>
              <a href="#"class="footer-link link-fb">Facebook<img src="../../images/facebook_icon.webp"/></a>
            </div>
        </div>
        <div class="footer-column">
        <div></div>
          <p class="footer-title">Gäster</p>
          <a href="#bookingPage"class="footer-link">Boka film</a>
          <a href="#"class="footer-link">Frågor och svar</a>
          <a href="#"class="footer-link">Feedback</a>
          <a href="#"class="footer-link">Vårt mål</a>
        </div>
        <div class="footer-column">
        <div></div>
          <p class="footer-title">Medlemmar</p>
          <a href="#loginPage"class="footer-link">Logga in</a>
          <a href="#registerPage"class="footer-link">Bli medlem</a>
          <a href="#"class="footer-link">Nyheter</a>
          <a href="#"class="footer-link">Frågor</a>
        </div>
      </div>
      <p class="footer-group">Grupp 5, Java21v Plushögskolan Lund ©2021.</p>      
      </footer>
    `);
    return footer;
  }
}
