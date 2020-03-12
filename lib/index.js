"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PhotoSwipe", {
  enumerable: true,
  get: function get() {
    return _PhotoSwipe.default;
  }
});
Object.defineProperty(exports, "PhotoSwipeGallery", {
  enumerable: true,
  get: function get() {
    return _PhotoSwipeGallery.default;
  }
});
exports.default = void 0;

var _PhotoSwipe = _interopRequireDefault(require("./PhotoSwipe.js"));

var _PhotoSwipeGallery = _interopRequireDefault(require("./PhotoSwipeGallery.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _PhotoSwipe.default;
exports.default = _default;