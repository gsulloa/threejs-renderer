import * as THREE  from "three"

const DEFAULT_MATERIAL = new THREE.MeshBasicMaterial({ color: "#fae"})
const HOVERED_MATERIAL = new THREE.MeshBasicMaterial({ color: "#33f"})
const SELECTED_MATERIAL = new THREE.MeshBasicMaterial({ color: "#fff"})

class AttachmentsController {

  constructor({ 
      model,
      camera,
      attachments,
      initialAttachments = [{"position":{"x":8.622963458826547,"y":-15.567126364801993,"z":43.52801210469018}},{"position":{"x":21.519644123023504,"y":-12.001333004591629,"z":96.02675761908205}},{"position":{"x":71.97984122063795,"y":-9.378723195423731,"z":146.55455094228932}},{"position":{"x":43.612832314551085,"y":1.79033769370119,"z":105.70141537364418}},{"position":{"x":6.924238304452199,"y":3.9405870954528837,"z":119.71180814683046}},{"position":{"x":-20.34256158174875,"y":4.209970320744446,"z":115.92273847966493}},{"position":{"x":-69.7402611340922,"y":-11.175968932093156,"z":131.15686955258005}},{"position":{"x":-18.851889561431605,"y":-8.702167393605578,"z":72.95870098388383}},{"position":{"x":12.648535743784507,"y":-11.566123879458587,"z":95.12084391769665}},{"position":{"x":43.19910275371262,"y":-12.579544497211941,"z":24.987208616387566}},{"position":{"x":-94.58802152564127,"y":-10.902020712164926,"z":134.1449717377745}},{"position":{"x":5.860388046249881,"y":-11.84071819446342,"z":149.1398234291188}}],
      domElement,
    } = {},
  ) {
    this.model = model
    this.camera = camera
    this.attachments = attachments
    this.domElement = domElement
    initialAttachments.forEach(attachment => {
      this.addSphere(attachment.position)
    })

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
      
      const worldPosition = new THREE.Vector3()
        .copy(this.model.localToWorld(new THREE.Vector3(x, y, z)))
      model.position.copy(worldPosition)
      model.reference = transparentModel
      this.attachments.add(model)
    }
  }
  addSphere = position => {
    const radius = 5
    const segments = 32
    const geometry = new THREE.CircleGeometry(radius, segments, segments);
    const sphere = new THREE.Mesh( geometry, DEFAULT_MATERIAL )
    this.addAttachment({ position, model: sphere })
  }

  intersectAttachments = ({ offsetX, offsetY, domElementWidth, domElementHeight }) => {
    try {
      const { camera, attachments, selected } = this
      const vector = new THREE.Vector2((offsetX / domElementWidth) * 2-1, -(offsetY / domElementHeight) * 2 + 1);
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(vector, camera)
      const intersects = raycaster.intersectObjects(attachments.children)
      this.setHoveredToDefault()
      if (intersects.length) {
        const [{ object }] = intersects
        if (selected !== object) {
          object.material = HOVERED_MATERIAL
          this.hovered = object
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  setHoveredToDefault = () => {
    if (this.hovered) {
      this.hovered.material = DEFAULT_MATERIAL
      this.hovered = undefined
    }
  }

  selectAttachment = ({ object }) => {
    if (this.selected) this.selected.material = DEFAULT_MATERIAL
    this.hovered = undefined
    object.material = SELECTED_MATERIAL
    this.selected = object
  }
}

export default AttachmentsController
