import { Mesh, Program, Texture } from 'ogl'
import fragment from 'shaders/plane-fragment.glsl'
import vertex from 'shaders/plane-vertex.glsl'

export default class {
    constructor({ element, gl, geometry, scene }) {
        this.element = element
        this.gl = gl
        this.scene = scene
        this.geometry = geometry
    }

    // createTexture () {
    //     const image = this.element
    
    //     this.texture = window.TEXTURES[image.getAttribute('data-src')]
    //   }
    
    // createProgram({ vertex,
    //     fragment,
    //     uniforms: {
    //         tMap: { value: this.texture }
    //      }
    // }) 

    // createMesh() {
    //     this.mesh = new Mesh(this.gl, {
    //         geometry: this.geometry,
    //         program: this.program
    //     })

    //     this.mesh.setParent(this.scene)
    // }
}