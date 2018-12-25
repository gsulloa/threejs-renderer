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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var THREE = _interopRequireWildcard(require("three"));

var _config = _interopRequireDefault(require("../config"));

var _log = require("../utils/log");

var _font = _interopRequireDefault(require("./font"));

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
      return _this.attachments.children.filter(function (attachment) {
        return attachment.state === state;
      });
    });
    (0, _defineProperty2.default)(this, "findAttachmentIndex", function (model) {
      return _this.attachments.children.findIndex(function (a) {
        return a === model;
      });
    });
    (0, _defineProperty2.default)(this, "addAttachment", function (_ref2) {
      var position = _ref2.position,
          model = _ref2.model;

      if (position && model) {
        var x = position.x,
            y = position.y,
            z = position.z;
        var transparentModel = new THREE.Mesh();
        transparentModel.visible = false;
        transparentModel.position.copy({
          x: x,
          y: y,
          z: z
        });

        _this.model.add(transparentModel);

        var worldPosition = new THREE.Vector3().copy(_this.model.localToWorld(new THREE.Vector3(x, y, z)));
        model.position.copy(worldPosition);
        model.reference = transparentModel;

        _this.attachments.add(model);

        return model;
      }
    });
    (0, _defineProperty2.default)(this, "addSphere", function (_ref3) {
      var position = _ref3.position,
          _ref3$data = _ref3.data,
          data = _ref3$data === void 0 ? {
        title: "Change me!",
        content: "Change me description!",
        screenPosition: (0, _objectSpread2.default)({}, _config.default.orbit)
      } : _ref3$data;
      var withCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var _Config$attachment = _config.default.attachment,
          scale = _Config$attachment.scale,
          material = _Config$attachment.material;
      var radius = 1;
      var segments = 32;
      var geometry = new THREE.CircleGeometry(radius, segments, segments);
      var sphere = new THREE.Mesh(geometry, material.default);
      sphere.scale.set(scale, scale, scale);
      sphere.data = data;
      sphere.state = "default";

      _this.addNumber({
        model: sphere
      });

      if (withCallback && _this.callbacks.addAttachment) _this.callbacks.addAttachment((0, _objectSpread2.default)({}, sphere.data, {
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
        var _attachment$children = (0, _slicedToArray2.default)(attachment.children, 1),
            number = _attachment$children[0];

        attachment.remove(number);

        _this.addNumber({
          model: attachment
        });
      });
    });
    (0, _defineProperty2.default)(this, "intersectAttachments", function (_ref4) {
      var offsetX = _ref4.offsetX,
          offsetY = _ref4.offsetY;
      var domElementHeight = _this.domElement.height;
      var domElementWidth = _this.domElement.width;

      try {
        var camera = _this.camera,
            attachments = _this.attachments;
        var vector = new THREE.Vector2(offsetX / domElementWidth * 2 - 1, -(offsetY / domElementHeight) * 2 + 1);
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(vector, camera);
        var intersects = raycaster.intersectObjects(attachments.children);
        return intersects;
      } catch (e) {
        (0, _log.devlogerror)(e);
      }
    });
    (0, _defineProperty2.default)(this, "setHovereds", function (_ref5) {
      var offsetX = _ref5.offsetX,
          offsetY = _ref5.offsetY;

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
    (0, _defineProperty2.default)(this, "selectAttachment", function (_ref6) {
      var offsetX = _ref6.offsetX,
          offsetY = _ref6.offsetY;

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
              object.state = "hovered";
              object.material = _config.default.attachment.material.hovered;
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
    (0, _defineProperty2.default)(this, "selectObject", function (object) {
      _this.selecteds.forEach(function (attachment) {
        attachment.state = "default";
        attachment.material = _config.default.attachment.material.default;
      });

      object.state = "selected";
      object.material = _config.default.attachment.material.selected;
    });
    (0, _defineProperty2.default)(this, "updateScale", function () {
      var scale = _config.default.attachment.scale;

      _this.attachments.children.forEach(function (attachment) {
        attachment.scale.set(scale, scale, scale);
      });
    });
    (0, _defineProperty2.default)(this, "updateVisible", function () {
      var visibility = _config.default.attachment.visibility;

      _this.attachments.children.forEach(function (attachment) {
        attachment.visible = visibility;
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
    document.addEventListener("mousemove", function (_ref7) {
      var offsetX = _ref7.offsetX,
          offsetY = _ref7.offsetY;

      _this.setHovereds({
        offsetX: offsetX,
        offsetY: offsetY
      });
    });
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
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          model = _ref8.model;

      if (!model) return;
      var number = this.id.next().value;
      var textMaterial = new THREE.MeshBasicMaterial({
        color: "black"
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