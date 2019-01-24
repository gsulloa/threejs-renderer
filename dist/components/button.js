"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InverseCircleButton = exports.CircleButton = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _constants = require("../constants");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background: ", ";\n  fill: ", ";\n  color: ", ";\n  &:hover {\n    background: ", ";\n  }\n  &:active {\n    background: ", ";\n    fill: ", ";\n    color: ", ";\n  }\n  transition-duration: 0.4s;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background: ", ";\n  fill: ", ";\n  color: ", ";\n  opacity: ", ";\n  border: solid black 1px;\n  border-radius: 7px;\n  width: ", "px;\n  height: ", "px;\n  cursor: pointer;\n  margin: 10px;\n  outline: none;\n  &:hover {\n    background: ", ";\n    opacity: 1;\n  }\n  &:active {\n    background: ", ";\n    fill: ", ";\n    color: ", ";\n  }\n  span {\n    font-size: 20px;\n    font-weight: 700;\n  }\n  transition-duration: 0.4s;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var CircleButton = _styledComponents.default.button(_templateObject(), function (_ref) {
  var selected = _ref.selected;
  return selected ? _constants.WHITE : _constants.GRAY;
}, function (_ref2) {
  var selected = _ref2.selected;
  return selected ? _constants.GRAY : _constants.WHITE;
}, function (_ref3) {
  var selected = _ref3.selected;
  return selected ? _constants.GRAY : _constants.WHITE;
}, function (_ref4) {
  var selected = _ref4.selected;
  return selected ? "0.8" : "1";
}, function (_ref5) {
  var size = _ref5.size;
  return size ? size : "50";
}, function (_ref6) {
  var size = _ref6.size;
  return size ? size : "50";
}, function (_ref7) {
  var selected = _ref7.selected;
  return selected ? _constants.WHITE_HOVER : _constants.GRAY_HOVER;
}, _constants.WHITE, _constants.GRAY, _constants.GRAY);

exports.CircleButton = CircleButton;
var InverseCircleButton = (0, _styledComponents.default)(CircleButton)(_templateObject2(), function (_ref8) {
  var selected = _ref8.selected;
  return !selected ? _constants.WHITE : _constants.GRAY;
}, function (_ref9) {
  var selected = _ref9.selected;
  return !selected ? _constants.GRAY : _constants.WHITE;
}, function (_ref10) {
  var selected = _ref10.selected;
  return !selected ? _constants.GRAY : _constants.WHITE;
}, function (_ref11) {
  var selected = _ref11.selected;
  return !selected ? _constants.WHITE_HOVER : _constants.GRAY_HOVER;
}, _constants.GRAY, _constants.WHITE, _constants.WHITE);
exports.InverseCircleButton = InverseCircleButton;