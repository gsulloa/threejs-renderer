"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleButton = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background: ", ";\n  fill: ", ";\n  border: solid black 1px;\n  border-radius: 100%;\n  width: 50px;\n  height: 50px;\n  cursor: pointer;\n  margin: 10px;\n  outline: none;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var CircleButton = _styledComponents.default.button(_templateObject(), function (_ref) {
  var selected = _ref.selected;
  return selected ? "#bbb" : "#eaeaea";
}, function (_ref2) {
  var selected = _ref2.selected;
  return selected ? "#666" : "#000";
});

exports.CircleButton = CircleButton;