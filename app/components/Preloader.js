import Component from "../classes/Components";
import each from "lodash/each";
import GSAP from "gsap";

import { split } from "utils/text";

export default class Preloader extends Component {
    constructor() {
        super({
            element: '.preloader',
            elements: {
                title: '.preloader__text',
                number: '.preloader__number',
                numberText: '.preloader__number__text',
                images: document.querySelectorAll('img')
            }
        })


        //?/ ////////////due volte per creare du span
        //? /////////////////////////////////////////
        split({
            element: this.elements.title,
            expression: '<br>'
        })

        split({
            element: this.elements.title,
            expression: '<br>'
        })
        this.elements.titleSpans = this.elements.title.querySelectorAll('span span')
        //?/ /////////////////////////////////
        //? /////////////////////////////////////////


        this.length = 0 //! Per contare quante immagini ci sono 
        this.createLoader()
        // console.log(this.element, this.elements)

        // setTimeout ( _ =>{
        //     this.emit('completed')
        // },1000) //! Viene inviato al once 'completed' in index.js

    }

    //! Metodo che collleziona tutte le immagini presenti sulla pagina e le carica prima di mostrarla
    createLoader() {
        each(this.elements.images, element => {
            element.onload = _ => this.onAssetLoaded(element)
            element.src = element.getAttribute('data-src')
            // console.log(image)
        })
    }

    onAssetLoaded(image) {
        this.length += 1

        const percent = this.length / this.elements.images.length

        this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`

        if (percent === 1) {
            this.onLoaded()
        }
    }

    onLoaded() {
        return new Promise(resolve => {
            this.animateOut = GSAP.timeline({
                delay: 2
            })

            this.animateOut.to(this.elements.titleSpans, {
                duration: 1.5,
                ease: 'expo.out',
                stagger: 0.1,
                y: '100%',
            })

            this.animateOut.to(this.elements.numberText, {
                duration: 1.5,
                ease: 'expo.out',
                stagger: 0.1,
                y: '100%',
            }, '-=1.4')

            this.animateOut.to(this.element, {
                duration: 1.5,
                ease: 'expo.out',
                scaleY: 0,
                transformOrigin: '100% 100%',
            }, '-=1')

            this.animateOut.call(_ => {
                this.emit('completed')
            })
        })
    }

    destroy() {
        this.element.parentNode.removeChild(this.element)
    }
}