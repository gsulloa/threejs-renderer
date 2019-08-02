"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var THREE = _interopRequireWildcard(require("three"));

var _config = _interopRequireDefault(require("../config"));

var _log = require("../utils/log");

var _font = _interopRequireDefault(require("../assets/font/font"));

window.a = _config.default;

var AttachmentsController =
/*#__PURE__*/
function () {
  function AttachmentsController() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _model = _ref.model,
        _camera = _ref.camera,
        _attachments = _ref.attachments,
        _ref$initialAttachmen = _ref.initialAttachments,
        initialAttachments = _ref$initialAttachmen === void 0 ? [] : _ref$initialAttachmen,
        domElement = _ref.domElement,
        _ref$callbacks = _ref.callbacks,
        addAttachment = _ref$callbacks.addAttachment,
        removeAttachment = _ref$callbacks.removeAttachment,
        updateAttachmentData = _ref$callbacks.updateAttachmentData,
        updateAttachmentDefaultScreen = _ref$callbacks.updateAttachmentDefaultScreen,
        updateAttachmentPosition = _ref$callbacks.updateAttachmentPosition;

    (0, _classCallCheck2.default)(this, AttachmentsController);
    (0, _defineProperty2.default)(this, "filterByState", function (state) {
      return [].concat((0, _toConsumableArray2.default)(_this.attachments.children.filter(function (attachment) {
        return attachment.state === state;
      })), (0, _toConsumableArray2.default)(_this.attachments.children.map(function (_ref2) {
        var reference = _ref2.reference;
        return reference;
      }).filter(function (attachment) {
        return attachment.state === state;
      })));
    });
    (0, _defineProperty2.default)(this, "findAttachmentIndex", function (model) {
      return _this.attachments.children.findIndex(function (a) {
        return a === model;
      });
    });
    (0, _defineProperty2.default)(this, "addAttachment", function (_ref3) {
      var position = _ref3.position,
          model = _ref3.model;

      if (position && model) {
        var x = position.x,
            y = position.y,
            z = position.z;
        var geometry = new THREE.SphereGeometry(1, 64, 64);
        var material = _config.default.attachment.material;
        var transparentModel = new THREE.Mesh(geometry, material.default);
        transparentModel.visible = true;
        transparentModel.position.copy({
          x: x,
          y: y,
          z: z
        });
        transparentModel.data = model.data;
        transparentModel.state = model.state;

        _this.model.add(transparentModel);

        var worldPosition = new THREE.Vector3().copy(_this.model.localToWorld(new THREE.Vector3(x, y, z)));
        model.position.copy(worldPosition);
        model.reference = transparentModel;
        transparentModel.reference = model;

        _this.attachments.add(model);

        return model;
      }
    });
    (0, _defineProperty2.default)(this, "addSphere", function (_ref4) {
      var position = _ref4.position,
          _ref4$data = _ref4.data,
          data = _ref4$data === void 0 ? {
        title: "Change me!",
        content: "Change me description!",
        screenPosition: (0, _objectSpread2.default)({}, _config.default.orbit)
      } : _ref4$data;
      var withCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var _Config$attachment = _config.default.attachment,
          scale = _Config$attachment.scale,
          material = _Config$attachment.material;
      var radius = 1;
      var segments = 32;
      var geometry = new THREE.CircleGeometry(radius, segments, segments);
      var sphere = new THREE.Mesh(geometry, material.default);
      var inner = new THREE.Mesh(new THREE.CircleGeometry(radius * 0.85, segments, segments), material.black);
      sphere.add(inner);
      sphere.scale.set(scale, scale, scale);
      sphere.data = data;
      sphere.state = "default";

      _this.addNumber({
        model: sphere
      });

      if (withCallback && _this.callbacks.addAttachment && position) _this.callbacks.addAttachment((0, _objectSpread2.default)({}, sphere.data, {
        position: position
      }));
      return _this.addAttachment({
        position: position,
        model: sphere
      });
    });
    (0, _defineProperty2.default)(this, "replaceAllNumbers", function () {
      _this.id = _this.number();

      _this.attachments.children.forEach(function (attachment) {
        var _attachment$children = (0, _slicedToArray2.default)(attachment.children, 2),
            number = _attachment$children[1];

        attachment.remove(number);

        _this.addNumber({
          model: attachment
        });
      });
    });
    (0, _defineProperty2.default)(this, "intersectAttachments", function (_ref5) {
      var offsetX = _ref5.offsetX,
          offsetY = _ref5.offsetY;
      var domElementHeight = _this.domElement.height * 100 / Math.round(window.devicePixelRatio * 100);
      var domElementWidth = _this.domElement.width * 100 / Math.round(window.devicePixelRatio * 100);

      try {
        var camera = _this.camera,
            attachments = _this.attachments;
        var vector = new THREE.Vector2(offsetX / domElementWidth * 2 - 1, -(offsetY / domElementHeight) * 2 + 1);
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(vector, camera);
        var intersects = raycaster.intersectObjects([].concat((0, _toConsumableArray2.default)(attachments.children), (0, _toConsumableArray2.default)(attachments.children.map(function (_ref6) {
          var reference = _ref6.reference;
          return reference;
        }))));
        return intersects;
      } catch (e) {
        (0, _log.devlogerror)(e);
      }
    });
    (0, _defineProperty2.default)(this, "setHovereds", function (_ref7) {
      var offsetX = _ref7.offsetX,
          offsetY = _ref7.offsetY;

      var intersects = _this.intersectAttachments({
        offsetX: offsetX,
        offsetY: offsetY
      });

      if (intersects.length) {
        var _intersects = (0, _slicedToArray2.default)(intersects, 1),
            object = _intersects[0].object;

        if (object.state !== "selected") {
          object.material = _config.default.attachment.material.hovered;
          object.state = "hovered";
        }
      } else {
        _this.hovereds.forEach(function (attachment) {
          attachment.state = "default";
          attachment.material = _config.default.attachment.material.default;
        });
      }
    });
    (0, _defineProperty2.default)(this, "selectAttachment", function (_ref8) {
      var offsetX = _ref8.offsetX,
          offsetY = _ref8.offsetY;

      var intersects = _this.intersectAttachments({
        offsetX: offsetX,
        offsetY: offsetY
      });

      if (intersects.length) {
        var _intersects2 = (0, _slicedToArray2.default)(intersects, 1),
            object = _intersects2[0].object;

        switch (object.state) {
          case "hovered":
            {
              _this.selectObject(object);

              return object;
            }

          case "selected":
            {
              _this.deselectObjects();

              return undefined;
            }

          default:
            break;
        }
      }

      return null;
    });
    (0, _defineProperty2.default)(this, "updateScreenPosition", function () {
      _this.selecteds.forEach(function (attachment) {
        var _Config$orbit = _config.default.orbit,
            position = _Config$orbit.position,
            rotation = _Config$orbit.rotation;
        attachment.data.screenPosition = {
          position: position,
          rotation: rotation
        };
        if (_this.callbacks.updateAttachmentDefaultScreen) _this.callbacks.updateAttachmentDefaultScreen(_this.findAttachmentIndex(attachment), attachment.data.screenPosition);
      });
    });
    (0, _defineProperty2.default)(this, "removeSelectedAttachment", function () {
      _this.selecteds.forEach(function (attachment) {
        if (_this.callbacks.removeAttachment) _this.callbacks.removeAttachment(_this.findAttachmentIndex(attachment));

        _this.attachments.remove(attachment);
      });
    });
    (0, _defineProperty2.default)(this, "replaceSelected", function (vector) {
      _this.selecteds.forEach(function (attachment) {
        attachment.reference.position.copy(vector);
        attachment.position.copy(_this.model.localToWorld(new THREE.Vector3().copy(vector)));
        if (_this.callbacks.updateAttachmentPosition) _this.callbacks.updateAttachmentPosition(_this.findAttachmentIndex(attachment), {
          x: vector.x,
          y: vector.y,
          z: vector.z
        });
      });

      _config.default.object.replacing = false;
    });
    (0, _defineProperty2.default)(this, "updateSelectedData", function (data) {
      _this.selecteds.forEach(function (attachment) {
        attachment.data = (0, _objectSpread2.default)({}, attachment.data, data);
        if (_this.callbacks.updateAttachmentData) _this.callbacks.updateAttachmentData(_this.findAttachmentIndex(attachment), attachment.data);
      });
    });
    (0, _defineProperty2.default)(this, "moveSelectedObject", function (_ref9) {
      var _ref9$x = _ref9.x,
          x = _ref9$x === void 0 ? 0 : _ref9$x,
          _ref9$y = _ref9.y,
          y = _ref9$y === void 0 ? 0 : _ref9$y,
          _ref9$z = _ref9.z,
          z = _ref9$z === void 0 ? 0 : _ref9$z;

      _this.selecteds.forEach(function (attachment) {
        var position = attachment.reference.position;
        position.x += x;
        position.y += y;
        position.z += z;
        attachment.position.copy(_this.model.localToWorld(new THREE.Vector3().copy(position)));
        if (_this.callbacks.updateAttachmentPosition) _this.callbacks.updateAttachmentPosition(_this.findAttachmentIndex(attachment), {
          x: position.x,
          y: position.y,
          z: position.z
        });
      });
    });
    (0, _defineProperty2.default)(this, "deselectObjects", function () {
      _this.selecteds.forEach(function (attachment) {
        attachment.state = "default";
        attachment.material = _config.default.attachment.material.default;
        attachment.geometry.scale(1 / 1.2, 1 / 1.2, 1 / 1.2);
      });
    });
    (0, _defineProperty2.default)(this, "selectObject", function (object) {
      _this.deselectObjects();

      object.state = "selected";
      object.material = _config.default.attachment.material.selected;
      object.geometry.scale(1.2, 1.2, 1.2);
      object.reference.state = "selected";
      object.reference.material = _config.default.attachment.material.selected;
      object.reference.geometry.scale(1.2, 1.2, 1.2);
    });
    (0, _defineProperty2.default)(this, "updateScale", function () {
      var scale = _config.default.attachment.scale;

      _this.attachments.children.forEach(function (attachment) {
        attachment.scale.set(scale, scale, scale);
      });
    });
    (0, _defineProperty2.default)(this, "updateVisible", function (visibility) {
      _this.attachments.children.forEach(function (attachment) {
        attachment.visible = !!(visibility % 2);
        attachment.reference.visible = visibility === 2;
      });
    });
    this.id = this.number();
    this.callbacks = {
      addAttachment: addAttachment,
      removeAttachment: removeAttachment,
      updateAttachmentData: updateAttachmentData,
      updateAttachmentDefaultScreen: updateAttachmentDefaultScreen,
      updateAttachmentPosition: updateAttachmentPosition
    };
    this.textureFont = new THREE.FontLoader().parse(_font.default);
    this.model = _model;
    this.camera = _camera;
    this.attachments = _attachments;
    this.domElement = domElement;
    initialAttachments.forEach(function (a) {
      return _this.addSphere(a, false);
    });
    var initialRatio = Math.round(window.devicePixelRatio * 100) / 100;
    var ratio = 1;
    window.addEventListener("resize", function () {
      ratio = Math.round(window.devicePixelRatio * 100) / 100 / initialRatio;
    });
    document.addEventListener("mousemove", function (_ref10) {
      var offsetX = _ref10.offsetX,
          offsetY = _ref10.offsetY;

      _this.setHovereds({
        offsetX: offsetX / ratio,
        offsetY: offsetY / ratio
      });
    });

    _config.default.attachment._visibility.subscribe(this.updateVisible);
  }

  (0, _createClass2.default)(AttachmentsController, [{
    key: "number",
    value:
    /*#__PURE__*/
    _regenerator.default.mark(function number() {
      var n;
      return _regenerator.default.wrap(function number$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              n = 0;

            case 1:
              if (!true) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return n;

            case 4:
              n += 1;
              _context.next = 1;
              break;

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, number, this);
    })
  }, {
    key: "addNumber",
    value: function addNumber() {
      var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          model = _ref11.model;

      if (!model) return;
      var number = this.id.next().value;
      var textMaterial = new THREE.MeshBasicMaterial({
        color: "white",
        transparent: true
      });
      var textShapes = this.textureFont.generateShapes(String(number + 1), 1);
      var textGeometry = new THREE.ShapeBufferGeometry(textShapes);
      var text = new THREE.Mesh(textGeometry, textMaterial);
      text.position.x -= 0.5 * String(number + 1).length;
      text.position.y -= 0.5;
      model.add(text);
    }
  }, {
    key: "hovereds",
    get: function get() {
      return this.filterByState("hovered");
    }
  }, {
    key: "selecteds",
    get: function get() {
      return this.filterByState("selected");
    }
  }]);
  return AttachmentsController;
}();

var _default = AttachmentsController;
exports.default = _default;