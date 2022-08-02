import Animation from "../classes/Animation";
import GSAP from 'gsap'
import { calculate, split } from "utils/text";
import each from "lodash/each";

export default class Highligth extends Animation {
    constructor({ element, elements }) {
        super({
            element,
            elements
        })
    }


    animateIn() {
        this.timelineIn = GSAP.timeline({
            delay: .5
        })

        this.timelineIn.fromTo(this.element, {
            scale: 1.2,
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            scale:1,
            ease:'expo.out',
            duration:1.5
        })
    }

    animateOut() {
        GSAP.set(this.element, {
            autoAlpha: 0
        })
    }

}