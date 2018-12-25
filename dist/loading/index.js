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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _log = require("../utils/log");

var _containers = require("../components/containers");

var _text = require("../components/text");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  height: inherit;\n  border-radius: inherit;\n  width: ", "\n  background-color: ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ProgressBar = _styledComponents.default.span(_templateObject(), function (props) {
  return props.width ? props.width : "1%";
}, function (props) {
  return props.backgroundColor ? props.backgroundColor : "#75b800";
});

var Loading =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Loading, _PureComponent);

  function Loading(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Loading);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Loading).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      percentComplete: 1,
      backgroundColor: "#75b800",
      showLoading: true
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "animateBar", function () {
      var percentComplete = _this.state.percentComplete;

      if (percentComplete >= 100) {
        _this.setState({
          percentComplete: 100,
          backgroundColor: "blue"
        });
      }

      _this.frameID = requestAnimationFrame(_this.animateBar);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onStart", function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$title = _ref.title,
          title = _ref$title === void 0 ? "Downloading..." : _ref$title;

      _this.setState({
        title: title
      });

      if (_this.frameID !== null) return;

      _this.animateBar();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onLoad", function () {
      this.setState({
        percentComplete: 0
      });

      if (this.props.last) {
        this.setState({
          showLoading: false
        });
        cancelAnimationFrame(this.frameID);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onError", function (e) {
      (0, _log.devlogerror)(e);
      this.setState({
        backgroundColor: "red",
        title: "Error!"
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onProgress", function (_ref2) {
      var loaded = _ref2.loaded,
          total = _ref2.total;

      _this.setState({
        percentComplete: loaded / total * 100
      });
    });
    _this.frameID = null;
    return _this;
  }

  (0, _createClass2.default)(Loading, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          percentComplete = _this$state.percentComplete,
          showLoading = _this$state.showLoading,
          backgroundColor = _this$state.backgroundColor,
          title = _this$state.title;
      if (!showLoading) return null;
      return _react.default.createElement(_containers.CenteredOverlay, null, _react.default.createElement(_text.SubTitle, null, title), _react.default.createElement(_containers.LoadingBar, null, _react.default.createElement(ProgressBar, {
        width: "".concat(percentComplete, "%"),
        backgroundColor: backgroundColor
      })));
    }
  }]);
  return Loading;
}(_react.PureComponent);

(0, _defineProperty2.default)(Loading, "propTypes", {
  last: _propTypes.default.bool
});
(0, _defineProperty2.default)(Loading, "defaultProps", {
  last: true
});
var _default = Loading;
exports.default = _default;