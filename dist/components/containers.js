"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderWrapper = exports.Panel = exports.LoadingBar = exports.BottomEndOverlay = exports.EndOverlay = exports.CenteredOverlay = exports.Overlay = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: inline-block;\n  width: 20px;\n  height: 150px;\n  padding: 0;\n  input {\n    width: 150px;\n    height: 20px;\n    margin: -175px;\n    transform-origin: 100px 100px;\n    transform: rotate(90deg);\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, 0.2);\n  padding: 0 15px;\n  overflow-y: auto;\n  position: relative;\n  pointer-events: none;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 25em;\n  height: 1em;\n  border-radius: 0.25em;\n  background-color: black;\n  border: 1px solid grey;\n  display: inline-flex;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  justify-content: flex-end;\n  flex-flow: row nowrap;\n"]);

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
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  width: ", ";\n  height: 100%;\n  pointer-events: none;\n  * {\n    pointer-events: auto;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Overlay = _styledComponents.default.div(_templateObject(), function (_ref) {
  var width = _ref.width;
  return width ? width : "100%";
});

exports.Overlay = Overlay;
var FlexOverlay = (0, _styledComponents.default)(Overlay)(_templateObject2());
var CenteredOverlay = (0, _styledComponents.default)(FlexOverlay)(_templateObject3());
exports.CenteredOverlay = CenteredOverlay;
var EndOverlay = (0, _styledComponents.default)(FlexOverlay)(_templateObject4());
exports.EndOverlay = EndOverlay;
var BottomEndOverlay = (0, _styledComponents.default)(EndOverlay)(_templateObject5());
exports.BottomEndOverlay = BottomEndOverlay;

var LoadingBar = _styledComponents.default.div(_templateObject6());

exports.LoadingBar = LoadingBar;

var Panel = _styledComponents.default.div(_templateObject7());

exports.Panel = Panel;

var SliderWrapper = _styledComponents.default.div(_templateObject8());

exports.SliderWrapper = SliderWrapper;