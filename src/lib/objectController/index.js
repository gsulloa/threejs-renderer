import * as THREE from "three"
import { Tween, Easing } from "@tweenjs/tween.js"
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
  controlOption = undefined
  constructor({
    camera,
    object,
    scene,
    domElement,
    initial: { rotation, position } = {},
    attachments,
    callbacks: { updateDefaultOrbit },
  } = {}) {
    this.callbacks = {
      updateDefaultOrbit,
    }
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

    Config.orbit._position.subscribe(this.moveCamera)
    Config.orbit._rotation.subscribe(this.rotateObject)
  }

  mouseEventListener = ({ domElement }) => {
    domElement.addEventListener("mousedown", this.handleMouseDown)
    domElement.addEventListener("mousemove", this.handleMouseMove)
    domElement.addEventListener("mouseup", () => {
      this.controlOption = undefined
    })
    domElement.addEventListener("mousewheel", e => {
      e.preventDefault()
      Config.orbit.position = {
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
    if (navigator.userAgent.match(/(ipad|iphone)/i)) return null
    if (this.controlOption) {
      const deltaMove = this.deltaMove(e)
      switch (this.controlOption) {
        case CONTROL_OPTIONS.LEFT_CLICK: {
          this[Config.object.onMouseMove]({
            deltaMove,
          })
          break
        }
        case CONTROL_OPTIONS.MIDDLE_CLICK: {
          const { x, y } = deltaMove
          const { x: prevX, y: prevY, z } = this.camera.position
          Config.orbit.position = { x: -x + prevX, y: y + prevY, z }
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
    this.controlOption = CONTROL_OPTIONS.LEFT_CLICK
  }

  handleTouchMove = e => {
    const {
      touches: [{ clientX: offsetX, clientY: offsetY }],
    } = e
    const deltaMove = this.deltaMove({ offsetX, offsetY })
    switch (this.controlOption) {
      case CONTROL_OPTIONS.LEFT_CLICK: {
        this[Config.object.onMouseMove]({
          deltaMove,
        })
        break
      }
      default:
        break
    }
    this.previousMousePosition = {
      x: offsetX,
      y: offsetY,
    }
  }

  rotateObject = vector => {
    this.object.rotation.setFromVector3(vector)
    this.uptadeAttachmentsPosition()
  }
  rotate = ({ deltaMove, delta = 0.25 } = {}) => {
    const { object } = this
    const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        toRadians(deltaMove.y * delta),
        toRadians(deltaMove.x * delta),
        0,
        "XYZ",
      ),
    )
    const quaternion = object.quaternion.clone()
    quaternion.multiplyQuaternions(deltaRotationQuaternion, object.quaternion)
    const vector = new THREE.Euler().setFromQuaternion(quaternion)
    Config.orbit.rotation = {
      x: vector.x,
      y: vector.y,
      z: vector.z,
    }
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
        new THREE.Vector3().copy(attachment.reference.position),
      )
    })
    this.attachments.children.forEach((attachment, i) => {
      attachment.position.copy(positions[i])
    })
  }

  moveCamera = ({ x, y, z }) => {
    const { position } = this.camera
    if (
      [
        [x, position.x],
        [y, position.y],
        [z, position.z],
      ].every(([next, prev]) => next === prev)
    )
      return
    this.camera.position.x = x
    this.camera.position.y = y
    this.camera.position.z = z
  }

  move = ({ deltaMove }) => {
    console.log({ deltaMove })
    const { x, y } = deltaMove
    const { x: prevX, y: prevY, z } = this.camera.position
    Config.orbit.position = { x: -x + prevX, y: y + prevY, z }
  }

  look = ({ position: newPosition, rotation: newRotation } = {}) => {
    if (newPosition) this.smoothMoveCamera({ newPosition })
    if (newRotation) this.smoothRotateObjectTo({ newRotation })
  }
  smoothMoveCamera = ({ newPosition }) => {
    const positionCoords = { ...Config.orbit.position }
    new Tween(positionCoords)
      .to(newPosition, 1000)
      .easing(Easing.Quadratic.Out)
      .onUpdate(({ x, y, z }) => {
        Config.orbit.position = { x, y, z }
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
      {},
    )
    new Tween(rotationCords)
      .to(shortDistanceCords, 1000)
      .easing(Easing.Quadratic.Out)
      .onUpdate(({ x, y, z }) => {
        Config.orbit.rotation = { x, y, z }
      })
      .start()
  }

  resetControls = () => {
    this.look(this.initial)
  }

  updateInitial = ({ rotation, position }) => {
    this.initial = { rotation, position }
    if (this.callbacks.updateDefaultOrbit)
      this.callbacks.updateDefaultOrbit(this.initial)
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
        -(offsetY / domElementHeight) * 2 + 1,
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
