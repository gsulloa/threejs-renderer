"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var THREE = _interopRequireWildcard(require("three"));

var _tween = require("@tweenjs/tween.js");

var _radiansDegreesConverter = require("../utils/radiansDegreesConverter");

var _radiansNormalize = require("../utils/radiansNormalize");

var _log = require("../utils/log");

var _config = _interopRequireDefault(require("../config"));

var CONTROL_OPTIONS = {
  LEFT_CLICK: 1,
  MIDDLE_CLICK: 2
};
var MOUSE_CLICK = {
  LEFT_CLICK: 0,
  MIDDLE_CLICK: 1,
  RIGHT_CLICK: 2
};

var ObjectController =
/*#__PURE__*/
function () {
  (0, _createClass2.default)(ObjectController, null, [{
    key: "previousMousePosition",
    get: function get() {
      return {
        x: this.mousePosition ? this.mousePosition.x : 0,
        y: this.mousePosition ? this.mousePosition.y : 0
      };
    },
    set: function set() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$x = _ref.x,
          x = _ref$x === void 0 ? 0 : _ref$x,
          _ref$y = _ref.y,
          y = _ref$y === void 0 ? 0 : _ref$y;

      this.mousePosition = {
        x: x,
        y: y
      };
    }
  }]);

  function ObjectController() {
    var _this = this;

    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _camera = _ref2.camera,
        _object = _ref2.object,
        scene = _ref2.scene,
        _domElement = _ref2.domElement,
        _ref2$initial = _ref2.initial;

    _ref2$initial = _ref2$initial === void 0 ? {} : _ref2$initial;
    var _rotation = _ref2$initial.rotation,
        _position = _ref2$initial.position,
        attachments = _ref2.attachments,
        updateDefaultOrbit = _ref2.callbacks.updateDefaultOrbit;
    (0, _classCallCheck2.default)(this, ObjectController);
    (0, _defineProperty2.default)(this, "controlOption", undefined);
    (0, _defineProperty2.default)(this, "mouseEventListener", function (_ref3) {
      var domElement = _ref3.domElement;
      domElement.addEventListener("mousedown", _this.handleMouseDown);
      domElement.addEventListener("mousemove", _this.handleMouseMove);
      domElement.addEventListener("mouseup", function () {
        _this.controlOption = undefined;
      });
      domElement.addEventListener("mousewheel", function (e) {
        e.preventDefault();
        _config.default.orbit.position = {
          z: _config.default.orbit.position.z + Math.sign(e.deltaY) * 20
        };
      });
    });
    (0, _defineProperty2.default)(this, "touchEventListener", function (_ref4) {
      var domElement = _ref4.domElement;
      domElement.addEventListener("touchstart", _this.handleTouchStart);
      domElement.addEventListener("touchmove", _this.handleTouchMove);
    });
    (0, _defineProperty2.default)(this, "handleMouseDown", function (e) {
      switch (e.button) {
        case MOUSE_CLICK.LEFT_CLICK:
          _this.controlOption = CONTROL_OPTIONS.LEFT_CLICK;
          break;

        case MOUSE_CLICK.MIDDLE_CLICK:
          _this.controlOption = CONTROL_OPTIONS.MIDDLE_CLICK;
          break;

        default:
          break;
      }
    });
    (0, _defineProperty2.default)(this, "handleMouseMove", function (e) {
      if (_this.controlOption) {
        var deltaMove = _this.deltaMove(e);

        switch (_this.controlOption) {
          case CONTROL_OPTIONS.LEFT_CLICK:
            {
              _this[_config.default.object.onMouseMove]({
                deltaMove: deltaMove
              });

              break;
            }

          case CONTROL_OPTIONS.MIDDLE_CLICK:
            {
              var x = deltaMove.x,
                  y = deltaMove.y;
              var _this$camera$position = _this.camera.position,
                  prevX = _this$camera$position.x,
                  prevY = _this$camera$position.y,
                  z = _this$camera$position.z;
              _config.default.orbit.position = {
                x: -x + prevX,
                y: y + prevY,
                z: z
              };
              break;
            }

          default:
            break;
        }
      }

      _this.previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
      };
    });
    (0, _defineProperty2.default)(this, "handleTouchStart", function (e) {
      var touch = e.touches[0];
      _this.previousMousePosition = {
        x: touch.clientX,
        y: touch.clientY
      };

      switch (e.touches.length) {
        case 1:
          _this.controlOption = CONTROL_OPTIONS.DRAGGING;
          break;

        case 2:
          _this.controlOption = CONTROL_OPTIONS.MOVING;
          break;

        default:
          break;
      }
    });
    (0, _defineProperty2.default)(this, "handleTouchMove", function (e) {
      var object = _this.object,
          camera = _this.camera;

      switch (_this.controlOption) {
        case CONTROL_OPTIONS.DRAGGING:
          {
            e.preventDefault();
            var touch = e.touches[0];
            var touchPosition = {
              offsetX: touch.clientX,
              offsetY: touch.clientY
            };

            var deltaMove = _this.deltaMove(touchPosition);

            _this.rotateObject({
              deltaMove: deltaMove,
              object: object
            });

            _this.previousMousePosition = {
              x: touch.clientX,
              y: touch.clientY
            };
            break;
          }

        case CONTROL_OPTIONS.MOVING:
          {
            e.preventDefault();
            var _touch = e.touches[0];
            var _touchPosition = {
              offsetX: _touch.clientX,
              offsetY: _touch.clientY
            };

            var _deltaMove = _this.deltaMove(_touchPosition);

            _this.moveCamera({
              deltaMove: _deltaMove,
              camera: camera
            });

            _this.previousMousePosition = {
              x: _touch.clientX,
              y: _touch.clientY
            };
            break;
          }

        default:
          break;
      }
    });
    (0, _defineProperty2.default)(this, "rotateObject", function (vector) {
      _this.object.rotation.setFromVector3(vector);

      _this.uptadeAttachmentsPosition();
    });
    (0, _defineProperty2.default)(this, "rotate", function () {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          deltaMove = _ref5.deltaMove,
          _ref5$delta = _ref5.delta,
          delta = _ref5$delta === void 0 ? 0.25 : _ref5$delta;

      var object = _this.object;
      var deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler((0, _radiansDegreesConverter.toRadians)(deltaMove.y * delta), (0, _radiansDegreesConverter.toRadians)(deltaMove.x * delta), 0, "XYZ"));
      var quaternion = object.quaternion.clone();
      quaternion.multiplyQuaternions(deltaRotationQuaternion, object.quaternion);
      var vector = new THREE.Euler().setFromQuaternion(quaternion);
      _config.default.orbit.rotation = {
        x: vector.x,
        y: vector.y,
        z: vector.z
      };
    });
    (0, _defineProperty2.default)(this, "uptadeAttachmentsPosition", function () {
      var _this$object$children = (0, _slicedToArray2.default)(_this.object.children, 1),
          _this$object$children2 = (0, _slicedToArray2.default)(_this$object$children[0].children, 1),
          model = _this$object$children2[0];

      var positions = _this.attachments.children.map(function (attachment) {
        return model.localToWorld(new THREE.Vector3().copy(attachment.reference.position));
      });

      _this.attachments.children.forEach(function (attachment, i) {
        attachment.position.copy(positions[i]);
      });
    });
    (0, _defineProperty2.default)(this, "moveCamera", function (_ref6) {
      var x = _ref6.x,
          y = _ref6.y,
          z = _ref6.z;
      var position = _this.camera.position;
      if ([[x, position.x], [y, position.y], [z, position.z]].every(function (_ref7) {
        var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
            next = _ref8[0],
            prev = _ref8[1];

        return next === prev;
      })) return;
      _this.camera.position.x = x;
      _this.camera.position.y = y;
      _this.camera.position.z = z;
    });
    (0, _defineProperty2.default)(this, "move", function (_ref9) {
      var deltaMove = _ref9.deltaMove;
      var x = deltaMove.x,
          y = deltaMove.y;
      var _this$camera$position2 = _this.camera.position,
          prevX = _this$camera$position2.x,
          prevY = _this$camera$position2.y,
          z = _this$camera$position2.z;
      _config.default.orbit.position = {
        x: -x + prevX,
        y: y + prevY,
        z: z
      };
    });
    (0, _defineProperty2.default)(this, "look", function (_ref10) {
      var newPosition = _ref10.position,
          newRotation = _ref10.rotation;

      _this.smoothMoveCamera({
        newPosition: newPosition
      });

      _this.smoothRotateObjectTo({
        newRotation: newRotation
      });
    });
    (0, _defineProperty2.default)(this, "smoothMoveCamera", function (_ref11) {
      var newPosition = _ref11.newPosition;
      var positionCoords = (0, _objectSpread2.default)({}, _config.default.orbit.position);
      new _tween.Tween(positionCoords).to(newPosition, 1000).easing(_tween.Easing.Quadratic.Out).onUpdate(function (_ref12) {
        var x = _ref12.x,
            y = _ref12.y,
            z = _ref12.z;
        _config.default.orbit.position = {
          x: x,
          y: y,
          z: z
        };
      }).start();
    });
    (0, _defineProperty2.default)(this, "smoothRotateObjectTo", function (_ref13) {
      var coords = _ref13.newRotation;
      var rotationCords = new THREE.Vector3().copy(_this.object.rotation);
      var shortDistanceCords = Object.entries(coords).reduce(function (newCoords, _ref14) {
        var _ref15 = (0, _slicedToArray2.default)(_ref14, 2),
            coord = _ref15[0],
            val = _ref15[1];

        newCoords[coord] = (0, _radiansNormalize.useShortDistance)(rotationCords[coord], val);
        return newCoords;
      }, {});
      new _tween.Tween(rotationCords).to(shortDistanceCords, 1000).easing(_tween.Easing.Quadratic.Out).onUpdate(function (_ref16) {
        var x = _ref16.x,
            y = _ref16.y,
            z = _ref16.z;
        _config.default.orbit.rotation = {
          x: x,
          y: y,
          z: z
        };
      }).start();
    });
    (0, _defineProperty2.default)(this, "resetControls", function () {
      _this.look(_this.initial);
    });
    (0, _defineProperty2.default)(this, "updateInitial", function (_ref17) {
      var rotation = _ref17.rotation,
          position = _ref17.position;
      _this.initial = {
        rotation: rotation,
        position: position
      };
      if (_this.callbacks.updateDefaultOrbit) _this.callbacks.updateDefaultOrbit(_this.initial);
    });
    (0, _defineProperty2.default)(this, "getPositionInObject", function (_ref18) {
      var offsetX = _ref18.offsetX,
          offsetY = _ref18.offsetY,
          domElementWidth = _ref18.domElementWidth,
          domElementHeight = _ref18.domElementHeight;

      try {
        var vector = new THREE.Vector2(offsetX / domElementWidth * 2 - 1, -(offsetY / domElementHeight) * 2 + 1);
        var camera = _this.camera,
            model = _this.model;
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(vector, camera);
        var intersects = raycaster.intersectObjects(model.children);

        if (intersects.length) {
          var _intersects = (0, _slicedToArray2.default)(intersects, 1),
              intersect = _intersects[0];

          var point = intersect.point,
              object = intersect.object;
          return object.worldToLocal(point);
        }
      } catch (e) {
        (0, _log.devlogerror)(e);
      }
    });
    this.callbacks = {
      updateDefaultOrbit: updateDefaultOrbit
    };
    this.mouseEventListener({
      domElement: _domElement,
      camera: _camera
    });
    this.touchEventListener({
      domElement: _domElement,
      camera: _camera
    });
    this.initial = {
      rotation: _rotation,
      position: _position
    };
    this.camera = _camera;
    this.object = _object;
    this.model = _object.children[0];
    this.scene = scene;
    this.domElement = _domElement;
    this.spheres = [];
    this.attachments = attachments;
    this.resetControls();

    _config.default.orbit._position.subscribe(this.moveCamera);

    _config.default.orbit._rotation.subscribe(this.rotateObject);
  }

  (0, _createClass2.default)(ObjectController, [{
    key: "deltaMove",
    value: function deltaMove(_ref19) {
      var currentX = _ref19.offsetX,
          currentY = _ref19.offsetY;
      var _this$previousMousePo = this.previousMousePosition,
          previousX = _this$previousMousePo.x,
          previousY = _this$previousMousePo.y;
      return {
        x: currentX - previousX,
        y: currentY - previousY
      };
    }
    /* MOUSE HANDLERS */

  }]);
  return ObjectController;
}();

var _default = ObjectController;
exports.default = _default;