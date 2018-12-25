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

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  line-height: 1.499;\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 0 15px;\n  font-size: 14px;\n  border-radius: 4px;\n  height: 32px;\n  user-select: none;\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  position: relative;\n  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);\n  color: rgba(0, 0, 0, 0.65);\n  background-color: ", ";\n  border-color: ", ";\n  outline: none;\n  :active {\n    background-color: #008 !important;\n    border-color: #4062d4;\n  }\n  :hover {\n    background-color: #d9d9d9;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-flow: column wrap;\n  justify-content: space-around;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Column = _styledComponents.default.div(_templateObject());

var Button = _styledComponents.default.button(_templateObject2(), function (_ref) {
  var selected = _ref.selected;
  return selected ? "#008 !important" : "#fff";
}, function (_ref2) {
  var selected = _ref2.selected;
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "showPanel", function (_ref3) {
      var title = _ref3.title,
          content = _ref3.content;

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
        onChange: function onChange(_ref4) {
          var value = _ref4.target.value;
          return _this4.handleWrite("title", value);
        },
        height: titleHeight
      }), _react.default.createElement(_form.ContentInput, {
        key: "content",
        ref: this.contentElement,
        value: content,
        onChange: function onChange(_ref5) {
          var value = _ref5.target.value;
          return _this4.handleWrite("content", value);
        },
        height: contentHeight
      }), _react.default.createElement("hr", {
        key: "divider"
      }), _react.default.createElement(Column, {
        key: "options"
      }, _react.default.createElement(Button, {
        onClick: this.handleChangeDefaultLook
      }, "Set Camera as Default"), _react.default.createElement(Button, {
        onClick: this.handleToogleReplace,
        selected: replacing
      }, "Replace"), _react.default.createElement(Button, {
        onClick: this.handleRemoveAttachment
      }, "Remove"))]));
    }
  }]);
  return InfoPanel;
}(_react.PureComponent);

var _default = InfoPanel;
exports.default = _default;