"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useShortDistance = useShortDistance;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function useShortDistance(from, to) {
  var _options;

  var options = (_options = {}, (0, _defineProperty2.default)(_options, Math.abs(from - to), to), (0, _defineProperty2.default)(_options, Math.abs(from - (to + Math.PI * 2)), to + Math.PI * 2), (0, _defineProperty2.default)(_options, Math.abs(from - (to - Math.PI * 2)), to - Math.PI * 2), _options);
  return options[Math.min.apply(Math, (0, _toConsumableArray2.default)(Object.keys(options)))];
}