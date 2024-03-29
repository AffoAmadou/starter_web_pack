import { Camera, Renderer, Transform} from 'ogl'



import Home from "./Home"

export default class Canvas {
    constructor() {
        this.createRenderer()
        this.createCamera()
        this.createScene()
        this.createHome()
        

    }

    createRenderer() {
        this.renderer = new Renderer({ alpha: true,
            antialias: true})

        this.gl = this.renderer.gl //continuare a renderizzare

        document.body.appendChild(this.gl.canvas)
    }

    createCamera() {
        this.camera = new Camera(this.gl)
        this.camera.position.z = 5

    }
    createScene() {
        this.scene = new Transform()
    }

    createHome() {
       this.home = new Home({
        gl: this.gl
       });
    }

    onResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.camera.perspective({
            aspect: window.innerWidth / window.innerHeight
        })
    }


    update() {
        this.renderer.render({
            camera: this.camera,
            scene: this.scene
        })
    }
}