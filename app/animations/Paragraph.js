import Animation from "../classes/Animation";
import GSAP from 'gsap'
import { calculate, split } from "utils/text";
import each from "lodash/each";

export default class Paragraph extends Animation {
    constructor({ element, elements }) {
        super({
            element,
            elements
        })




        this.elementLinesSpans = split({ //!Guarda title
            element: this.element,
            append: true
        })


    }


    animateIn() {
        this.timelineIn = GSAP.timeline({
            delay: 0.5
        })

        this.timelineIn.set(this.element, {
            autoAlpha: 1
        })

        each(this.elementsLines, (line, index) => {

            this.timelineIn.fromTo(line, {
                autoAlpha: 0,
                y: "100%"
            }, {
                autoAlpha: 1,
                delay: index * 0.2,
                duration: 1.5,
                ease: 'expo.out',
                y: "0%"
            }, 0)//! per non aspettare che l'altra animazione finisca
        })
    }

    animateOut() {
        GSAP.set(this.element, {
            autoAlpha: 0
        })
    }

    onResize() {
        this.elementsLines = calculate(this.elementLinesSpans)
    }
}