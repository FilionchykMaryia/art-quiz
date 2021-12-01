import QuestHeader from "../components/quest-header";
import Footer from "../components/footer";
import images from "../data/images";
import { getRandomNum, shuffle } from "../helpers";
import ArtistsCategories from "./artists-categories";
import PicturesCategories  from "./pictures-categories";

class Quiz {
  constructor(id) {
    this.categoryId = id;
    this.category = (id >= 1 && id <= 12) ? 'artists-categories' : 'pictures-categories';
    this.root = document.querySelector('#root');
    this.header = new QuestHeader(this.category).render();
    this.main = document.createElement('main');
    this.main.className  = 'quest';
    this.main.onclick = this.showPopup.bind(this);
    this.footer = new Footer().render();
    this.data = [...images];
    this.categoryData = this.getCategoryData(this.categoryId);
    this.questId = 0;
    this.answers = this.setAnswers(this.questId);
    this.dataAnswers = JSON.parse(localStorage.getItem('answers'));
    this.continueBtn = document.querySelector('#continue');
    this.continueBtn.onclick = this.handleContinueBtn.bind(this);
  }

  getDataAnswers() {
    this.dataAnswers = JSON.parse(localStorage.getItem('answers'));
  }

  setDataAnswers() {
    localStorage.setItem('answers', JSON.stringify(this.dataAnswers));
  }

  getCategoryData(id) {
    return this.data.slice((10*(id-1)+1), (10*id +1));
  }

  setAnswers(questId) {
    let answersVar = [this.categoryData[questId]];
    while(answersVar.length < 4){
      let i = getRandomNum(0, 240)
      let mistakeAnswer = this.data[i];
      if((mistakeAnswer.imageNum !== answersVar[0].imageNum) && (mistakeAnswer.author !== answersVar[0].author)) {
        answersVar.push(mistakeAnswer);
      }
    }
    return answersVar;
  }

  getNextQuest() {
    let popup = document.querySelector('.popup');
    this.questId +=1;
    popup.classList.remove('active');
    if(this.questId === 10) {
      this.showResultPopup() 
    } else {
      this.answers = this.setAnswers(this.questId);
      (this.category === 'artists-categories') ? this.getArtistsQuest() : this.getPicturesQuest();
    }
  }

  calcPoints(){
    let points = 0;
    this.dataAnswers[+this.categoryId-1].map(item => {
      if(item === 'true') points += 1;
    })
    return points;
  }

  showResultPopup() {
    let points = this.calcPoints();
    let result, phrase;
    if(points > 0) {
      result = 'win';
      phrase = 'Congratulations!';
    } else if (points === 10){
      result = 'stars';
      phrase = 'Grand result!';
    } else if (points === 0) {
      result = 'game-over';
      phrase = 'Game over';
    }
  
    let rightAnswers = points.toString().padStart(2, '0');
    let popup = document.querySelector('#popup');
    popup.classList.add('active');
    let resImg = document.querySelector('#res');
    resImg.src = `../assets/svg/${result}.svg`;
    let resPhrase = document.querySelector('#phrase');
    resPhrase.textContent = `${phrase}`;
    let score = document.querySelector('#score');
    score.textContent = `${rightAnswers}/10`;

  }

  handleContinueBtn() {
    let popup = document.querySelector('#popup');
    popup.classList.remove('active');
    (this.category === 'artists-categories') ? new ArtistsCategories().render() : new PicturesCategories().render();
  }

  showPopup(e) {
    if(e.target.closest('.answer')) {
      let data = this.categoryData;
      let popup = document.querySelector('.popup');
      popup.classList.add('active');
      let resImg = document.querySelector('.result-img');
      resImg.src = `../data/img/${data[this.questId].imageNum}.jpg`;
      let resAutor = document.querySelector('.result-author');
      resAutor.textContent = `${data[this.questId].author}`;
      let resName = document.querySelector('.result-name');
      resName.textContent = `${data[this.questId].name}`;
      let resYear = document.querySelector('.result-year');
      resYear.textContent = `${data[this.questId].year}`;

      let indicator = document.querySelector('.indicator');
      document.querySelector('.btn-next').onclick = this.getNextQuest.bind(this);
      
      let answer = e.target.closest('.answer');
      let id = answer.id;
    
      if (id === this.answers[0].imageNum) {
        this.dataAnswers[+this.categoryId-1][this.questId] = 'true';
        indicator.classList.remove('mistake')
        indicator.classList.add('right')
        this.setDataAnswers();
      } else {
        this.dataAnswers[+this.categoryId-1][this.questId] = 'false';
        indicator.classList.remove('right')
        indicator.classList.add('mistake')
        this.setDataAnswers();
      }
      this.getDataAnswers();
      
    }
    else return false;
  }
 
  getArtistsQuest() {
    let data = this.categoryData;
    let answers = shuffle(this.answers);

    this.header.after(this.main);
    this.main.innerHTML =`
      <div class="quest-title">Кто автор данной картины?</div>
      <img class="picture" src="../data/img/${data[this.questId].imageNum}.jpg" alt="picture">
      <ul class="dots">
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
      </ul>
      <ul class="answers">
        <li id="${answers[0].imageNum}" class="answer btn">${answers[0].author}</li>
        <li id="${answers[1].imageNum}" class="answer btn">${answers[1].author}</li>
        <li id="${answers[2].imageNum}" class="answer btn">${answers[2].author}</li>
        <li id="${answers[3].imageNum}" class="answer btn">${answers[3].author}</li>
      </ul>
    `
    this.fillDots();  
  }

  getPicturesQuest() {
    let data = this.categoryData;
    let shuffleAnswers = shuffle(this.answers);    
    this.header.after(this.main);
    this.main.innerHTML =`
      <div class="quest-title">Какую из этих картин написал ${this.answers[0].author}?</div>
      <ul class="picture-answers">
        <li id="${shuffleAnswers[0].imageNum}" class="answer picture item">
          <img class="picture-answ" src="../data/img/${shuffleAnswers[0].imageNum}.jpg" alt="picture">
        </li>
        <li id="${shuffleAnswers[1].imageNum}" class="answer picture item">
          <img class="picture-answ" src="../data/img/${shuffleAnswers[1].imageNum}.jpg" alt="picture">
        </li>
        <li id="${shuffleAnswers[2].imageNum}" class="answer picture item">
          <img class="picture-answ" src="../data/img/${shuffleAnswers[2].imageNum}.jpg" alt="picture">
        </li>
        <li id="${shuffleAnswers[3].imageNum}" class="answer picture item">
          <img class="picture-answ" src="../data/img/${shuffleAnswers[3].imageNum}.jpg" alt="picture">
        </li>
      </ul>
      <ul class="dots">
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
        <li class="dot"></li>
      </ul>
    `
    this.fillDots();  
  }

  fillDots(){
    let dot = document.querySelectorAll('.dot');
    for(let i = 0; i<= dot.length; i++){
      if(this.dataAnswers[+this.categoryId-1][i] === 'true') {
        dot[i].classList.add('fill')
      } else false;
    }
  } 

  render() {    
    this.root.innerHTML = null;
    let div = document.createElement('div');
    div.className = `categories-wrapper`;
    this.root.append(div);
    div.append(this.header);
    (this.category === 'artists-categories') ? this.getArtistsQuest() : this.getPicturesQuest();
    div.append(this.footer);
  }
}
export default Quiz;