import * as THREE from "three"
import Config from "../config"
import { devlogerror } from "../utils/log"

class AttachmentsController {
  constructor({
    model,
    camera,
    attachments,
    initialAttachments = [
      {
        position: {
          x: 8.622963458826547,
          y: -15.567126364801993,
          z: 43.52801210469018,
        },
        data: {
          title: "Etiqueta 1",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.\n",
          screenPosition: {
            rotation: {
              x: 1.7158242597099533,
              y: 0.061212127405937476,
              z: -2.821771456199733,
            },
            position: { x: 5, y: 40, z: 290 },
          },
        },
      },
      {
        position: {
          x: 21.519644123023504,
          y: -12.001333004591629,
          z: 96.02675761908205,
        },
        data: {
          title: "Etiqueta 2",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.",
          screenPosition: {
            rotation: {
              x: 1.5699221202943565,
              y: -0.007921343880529572,
              z: -3.0901915692326813,
            },
            position: { x: -5, y: -1, z: 290 },
          },
        },
      },
      {
        position: {
          x: 71.97984122063795,
          y: -9.378723195423731,
          z: 146.55455094228932,
        },
        data: {
          title: "Etiqueta 3",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.",
          screenPosition: {
            rotation: {
              x: 1.5699221202943565,
              y: -0.007921343880529572,
              z: -3.0901915692326813,
            },
            position: { x: -23, y: -7, z: 290 },
          },
        },
      },
      {
        position: {
          x: 43.612832314551085,
          y: 1.79033769370119,
          z: 105.70141537364418,
        },
        data: {
          title: "Etiqueta 4",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.",
        },
      },
      {
        position: {
          x: 6.924238304452199,
          y: 3.9405870954528837,
          z: 119.71180814683046,
        },
        data: {
          title: "Etiqueta 5",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.",
          screenPosition: {
            rotation: {
              x: 1.7857597485974177,
              y: 0.10199058512918796,
              z: -2.704129869852899,
            },
            position: { x: 12, y: -22, z: 150 },
          },
        },
      },
      {
        position: {
          x: -20.34256158174875,
          y: 4.209970320744446,
          z: 115.92273847966493,
        },
        data: {
          title: "Etiqueta 6",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.",
        },
      },
      {
        position: {
          x: -69.7402611340922,
          y: -11.175968932093156,
          z: 131.15686955258005,
        },
        data: {
          title: "Etiqueta 7",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.",
          screenPosition: {
            rotation: {
              x: 1.6544825890392407,
              y: 0.22254922054995288,
              z: -2.7398199350185317,
            },
            position: { x: 51, y: -20, z: 170 },
          },
        },
      },
      {
        position: {
          x: -18.851889561431605,
          y: -8.702167393605578,
          z: 72.95870098388383,
        },
        data: {
          title: "Etiqueta 8",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.",
          screenPosition: {
            rotation: {
              x: 1.7531367921733467,
              y: 0.03701373643073361,
              z: -2.9594576943111024,
            },
            position: { x: 14, y: 12, z: 290 },
          },
        },
      },
      {
        position: {
          x: 12.648535743784507,
          y: -11.566123879458587,
          z: 95.12084391769665,
        },
        data: {
          title: "Etiqueta 9",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.",
          screenPosition: {
            rotation: {
              x: 1.5699221202943565,
              y: -0.007921343880529572,
              z: -3.0901915692326813,
            },
            position: { x: 14, y: 12, z: 290 },
          },
        },
      },
      {
        position: {
          x: 43.19910275371262,
          y: -12.579544497211941,
          z: 24.987208616387566,
        },
        data: {
          title: "Etiqueta 10",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.",
          screenPosition: {
            rotation: {
              x: 2.0871336498718858,
              y: -0.17315951934184498,
              z: 2.4981035091020045,
            },
            position: { x: 17, y: 13, z: 390 },
          },
        },
      },
      {
        position: {
          x: -94.58802152564127,
          y: -10.902020712164926,
          z: 134.1449717377745,
        },
        data: {
          title: "Etiqueta 11",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.",
          screenPosition: {
            rotation: {
              x: 1.5706210670855567,
              y: 0.24609909939085634,
              z: -3.1295249041020963,
            },
            position: { x: 78, y: 3, z: 170 },
          },
        },
      },
      {
        position: {
          x: 5.860388046249881,
          y: -11.84071819446342,
          z: 149.1398234291188,
        },
        data: {
          title: "Etiqueta 12",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.",
          screenPosition: {
            rotation: {
              x: 1.4680390373879195,
              y: -0.049372252196620114,
              z: 2.8308733671899837,
            },
            position: { x: -54, y: -35, z: 290 },
          },
        },
      },
    ],
    domElement,
  } = {}) {
    this.model = model
    this.camera = camera
    this.attachments = attachments
    this.domElement = domElement
    initialAttachments.forEach(this.addSphere)

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
  addSphere = ({ position, data }) => {
    const radius = 5
    const segments = 32
    const geometry = new THREE.CircleGeometry(radius, segments, segments)
    const sphere = new THREE.Mesh(geometry, Config.attachment.material.default)
    sphere.data = data
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
      }
    } catch (e) {
      devlogerror(e)
    }
  }

  setHoveredToDefault = () => {
    if (this.hovered && this.hovered !== this.selected) {
      this.hovered.material = Config.attachment.material.default
      this.hovered = undefined
    }
  }

  selectAttachment = ({ object }) => {
    if (this.selected)
      this.selected.material = Config.attachment.material.default
    if (this.selected !== object) {
      this.hovered = undefined
      object.material = Config.attachment.material.selected
      this.selected = object
      return true
    } else {
      this.selected = undefined
      return false
    }
  }
}

export default AttachmentsController
