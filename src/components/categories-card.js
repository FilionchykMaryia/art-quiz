import Quiz from "../pages/quiz";
import ResultsPage from "../pages/results";

class CategoriesCard {
  constructor(from, to){
    this.index = 1;
    this.from = from;
    this.to = to;
    this.main = document.createElement('main');
    this.main.onclick = this.handleCategoryCard.bind(this); 
  }

  asyncImage(val) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = `../data/img/${val}.jpg`;
      img.dataset.id = val;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Could not load image: ${val}`));
    });
  }

  isImageLoaded(img) {
    if (!img.complete) return false;
    if (img.naturalWidth + img.naturalHeight === 0) return false;
    return true;
  } 
  
  setBackgroundImage = async (val) => {
    let img = await this.asyncImage(val);
    document.querySelector('.header').after(this.main);
    this.main.className = `categories-main`;
    let id = await img.dataset.id;
    let i = this.index.toString().padStart(2, '0');
    let points = this.calcPoints(+id -1);
    points.toString().padStart(2, '0');

    if(points == 0) {
      this.main.innerHTML +=`
      <a id="${id}" class="card" href="#quiz">
        <div class="card-title">
          <span class="card-number">${i}</span>
          <span class="card-score">${points}/10</span>
        </div>
        <img src="${img.src}" class="img grey"/>
      </a>
    `
    } else {
      this.main.innerHTML +=`
      <a id="${id}" class="card" href="#quiz">
        <div class="card-title">
          <span class="card-number">${i}</span>
          <span class="card-score">${points}/10</span>
        </div>
        <img src="${img.src}" class="img" />
        <button id="btn-${id}" class="score-btn"></button>
      </a>
    `
    }
    this.index += 1;
    id += 1;
  }

  calcPoints(id){
    let points = 0;
    let data = JSON.parse(localStorage.getItem('answers'));
    data[id].map(item => {
      if(item === 'true') points += 1;
    })
    return points;
  }

  render (){
    for(let i = this.from; i <= this.to; i++){
      this.setBackgroundImage(i); 
    }  
    
  }

  handleCategoryCard(e){
    let target = e.target;
    if(e.target.closest('.card')){
      let card = e.target.closest('.card');
      let id = card.id;
      if(card) new Quiz(id).render();
    } 
    if(target.className =='score-btn') {
      let btn = e.target.closest('.score-btn');
      let id = btn.id.split('-');
      if(btn) new ResultsPage(+id[1]).render();
    } 
    
    else return false;
  }

  

}
export default CategoriesCard