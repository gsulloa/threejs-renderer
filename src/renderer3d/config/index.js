import { MeshBasicMaterial } from "three"

export default {
  attachment: {
    color: {
      default: "#fae",
      hovered: "#33f",
      selected: "#fff",
    },
    material: {
      default: new MeshBasicMaterial({ color: "#fae" }),
      hovered: new MeshBasicMaterial({ color: "#33f" }),
      selected: new MeshBasicMaterial({ color: "#fff" }),
    },
    scale: 5,
    visibility: true,
    set defaultColor(color) {
      this.color.default = color
      this.material.default = new MeshBasicMaterial({ color })
    },
    get defaultColor() {
      return this.color.default
    },
    set hoveredColor(color) {
      this.color.hovered = color
      this.material.hovered = new MeshBasicMaterial({ color })
    },
    get hoveredColor() {
      return this.color.hovered
    },
    set selectedColor(color) {
      this.color.selected = color
      this.material.selected = new MeshBasicMaterial({ color })
    },
    get selectedColor() {
      return this.color.selected
    },
  },
  object: {
    onMouseMoveVal: "rotateObject",
    get onMouseMove() {
      return this.onMouseMoveVal
    },
    set onMouseMove(val) {
      const options = ["rotateObject", "moveCamera"]
      if (options.includes(val)) {
        this.onMouseMoveVal = val
      }
    },
    onMouseSelectVal: "select",
    get onMouseSelect() {
      return this.onMouseSelectVal
    },
    set onMouseSelect(val) {
      const options = ["select", "add"]
      if (options.includes(val)) {
        this.onMouseSelectVal = val
      }
    },
  },
  orbit: {
    position: {
      suscriptors: [],
      x: 17,
      y: 13,
      z: 550,
      suscribe(callback) {
        this.suscriptors.push(callback)
      },
    },
    rotation: {
      suscriptors: [],
      x: 1.633995837560991,
      y: 0.049426731896162514,
      z: -3.001684471665421,
      suscribe(callback) {
        this.suscriptors.push(callback)
      },
    },
    set changePosition(position) {
      const edges = {}
      if (position.z && position.z > 800) edges.z = 800
      else if (position.z && position.z < 100) edges.z = 100
      this.position = {
        ...this.position,
        ...position,
        ...edges,
      }
      this.position.suscriptors.forEach(callback => callback(this.position))
    },
    set changeRotation(rotation) {
      this.rotation = {
        ...this.rotation,
        ...rotation,
      }
    },
  },
}
