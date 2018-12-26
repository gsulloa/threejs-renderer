"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentInput = exports.TitleInput = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background: transparent;\n  border: none;\n  color: white;\n  font-family: sans-serif;\n  font-size: 1em;\n  margin-block-start: 1em;\n  margin-block-end: 1em;\n  margin-inline-start: 0px;\n  margin-inline-end: 0px;\n  height: ", "px;\n  width: 100%;\n  outline: none;\n  resize: none;\n  overflow: hidden;\n  border-bottom: 1px solid;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background: transparent;\n  border: none;\n  color: white;\n  font-family: sans-serif;\n  font-size: 2em;\n  margin-block-start: 0.67em;\n  margin-block-end: 0.67em;\n  margin-inline-start: 0px;\n  margin-inline-end: 0px;\n  font-weight: bold;\n  height: ", "px;\n  width: 100%;\n  outline: none;\n  resize: none;\n  overflow: hidden;\n  border-bottom: 1px solid;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var TitleInput = _styledComponents.default.textarea(_templateObject(), function (props) {
  return props.height;
});

exports.TitleInput = TitleInput;

var ContentInput = _styledComponents.default.textarea(_templateObject2(), function (props) {
  return props.height;
});

exports.ContentInput = ContentInput;