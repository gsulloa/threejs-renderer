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
}
