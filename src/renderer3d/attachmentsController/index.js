import * as THREE from "three"
import Config from "../config"
import { devlogerror } from "../utils/log"
import font from "./font"

class AttachmentsController {
  constructor({
    model,
    camera,
    attachments,
    initialAttachments = [],
    domElement,
  } = {}) {
    this.textureFont = new THREE.FontLoader().parse(font)
    this.model = model
    this.camera = camera
    this.attachments = attachments
    this.domElement = domElement
    initialAttachments.forEach((attachment, i) =>
      this.addSphere({ ...attachment, number: i })
    )

    this.hovered = undefined
    this.selected = undefined

    document.addEventListener("mousemove", ({ offsetX, offsetY }) => {
      this.intersectAttachments({
        offsetX,
        offsetY,
        domElementHeight: this.domElement.height,
        domElementWidth: this.domElement.width,
      })
    })
  }

  addAttachment = ({ position, model }) => {
    if (position && model) {
      let { x, y, z } = position
      const transparentModel = new THREE.Mesh()
      transparentModel.visible = false
      transparentModel.position.copy({ x, y, z })
      this.model.add(transparentModel)

      const worldPosition = new THREE.Vector3().copy(
        this.model.localToWorld(new THREE.Vector3(x, y, z))
      )
      model.position.copy(worldPosition)
      model.reference = transparentModel
      this.attachments.add(model)
    }
  }
  addSphere = ({ position, data, number }) => {
    const { scale, material } = Config.attachment
    const radius = 1
    const segments = 32
    const geometry = new THREE.CircleGeometry(radius, segments, segments)
    const sphere = new THREE.Mesh(geometry, material.default)
    sphere.scale.set(scale, scale, scale)
    sphere.data = data
    sphere.state = "default"

    const textMaterial = new THREE.MeshBasicMaterial({ color: "black" })
    const textShapes = this.textureFont.generateShapes(String(number + 1), 1)
    const textGeometry = new THREE.ShapeBufferGeometry(textShapes)
    const text = new THREE.Mesh(textGeometry, textMaterial)
    text.position.x -= 0.5 * String(number + 1).length
    text.position.y -= 0.5
    sphere.add(text)
    this.addAttachment({ position, model: sphere })
  }

  intersectAttachments = ({
    offsetX,
    offsetY,
    domElementWidth,
    domElementHeight,
  }) => {
    try {
      const { camera, attachments, selected } = this
      const vector = new THREE.Vector2(
        (offsetX / domElementWidth) * 2 - 1,
        -(offsetY / domElementHeight) * 2 + 1
      )
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(vector, camera)
      const intersects = raycaster.intersectObjects(attachments.children)
      this.setHoveredToDefault()
      if (intersects.length) {
        const [{ object }] = intersects
        if (selected !== object)
          object.material = Config.attachment.material.hovered
        this.hovered = object
        object.state = "hovered"
      }
    } catch (e) {
      devlogerror(e)
    }
  }

  setHoveredToDefault = () => {
    if (this.hovered && this.hovered !== this.selected) {
      this.hovered.material = Config.attachment.material.default
      this.hovered.state = "default"
      this.hovered = undefined
    }
  }

  selectAttachment = ({ object }) => {
    if (this.selected)
      this.selected.material = Config.attachment.material.default
    if (this.selected !== object) {
      this.hovered = undefined
      object.material = Config.attachment.material.selected
      object.state = "selected"
      this.selected = object
      return true
    } else {
      this.selected.state = "default"
      this.selected = undefined
      return false
    }
  }

  updateMaterials = () => {
    this.attachments.children.forEach(attachment => {
      attachment.material = Config.attachment.material[attachment.state]
    })
  }

  updateScale = () => {
    const { scale } = Config.attachment
    this.attachments.children.forEach(attachment => {
      attachment.scale.set(scale, scale, scale)
    })
  }

  updateVisible = () => {
    const { visibility } = Config.attachment
    this.attachments.children.forEach(attachment => {
      attachment.visible = visibility
    })
  }
}

export default AttachmentsController
