"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _containers = require("../components/containers");

var _button = require("../components/button");

var _config = _interopRequireDefault(require("../config"));

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
      options: [{
        title: _react.default.createElement("svg", {
          width: "30px",
          height: "30px",
          viewBox: "0 0 511.626 511.626"
        }, _react.default.createElement("g", null, _react.default.createElement("path", {
          d: "M506.199,242.968l-73.09-73.089c-3.614-3.617-7.898-5.424-12.848-5.424c-4.948,0-9.229,1.807-12.847,5.424   c-3.613,3.619-5.424,7.902-5.424,12.85v36.547H292.355V109.641h36.549c4.948,0,9.232-1.809,12.847-5.424   c3.614-3.617,5.421-7.896,5.421-12.847c0-4.952-1.807-9.235-5.421-12.851L268.66,5.429c-3.613-3.616-7.895-5.424-12.847-5.424   c-4.952,0-9.232,1.809-12.85,5.424l-73.088,73.09c-3.618,3.619-5.424,7.902-5.424,12.851c0,4.946,1.807,9.229,5.424,12.847   c3.619,3.615,7.898,5.424,12.85,5.424h36.545v109.636H109.636v-36.547c0-4.952-1.809-9.234-5.426-12.85   c-3.619-3.617-7.902-5.424-12.85-5.424c-4.947,0-9.23,1.807-12.847,5.424L5.424,242.968C1.809,246.585,0,250.866,0,255.815   s1.809,9.233,5.424,12.847l73.089,73.087c3.617,3.613,7.897,5.431,12.847,5.431c4.952,0,9.234-1.817,12.85-5.431   c3.617-3.61,5.426-7.898,5.426-12.847v-36.549H219.27v109.636h-36.542c-4.952,0-9.235,1.811-12.851,5.424   c-3.617,3.617-5.424,7.898-5.424,12.847s1.807,9.233,5.424,12.854l73.089,73.084c3.621,3.614,7.902,5.424,12.851,5.424   c4.948,0,9.236-1.81,12.847-5.424l73.087-73.084c3.621-3.62,5.428-7.905,5.428-12.854s-1.807-9.229-5.428-12.847   c-3.614-3.613-7.898-5.424-12.847-5.424h-36.542V292.356h109.633v36.553c0,4.948,1.807,9.232,5.42,12.847   c3.621,3.613,7.905,5.428,12.854,5.428c4.944,0,9.226-1.814,12.847-5.428l73.087-73.091c3.617-3.617,5.424-7.901,5.424-12.85   S509.82,246.585,506.199,242.968z"
        }))),
        onClick: function onClick() {
          _config.default.object.onMouseMove = "move";
        }
      }, {
        title: _react.default.createElement("svg", {
          width: "30px",
          height: "30px",
          viewBox: "0 0 97.994 97.994"
        }, _react.default.createElement("g", null, _react.default.createElement("g", null, _react.default.createElement("path", {
          d: "M97.155,9.939c-0.582-0.416-1.341-0.49-1.991-0.193l-10.848,4.935C74.08,5.29,60.815,0.118,46.966,0.118    c-15.632,0-30.602,6.666-41.07,18.289c-0.359,0.399-0.543,0.926-0.51,1.461c0.033,0.536,0.28,1.036,0.686,1.388l11.301,9.801    c0.818,0.711,2.055,0.639,2.787-0.162c6.866-7.512,16.636-11.821,26.806-11.821c6.135,0,12.229,1.584,17.622,4.583l-7.826,3.561    c-0.65,0.296-1.095,0.916-1.163,1.627c-0.069,0.711,0.247,1.405,0.828,1.82l34.329,24.52c0.346,0.246,0.753,0.373,1.163,0.373    c0.281,0,0.563-0.06,0.828-0.181c0.65-0.296,1.095-0.916,1.163-1.627l4.075-41.989C98.053,11.049,97.737,10.355,97.155,9.939z"
        }), _react.default.createElement("path", {
          d: "M80.619,66.937c-0.819-0.709-2.055-0.639-2.787,0.162c-6.866,7.514-16.638,11.822-26.806,11.822    c-6.135,0-12.229-1.584-17.622-4.583l7.827-3.561c0.65-0.296,1.094-0.916,1.163-1.628c0.069-0.711-0.247-1.404-0.828-1.819    L7.237,42.811c-0.583-0.416-1.341-0.49-1.991-0.193c-0.65,0.296-1.094,0.916-1.163,1.627L0.009,86.233    c-0.069,0.712,0.247,1.406,0.828,1.822c0.583,0.416,1.341,0.488,1.991,0.192l10.848-4.935    c10.237,9.391,23.502,14.562,37.351,14.562c15.632,0,30.602-6.666,41.07-18.289c0.358-0.398,0.543-0.926,0.51-1.461    c-0.033-0.536-0.28-1.036-0.687-1.388L80.619,66.937z"
        })))),
        onClick: function onClick() {
          _config.default.object.onMouseMove = "rotate";
        },
        selected: true
      }],
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
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var options = this.state.options;
      return _react.default.createElement(_containers.BottomEndOverlay, null, options.map(function (option, i) {
        return _react.default.createElement(_button.CircleButton, {
          key: i,
          onClick: function onClick() {
            return _this3.handleClick(option);
          },
          selected: option.selected
        }, option.title);
      }), _react.default.createElement(_containers.SliderWrapper, null, _react.default.createElement("input", {
        type: "range",
        value: this.state.zoom,
        onChange: function onChange(_ref4) {
          var value = _ref4.target.valueAsNumber;
          return _this3.changeZoom(value);
        },
        step: 20,
        min: 100,
        max: 800
      })));
    }
  }]);
  return Controls;
}(_react.PureComponent);

var _default = Controls;
exports.default = _default;