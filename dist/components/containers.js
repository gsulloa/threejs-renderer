"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = exports.MaxLengthContainer = exports.SliderWrapper = exports.Panel = exports.LoadingBar = exports.Row = exports.Col = exports.BottomEndOverlay = exports.EndOverlay = exports.CenteredOverlay = exports.Overlay = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _constants = require("../constants");

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  pointer-events: none;\n  &:hover ", " {\n    opacity: 1;\n  }\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  opacity: 0;\n  min-width: 120px;\n  max-width: 300px;\n  background-color: black;\n  color: #fff;\n  text-align: center;\n  padding: 5px 0;\n  border-radius: 6px;\n  border: solid 1px white;\n  position: absolute;\n  z-index: 1;\n  left: -50%;\n  bottom: 80%;\n  transition: opacity 0.2s;\n  pointer-events: none;\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  color: white;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: inline-block;\n  color: ", "\n  background: ", "\n  width: 50px;\n  height: 170px;\n  border-radius: 7px;\n  padding: 0;\n  margin: 10px;\n  div {\n    width: 170px;\n    height: 20px;\n    margin: 10px -163px;\n    transform-origin: 100px 100px;\n    transform: rotate(90deg);\n    \n  }\n  input {\n    appearance: none;\n    background: ", ";\n    height: 3px;\n    width: 150px;\n    outline: none;\n    &::-webkit-slider-thumb {\n      appearance: none;\n      width: 14px;\n      height: 32px;\n      background: ", ";\n      border: 3px ", " solid;\n      border-radius: 7px;\n      cursor: pointer;\n    }\n    \n    &::-moz-range-thumb {\n      appearance: none;\n      width: 14px;\n      height: 32px;\n      background: ", ";\n      border: 3px ", " solid;\n      border-radius: 7px;\n      cursor: pointer;\n    }\n  }\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, 0.4);\n  padding: 0 15px;\n  overflow-y: auto;\n  position: relative;\n  pointer-events: none;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 25em;\n  height: 1em;\n  border-radius: 0.25em;\n  background-color: black;\n  border: 1px solid grey;\n  display: inline-flex;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  flex-direction: row;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  flex-direction: column;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-wrap: ", "wrap;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  justify-content: flex-end;\n  flex-flow: column wrap;\n  @media (max-height: 500px) {\n    flex-direction: row;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  align-items: flex-end;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  justify-content: center;\n  align-items: center;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  flex-flow: column nowrap;\n  display: flex;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  width: ", ";\n  height: 100%;\n  pointer-events: none;\n  * {\n    pointer-events: auto;\n  }\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Overlay = _styledComponents.default.div(_templateObject(), function (_ref) {
  var width = _ref.width;
  return width ? width : "100%";
}, function (_ref2) {
  var smWidth = _ref2.smWidth;
  return smWidth ? "\n    @media (max-width: 768px) {\n      width: ".concat(smWidth, ";\n    }\n  ") : "";
});

exports.Overlay = Overlay;
var FlexOverlay = (0, _styledComponents.default)(Overlay)(_templateObject2());
var CenteredOverlay = (0, _styledComponents.default)(FlexOverlay)(_templateObject3());
exports.CenteredOverlay = CenteredOverlay;
var EndOverlay = (0, _styledComponents.default)(FlexOverlay)(_templateObject4());
exports.EndOverlay = EndOverlay;
var BottomEndOverlay = (0, _styledComponents.default)(EndOverlay)(_templateObject5());
exports.BottomEndOverlay = BottomEndOverlay;

var Div = _styledComponents.default.div(_templateObject6(), function (_ref3) {
  var wrap = _ref3.wrap;
  return wrap ? "" : "no";
});

var Col = (0, _styledComponents.default)(Div)(_templateObject7());
exports.Col = Col;
var Row = (0, _styledComponents.default)(Div)(_templateObject8());
exports.Row = Row;

var LoadingBar = _styledComponents.default.div(_templateObject9());

exports.LoadingBar = LoadingBar;

var Panel = _styledComponents.default.div(_templateObject10());

exports.Panel = Panel;

var SliderWrapper = _styledComponents.default.div(_templateObject11(), _constants.WHITE, _constants.GRAY, _constants.WHITE, _constants.GRAY, _constants.WHITE, _constants.GRAY, _constants.WHITE);

exports.SliderWrapper = SliderWrapper;

var MaxLengthContainer = _styledComponents.default.div(_templateObject12());

exports.MaxLengthContainer = MaxLengthContainer;

var TooltipText = _styledComponents.default.span(_templateObject13());

var TooltipContainer = _styledComponents.default.div(_templateObject14(), TooltipText);

var Tooltip = function Tooltip(_ref4) {
  var children = _ref4.children,
      text = _ref4.text,
      props = (0, _objectWithoutProperties2.default)(_ref4, ["children", "text"]);
  return _react.default.createElement(TooltipContainer, null, _react.default.createElement(TooltipText, null, text), children);
};

exports.Tooltip = Tooltip;