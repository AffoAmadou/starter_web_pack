import map from "lodash/map"
import { Plane, Transform } from "ogl"
import Media from "./Media"

export default class {
    constructor({gl}) {
        this.scene = new Transform()
        this.gl = gl
        this.medias = document.querySelectorAll('.home__gallery__media__image')

        this.createGeometry()
        this.createGallery()
    }

    createGeometry(){
        this.geometry = new Plane(this.gl)
    }

    createGallery() {
        map(this.medias, (element, index) => {
            return new Media({
                element,
                geometry: this.geometry,
                index,
                scene: this.scene
            })
        })
    }
}


