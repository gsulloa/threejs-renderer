"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _three = require("three");

var _rxjs = require("rxjs");

var _default = {
  attachment: {
    color: {
      default: "#fae",
      hovered: "#33f",
      selected: "#fff"
    },
    material: {
      default: new _three.MeshBasicMaterial({
        color: "#fae",
        opacity: 0.5
      }),
      hovered: new _three.MeshBasicMaterial({
        color: "#33f"
      }),
      selected: new _three.MeshBasicMaterial({
        color: "#fff"
      })
    },
    scale: 5,
    _visibility: new _rxjs.BehaviorSubject(true),

    get visibility() {
      return this._visibility.value;
    },

    set visibility(val) {
      this._visibility.next(val);
    },

    set defaultColor(color) {
      this.color.default = color;
      this.material.default.color.set(new _three.Color(color));
    },

    get defaultColor() {
      return this.color.default;
    },

    set hoveredColor(color) {
      this.color.hovered = color;
      this.material.hovered.color.set(new _three.Color(color));
    },

    get hoveredColor() {
      return this.color.hovered;
    },

    set selectedColor(color) {
      this.color.selected = color;
      this.material.selected.color.set(new _three.Color(color));
    },

    get selectedColor() {
      return this.color.selected;
    }

  },
  object: {
    onMouseMoveVal: "rotate",

    get onMouseMove() {
      return this.onMouseMoveVal;
    },

    set onMouseMove(val) {
      var options = ["rotate", "move"];

      if (options.includes(val)) {
        this.onMouseMoveVal = val;
      }
    },

    _editing: new _rxjs.BehaviorSubject(true),

    get editing() {
      return this._editing.getValue();
    },

    set editing(val) {
      this._editing.next(val);
    },

    _replacing: new _rxjs.BehaviorSubject(false),

    get replacing() {
      return this._replacing.getValue();
    },

    set replacing(val) {
      this._replacing.next(val);
    },

    add: false
  },
  orbit: {
    _position: new _rxjs.BehaviorSubject({
      x: 17,
      y: 13,
      z: 550
    }),

    get position() {
      return this._position.getValue();
    },

    set position(position) {
      var edges = {};
      if (position.z && position.z > 800) edges.z = 800;else if (position.z && position.z < 100) edges.z = 100;
      var newPosition = (0, _objectSpread2.default)({}, this.position, position, edges);

      this._position.next((0, _objectSpread2.default)({}, this.position, newPosition));
    },

    _rotation: new _rxjs.BehaviorSubject({
      x: 1.633995837560991,
      y: 0.049426731896162514,
      z: -3.001684471665421
    }),

    get rotation() {
      return this._rotation.getValue();
    },

    set rotation(rotation) {
      this._rotation.next((0, _objectSpread2.default)({}, this.rotation, rotation));
    }

  },
  controllers: {}
};
exports.default = _default;