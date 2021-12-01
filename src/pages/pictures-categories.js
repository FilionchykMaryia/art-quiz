import Header from "../components/header";
import Footer from "../components/footer";
import CategoriesCard from "../components/categories-card";

class PicturesCategories {
  
  constructor(){
    this.header = new Header().render();
    this.footer = new Footer().render();
    this.categories = new CategoriesCard(13, 24).render();
  }
  
  render(){
    const root = document.querySelector('#root');
    root.innerHTML = null;
    let div = document.createElement('div');
    div.className = `categories-wrapper`;
    root.append(div);
    div.append(this.header);
    div.append(this.footer);
  }
  
}
export default PicturesCategories;