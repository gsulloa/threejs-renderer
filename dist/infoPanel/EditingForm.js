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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _form = require("../components/form");

var _config = _interopRequireDefault(require("../config"));

var _containers = require("../components/containers");

var MAX_LENGTH = {
  title: 30,
  content: 300
};

var EditingForm =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(EditingForm, _Component);

  function EditingForm() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, EditingForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(EditingForm)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      titleHeight: 0,
      contentHeight: 0,
      title: _this.props.title,
      content: _this.props.content,
      uuid: _this.props.uuid,
      change: true
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "titleElement", (0, _react.createRef)());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "contentElement", (0, _react.createRef)());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleWrite", function (key, value) {
      var text = value.slice(0, MAX_LENGTH[key]);

      _this.setState((0, _defineProperty2.default)({}, key, text), function () {
        _config.default.controllers.attachmentsController.updateSelectedData((0, _defineProperty2.default)({}, key, text));

        _this.autoGrow(key);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "autoGrow", function (key) {
      _this.reduceHeight(key, function () {
        return _this.growHeight(key);
      });
    });
    return _this;
  }

  (0, _createClass2.default)(EditingForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.autoGrow("title");
      this.autoGrow("content");
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.state.change) {
        this.autoGrow("title");
        this.autoGrow("content");
      }
    }
  }, {
    key: "reduceHeight",
    value: function reduceHeight(key) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      this.setState((0, _defineProperty2.default)({}, "".concat(key, "Height"), 5), cb);
    }
  }, {
    key: "growHeight",
    value: function growHeight(key) {
      this.setState((0, _defineProperty2.default)({}, "".concat(key, "Height"), this["".concat(key, "Element")].current.scrollHeight));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var show = this.props.show;
      if (!show) return null;
      var _this$state = this.state,
          title = _this$state.title,
          content = _this$state.content,
          titleHeight = _this$state.titleHeight,
          contentHeight = _this$state.contentHeight;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_form.TitleInput, {
        key: "title",
        ref: this.titleElement,
        value: title,
        onChange: function onChange(_ref) {
          var value = _ref.target.value;
          return _this2.handleWrite("title", value);
        },
        height: titleHeight
      }), _react.default.createElement(_containers.MaxLengthContainer, null, title.length, " / ", MAX_LENGTH.title), _react.default.createElement(_form.ContentInput, {
        key: "content",
        ref: this.contentElement,
        value: content,
        onChange: function onChange(_ref2) {
          var value = _ref2.target.value;
          return _this2.handleWrite("content", value);
        },
        height: contentHeight
      }), _react.default.createElement(_containers.MaxLengthContainer, null, content.length, " / ", MAX_LENGTH.content));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        title: state.uuid === props.uuid ? state.title : props.title,
        content: state.uuid === props.uuid ? state.content : props.content,
        uuid: props.uuid,
        change: state.uuid === props.uuid
      };
    }
  }]);
  return EditingForm;
}(_react.Component);

(0, _defineProperty2.default)(EditingForm, "propTypes", {
  uuid: _propTypes.default.string,
  title: _propTypes.default.string,
  content: _propTypes.default.string,
  show: _propTypes.default.bool
});
var _default = EditingForm;
exports.default = _default;