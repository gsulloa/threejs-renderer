import { MeshBasicMaterial, Color } from "three"
import { BehaviorSubject } from "rxjs"

export default {
  attachment: {
    color: {
      default: "#fae",
      hovered: "#33f",
      selected: "#fff",
    },
    material: {
      default: new MeshBasicMaterial({
        color: "#fff",
      }),
      hovered: new MeshBasicMaterial({
        color: "#700",
      }),
      selected: new MeshBasicMaterial({
        color: "#f00",
      }),
      black: new MeshBasicMaterial({
        color: "#000",
      }),
    },
    scale: 5,
    _visibility: new BehaviorSubject(1),
    get visibility() {
      return this._visibility.value
    },
    set visibility(val) {
      this._visibility.next(val)
    },
    set defaultColor(color) {
      this.color.default = color
      this.material.default.color.set(new Color(color))
    },
    get defaultColor() {
      return this.color.default
    },
    set hoveredColor(color) {
      this.color.hovered = color
      this.material.hovered.color.set(new Color(color))
    },
    get hoveredColor() {
      return this.color.hovered
    },
    set selectedColor(color) {
      this.color.selected = color
      this.material.selected.color.set(new Color(color))
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
    _editing: new BehaviorSubject(true),
    get editing() {
      return this._editing.getValue()
    },
    set editing(val) {
      this._editing.next(val)
    },
    _replacing: new BehaviorSubject(false),
    get replacing() {
      return this._replacing.getValue()
    },
    set replacing(val) {
      this._replacing.next(val)
    },
    add: false,
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
  controllers: {},
}
