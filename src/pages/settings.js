// import Header from "../components/header";
// import Footer from "../components/footer";

// class SettingsPage {
//   constructor(){
//     this.root = document.querySelector('#root');
//     // this.header = new Header().render();
//     this.main = document.createElement('main');
//     this.main.className  = 'categories-main';
//     // this.main.onclick = this.showPictureInfo.bind(this);
//     // this.footer = new Footer().render();
//     // this.isPlay = JSON.parse(localStorage.getItem('isPlay'));
//     this.progressVolume = document.querySelector('.progress-vol');
//     this.audio = document.querySelectorAll('audio');
//     this.progressVolume.onclick = this.handleVolume.bind(this);
//   }


//   handleVolume() {
    
//     let v = this.progressVolume.value;
//     console.log(v);
//     this.audio.volume = v / 100;
//     this.progressVolume.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${v}%, #999999 ${v}%, #999999 100%)`;
//   }




//   show(){

//   }
// }

// export default SettingsPage
