import { MeshBasicMaterial } from "three"
import { BehaviorSubject } from "rxjs"

export default {
  attachment: {
    _color: {
      default: new BehaviorSubject("#fae"),
      hovered: new BehaviorSubject("#33f"),
      selected: new BehaviorSubject("#fff"),
    },
    get color() {
      return {
        default: this._color.default.getValue(),
        hovered: this._color.hovered.getValue(),
        selected: this._color.selected.getValue(),
      }
    },
    material: {
      default: new MeshBasicMaterial({ color: "#fae" }),
      hovered: new MeshBasicMaterial({ color: "#33f" }),
      selected: new MeshBasicMaterial({ color: "#fff" }),
    },
    scale: 5,
    visibility: true,
    set defaultColor(color) {
      this.material.default = new MeshBasicMaterial({ color })
      this._color.default.next(color)
    },
    get defaultColor() {
      return this.color.default
    },
    set hoveredColor(color) {
      this.material.hovered = new MeshBasicMaterial({ color })
      this._color.hovered.next(color)
    },
    get hoveredColor() {
      return this.color.hovered
    },
    set selectedColor(color) {
      this.material.selected = new MeshBasicMaterial({ color })
      this._color.selected.next(color)
    },
    get selectedColor() {
      return this.color.selected
    },
  },
  object: {
    onMouseMoveVal: "rotate",
    get onMouseMove() {
      return this.onMouseMoveVal
    },
    set onMouseMove(val) {
      const options = ["rotate", "move"]
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
    _position: new BehaviorSubject({
      x: 17,
      y: 13,
      z: 550,
    }),
    get position() {
      return this._position.getValue()
    },
    set position(position) {
      const edges = {}
      if (position.z && position.z > 800) edges.z = 800
      else if (position.z && position.z < 100) edges.z = 100
      const newPosition = {
        ...this.position,
        ...position,
        ...edges,
      }
      this._position.next({ ...this.position, ...newPosition })
    },
    _rotation: new BehaviorSubject({
      x: 1.633995837560991,
      y: 0.049426731896162514,
      z: -3.001684471665421,
    }),
    get rotation() {
      return this._rotation.getValue()
    },
    set rotation(rotation) {
      this._rotation.next({
        ...this.rotation,
        ...rotation,
      })
    },
  },
}
