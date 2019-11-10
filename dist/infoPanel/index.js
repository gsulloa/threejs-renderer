"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _containers = require("../components/containers");

var _text = require("../components/text");

var _button = require("../components/button");

var _config = _interopRequireDefault(require("../config"));

var _EditingForm = _interopRequireDefault(require("./EditingForm"));

var _icons = require("../assets/icons");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-flow: column nowrap;\n  justify-content: center;\n  align-items: center;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: space-around;\n  width: 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Row = _styledComponents.default.div(_templateObject());

var Column = _styledComponents.default.div(_templateObject2());

var InfoPanel =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(InfoPanel, _PureComponent);

  function InfoPanel() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, InfoPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(InfoPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      show: false,
      title: "",
      content: "",
      uuid: "",
      editing: _config.default.object.editing,
      replacing: _config.default.object.replacing,
      position: {}
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "showPanel", function (_ref) {
      var title = _ref.title,
          content = _ref.content,
          uuid = _ref.uuid,
          _ref$position = _ref.position,
          x = _ref$position.x,
          y = _ref$position.y,
          z = _ref$position.z;

      _this.setState(function () {
        return {
          show: true,
          title: title,
          content: content,
          uuid: uuid,
          position: {
            x: Math.floor(x),
            y: Math.floor(y),
            z: Math.floor(z)
          }
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "hidePanel", function () {
      _this.setState(function () {
        return {
          show: false,
          title: "",
          content: "",
          uuid: "",
          position: {}
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChangeDefaultLook", function () {
      _config.default.controllers.attachmentsController.updateScreenPosition();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleRemoveAttachment", function () {
      if (window.confirm("Do yo really want to remove ".concat(_this.state.title))) {
        _this.hidePanel();

        _config.default.controllers.attachmentsController.removeSelectedAttachment();

        _config.default.controllers.objectController.resetControls();

        _config.default.controllers.attachmentsController.replaceAllNumbers();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleToogleReplace", function () {
      _config.default.object.replacing = !_config.default.object.replacing;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClose", function () {
      _this.hidePanel(); // config.controllers.attachmentsController.deselectObjects()
      // config.controllers.objectController.resetControls()

    });
    return _this;
  }

  (0, _createClass2.default)(InfoPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _config.default.object._editing.subscribe(function () {
        _this2.setState({
          editing: _config.default.object.editing
        });
      });

      _config.default.object._replacing.subscribe(function () {
        _this2.setState({
          replacing: _config.default.object.replacing
        });
      });
    }
  }, {
    key: "handleMoveAttachment",
    value: function handleMoveAttachment(_ref2) {
      var _ref2$x = _ref2.x,
          x = _ref2$x === void 0 ? 0 : _ref2$x,
          _ref2$y = _ref2.y,
          y = _ref2$y === void 0 ? 0 : _ref2$y,
          _ref2$z = _ref2.z,
          z = _ref2$z === void 0 ? 0 : _ref2$z;

      _config.default.controllers.attachmentsController.moveSelectedObject({
        x: x,
        y: y,
        z: z
      });

      var position = this.state.position;
      this.setState({
        position: {
          x: position.x + x,
          y: position.y + y,
          z: position.z + z
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          show = _this$state.show,
          title = _this$state.title,
          content = _this$state.content,
          editing = _this$state.editing,
          replacing = _this$state.replacing,
          uuid = _this$state.uuid,
          _this$state$position = _this$state.position,
          x = _this$state$position.x,
          y = _this$state$position.y,
          z = _this$state$position.z;
      return _react.default.createElement(_containers.Overlay, {
        hidden: !show,
        width: "300px",
        smWidth: "100%"
      }, _react.default.createElement(_containers.Panel, null, !editing ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_text.Title, null, title), _react.default.createElement(_text.Text, null, content)) : show && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_EditingForm.default, {
        title: title,
        content: content,
        show: show,
        uuid: uuid
      }), _react.default.createElement("hr", null), _react.default.createElement(Row, null, _react.default.createElement(_containers.Tooltip, {
        text: "Guardar posici\xF3n inicial del marcador"
      }, _react.default.createElement(_button.InverseCircleButton, {
        onClick: this.handleChangeDefaultLook
      }, _react.default.createElement(_icons.SavePosition, {
        width: 30,
        height: 30
      }))), _react.default.createElement(_containers.Tooltip, {
        text: "Reposicionar marcador"
      }, _react.default.createElement(_button.InverseCircleButton, {
        onClick: this.handleToogleReplace,
        selected: replacing
      }, _react.default.createElement(_icons.NewTarget, {
        width: 30,
        height: 30
      }))), _react.default.createElement(_containers.Tooltip, {
        text: "Eliminar marcador"
      }, _react.default.createElement(_button.InverseCircleButton, {
        onClick: this.handleRemoveAttachment
      }, _react.default.createElement(_icons.Trash, {
        width: 30,
        height: 30
      })))), _react.default.createElement(Column, {
        key: "dx-move"
      }, _react.default.createElement(Row, null, _react.default.createElement(_text.SubTitle, null, "Posici\xF3n")), _react.default.createElement(Row, null, _react.default.createElement(Column, null, _react.default.createElement(_button.InverseCircleButton, {
        size: 30,
        onClick: function onClick() {
          return _this3.handleMoveAttachment({
            x: 1
          });
        }
      }, _react.default.createElement("span", null, "+")), _react.default.createElement(_text.Text, null, "X (", x, ")"), _react.default.createElement(_button.InverseCircleButton, {
        size: 30,
        onClick: function onClick() {
          return _this3.handleMoveAttachment({
            x: -1
          });
        }
      }, _react.default.createElement("span", null, "-"))), _react.default.createElement(Column, null, _react.default.createElement(_button.InverseCircleButton, {
        size: 30,
        onClick: function onClick() {
          return _this3.handleMoveAttachment({
            y: 1
          });
        }
      }, _react.default.createElement("span", null, "+")), _react.default.createElement(_text.Text, null, "Y (", y, ")"), _react.default.createElement(_button.InverseCircleButton, {
        size: 30,
        onClick: function onClick() {
          return _this3.handleMoveAttachment({
            y: -1
          });
        }
      }, _react.default.createElement("span", null, "-"))), _react.default.createElement(Column, null, _react.default.createElement(_button.InverseCircleButton, {
        size: 30,
        onClick: function onClick() {
          return _this3.handleMoveAttachment({
            z: 1
          });
        }
      }, _react.default.createElement("span", null, "+")), _react.default.createElement(_text.Text, null, "Z (", z, ")"), _react.default.createElement(_button.InverseCircleButton, {
        size: 30,
        onClick: function onClick() {
          return _this3.handleMoveAttachment({
            z: -1
          });
        }
      }, _react.default.createElement("span", null, "-")))))), _react.default.createElement(_button.InverseCircleButton, {
        onClick: this.handleClose
      }, "Cerrar")));
    }
  }]);
  return InfoPanel;
}(_react.PureComponent);

var _default = InfoPanel;
exports.default = _default;