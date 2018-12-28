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
      addLock: {
        title: _react.default.createElement("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          width: "30px",
          height: "30px",
          viewBox: "0 0 361.118 361.118"
        }, _react.default.createElement("path", {
          d: "M274.765,141.3V94.205C274.765,42.172,232.583,0,180.559,0c-52.032,0-94.205,42.172-94.205,94.205V141.3     c-17.34,0-31.4,14.06-31.4,31.4v157.016c0,17.344,14.06,31.402,31.4,31.402h188.411c17.341,0,31.398-14.059,31.398-31.402V172.7     C306.164,155.36,292.106,141.3,274.765,141.3z M117.756,94.205c0-34.69,28.12-62.803,62.803-62.803     c34.685,0,62.805,28.112,62.805,62.803V141.3H117.756V94.205z M274.765,329.715H86.354V172.708h188.411V329.715z      M164.858,262.558v20.054c0,8.664,7.035,15.701,15.701,15.701c8.664,0,15.701-7.037,15.701-15.701v-20.054     c9.337-5.441,15.701-15.456,15.701-27.046c0-17.348-14.062-31.41-31.402-31.41c-17.34,0-31.4,14.062-31.4,31.41     C149.159,247.102,155.517,257.117,164.858,262.558z"
        })),
        onClick: function onClick() {
          var state = _config.default.object.add;
          _config.default.object.add = !state;

          _this.setState({
            addLock: (0, _objectSpread2.default)({}, _this.state.addLock, {
              selected: state
            })
          });
        },
        selected: !_config.default.object.add
      },
      resetOrbit: {
        title: _react.default.createElement("svg", {
          viewBox: "0 0 14.155 14.155",
          width: "30px",
          height: "30px"
        }, _react.default.createElement("g", null, _react.default.createElement("path", {
          d: "M12.083,1.887c-0.795-0.794-1.73-1.359-2.727-1.697v2.135c0.48,0.239,0.935,0.55,1.334,0.95   c1.993,1.994,1.993,5.236,0,7.229c-1.993,1.99-5.233,1.99-7.229,0c-1.991-1.995-1.991-5.235,0-7.229   C3.466,3.269,3.482,3.259,3.489,3.25h0.002l1.181,1.179L4.665,0.685L0.923,0.68l1.176,1.176C2.092,1.868,2.081,1.88,2.072,1.887   c-2.763,2.762-2.763,7.243,0,10.005c2.767,2.765,7.245,2.765,10.011,0C14.844,9.13,14.847,4.649,12.083,1.887z"
        }))),
        onClick: function onClick() {
          _config.default.controllers.objectController.resetControls();
        }
      },
      changeInitial: {
        title: _react.default.createElement("svg", {
          viewBox: "0 0 512 512",
          width: "30px",
          height: "30px"
        }, _react.default.createElement("g", null, _react.default.createElement("path", {
          d: "M448,286.681V106.667C448,83.135,428.865,64,405.333,64h-44.5c-2.802,0-5.552-1.135-7.542-3.125l-30.167-30.167     c-6.042-6.042-14.083-9.375-22.625-9.375h-89c-8.542,0-16.583,3.333-22.625,9.375l-30.167,30.167     c-1.99,1.99-4.74,3.125-7.542,3.125h-44.5C83.135,64,64,83.135,64,106.667v179.848C22.253,304.03,0,326.547,0,352     c0,57.96,109.22,91.07,220.126,95.457l-25.001,25.001c-4.167,4.167-4.167,10.917,0,15.083c2.083,2.083,4.813,3.125,7.542,3.125     c2.729,0,5.458-1.042,7.542-3.125l42.667-42.667c4.167-4.167,4.167-10.917,0-15.083l-42.667-42.667     c-4.167-4.167-10.917-4.167-15.083,0c-4.167,4.167-4.167,10.917,0,15.083l23.893,23.893     C101.281,421.301,21.333,384.911,21.333,352c0-14.655,15.891-29.983,44.086-42.974c4.659,18.512,21.307,32.307,41.247,32.307     h298.667c19.884,0,36.487-13.721,41.201-32.155c27.961,12.905,44.133,28.174,44.133,42.822     c0,26.573-56.729,60.656-161.094,71.458c-5.865,0.615-10.125,5.854-9.521,11.708c0.573,5.49,5.208,9.573,10.604,9.573     c0.365,0,0.74-0.021,1.104-0.052C441,433.375,512,396.99,512,352C512,326.546,489.478,304.091,448,286.681z M426.667,298.667     c0,11.76-9.573,21.333-21.333,21.333H106.667c-11.76,0-21.333-9.573-21.333-21.333v-192c0-11.76,9.573-21.333,21.333-21.333h44.5     c8.542,0,16.583-3.333,22.625-9.375l30.167-30.167c1.99-1.99,4.74-3.125,7.542-3.125h89c2.802,0,5.552,1.135,7.542,3.125     l30.167,30.167c6.042,6.042,14.083,9.375,22.625,9.375h44.5c11.76,0,21.333,9.573,21.333,21.333V298.667z"
        }), _react.default.createElement("circle", {
          cx: "384",
          cy: "128",
          r: "21.333"
        }), _react.default.createElement("path", {
          d: "M256,106.667c-47.052,0-85.333,38.281-85.333,85.333s38.281,85.333,85.333,85.333s85.333-38.281,85.333-85.333     S303.052,106.667,256,106.667z M256,256c-35.292,0-64-28.708-64-64s28.708-64,64-64s64,28.708,64,64S291.292,256,256,256z"
        }))),
        onClick: function onClick() {
          _config.default.controllers.objectController.updateInitial({
            position: _config.default.orbit.position,
            rotation: _config.default.orbit.rotation
          });
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
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          options = _this$state.options,
          addLock = _this$state.addLock,
          resetOrbit = _this$state.resetOrbit,
          changeInitial = _this$state.changeInitial;
      return _react.default.createElement(_containers.BottomEndOverlay, null, _config.default.object.editing && [_react.default.createElement(_button.CircleButton, {
        key: "add-lock",
        onClick: addLock.onClick,
        selected: addLock.selected
      }, addLock.title), _react.default.createElement(_button.CircleButton, {
        key: "reset-initial",
        onClick: changeInitial.onClick
      }, changeInitial.title)], _react.default.createElement(_button.CircleButton, {
        onClick: resetOrbit.onClick
      }, resetOrbit.title), options.map(function (option, i) {
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