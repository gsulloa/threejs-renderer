import * as THREE from "three"
import { VRButton } from "three/examples/jsm/webxr/VRButton"
import { ARButton } from "three/examples/jsm/webxr/ARButton"
import TWEEN from "@tweenjs/tween.js"
import ModelLoader from "./modelLoader"
import ObjectController from "./objectController"
import AttachmentsController from "./attachmentsController"
import config from "./config"
class Renderer3D {
  constructor({
    modelUrl,
    loading,
    infoPanel,
    configGui,
    container,
    initial: { orbit = {}, attachments = [] } = {},
    ambientLight = {},
    callbacks: {
      addAttachment,
      removeAttachment,
      updateAttachmentData,
      updateAttachmentDefaultScreen,
      updateAttachmentPosition,
      updateDefaultOrbit,
    } = {},
    editable = false,
  }) {
    this.clock = new THREE.Clock()
    this.callbacks = {
      addAttachment,
      removeAttachment,
      updateAttachmentData,
      updateAttachmentDefaultScreen,
      updateAttachmentPosition,
      updateDefaultOrbit,
    }
    config.object.editing = editable
    this.infoPanel = infoPanel

    this.prepareEnvironment({
      camera: {
        aspect: container.clientWidth / container.clientHeight,
      },
      ambientLight,
    })

    this.loadModel({
      initial: { orbit, attachments },
      loading,
      url: modelUrl,
    }).then(() => {
      if (!configGui) return
      configGui.addAttachmentConfig()
    })

    this.render({ container })

    this.addVR({ container })

    window.addEventListener("resize", () => this.onResize({ container }))
    document.addEventListener("fullscreenchange", () =>
      this.onResize({ container }),
    )
    container.addEventListener("touchmove", e => {
      e.preventDefault()
    })
  }

  prepareEnvironment = ({
    camera: {
      fov = 50,
      aspect = window.innerWidth / window.innerHeight,
      near = 0.1,
      far = 2000,
      positionZ = 600,
    } = {},
    ambientLight: { color = 0xffffff, intensity = 0.8 } = {},
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
    url,
    initial: {
      orbit: {
        position = { x: 0, y: 0, z: 0 },
        rotation = { x: 0, y: 0, z: 0 },
      },
      attachments = [],
    } = {},
    loading,
  }) => {
    const object = await new ModelLoader({ loading }).load({ url })
    this.object = object
    object.position.y = 0

    this.scene.add(object)
    this.attachments = new THREE.Group()
    this.scene.add(this.attachments)
    config.controllers.attachmentsController = new AttachmentsController({
      model: this.object.children[0],
      attachments: this.attachments,
      camera: this.camera,
      domElement: this.renderer.domElement,
      initialAttachments: attachments,
      callbacks: this.callbacks,
    })

    config.controllers.objectController = new ObjectController({
      camera: this.camera,
      scene: this.scene,
      object: this.object,
      domElement: this.renderer.domElement,
      initial: {
        position,
        rotation,
      },
      attachments: this.attachments,
      callbacks: this.callbacks,
    })
    this.renderer.domElement.addEventListener("click", this.handleMouseClick)
  }

  render = ({ container }) => {
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(this.renderer.domElement)
  }

  addVR = ({ container }) => {
    const vrButton = VRButton.createButton(this.renderer)
    vrButton.style.marginLeft = "80px"
    vrButton.style.display = "none"
    vrButton.style.opacity = 0
    container.appendChild(vrButton)

    const arButton = ARButton.createButton(this.renderer)
    arButton.style.marginLeft = "-80px"
    arButton.style.display = "none"
    arButton.style.opacity = 0
    container.appendChild(arButton)
    this.renderer.xr.enabled = true
    if (navigator.xr && navigator.xr.isSessionSupported) {
      navigator.xr.isSessionSupported("immersive-vr").then(can => {
        if (can) {
          vrButton.style.opacity = 1
        }
      })
      navigator.xr.isSessionSupported("immersive-ar").then(can => {
        if (can) {
          arButton.style.opacity = 1
        }
      })
    }
  }

  onResize = ({ container }) => {
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.camera.aspect = container.clientWidth / container.clientHeight
    this.camera.updateProjectionMatrix()
  }

  animate = () => {
    this.renderer.setAnimationLoop(this.animate)
    if (this.renderer.xr.isPresenting !== false) {
      this.object.position.z = -150
      this.object.rotation.z += 0.01
      config.controllers.objectController.uptadeAttachmentsPosition()
    }

    this.renderer.render(this.scene, this.camera)
    TWEEN.update()
  }

  handleMouseClick = e => {
    if (config.object.replacing && config.object.editing) {
      this.handleReplaceSelected(e)
      return
    }
    const { objectController, attachmentsController } = config.controllers
    const object = this.handleAttachmentSelect(e)
    if (
      config.object.add &&
      object === null &&
      config.object.editing &&
      !config.controllers.attachmentsController.selecteds.length
    ) {
      const ratio = Math.round(window.devicePixelRatio * 100) / 100
      const position = objectController.getPositionInObject({
        offsetX: e.offsetX * ratio,
        offsetY: e.offsetY * ratio,
        domElementHeight: this.renderer.domElement.height,
        domElementWidth: this.renderer.domElement.width,
      })
      const attachment = attachmentsController.addSphere({ position })
      if (attachment) {
        attachmentsController.selectObject(attachment)
        this.lookObject(attachment)
      }
    }
  }

  handleAttachmentSelect = ({ offsetX, offsetY }) => {
    const { selectAttachment } = config.controllers.attachmentsController
    const object = selectAttachment({
      offsetX,
      offsetY,
    })
    if (object) {
      this.lookObject(object)
    } else if (object !== null) {
      this.infoPanel.hidePanel()
    }
    return object
  }
  handleReplaceSelected = ({ offsetX, offsetY }) => {
    const ratio = Math.round(window.devicePixelRatio * 100) / 100
    const position = config.controllers.objectController.getPositionInObject({
      offsetX: offsetX * ratio,
      offsetY: offsetY * ratio,
      domElementHeight: this.renderer.domElement.height,
      domElementWidth: this.renderer.domElement.width,
    })
    config.controllers.attachmentsController.replaceSelected(position)
  }

  lookObject = object => {
    const {
      data: { screenPosition, title, type, ...data },
      uuid,
      position,
    } = object
    if (screenPosition) {
      config.controllers.objectController.look(screenPosition)
    }
    this.infoPanel.showPanel({ title, type, uuid, position, ...data })
  }

  /* Controls */

  resetControls = () => {
    config.controllers.objectController.resetControls()
  }

  getCurrentPosition = () => {
    return config.orbit
  }

  setNewInitialPosition = ({ rotation, position }) => {
    config.controllers.objectController.updateInitial({ rotation, position })
  }

  setCurrentAsInitial = () => {
    const { rotation, position } = this.getCurrentPosition()
    this.setNewInitialPosition({ rotation, position })
  }

  getCurrentState = () => {
    const {
      controllers: {
        objectController: { initial: orbit },
      },
    } = config
    const attachments = this.attachments.children.map(attachment => ({
      ...attachment.data,
      position: attachment.reference.position,
      id: attachment.siblingReferenceId,
    }))
    return {
      orbit,
      attachments,
    }
  }
}
export { default as Loading } from "./loading"
export { default as InfoPanel } from "./infoPanel"
export { default as ConfigGui } from "./config/gui"
export { default as Controls } from "./controls"
export default Renderer3D
export { default as Renderer2D } from "./Renderer2D"
