import Component from "./Components";
import GSAP from 'gsap'

export default class Button extends Component {
    constructor({ element }) {
        super({ element })

        this.path = element.querySelector('path:last-child')

        this.timeline = GSAP.timeline({ paused: true })

        this.pathLength = this.path.getTotalLength()

        this.timeline.fromTo(this.path, {
            strokeDashoffset: this.pathLength,
            strokeDasharray: `${this.pathLength} ${this.pathLength}`
        }, {
            strokeDashoffset: 0,
            strokeDasharray: `${this.pathLength} ${this.pathLength}`
        })
    }

    onMouseEnter() {
        console.log("enter");
        this.timeline.play()
    }

    onMouseLeave() {
        console.log("leaveÌ");
        this.timeline.reverse()
    }

    addEventListeners() {
        this.onMouseEnterEvent = this.onMouseEnter.bind(this)
        this.onMouseLeaveEvent = this.onMouseLeave.bind(this)

        this.element.addEventListener('mouseenter', this.onMouseEnterEvent)
        this.element.addEventListener('mouseleave', this.onMouseLeaveEvent)

    }
    removeEventListeners() {
        this.element.removeEventListener('mouseenter', this.onMouseEnterEvent)
        this.element.removeEventListener('mouseleave', this.onMouseLeaveEvent)

    }
}