"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.devlogerror = exports.devlog = void 0;

/* eslint no-console:0 */
var isTest = process.env.NODE_ENV === "test";
var isDev = process.env.NODE_ENV === "development";
var shouldDev = !isTest && isDev;

var devlog = function devlog() {
  var _console;

  return shouldDev && (_console = console).log.apply(_console, arguments);
};

exports.devlog = devlog;

var devlogerror = function devlogerror(err) {
  return shouldDev && console.log(err.message || err);
};

exports.devlogerror = devlogerror;