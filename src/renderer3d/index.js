import * as THREE  from "three"
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader"
import ObjectController from "./objectController"
class Renderer3D {
  constructor({
    container,
    initial = {},
    camera = {},
    ambientLight = {}
  }) {
    this.prepareEnvironment({ camera, ambientLight })

    this.loadModels({ initial })

    this.render({ container })
    
    window.addEventListener( 'resize', this.onWindowResize, false )
  }

  prepareEnvironment = ({
    camera: {
      fov = 50,
      aspect = window.innerWidth / window.innerHeight,
      near = 0.1,
      far = 2000,
      positionZ = 600
    } = {},
    ambientLight: {
      color = 0xffffff,
      intensity = 0.8
    } = {}
  }) => {
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this.camera.position.z = positionZ

    this.scene = new THREE.Scene()
    const ambientLight = new THREE.AmbientLight(color, intensity)
    this.scene.add(ambientLight)
    this.scene.add(this.camera)
  }

  loadModels = async ({ initial: {
      position = { x: 0, y: 0, z: 0 },
      rotation = { x: 0, y: 0, z: 0 },
    } = {}}) => {
    const loadMTL = () => new Promise((resolve, reject) => {
      new MTLLoader()
        .setPath( 'models/obj/abdomen/' )
        .load( 'ToraxAbdomen2.mtl', ( materials ) => {
          materials.preload()
          resolve(materials)
        }, () => {}, reject)
      })
    const loadOBJ = materials => new Promise((resolve, reject) => {
      new OBJLoader()
      .setMaterials(materials)
      .setPath('models/obj/abdomen/')
      .load('ToraxAbdomen2.obj', (object) => {
        resolve(object)
      }, function ( xhr ) {
        if ( xhr.lengthComputable ) {
          const percentComplete = xhr.loaded / xhr.total * 100
          console.log( Math.round( percentComplete, 2 ) + '% downloaded' )
        }
      }, () => reject("An error occurred loading de model") )
    })
    const materials = await loadMTL()
    const object = await loadOBJ(materials)
    this.object = object
    object.position.y = 0
    
    this.scene.add(object)
    this.objectController = new ObjectController({
      camera: this.camera,
      object: this.object,
      domElement: this.renderer.domElement,
      initial: {
        position,
        rotation,
      }
    })
  }

  render = ({ container }) => {
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    container.appendChild( this.renderer.domElement )
  }

  onWindowResize = () =>  {
    this.windowHalfX = window.innerWidth / 2
    this.windowHalfY = window.innerHeight / 2
    this.camera.updateProjectionMatrix()
  }
  
  animate = () => {
    requestAnimationFrame( this.animate )
    this.renderer.render( this.scene, this.camera )   
  }

  /* Controls */

  resetControls = () => {
    this.objectController.resetControls()
  }

  getCurrentPosition = () => {
    return this.objectController.currentPosition()
  }

  setNewInitialPosition = ({ rotation, position }) => {
    this.objectController.updateInitial({ rotation, position })
  }

  setCurrentAsInitial = () => {
    const { rotation, position } = this.getCurrentPosition()
    this.setNewInitialPosition({ rotation, position })
  }

  
}

export default Renderer3D
