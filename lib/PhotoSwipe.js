"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _photoswipe = _interopRequireDefault(require("photoswipe"));

var _photoswipeUiDefault = _interopRequireDefault(require("photoswipe/dist/photoswipe-ui-default"));

var _classnames = _interopRequireDefault(require("classnames"));

var _events = _interopRequireDefault(require("./events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PhotoSwipe = /*#__PURE__*/function (_React$Component) {
  _inherits(PhotoSwipe, _React$Component);

  function PhotoSwipe() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PhotoSwipe);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PhotoSwipe)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: _this.props.isOpen
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var isOpen = _this.state.isOpen;

      if (isOpen) {
        _this.openPhotoSwipe(_this.props);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillReceiveProps", function (nextProps) {
      var isOpen = _this.state.isOpen;

      if (nextProps.isOpen) {
        if (!isOpen) {
          _this.openPhotoSwipe(nextProps);
        } else {
          _this.updateItems(nextProps.items);
        }
      } else if (isOpen) {
        _this.closePhotoSwipe();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      _this.closePhotoSwipe();
    });

    _defineProperty(_assertThisInitialized(_this), "openPhotoSwipe", function (props) {
      var items = props.items,
          options = props.options;
      var pswpElement = _this.pswpElement;
      _this.photoSwipe = new _photoswipe.default(pswpElement, _photoswipeUiDefault.default, items, options);

      _events.default.forEach(function (event) {
        var callback = props[event];

        if (callback || event === 'destroy') {
          var self = _assertThisInitialized(_this);

          _this.photoSwipe.listen(event, function () {
            if (callback) {
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }

              args.unshift(this);
              callback.apply(void 0, args);
            }

            if (event === 'destroy') {
              self.handleClose();
            }
          });
        }
      });

      _this.setState({
        isOpen: true
      }, function () {
        _this.photoSwipe.init();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateItems", function () {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      _this.photoSwipe.items.length = 0;
      items.forEach(function (item) {
        _this.photoSwipe.items.push(item);
      });

      _this.photoSwipe.invalidateCurrItems();

      _this.photoSwipe.updateSize(true);
    });

    _defineProperty(_assertThisInitialized(_this), "closePhotoSwipe", function () {
      if (!_this.photoSwipe) {
        return;
      }

      _this.photoSwipe.close();
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      var onClose = _this.props.onClose;

      _this.setState({
        isOpen: false
      }, function () {
        if (onClose) {
          onClose();
        }
      });
    });

    return _this;
  }

  _createClass(PhotoSwipe, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var id = this.props.id;
      var className = this.props.className;
      className = (0, _classnames.default)(['pswp', className]).trim();
      return _react.default.createElement("div", {
        id: id || null,
        className: className,
        tabIndex: "-1",
        role: "dialog",
        "aria-hidden": "true",
        ref: function ref(node) {
          _this2.pswpElement = node;
        }
      }, _react.default.createElement("div", {
        className: "pswp__bg"
      }), _react.default.createElement("div", {
        className: "pswp__scroll-wrap"
      }, _react.default.createElement("div", {
        className: "pswp__container"
      }, _react.default.createElement("div", {
        className: "pswp__item"
      }), _react.default.createElement("div", {
        className: "pswp__item"
      }), _react.default.createElement("div", {
        className: "pswp__item"
      })), _react.default.createElement("div", {
        className: "pswp__ui pswp__ui--hidden"
      }, _react.default.createElement("div", {
        className: "pswp__top-bar"
      }, _react.default.createElement("div", {
        className: "pswp__counter"
      }), _react.default.createElement("button", {
        className: "pswp__button pswp__button--close",
        title: "Close (Esc)"
      }), _react.default.createElement("button", {
        className: "pswp__button pswp__button--share",
        title: "Share"
      }), _react.default.createElement("button", {
        className: "pswp__button pswp__button--fs",
        title: "Toggle fullscreen"
      }), _react.default.createElement("button", {
        className: "pswp__button pswp__button--zoom",
        title: "Zoom in/out"
      }), _react.default.createElement("div", {
        className: "pswp__preloader"
      }, _react.default.createElement("div", {
        className: "pswp__preloader__icn"
      }, _react.default.createElement("div", {
        className: "pswp__preloader__cut"
      }, _react.default.createElement("div", {
        className: "pswp__preloader__donut"
      }))))), _react.default.createElement("div", {
        className: "pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
      }, _react.default.createElement("div", {
        className: "pswp__share-tooltip"
      })), _react.default.createElement("button", {
        className: "pswp__button pswp__button--arrow--left",
        title: "Previous (arrow left)"
      }), _react.default.createElement("button", {
        className: "pswp__button pswp__button--arrow--right",
        title: "Next (arrow right)"
      }), _react.default.createElement("div", {
        className: "pswp__caption"
      }, _react.default.createElement("div", {
        className: "pswp__caption__center"
      })))));
    }
  }]);

  return PhotoSwipe;
}(_react.default.Component);

_defineProperty(PhotoSwipe, "propTypes", {
  isOpen: _propTypes.default.bool.isRequired,
  items: _propTypes.default.array.isRequired,
  options: _propTypes.default.object,
  onClose: _propTypes.default.func,
  id: _propTypes.default.string,
  className: _propTypes.default.string
});

_defineProperty(PhotoSwipe, "defaultProps", {
  options: {},
  onClose: function onClose() {},
  id: '',
  className: ''
});

var _default = PhotoSwipe;
exports.default = _default;
module.exports = exports.default;