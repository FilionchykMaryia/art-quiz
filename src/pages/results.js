import QuestHeader from "../components/quest-header";
import Footer from "../components/footer";
import images from "../data/images";

class ResultsPage {
  constructor(id){
    this.categoryId = id;
    this.category = (id >= 1 && id <= 12) ? 'artists-categories' : 'pictures-categories';
    this.root = document.querySelector('#root');
    this.header = new QuestHeader(this.category).render();
    this.main = document.createElement('main');
    this.main.className  = 'result-page';
    this.main.onclick = this.showPictureInfo.bind(this);
    this.footer = new Footer().render();
    this.dataAnswers = JSON.parse(localStorage.getItem('answers'));//ответы свех категорий[categoryId-1]
    this.resultsData = this.dataAnswers[this.categoryId-1];
    this.data = [...images];
    this.categoryData = this.getResultData(this.categoryId);//массив правильных ответов в данной категории
  }

  getResultData(categoryId) {
    return this.data.slice((10*(categoryId-1)+1), (10*categoryId +1));
  }

  closePictureInfo(){
    let popup = document.querySelector('.popup');
    popup.classList.remove('active');
  }

  showPictureInfo(e){
    if(e.target.closest('.result-card')) {
      let id = e.target.id;
      let data = this.categoryData;
      let popup = document.querySelector('.popup');
      popup.classList.add('active');
      let resImg = document.querySelector('.result-img');
      resImg.src = `../data/img/${data[id].imageNum}.jpg`;
      let resAutor = document.querySelector('.result-author');
      resAutor.textContent = `${data[id].author}`;
      let resName = document.querySelector('.result-name');
      resName.textContent = `${data[id].name}`;
      let resYear = document.querySelector('.result-year');
      resYear.textContent = `${data[id].year}`;

      let indicator = document.querySelector('.indicator');
      indicator.style.display = 'none';
      let btn = document.querySelector('.btn-next');
      btn.textContent = 'Close';
      btn.onclick = this.closePictureInfo.bind(this);
    }
    else return false;
  }
  
  setBackgroundImage () {
    document.querySelector('.header').after(this.main);
    this.categoryData.map((item, i) => {
      if(this.resultsData[i] === 'false') {
        this.main.innerHTML +=`
        <div id="answer-${i}" class="card result-card" href="#answer">
          <img id="${i}" src="../data/img/${item.imageNum}.jpg" class="img grey"/>
        </div>
      `
      } 
      if(this.resultsData[i] === 'true') {
        this.main.innerHTML +=`
        <div id="answer-${i}" class="card result-card" href="#answer">
          <img id="${i}" src="../data/img/${item.imageNum}.jpg" class="img" />
        </div>
      `
      }
      if(!this.resultsData[i]) {
        this.main.innerHTML +=`
        <div id="answer-${i}" class="card result-card" href="#answer">
          <img id="${i}" src="../data/img/${item.imageNum}.jpg" class="img grey"/>
        </div>
      `
      }
    })
  }

  render() {    
    this.root.innerHTML = null;
    let div = document.createElement('div');
    div.className = `categories-wrapper`;
    this.root.append(div);
    div.append(this.header);
    div.append(this.footer);
    this.setBackgroundImage(); 
  }
}

export default ResultsPage;