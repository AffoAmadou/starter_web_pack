import each from 'lodash/each'
import map from 'lodash/map'

import GSAP from 'gsap'
import Prefix from 'prefix'
import normalizeWheel from 'normalize-wheel'

import Title from '../animations/Title'
import Paragraph from '../animations/Paragraph'
import Label from '../animations/Label'

import { ColorsManager } from '../classes/Colors'

import AsyncLoad from './AsyncLoad'

export default class Page {
  constructor({ id, element, elements = {}, }) //!elements é un oggetto
  {
    this.selector = element
    this.selectorChildren = {
      ...elements,
      animationTitles: '[data-animation="title"]',
      animationsParagraphs: '[data-animation="paragraph"]',
      animationsLabels: '[data-animation="label"]',
      animationsHighlights: '[data-animation="highlight"]',
      preloaders: '[data-src]'

    }

    this.id = id

    this.transformPrefix = Prefix('transform')

    // this.scroll = {
    //   current: 0, //! DOVE SONO ORA
    //   target: 0, //!DOVE ARRIVO
    //   last: 0, //!DOVE MI SONO FERMATO
    //   limit:
    // }

    this.onMouseWheelEvent = this.onMouseWheel.bind(this)
  }

  create() {

    this.element = document.querySelector(this.selector)
    this.elements = {}

    this.scroll = {
      current: 0, //! DOVE SONO ORA
      target: 0, //!DOVE ARRIVO
      last: 0, //!DOVE MI SONO FERMATO
      limit: 0
    }

    each(this.selectorChildren, (entry, key) => {  //!loadash import
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry))//!Controllo se é un elemento del dom
      {
        this.elements[key] = entry
      }
      else { //!senno é una lista node che trsformo in elemento semplice
        this.elements[key] = this.element.querySelectorAll(entry)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })

    this.createAnimations()
    this.createPreloader()
  }

  createAnimations() {
    this.animations = []

    //!TITLES
    this.animationsTitles = map(this.elements.animationTitles, element => {
      return new Title({
        element
      })

    })

    this.animations.push(...this.animationsTitles)

    //!PARAGRAPH
    this.animationsParagraphs = map(this.elements.animationsParagraphs, element => {
      return new Paragraph({
        element
      })

    })

    this.animations.push(...this.animationsParagraphs)

    //!LABEL
    this.animationsLabels = map(this.elements.animationsLabels, element => {
      return new Label({
        element
      })

    })


    this.animations.push(...this.animationsLabels)

    //!HIGHLIGHTS
    this.animationsHighlights = map(this.elements.animationsHighlights, element => {
      return new Label({
        element
      })

    })


    this.animations.push(...this.animationsHighlights)
  }

  createPreloader() {
    this.preloaders = map(this.elements.preloaders, element => {
      return new AsyncLoad({ element })
    })
  }

  show() { //!ANIMAZIONE DI ENTRATA
    return new Promise(resolve => {

      ColorsManager.change({
        backgroundColor: this.element.getAttribute('data-background'),
        color: this.element.getAttribute('data-color'),

      })
      this.animationIn = GSAP.timeline()
      console.log("colore")
      this.animationIn.fromTo(this.element, {
        autoAlpha: 0
      }, {
        autoAlpha: 1,
      })

      this.animationIn.call(_ => {
        this.addEventListeners()
        resolve()
      })
    })
  }

  hide() {
    return new Promise(resolve => {
      this.destroy()

      this.animationOut = GSAP.timeline()

      this.animationOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }

  destroy() {
    this.removeEventListeners()
  }
  //* smoothscroll 
  onMouseWheel(event) {


    const { pixelY } = normalizeWheel(event)

    this.scroll.target += pixelY
  }

  onResize() {
    if (this.elements.wrapper) {
      this.scroll.limit = this.elements.wrapper.clientHeight - window.innerHeight
    }

    each(this.animations, animation => animation.onResize())
  }

  update() {
    this.scroll.target = GSAP.utils.clamp(0, this.scroll.limit, this.scroll.target)//! Target non sara mmai piu grande di limit e piu piccolo di zerp cosi da non avee uno scroll storto



    this.scroll.current = GSAP.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0
    }

    if (this.elements.wrapper) {
      this.elements.wrapper.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`
    }
  }

  addEventListeners() {
    window.addEventListener('mousewheel', this.onMouseWheelEvent)
  }

  removeEventListeners() {
    window.removeEventListener('mousewheel', this.onMouseWheelEvent)
  }

}
