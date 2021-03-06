import * as THREE from "three"
import { v4 as uuidGen } from "uuid"
import Config from "../config"
import { devlogerror } from "../utils/log"
import font from "../assets/font/font"
import config from "../config"

class AttachmentsController {
  constructor({
    model,
    camera,
    attachments,
    initialAttachments = [],
    domElement,
    callbacks: {
      addAttachment,
      removeAttachment,
      updateAttachmentData,
      updateAttachmentDefaultScreen,
      updateAttachmentPosition,
    },
  } = {}) {
    this.id = this.number()
    this._id = this.number()
    this.callbacks = {
      addAttachment,
      removeAttachment,
      updateAttachmentData,
      updateAttachmentDefaultScreen,
      updateAttachmentPosition,
    }
    this.textureFont = new THREE.FontLoader().parse(font)
    this.model = model
    this.camera = camera
    this.attachments = attachments
    this.domElement = domElement
    initialAttachments.forEach(a => this.addSphere(a, false))
    const initialRatio = Math.round(window.devicePixelRatio * 100) / 100
    let ratio = 1
    window.addEventListener("resize", () => {
      ratio = Math.round(window.devicePixelRatio * 100) / 100 / initialRatio
    })
    document.addEventListener("mousemove", ({ offsetX, offsetY }) => {
      this.setHovereds({
        offsetX: offsetX / ratio,
        offsetY: offsetY / ratio,
      })
    })
    Config.attachment._visibility.subscribe(this.updateVisible)
    Config.attachment._showImages.subscribe(() => this.updateVisible(undefined))
  }

  get hovereds() {
    return this.filterByState("hovered")
  }
  get selecteds() {
    return this.filterByState("selected")
  }

  filterByState = state => {
    return [
      ...this.attachments.children.filter(
        attachment => attachment.state === state,
      ),
      ...this.attachments.children
        .map(({ reference }) => reference)
        .filter(attachment => attachment.state === state),
    ]
  };

  *number() {
    let n = 0
    while (true) {
      yield n
      n += 1
    }
  }
  findAttachmentIndex = model =>
    this.attachments.children.findIndex(a => a === model)

  addAttachment = ({ position, model }) => {
    if (position && model) {
      let { x, y, z } = position
      const geometry = new THREE.SphereGeometry(1, 64, 64)

      const { material } = Config.attachment
      const transparentModel = new THREE.Mesh(geometry, material.default)
      transparentModel.visible = false
      transparentModel.position.copy({ x, y, z })
      transparentModel.data = model.data
      transparentModel.state = model.state
      transparentModel.isTransparentModel = true

      this.model.add(transparentModel)
      const number = this._id.next().value
      const textMaterial = new THREE.MeshBasicMaterial({
        color: "red",
        transparent: true,
      })
      const textShapes = this.textureFont.generateShapes(String(number + 1), 10)
      const textGeometry = new THREE.ShapeBufferGeometry(textShapes)
      const text = new THREE.Mesh(textGeometry, textMaterial)

      text.position.copy({ x, y, z })
      text.rotateX(Math.PI / 2)
      text.rotateZ(Math.PI)
      text.visible = false
      transparentModel.text = text
      this.model.add(text)

      const worldPosition = new THREE.Vector3().copy(
        this.model.localToWorld(new THREE.Vector3(x, y, z)),
      )
      model.position.copy(worldPosition)
      model.reference = transparentModel
      transparentModel.reference = model
      this.attachments.add(model)
      this.updateVisible(Config.attachment.visibility, [model])
      return model
    }
  }
  addSphere = (
    {
      position,
      data = {
        title: "Change me!",
        content: "Change me description!",
        screenPosition: { ...Config.orbit },
      },
      id = uuidGen(),
    },
    withCallback = true,
  ) => {
    const { scale, material } = Config.attachment
    const radius = 1
    const segments = 32
    const geometry = new THREE.CircleGeometry(radius, segments, segments)
    const sphere = new THREE.Mesh(geometry, material.default)
    const inner = new THREE.Mesh(
      new THREE.CircleGeometry(radius * 0.85, segments, segments),
      material.black,
    )
    sphere.add(inner)
    sphere.scale.set(scale, scale, scale)
    sphere.data = data
    sphere.siblingReferenceId = id
    sphere.state = "default"
    this.addNumber({ model: sphere })
    if (withCallback && this.callbacks.addAttachment && position)
      this.callbacks.addAttachment({ ...sphere.data, position })
    return this.addAttachment({ position, model: sphere })
  }

  addNumber({ model } = {}) {
    if (!model) return
    const { data: { type = "text" } = {} } = model
    if (type !== "text") return this.addSprite({ model, type })
    const number = this.id.next().value
    const textMaterial = new THREE.MeshBasicMaterial({
      color: "white",
      transparent: true,
    })
    const textShapes = this.textureFont.generateShapes(String(number + 1), 1)
    const textGeometry = new THREE.ShapeBufferGeometry(textShapes)
    const text = new THREE.Mesh(textGeometry, textMaterial)
    text.position.x -= 0.5 * String(number + 1).length
    text.position.y -= 0.5
    model.add(text)
  }
  addSprite({ model, type } = {}) {
    if (type === "image") {
      const spriteMap = new THREE.TextureLoader().load(
        require("../assets/icons/camera.png"),
      )
      const spriteMaterial = new THREE.SpriteMaterial({
        map: spriteMap,
        color: 0xffffff,
      })
      const sprite = new THREE.Sprite(spriteMaterial)
      model.add(sprite)
      return
    }
  }

  replaceAllNumbers = () => {
    this.id = this.number()
    this.attachments.children.forEach(attachment => {
      const [, number] = attachment.children
      attachment.remove(number)
      this.addNumber({ model: attachment })
    })
  }

  intersectAttachments = ({ offsetX, offsetY }) => {
    const domElementHeight =
      (this.domElement.height * 100) / Math.round(window.devicePixelRatio * 100)
    const domElementWidth =
      (this.domElement.width * 100) / Math.round(window.devicePixelRatio * 100)
    try {
      const { camera, attachments } = this
      const vector = new THREE.Vector2(
        (offsetX / domElementWidth) * 2 - 1,
        -(offsetY / domElementHeight) * 2 + 1,
      )
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(vector, camera)
      const intersects = raycaster.intersectObjects([
        ...attachments.children,
        ...attachments.children.map(({ reference }) => reference),
      ])
      return intersects
    } catch (e) {
      devlogerror(e)
    }
  }

  setHovereds = ({ offsetX, offsetY }) => {
    const intersects = this.intersectAttachments({
      offsetX,
      offsetY,
    })
    if (intersects.length) {
      const [{ object }] = intersects
      if (object.state !== "selected") {
        object.material = Config.attachment.material.hovered
        object.state = "hovered"
      }
    } else {
      this.hovereds.forEach(attachment => {
        attachment.state = "default"
        attachment.material = Config.attachment.material.default
      })
    }
  }

  selectAttachment = ({ offsetX, offsetY }) => {
    const intersects = this.intersectAttachments({
      offsetX,
      offsetY,
    })
    if (intersects.length) {
      const [{ object }] = intersects
      switch (object.state) {
        case "hovered": {
          this.selectObject(object)
          return object
        }
        case "selected": {
          this.deselectObjects()
          return undefined
        }
        default:
          break
      }
    }
    return null
  }

  updateScreenPosition = () => {
    this.selecteds.forEach(attachment => {
      const { position, rotation } = Config.orbit
      attachment.data.screenPosition = { position, rotation }
      if (this.callbacks.updateAttachmentDefaultScreen)
        this.callbacks.updateAttachmentDefaultScreen(
          this.findAttachmentIndex(attachment),
          attachment.data.screenPosition,
        )
    })
  }

  removeSelectedAttachment = () => {
    this.selecteds.forEach(attachment => {
      const [transparent, withNumber] = attachment.isTransparentModel
        ? [attachment, attachment.reference]
        : [attachment.reference, attachment]
      if (this.callbacks.removeAttachment)
        this.callbacks.removeAttachment(this.findAttachmentIndex(withNumber))
      this.model.remove(transparent)
      this.attachments.remove(withNumber)
    })
  }

  replaceSelected = vector => {
    this.selecteds.forEach(attachment => {
      const [transparent, withNumber] = attachment.isTransparentModel
        ? [attachment, attachment.reference]
        : [attachment.reference, attachment]
      transparent.position.copy(vector)
      withNumber.position.copy(
        this.model.localToWorld(new THREE.Vector3().copy(vector)),
      )
      if (this.callbacks.updateAttachmentPosition)
        this.callbacks.updateAttachmentPosition(
          this.findAttachmentIndex(withNumber),
          {
            x: vector.x,
            y: vector.y,
            z: vector.z,
          },
        )
    })
    config.object.replacing = false
  }

  updateSelectedData = data => {
    this.selecteds.forEach(attachment => {
      const type = attachment.data.type
      attachment.data = {
        ...attachment.data,
        ...data,
      }
      if (type !== attachment.data.type) this.replaceAllNumbers()
      if (this.callbacks.updateAttachmentData)
        this.callbacks.updateAttachmentData(
          this.findAttachmentIndex(attachment),
          attachment.data,
        )
    })
  }

  moveSelectedObject = ({ x = 0, y = 0, z = 0 }) => {
    this.selecteds.forEach(attachment => {
      if (attachment.isTransparentModel) return
      const {
        reference: { position },
      } = attachment
      position.x += x
      position.y += y
      position.z += z
      attachment.position.copy(
        this.model.localToWorld(new THREE.Vector3().copy(position)),
      )
      if (this.callbacks.updateAttachmentPosition)
        this.callbacks.updateAttachmentPosition(
          this.findAttachmentIndex(attachment),
          {
            x: position.x,
            y: position.y,
            z: position.z,
          },
        )
    })
  }

  deselectObjects = () => {
    this.selecteds.forEach(attachment => {
      attachment.state = "default"
      attachment.material = Config.attachment.material.default
      attachment.geometry.scale(1 / 1.2, 1 / 1.2, 1 / 1.2)
    })
  }
  selectObject = object => {
    this.deselectObjects()
    object.state = "selected"
    object.material = Config.attachment.material.selected
    object.geometry.scale(1.2, 1.2, 1.2)

    object.reference.state = "selected"
    object.reference.material = Config.attachment.material.selected
    object.reference.geometry.scale(1.2, 1.2, 1.2)
  }

  updateScale = () => {
    const { scale } = Config.attachment
    this.attachments.children.forEach(attachment => {
      attachment.scale.set(scale, scale, scale)
    })
  }

  updateVisible = (visibility, attachments = this.attachments.children) => {
    const newVisibility =
      visibility !== undefined ? visibility : Config.attachment.visibility
    const showImages = Config.attachment.showImages
    attachments.forEach(attachment => {
      const type = ((attachment || {}).data || {}).type || "text"
      // Circle with number inside
      attachment.visible =
        [1].includes(newVisibility) &&
        ((type === "image" && showImages) || type !== "image")
      // Reference point
      attachment.reference.visible =
        [2, 3].includes(newVisibility) &&
        ((type === "image" && showImages) || type !== "image")

      // Reference point text
      attachment.reference.text.visible =
        [2].includes(newVisibility) &&
        ((type === "image" && showImages) || type !== "image")
    })
  }
}

export default AttachmentsController
