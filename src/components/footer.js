class Footer {
  render() {
    let footer =  document.createElement('footer');
    footer.className = `footer`;
    footer.innerHTML = `
      <div><a class="rsschool" href="https://rs.school/js/"></a></div>
      <div>©2021</div>
      <div><a href="https://github.com/FilionchykMaryia">Filionchyk Maria</a></div>
    `
    return footer;
  }
}
export default Footer;