import * as THREE  from "three"
import { toRadians } from "../utils/radiansDegreesConverter"

const CONTROL_OPTIONS = {
  DRAGGING: 1,
  MOVING: 2,
}

const MOUSE_CLICK = {
  LEFT_CLICK: 0,
  MIDDLE_CLICK: 1,
  RIGHT_CLICK: 2,
}

class ObjectController {
  static get previousMousePosition() {
    return {
      x: this.mousePosition ? this.mousePosition.x : 0,
      y: this.mousePosition ? this.mousePosition.y : 0,
    }
  }
  static set previousMousePosition({ x = 0, y = 0 } = {}) {
    this.mousePosition = { x, y }
  }

  currentPosition = () => {
    const { rotation } = this.object
    const { position } = this.camera
    return {
      rotation: {
        x: rotation.x,
        y: rotation.y,
        z: rotation.z,
      },
      position: {
        x: position.x,
        y: position.y,
        z: position.z
      },
    }
  }
  controlOption = undefined
  constructor({
    camera,
    object,
    domElement,
    initial: {
      rotation,
      position,
    } = {}
  } = {}) {
    
    this.mouseEventListener({ domElement, camera })
    this.touchEventListener({ domElement, camera })

    this.initial = { rotation, position }
    this.camera = camera
    this.object = object
    this.resetControls()
  }

  mouseEventListener = ({ domElement, camera }) => {
    domElement.addEventListener("mousedown", this.handleMouseDown)
    domElement.addEventListener("mousemove", this.handleMouseMove)
    domElement.addEventListener("mouseup", () => { this.controlOption = undefined })
    domElement.addEventListener("mousewheel", e => {
      e.preventDefault()
      this.zoomObject({ value: e.deltaY, camera })
    })
  }

  touchEventListener = ({ domElement }) => {
    domElement.addEventListener("touchstart", this.handleTouchStart)
    domElement.addEventListener("touchmove", this.handleTouchMove)
  }


  deltaMove({ offsetX: currentX, offsetY: currentY }) {
    const { x: previousX, y: previousY } = this.previousMousePosition
    return {
      x: currentX - previousX,
      y: currentY - previousY
    }
  }

  /* MOUSE HANDLERS */

  handleMouseDown =  (e) => {
    switch (e.button) {
      case MOUSE_CLICK.LEFT_CLICK:
        this.controlOption = CONTROL_OPTIONS.DRAGGING
        break
      case MOUSE_CLICK.MIDDLE_CLICK:
        this.controlOption = CONTROL_OPTIONS.MOVING
        break
      default:
        break;
    }
  }

  handleMouseMove = e => {
    if (this.controlOption) {
      const deltaMove = this.deltaMove(e)
      const { object, camera } = this
      switch (this.controlOption) {
        case CONTROL_OPTIONS.DRAGGING: {
          this.rotateObject({ deltaMove, object })
          break
        }
        case CONTROL_OPTIONS.MOVING: {
          this.moveCamera({ deltaMove, camera })
          break
        }
        default:
          break
      }
    }
    this.previousMousePosition = {
      x: e.offsetX,
      y: e.offsetY
    };
  }

  /* TOUCH HANDLERS */

  handleTouchStart = e => {
    const touch = e.touches[0]
    this.previousMousePosition = { x: touch.clientX, y: touch.clientY }
    switch (e.touches.length) {
      case 1:
        this.controlOption = CONTROL_OPTIONS.DRAGGING
        break
      case 2:
        this.controlOption = CONTROL_OPTIONS.MOVING
        break
      default:
        break;
    }
  }

  handleTouchMove = e => {
    const { object, camera } = this
    switch (this.controlOption) {
      case CONTROL_OPTIONS.DRAGGING: {
        e.preventDefault()
        const touch = e.touches[0]
        const touchPosition = { offsetX: touch.clientX, offsetY: touch.clientY }
        const deltaMove = this.deltaMove(touchPosition)
        this.rotateObject({ deltaMove, object })
        this.previousMousePosition = { x: touch.clientX, y: touch.clientY }
        break
      }
      case CONTROL_OPTIONS.MOVING: {
        e.preventDefault()
        const touch = e.touches[0]
        const touchPosition = { offsetX: touch.clientX, offsetY: touch.clientY }
        const deltaMove = this.deltaMove(touchPosition)
        this.moveCamera({ deltaMove, camera })
        this.previousMousePosition = { x: touch.clientX, y: touch.clientY }
        break
      }
      default: 
        break
    }
  }

  rotateObject({ deltaMove, object }){
    const deltaRotationQuaternion = new THREE.Quaternion()
    .setFromEuler(new THREE.Euler(
        toRadians(deltaMove.y * 0.5),
        toRadians(deltaMove.x * 0.5),
        0,
        'XYZ'
    ));
    object.quaternion.multiplyQuaternions(deltaRotationQuaternion, object.quaternion);
  }
  moveCamera({ deltaMove, camera }) {
    camera.position.x -= deltaMove.x
    camera.position.y += deltaMove.y
  }
  zoomObject({ value, camera }) {
    camera.position.z += Math.sign(value) * 20
  }

  look = ({ position, rotation }) => {
    this.object.rotation.set(rotation.x, rotation.y, rotation.z, "XYZ")
    this.camera.position.set(position.x, position.y, position.z)
  }

  resetControls = () => {
    this.look(this.initial)
  }

  updateInitial = ({ rotation, position }) => {
    this.initial = { rotation, position}
  }
}

export default ObjectController