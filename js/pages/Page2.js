export default class Page2{

  constructor(){
    this.time = new Date().toLocaleTimeString();
  }

  render(){
    return /*html*/`
      <div>
        <h1>Page 2</h1>
        <p>This other page was rendered at ${this.time}</p>
      </div>
  `;
  }

}