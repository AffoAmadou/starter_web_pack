import Page from "../../classes/Page";

import Button from "../../classes/Button";

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
    this.link = new Button({
      element: this.elements.link
    })
  }

  destroy(){
    super.destroy()
    this.link.removeEventListeners()
  }
}