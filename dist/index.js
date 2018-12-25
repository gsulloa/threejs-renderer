"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Loading", {
  enumerable: true,
  get: function get() {
    return _loading2.default;
  }
});
Object.defineProperty(exports, "InfoPanel", {
  enumerable: true,
  get: function get() {
    return _infoPanel.default;
  }
});
Object.defineProperty(exports, "ConfigGui", {
  enumerable: true,
  get: function get() {
    return _gui.default;
  }
});
Object.defineProperty(exports, "Controls", {
  enumerable: true,
  get: function get() {
    return _controls.default;
  }
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var THREE = _interopRequireWildcard(require("three"));

var _tween = _interopRequireDefault(require("@tweenjs/tween.js"));

var _modelLoader = _interopRequireDefault(require("./modelLoader"));

var _objectController = _interopRequireDefault(require("./objectController"));

var _attachmentsController = _interopRequireDefault(require("./attachmentsController"));

var _config = _interopRequireDefault(require("./config"));

var _loading2 = _interopRequireDefault(require("./loading"));

var _infoPanel = _interopRequireDefault(require("./infoPanel"));

var _gui = _interopRequireDefault(require("./config/gui"));

var _controls = _interopRequireDefault(require("./controls"));

var Renderer3D = function Renderer3D(_ref) {
  var _this = this;

  var modelUrl = _ref.modelUrl,
      _loading = _ref.loading,
      infoPanel = _ref.infoPanel,
      configGui = _ref.configGui,
      _container = _ref.container,
      _ref$initial = _ref.initial;
  _ref$initial = _ref$initial === void 0 ? {} : _ref$initial;

  var _ref$initial$orbit = _ref$initial.orbit,
      orbit = _ref$initial$orbit === void 0 ? {} : _ref$initial$orbit,
      _ref$initial$attachme = _ref$initial.attachments,
      _attachments = _ref$initial$attachme === void 0 ? [] : _ref$initial$attachme,
      _ref$ambientLight = _ref.ambientLight,
      _ambientLight = _ref$ambientLight === void 0 ? {} : _ref$ambientLight,
      _ref$callbacks = _ref.callbacks;

  _ref$callbacks = _ref$callbacks === void 0 ? {} : _ref$callbacks;
  var addAttachment = _ref$callbacks.addAttachment,
      removeAttachment = _ref$callbacks.removeAttachment,
      updateAttachmentData = _ref$callbacks.updateAttachmentData,
      updateAttachmentDefaultScreen = _ref$callbacks.updateAttachmentDefaultScreen,
      updateAttachmentPosition = _ref$callbacks.updateAttachmentPosition,
      updateDefaultOrbit = _ref$callbacks.updateDefaultOrbit,
      _ref$editable = _ref.editable,
      editable = _ref$editable === void 0 ? false : _ref$editable;
  (0, _classCallCheck2.default)(this, Renderer3D);
  (0, _defineProperty2.default)(this, "prepareEnvironment", function (_ref2) {
    var _ref2$camera = _ref2.camera;
    _ref2$camera = _ref2$camera === void 0 ? {} : _ref2$camera;
    var _ref2$camera$fov = _ref2$camera.fov,
        fov = _ref2$camera$fov === void 0 ? 50 : _ref2$camera$fov,
        _ref2$camera$aspect = _ref2$camera.aspect,
        aspect = _ref2$camera$aspect === void 0 ? window.innerWidth / window.innerHeight : _ref2$camera$aspect,
        _ref2$camera$near = _ref2$camera.near,
        near = _ref2$camera$near === void 0 ? 0.1 : _ref2$camera$near,
        _ref2$camera$far = _ref2$camera.far,
        far = _ref2$camera$far === void 0 ? 2000 : _ref2$camera$far,
        _ref2$camera$position = _ref2$camera.positionZ,
        positionZ = _ref2$camera$position === void 0 ? 600 : _ref2$camera$position,
        _ref2$ambientLight = _ref2.ambientLight;
    _ref2$ambientLight = _ref2$ambientLight === void 0 ? {} : _ref2$ambientLight;
    var _ref2$ambientLight$co = _ref2$ambientLight.color,
        color = _ref2$ambientLight$co === void 0 ? 0xffffff : _ref2$ambientLight$co,
        _ref2$ambientLight$in = _ref2$ambientLight.intensity,
        intensity = _ref2$ambientLight$in === void 0 ? 0.8 : _ref2$ambientLight$in;
    _this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    _this.camera.position.z = positionZ;
    _this.scene = new THREE.Scene();
    var ambientLight = new THREE.AmbientLight(color, intensity);

    _this.scene.add(ambientLight);

    _this.scene.add(_this.camera);

    _this.renderer = new THREE.WebGLRenderer();
  });
  (0, _defineProperty2.default)(this, "loadModel",
  /*#__PURE__*/
  function () {
    var _ref3 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(_ref4) {
      var url, _ref4$initial, _ref4$initial$orbit, _ref4$initial$orbit$p, position, _ref4$initial$orbit$r, rotation, _ref4$initial$attachm, attachments, loading, object;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = _ref4.url, _ref4$initial = _ref4.initial;
              _ref4$initial = _ref4$initial === void 0 ? {} : _ref4$initial;
              _ref4$initial$orbit = _ref4$initial.orbit, _ref4$initial$orbit$p = _ref4$initial$orbit.position, position = _ref4$initial$orbit$p === void 0 ? {
                x: 0,
                y: 0,
                z: 0
              } : _ref4$initial$orbit$p, _ref4$initial$orbit$r = _ref4$initial$orbit.rotation, rotation = _ref4$initial$orbit$r === void 0 ? {
                x: 0,
                y: 0,
                z: 0
              } : _ref4$initial$orbit$r, _ref4$initial$attachm = _ref4$initial.attachments, attachments = _ref4$initial$attachm === void 0 ? [] : _ref4$initial$attachm, loading = _ref4.loading;
              _context.next = 5;
              return new _modelLoader.default({
                loading: loading
              }).load({
                url: url
              });

            case 5:
              object = _context.sent;
              _this.object = object;
              object.position.y = 0;

              _this.scene.add(object);

              _this.attachments = new THREE.Group();

              _this.scene.add(_this.attachments);

              _config.default.controllers.attachmentsController = new _attachmentsController.default({
                model: _this.object.children[0],
                attachments: _this.attachments,
                camera: _this.camera,
                domElement: _this.renderer.domElement,
                initialAttachments: attachments,
                callbacks: _this.callbacks
              });
              _config.default.controllers.objectController = new _objectController.default({
                camera: _this.camera,
                scene: _this.scene,
                object: _this.object,
                domElement: _this.renderer.domElement,
                initial: {
                  position: position,
                  rotation: rotation
                },
                attachments: _this.attachments,
                callbacks: _this.callbacks
              });

              _this.renderer.domElement.addEventListener("click", _this.handleMouseClick);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "render", function (_ref5) {
    var container = _ref5.container;

    _this.renderer.setPixelRatio(window.devicePixelRatio);

    _this.renderer.setSize(container.clientWidth, container.clientHeight);

    container.appendChild(_this.renderer.domElement);
  });
  (0, _defineProperty2.default)(this, "onWindowResize", function () {
    _this.windowHalfX = window.innerWidth / 2;
    _this.windowHalfY = window.innerHeight / 2;

    _this.camera.updateProjectionMatrix();
  });
  (0, _defineProperty2.default)(this, "animate", function () {
    requestAnimationFrame(_this.animate);

    _this.renderer.render(_this.scene, _this.camera);

    _tween.default.update();
  });
  (0, _defineProperty2.default)(this, "handleMouseClick", function (e) {
    if (_config.default.object.replacing && _config.default.object.editing) {
      _this.handleReplaceSelected(e);

      return;
    }

    var _config$controllers = _config.default.controllers,
        objectController = _config$controllers.objectController,
        attachmentsController = _config$controllers.attachmentsController;

    var object = _this.handleAttachmentSelect(e);

    if (object === null && _config.default.object.editing && !_config.default.controllers.attachmentsController.selecteds.length) {
      var position = objectController.getPositionInObject({
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        domElementHeight: _this.renderer.domElement.height,
        domElementWidth: _this.renderer.domElement.width
      });
      var attachment = attachmentsController.addSphere({
        position: position
      });

      if (attachment) {
        attachmentsController.selectObject(attachment);

        _this.lookObject(attachment);
      }
    }
  });
  (0, _defineProperty2.default)(this, "handleAttachmentSelect", function (_ref6) {
    var offsetX = _ref6.offsetX,
        offsetY = _ref6.offsetY;
    var selectAttachment = _config.default.controllers.attachmentsController.selectAttachment;
    var object = selectAttachment({
      offsetX: offsetX,
      offsetY: offsetY
    });

    if (object) {
      _this.lookObject(object);
    } else if (object !== null) {
      _this.resetControls();

      _this.infoPanel.hidePanel();
    }

    return object;
  });
  (0, _defineProperty2.default)(this, "handleReplaceSelected", function (_ref7) {
    var offsetX = _ref7.offsetX,
        offsetY = _ref7.offsetY;

    var position = _config.default.controllers.objectController.getPositionInObject({
      offsetX: offsetX,
      offsetY: offsetY,
      domElementHeight: _this.renderer.domElement.height,
      domElementWidth: _this.renderer.domElement.width
    });

    _config.default.controllers.attachmentsController.replaceSelected(position);
  });
  (0, _defineProperty2.default)(this, "lookObject", function (object) {
    var _object$data = object.data,
        screenPosition = _object$data.screenPosition,
        title = _object$data.title,
        content = _object$data.content;

    if (screenPosition) {
      _config.default.controllers.objectController.look(screenPosition);
    } else {
      _this.resetControls();
    }

    _this.infoPanel.showPanel({
      title: title,
      content: content
    });
  });
  (0, _defineProperty2.default)(this, "resetControls", function () {
    _config.default.controllers.objectController.resetControls();
  });
  (0, _defineProperty2.default)(this, "getCurrentPosition", function () {
    return _config.default.orbit;
  });
  (0, _defineProperty2.default)(this, "setNewInitialPosition", function (_ref8) {
    var rotation = _ref8.rotation,
        position = _ref8.position;

    _config.default.controllers.objectController.updateInitial({
      rotation: rotation,
      position: position
    });
  });
  (0, _defineProperty2.default)(this, "setCurrentAsInitial", function () {
    var _this$getCurrentPosit = _this.getCurrentPosition(),
        rotation = _this$getCurrentPosit.rotation,
        position = _this$getCurrentPosit.position;

    _this.setNewInitialPosition({
      rotation: rotation,
      position: position
    });
  });
  this.callbacks = {
    addAttachment: addAttachment,
    removeAttachment: removeAttachment,
    updateAttachmentData: updateAttachmentData,
    updateAttachmentDefaultScreen: updateAttachmentDefaultScreen,
    updateAttachmentPosition: updateAttachmentPosition,
    updateDefaultOrbit: updateDefaultOrbit
  };
  _config.default.object.editing = editable;
  this.infoPanel = infoPanel;
  this.prepareEnvironment({
    camera: {
      aspect: _container.clientWidth / _container.clientHeight
    },
    ambientLight: _ambientLight
  });
  this.loadModel({
    initial: {
      orbit: orbit,
      attachments: _attachments
    },
    loading: _loading,
    url: modelUrl
  }).then(function () {
    if (!configGui) return;
    configGui.addAttachmentConfig();
  });
  this.render({
    container: _container
  });
  window.addEventListener("resize", function () {
    return _this.onWindowResize({
      container: _container
    });
  }, false);
};

var _default = Renderer3D;
exports.default = _default;