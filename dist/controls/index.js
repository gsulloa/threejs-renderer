"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _containers = require("../components/containers");

var _button = require("../components/button");

var _form = require("../components/form");

var _config = _interopRequireDefault(require("../config"));

var _icons = require("../assets/icons");

var Controls =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Controls, _PureComponent);

  function Controls() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Controls);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Controls)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      rotate: {
        title: _react.default.createElement(_icons.Move360, {
          width: 30,
          height: 30
        }),
        onClick: function onClick() {
          _config.default.object.onMouseMove = ["rotate", "move"].filter(function (option) {
            return option !== _config.default.object.onMouseMove;
          })[0];

          _this.setState({
            rotate: (0, _objectSpread2.default)({}, _this.state.rotate, {
              selected: !_this.state.rotate.selected
            })
          });
        },
        selected: _config.default.object.onMouseMove === "rotate"
      },
      adding: {
        title: _react.default.createElement(_icons.AddPin, {
          width: 30,
          height: 30
        }),
        onClick: function onClick() {
          _config.default.object.add = !_config.default.object.add;

          _this.setState({
            adding: (0, _objectSpread2.default)({}, _this.state.adding, {
              selected: _config.default.object.add
            })
          });
        },
        selected: _config.default.object.add
      },
      visible: {
        title: _react.default.createElement(_icons.ViewPin, {
          width: 30,
          height: 30
        }),
        onClick: function onClick() {
          _config.default.attachment.visibility = !_config.default.attachment.visibility;
        }
      },
      changeInitial: {
        title: _react.default.createElement(_icons.SavePosition, {
          width: 30,
          height: 30
        }),
        onClick: function onClick() {
          _config.default.controllers.objectController.updateInitial({
            position: _config.default.orbit.position,
            rotation: _config.default.orbit.rotation
          });
        }
      },
      fullScreen: {
        title: _react.default.createElement("svg", {
          width: "30px",
          height: "30px",
          viewBox: "0 0 438.543 438.543"
        }, _react.default.createElement("path", {
          d: "M407.42,159.029c3.62,3.616,7.898,5.428,12.847,5.428c2.282,0,4.668-0.476,7.139-1.429   c7.426-3.235,11.136-8.853,11.136-16.846V18.276c0-4.949-1.807-9.231-5.428-12.847c-3.61-3.617-7.898-5.424-12.847-5.424H292.36   c-7.991,0-13.607,3.805-16.848,11.419c-3.23,7.423-1.902,13.99,4,19.698l41.111,41.112L219.271,173.589L117.917,72.231   l41.112-41.112c5.901-5.708,7.232-12.275,3.999-19.698C159.789,3.807,154.175,0,146.182,0H18.276C13.324,0,9.041,1.809,5.425,5.426   c-3.617,3.616-5.424,7.898-5.424,12.847v127.907c0,7.996,3.809,13.61,11.419,16.846c2.285,0.948,4.57,1.429,6.855,1.429   c4.948,0,9.229-1.812,12.847-5.427l41.112-41.109l101.354,101.354L72.234,320.622l-41.112-41.113   c-5.711-5.903-12.275-7.231-19.702-4.001c-7.614,3.241-11.419,8.856-11.419,16.854v127.906c0,4.948,1.807,9.229,5.424,12.847   c3.619,3.614,7.902,5.421,12.851,5.421h127.906c7.996,0,13.61-3.806,16.846-11.416c3.234-7.427,1.903-13.99-3.999-19.705   l-41.112-41.106L219.271,264.95l101.353,101.361l-41.114,41.11c-5.899,5.708-7.228,12.279-3.997,19.698   c3.237,7.617,8.856,11.423,16.851,11.423h127.907c4.948,0,9.232-1.813,12.847-5.428c3.613-3.613,5.42-7.898,5.42-12.847V292.362   c0-7.994-3.709-13.613-11.136-16.851c-7.802-3.23-14.462-1.903-19.985,4.004l-41.106,41.106L264.952,219.271L366.31,117.917   L407.42,159.029z"
        })),
        onClick: function onClick() {
          var element = document.querySelector("canvas").parentNode;

          if (element.requestFullscreen) {
            if (document.fullscreen) {
              document.exitFullscreen();
            } else {
              element.requestFullscreen();
            }
          }
        }
      },
      zoom: 500
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (_ref) {
      var optionTitle = _ref.title,
          onClick = _ref.onClick;

      var index = _this.state.options.findIndex(function (_ref2) {
        var title = _ref2.title;
        return title === optionTitle;
      });

      _this.deselectAll();

      onClick();

      _this.setState(function (state) {
        return {
          options: [].concat((0, _toConsumableArray2.default)(state.options.slice(0, index)), [(0, _objectSpread2.default)({}, state.options[index], {
            selected: true
          })], (0, _toConsumableArray2.default)(state.options.slice(index + 1)))
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "deselectAll", function () {
      _this.setState(function (state) {
        return {
          options: state.options.map(function (option) {
            return (0, _objectSpread2.default)({}, option, {
              selected: false
            });
          })
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "changeZoom", function (zoom) {
      _config.default.orbit.position = {
        z: zoom
      };
    });
    return _this;
  }

  (0, _createClass2.default)(Controls, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _config.default.orbit._position.subscribe(function (_ref3) {
        var zoom = _ref3.z;

        _this2.setState({
          zoom: zoom
        });
      });

      _config.default.attachment._visibility.subscribe(function (visibility) {
        var Component = visibility ? _icons.ViewPin : _icons.NoViewPin;

        _this2.setState({
          visible: (0, _objectSpread2.default)({}, _this2.state.visible, {
            title: _react.default.createElement(Component, {
              width: 30,
              height: 30
            })
          })
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          visible = _this$state.visible,
          adding = _this$state.adding,
          changeInitial = _this$state.changeInitial,
          fullScreen = _this$state.fullScreen,
          rotate = _this$state.rotate;
      var showFullscreen = this.props.showFullscreen;
      return _react.default.createElement(_containers.BottomEndOverlay, null, _react.default.createElement(_form.VerticalSlider, {
        value: this.state.zoom,
        onChange: function onChange(_ref4) {
          var value = _ref4.target.valueAsNumber;
          return _this3.changeZoom(value);
        },
        step: 20,
        min: 100,
        max: 800
      }), _react.default.createElement(_containers.Col, {
        wrap: true
      }, _config.default.object.editing && [_react.default.createElement(_button.CircleButton, {
        key: "add-lock",
        onClick: adding.onClick,
        selected: adding.selected
      }, adding.title), _react.default.createElement(_button.CircleButton, {
        key: "reset-initial",
        onClick: changeInitial.onClick
      }, changeInitial.title)], _react.default.createElement(_button.CircleButton, {
        onClick: rotate.onClick,
        selected: _config.default.object.onMouseMove === "rotate"
      }, rotate.title), _react.default.createElement(_button.CircleButton, {
        onClick: visible.onClick
      }, visible.title), showFullscreen && _react.default.createElement(_button.CircleButton, {
        onClick: fullScreen.onClick
      }, fullScreen.title)));
    }
  }]);
  return Controls;
}(_react.PureComponent);

(0, _defineProperty2.default)(Controls, "propTypes", {
  showFullscreen: _propTypes.default.bool
});
(0, _defineProperty2.default)(Controls, "defaultProps", {
  showFullscreen: true
});
var _default = Controls;
exports.default = _default;