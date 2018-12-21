import * as THREE from "three"
import * as TWEEN from "@tweenjs/tween.js"
import { toRadians } from "../utils/radiansDegreesConverter"
import { useShortDistance } from "../utils/radiansNormalize"
import { devlogerror } from "../utils/log"
import Config from "../config"

const CONTROL_OPTIONS = {
  LEFT_CLICK: 1,
  MIDDLE_CLICK: 2,
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
        z: position.z,
      },
    }
  }
  controlOption = undefined
  constructor({
    camera,
    object,
    scene,
    domElement,
    initial: { rotation, position } = {},
    attachments,
  } = {}) {
    this.mouseEventListener({ domElement, camera })
    this.touchEventListener({ domElement, camera })

    this.initial = { rotation, position }
    this.camera = camera
    this.object = object
    this.model = object.children[0]
    this.scene = scene
    this.domElement = domElement
    this.spheres = []
    this.attachments = attachments
    this.resetControls()
    Config.orbit.position.suscribe(this.zoomObject)
  }

  mouseEventListener = ({ domElement }) => {
    domElement.addEventListener("mousedown", this.handleMouseDown)
    domElement.addEventListener("mousemove", this.handleMouseMove)
    domElement.addEventListener("mouseup", () => {
      this.controlOption = undefined
    })
    domElement.addEventListener("mousewheel", e => {
      e.preventDefault()
      Config.orbit.changePosition = {
        z: Config.orbit.position.z + Math.sign(e.deltaY) * 20,
      }
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
      y: currentY - previousY,
    }
  }

  /* MOUSE HANDLERS */

  handleMouseDown = e => {
    switch (e.button) {
      case MOUSE_CLICK.LEFT_CLICK:
        this.controlOption = CONTROL_OPTIONS.LEFT_CLICK
        break
      case MOUSE_CLICK.MIDDLE_CLICK:
        this.controlOption = CONTROL_OPTIONS.MIDDLE_CLICK
        break
      default:
        break
    }
  }

  handleMouseMove = e => {
    if (this.controlOption) {
      const deltaMove = this.deltaMove(e)
      const { object, camera, spheres } = this
      switch (this.controlOption) {
        case CONTROL_OPTIONS.LEFT_CLICK: {
          this[Config.object.onMouseMove]({
            deltaMove,
            object,
            spheres,
            camera,
          })
          break
        }
        case CONTROL_OPTIONS.MIDDLE_CLICK: {
          this.moveCamera({ deltaMove, camera })
          break
        }
        default:
          break
      }
    }
    this.previousMousePosition = {
      x: e.offsetX,
      y: e.offsetY,
    }
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
        break
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

  rotateObject = ({ deltaMove, object, delta = 0.25 } = {}) => {
    const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        toRadians(deltaMove.y * delta),
        toRadians(deltaMove.x * delta),
        0,
        "XYZ"
      )
    )
    object.quaternion.multiplyQuaternions(
      deltaRotationQuaternion,
      object.quaternion
    )
    this.uptadeAttachmentsPosition()
  }
  uptadeAttachmentsPosition = () => {
    const {
      object: {
        children: [
          {
            children: [model],
          },
        ],
      },
    } = this
    const positions = this.attachments.children.map(attachment => {
      return model.localToWorld(
        new THREE.Vector3().copy(attachment.reference.position)
      )
    })
    this.attachments.children.forEach((attachment, i) => {
      attachment.position.copy(positions[i])
    })
  }
  moveCamera({ deltaMove, camera }) {
    camera.position.x -= deltaMove.x
    camera.position.y += deltaMove.y
  }
  zoomObject = ({ z: value }) => {
    if (this.camera.position.z === value) return
    this.camera.position.z = value
  }

  look = ({ position: newPosition, rotation: newRotation }) => {
    this.smoothMoveCamera({ newPosition })
    this.smoothRotateObjectTo({ newRotation })
  }
  smoothMoveCamera = ({ newPosition }) => {
    const positionCoords = new THREE.Vector3().copy(this.camera.position)
    new TWEEN.Tween(positionCoords)
      .to(newPosition, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(({ x, y, z }) => {
        this.camera.position.set(x, y, z)
      })
      .start()
  }
  smoothRotateObjectTo = ({ newRotation: coords }) => {
    const rotationCords = new THREE.Vector3().copy(this.object.rotation)
    const shortDistanceCords = Object.entries(coords).reduce(
      (newCoords, [coord, val]) => {
        newCoords[coord] = useShortDistance(rotationCords[coord], val)
        return newCoords
      },
      {}
    )
    new TWEEN.Tween(rotationCords)
      .to(shortDistanceCords, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(vector => {
        this.object.rotation.setFromVector3(vector)
        this.uptadeAttachmentsPosition()
      })
      .start()
  }

  resetControls = () => {
    this.look(this.initial)
  }

  updateInitial = ({ rotation, position }) => {
    this.initial = { rotation, position }
  }

  getPositionInObject = ({
    offsetX,
    offsetY,
    domElementWidth,
    domElementHeight,
  }) => {
    try {
      const vector = new THREE.Vector2(
        (offsetX / domElementWidth) * 2 - 1,
        -(offsetY / domElementHeight) * 2 + 1
      )
      const { camera, model } = this
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(vector, camera)
      const intersects = raycaster.intersectObjects(model.children)
      if (intersects.length) {
        const [intersect] = intersects
        const { point, object } = intersect
        return object.worldToLocal(point)
      }
    } catch (e) {
      devlogerror(e)
    }
  }
}

export default ObjectController
