class QuestHeader {
  constructor(category){
    this.category = category;
  }
  render() {
    let header =  document.createElement('header');
    header.className = `header`;
    header.innerHTML = `
      <div class="header-logo"></div>
      <a id="${this.category}" class="btn" href="#${this.category}">Categories</a>
      <a id="home" class="btn" href="/">Home</a> 
    `
    return header;
  }
}
export default QuestHeader;