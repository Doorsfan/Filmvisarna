export default class FrontPage{

  constructor(){
    this.time = new Date().toLocaleTimeString();
  }

  render(){
    return `
      <h1>Welcome to our humble web app.</h1>
      <p>This front page was rendered at ${this.time}</p>
    `
  }
}