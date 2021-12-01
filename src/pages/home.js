import Footer from "../components/footer";
import Header from "../components/header";

class HomePage {
  constructor (){
    this.footer = new Footer().render();
    this.header = new Header().render();
  }
 
  render () {
    const root = document.querySelector('#root');
    let div = document.createElement('div');
    div.className = `home-wrapper`;
    root.append(div);
    div.innerHTML =
    ` 
      <main class="home-main">
        <div class="logo">
          <img class="logo-bg" src="./assets/svg/logo.svg" alt="Logo">
        </div>
        <a id="artists-categories" class="btn" href="#artists-categories">Artists quiz</a>
        <a id="pictures-categories" class="btn" href="#pictures-categories">Pictures quiz</a>
      </main>
    `
    div.prepend(this.header);
    div.append(this.footer);
  }
}
export default HomePage;