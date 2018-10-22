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
  controlOption = undefined
  constructor({
    camera,
    object,
    domElement,
  } = {}) {
    domElement.addEventListener("mousedown", this.handleMouseDown)
    domElement.addEventListener("mousemove", e => this.handleMouseMove({ e, object, camera }))
    domElement.addEventListener("mouseup", () => { this.controlOption = undefined })
    domElement.addEventListener("mousewheel", e => {
      camera.position.z += Math.sign(e.deltaY) * 20
    })
  }

  deltaMove({ offsetX: currentX, offsetY: currentY }) {
    const { x: previousX, y: previousY } = this.previousMousePosition
    return {
      x: currentX - previousX,
      y: currentY - previousY
    }
  }

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

  handleMouseMove = ({ e, object, camera }) => {
    if (this.controlOption) {
      console.log(this)
      const deltaMove = this.deltaMove(e)
      switch (this.controlOption) {
        case CONTROL_OPTIONS.DRAGGING: {
          const deltaRotationQuaternion = new THREE.Quaternion()
          .setFromEuler(new THREE.Euler(
              toRadians(deltaMove.y * 0.5),
              toRadians(deltaMove.x * 0.5),
              0,
              'XYZ'
          ));
          object.quaternion.multiplyQuaternions(deltaRotationQuaternion, object.quaternion);
          break
        }
        case CONTROL_OPTIONS.MOVING: {
          camera.position.x -= deltaMove.x
          camera.position.y += deltaMove.y
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
}

export default ObjectController