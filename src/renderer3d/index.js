import * as THREE  from "three"
import ModelLoader from "./modelLoader"
import ObjectController from "./objectController"
import AttachmentsController from "./attachmentsController";
class Renderer3D {
  constructor({
    container,
    initial = {},
    camera = {},
    ambientLight = {}
  }) {
    this.prepareEnvironment({ camera, ambientLight })

    this.loadModel({ initial })

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

    this.renderer = new THREE.WebGLRenderer()
  }

  loadModel = async ({
    initial: {
      position = { x: 0, y: 0, z: 0 },
      rotation = { x: 0, y: 0, z: 0 },
    } = {}
  }) => {
    const object = await new ModelLoader().load()
    this.object = object
    object.position.y = 0
    
    this.scene.add(object)
    this.attachments = new THREE.Group()
    this.scene.add(this.attachments)
    this.attachmentsController = new AttachmentsController({
      model: this.object.children[0],
      attachments: this.attachments,
    })

    this.objectController = new ObjectController({
      camera: this.camera,
      scene: this.scene,
      object: this.object,
      domElement: this.renderer.domElement,
      initial: {
        position,
        rotation,
      },
      attachments: this.attachments
    })
    this.renderer.domElement.addEventListener("click", this.handleMouseClick)
  }

  render = ({ container }) => {
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

  
  handleMouseClick = e => {
    const position = this.objectController.getPositionInObject({
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      domElementHeight: this.renderer.domElement.height,
      domElementWidth: this.renderer.domElement.width 
    })
    this.attachmentsController.addSphere(position)
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
    console.log(position)
  }

  
}

export default Renderer3D
