"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRadians = toRadians;
exports.toDegrees = toDegrees;

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}