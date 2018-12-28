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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _containers = require("../components/containers");

var _text = require("../components/text");

var _form = require("../components/form");

var _config = _interopRequireDefault(require("../config"));

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  height: ", "px;\n  width: ", "px;;\n  line-height: 1.499;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-weight: 400;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  font-size: 14px;\n  border-radius: 100%;\n  user-select: none;\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  position: relative;\n  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);\n  color: rgba(0, 0, 0, 0.65);\n  background-color: ", ";\n  border-color: ", ";\n  outline: none;\n  :active {\n    background-color: #38b1ea !important;\n    border-color: #4062d4;\n  }\n  :hover {\n    background-color: #d9d9d9;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

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

var Button = _styledComponents.default.button(_templateObject3(), function (_ref) {
  var radius = _ref.radius;
  return radius ? radius : "50";
}, function (_ref2) {
  var radius = _ref2.radius;
  return radius ? radius : "50";
}, function (_ref3) {
  var selected = _ref3.selected;
  return selected ? "#38b1ea !important" : "#fff";
}, function (_ref4) {
  var selected = _ref4.selected;
  return selected ? "#4062d4 !important" : "#d9d9d9";
});

var InfoPanel =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(InfoPanel, _PureComponent);

  function InfoPanel(props) {
    var _this;

    (0, _classCallCheck2.default)(this, InfoPanel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InfoPanel).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      show: false,
      title: "",
      content: "",
      editing: _config.default.object.editing,
      replacing: _config.default.object.replacing,
      titleHeight: 10,
      contentHeight: 10
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "showPanel", function (_ref5) {
      var title = _ref5.title,
          content = _ref5.content;

      _this.setState(function () {
        return {
          show: true,
          title: title,
          content: content
        };
      });

      _this.prepareForm();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "prepareForm", function () {
      if (!_this.state.editing) return;

      _this.autoGrow("title");

      _this.autoGrow("content");

      _this.titleElement.current.focus();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "hidePanel", function () {
      _this.setState(function () {
        return {
          show: false,
          title: "",
          content: ""
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleWrite", function (key, value) {
      _this.setState((0, _defineProperty2.default)({}, key, value), function () {
        _config.default.controllers.attachmentsController.updateSelectedData((0, _defineProperty2.default)({}, key, value));

        _this.autoGrow(key);
      });
    });
    _this.titleElement = (0, _react.createRef)();
    _this.contentElement = (0, _react.createRef)();
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
    key: "autoGrow",
    value: function autoGrow(key) {
      var _this3 = this;

      this.setState((0, _defineProperty2.default)({}, "".concat(key, "Height"), 5), function () {
        _this3.setState((0, _defineProperty2.default)({}, "".concat(key, "Height"), _this3["".concat(key, "Element")].current.scrollHeight));
      });
    }
  }, {
    key: "handleMoveAttachment",
    value: function handleMoveAttachment(_ref6) {
      var x = _ref6.x,
          y = _ref6.y,
          z = _ref6.z;

      _config.default.controllers.attachmentsController.moveSelectedObject({
        x: x,
        y: y,
        z: z
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          show = _this$state.show,
          title = _this$state.title,
          content = _this$state.content,
          editing = _this$state.editing,
          replacing = _this$state.replacing,
          titleHeight = _this$state.titleHeight,
          contentHeight = _this$state.contentHeight;
      return _react.default.createElement(_containers.Overlay, {
        hidden: !show,
        width: "300px"
      }, _react.default.createElement(_containers.Panel, null, !editing ? [_react.default.createElement(_text.Title, {
        key: "title"
      }, title), _react.default.createElement(_text.Text, {
        key: "content"
      }, content)] : [_react.default.createElement(_form.TitleInput, {
        key: "title",
        ref: this.titleElement,
        value: title,
        onChange: function onChange(_ref7) {
          var value = _ref7.target.value;
          return _this4.handleWrite("title", value);
        },
        height: titleHeight
      }), _react.default.createElement(_form.ContentInput, {
        key: "content",
        ref: this.contentElement,
        value: content,
        onChange: function onChange(_ref8) {
          var value = _ref8.target.value;
          return _this4.handleWrite("content", value);
        },
        height: contentHeight
      }), _react.default.createElement("hr", {
        key: "divider"
      }), _react.default.createElement(Row, {
        key: "options"
      }, _react.default.createElement(Button, {
        onClick: this.handleChangeDefaultLook
      }, _react.default.createElement("svg", {
        viewBox: "0 0 60 60",
        width: "30px",
        height: "30px"
      }, _react.default.createElement("path", {
        d: "M40.693,17.777H36v-5c0-1.654-1.346-3-3-3H1c-0.552,0-1,0.447-1,1s0.448,1,1,1h32c0.551,0,1,0.448,1,1v5H3.307   C1.483,17.777,0,19.261,0,21.084v25.387c0,1.823,1.483,3.307,3.307,3.307h37.386c1.824,0,3.307-1.483,3.307-3.307V21.084   C44,19.261,42.517,17.777,40.693,17.777z"
      }), _react.default.createElement("path", {
        d: "M56.234,17.332c-0.545,0-1.077,0.117-1.58,0.35L46,22.138v23.279l8.654,4.456c0.503,0.232,1.035,0.35,1.58,0.35   c2.076,0,3.766-1.69,3.766-3.77V21.102C60,19.022,58.311,17.332,56.234,17.332z"
      }))), _react.default.createElement(Button, {
        onClick: this.handleToogleReplace,
        selected: replacing
      }, _react.default.createElement("svg", {
        width: "30px",
        height: "30px",
        viewBox: "0 0 430.114 430.114"
      }, _react.default.createElement("path", {
        d: "M356.208,107.051c-1.531-5.738-4.64-11.852-6.94-17.205C321.746,23.704,261.611,0,213.055,0   C148.054,0,76.463,43.586,66.905,133.427v18.355c0,0.766,0.264,7.647,0.639,11.089c5.358,42.816,39.143,88.32,64.375,131.136   c27.146,45.873,55.314,90.999,83.221,136.106c17.208-29.436,34.354-59.259,51.17-87.933c4.583-8.415,9.903-16.825,14.491-24.857   c3.058-5.348,8.9-10.696,11.569-15.672c27.145-49.699,70.838-99.782,70.838-149.104v-20.262   C363.209,126.938,356.581,108.204,356.208,107.051z M214.245,199.193c-19.107,0-40.021-9.554-50.344-35.939   c-1.538-4.2-1.414-12.617-1.414-13.388v-11.852c0-33.636,28.56-48.932,53.406-48.932c30.588,0,54.245,24.472,54.245,55.06   C270.138,174.729,244.833,199.193,214.245,199.193z"
      }))), _react.default.createElement(Button, {
        onClick: this.handleRemoveAttachment
      }, _react.default.createElement("svg", {
        width: "30px",
        height: "30px",
        viewBox: "0 0 408.483 408.483"
      }, _react.default.createElement("path", {
        d: "M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316    H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293    c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329    c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355    c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356    c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"
      }), _react.default.createElement("path", {
        d: "M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916    c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"
      })))), _react.default.createElement(Column, {
        key: "dx-move"
      }, _react.default.createElement(Row, null, _react.default.createElement(_text.SubTitle, null, "Posici\xF3n")), _react.default.createElement(Row, null, _react.default.createElement(Column, null, _react.default.createElement(Button, {
        radius: "30",
        onClick: function onClick() {
          return _this4.handleMoveAttachment({
            x: 1
          });
        }
      }, "+"), _react.default.createElement(_text.Text, null, "X"), _react.default.createElement(Button, {
        radius: "30",
        onClick: function onClick() {
          return _this4.handleMoveAttachment({
            x: -1
          });
        }
      }, "-")), _react.default.createElement(Column, null, _react.default.createElement(Button, {
        radius: "30",
        onClick: function onClick() {
          return _this4.handleMoveAttachment({
            y: 1
          });
        }
      }, "+"), _react.default.createElement(_text.Text, null, "Y"), _react.default.createElement(Button, {
        radius: "30",
        onClick: function onClick() {
          return _this4.handleMoveAttachment({
            y: -1
          });
        }
      }, "-")), _react.default.createElement(Column, null, _react.default.createElement(Button, {
        radius: "30",
        onClick: function onClick() {
          return _this4.handleMoveAttachment({
            z: 1
          });
        }
      }, "+"), _react.default.createElement(_text.Text, null, "Z"), _react.default.createElement(Button, {
        radius: "30",
        onClick: function onClick() {
          return _this4.handleMoveAttachment({
            z: -1
          });
        }
      }, "-"))))]));
    }
  }]);
  return InfoPanel;
}(_react.PureComponent);

var _default = InfoPanel;
exports.default = _default;