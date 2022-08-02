import Page from "../../classes/Page";

export default class Home extends Page {
  constructor() {
    super({
      id: 'home', //!Passo alla classe page l'id
      element: '.home',
      elements: {
        navigation: document.querySelector('.navigation'),
        link: '.home__link'
      } //!passo tutti gli elementi .home visto che iniziano tutti cosi
    })
  }
  create() {
    super.create()

    this.elements.link.addEventListener('click', _ => console.log('BITCH'))
  }
}