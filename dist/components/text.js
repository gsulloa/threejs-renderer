"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = exports.SubTitle = exports.Title = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: white;\n  font-family: ", ";\n  white-space: pre-line;\n  cursor: text;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: #fff;\n  font-family: ", ";\n  cursor: text;\n  white-space: pre-line;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: white;\n  font-family: ", ";\n  cursor: text;\n  white-space: pre-line;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var FONT_FAMILY = "sans-serif";

var Title = _styledComponents.default.h1(_templateObject(), FONT_FAMILY);

exports.Title = Title;

var SubTitle = _styledComponents.default.h2(_templateObject2(), FONT_FAMILY);

exports.SubTitle = SubTitle;

var Text = _styledComponents.default.p(_templateObject3(), FONT_FAMILY);

exports.Text = Text;