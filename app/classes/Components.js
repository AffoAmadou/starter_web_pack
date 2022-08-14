import each from 'lodash/each'
import GSAP from 'gsap'
import EventEmitter from 'events'

export default class Component extends EventEmitter {
  constructor({ element, elements }) //!elements é un oggetto
  {
    super(
        
    )
    this.selector = element
    this.selectorChildren = {
      ...elements
    }
   
    this.create()
    this.addEventListeners()
  }

  create() {

    if(this.selector instanceof window.HTMLElement){
      this.element = this.selector
    }else{
      this.element = document.querySelector(this.selector)
    }
    this.elements = {}

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
  }

  addEventListeners() { 
    

  }

  removeEventListeners() {
   
  }
}
