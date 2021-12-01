class Header {
  render() {
    let header =  document.createElement('header');
    header.className = `header`;
    header.innerHTML = `
      <div class="header-logo"></div>
      <a id="home" class="btn" href="/">Home</a>
      <a id="settings" href="#settings" class="settings-btn"></a>
    `
    return header;
  }
}
export default Header;