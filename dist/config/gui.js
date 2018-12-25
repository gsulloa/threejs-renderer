"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _dat = require("dat.gui");

var _ = _interopRequireDefault(require("./"));

var _containers = require("../components/containers");

var ConfigGui =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ConfigGui, _Component);

  function ConfigGui(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ConfigGui);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConfigGui).call(this, props));
    _this.container = (0, _react.createRef)();
    _this.gui = new _dat.GUI({
      autoPlace: false
    });
    _this.configs = {
      attachments: _this.gui.addFolder("Attachments")
    };
    _this.state = {
      gui: _this.gui.domElement
    };
    return _this;
  }

  (0, _createClass2.default)(ConfigGui, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.container.current.appendChild(this.state.gui);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (!nextState.gui) return true;
      return false;
    }
  }, {
    key: "addAttachmentConfig",
    value: function addAttachmentConfig() {
      var attachmentsController = _.default.controllers.attachmentsController;
      var attachments = this.configs.attachments;
      var COLORS = {
        Red: "#d94545",
        Pink: "#fae",
        Blue: "#33f",
        White: "#fff"
      };
      if (!attachmentsController || !attachments) return;
      attachments.add(_.default.attachment, "defaultColor", (0, _objectSpread2.default)({}, COLORS)).name("Default").listen();
      attachments.add(_.default.attachment, "hoveredColor", (0, _objectSpread2.default)({}, COLORS)).name("Hovered").listen();
      attachments.add(_.default.attachment, "selectedColor", (0, _objectSpread2.default)({}, COLORS)).name("Selected").listen();
      attachments.add(_.default.attachment, "scale", 1, 10, 1).name("Radius").listen().onChange(attachmentsController.updateScale);
      attachments.add(_.default.attachment, "visibility").name("Visible").listen().onChange(attachmentsController.updateVisible);
      attachments.open();
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_containers.EndOverlay, {
        ref: this.container
      });
    }
  }]);
  return ConfigGui;
}(_react.Component);

var _default = ConfigGui;
exports.default = _default;