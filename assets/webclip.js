module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};

/******/  // The require function
/******/  function __webpack_require__(moduleId) {

/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;

/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      exports: {},
/******/      id: moduleId,
/******/      loaded: false
/******/    };

/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/    // Flag the module as loaded
/******/    module.loaded = true;

/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }


/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;

/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;

/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "";

/******/  // Load entry module and return exports
/******/  return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  __webpack_require__(1);

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function createToolbar(parent, plugins) {
    var toolbar = document.createElement('ul');
    var ctx = this;

    // add class for toolbarbar
    toolbar.classList.add('webclip-toolbar');

    this.plugins.map(function (plugin) {
      var item = document.createElement('li');

      item.classList.add('webclip-item');

      item.setAttribute('title', plugin.description || plugin.name);

      if (plugin.icon) {
        var fa = document.createElement('i');
        item.classList.add('webclip-icon', 'fa', 'fa-' + plugin.icon);
        item.appendChild(fa);
      } else {
        item.textContent = plugin.name.charAt(0).toUpperCase();
      }

      // add onclick event listener with `action` action
      item.addEventListener('click', function (e) {
        plugin.action(ctx.selectedContent, ctx.selection.getRangeAt(0).cloneRange());
      });

      toolbar.appendChild(item);
    });

    return this.el.appendChild(toolbar);
  }

  function delay(fn) {
    setTimeout(fn, 100);
  }

  var WebClip = function () {
    function WebClip(el) {
      var _this = this;

      _classCallCheck(this, WebClip);

      this.el = el;
      this.plugins = [];
      this.selectedContent = null;
      this.selection = null;
      this.toolbar = null;

      this.el.addEventListener('mousedown', function (e) {
        // if selectedContent is exist when mousedown, it should do nothing but cancel selecting
        if (_this.selectedContent) {
          return;
        }
      });

      this.el.addEventListener('mouseup', function (e) {
        delay(function () {
          _this.selection = window.getSelection();
          _this.selectedContent = _this.selection.toString();
          if (_this.selection.type === 'Range') {
            var range = _this.selection.getRangeAt(0).cloneRange();
            var rect = range.getBoundingClientRect();
            _this.showToolbar(rect);
          } else {
            _this.hideToolbar();
          }
        });
      });
    }

    _createClass(WebClip, [{
      key: 'use',
      value: function use(plugin) {
        if (Array.isArray(plugin)) {
          this.plugins = plugin;
        } else {
          this.plugins.push(plugin);
        }
      }
    }, {
      key: 'showToolbar',
      value: function showToolbar(rect, range) {
        // toolbar element only create once
        if (!this.toolbar) {
          this.toolbar = createToolbar.call(this);
        }
        this.toolbar.style.display = '';
        this.toolbar.style.opacity = '1';
        // caculate the position of toolbar
        var toolbarWidth = this.toolbar.offsetWidth;
        var toolbarHeight = this.toolbar.offsetHeight;
        this.toolbar.style.left = (rect.right - rect.left) / 2 + rect.left - toolbarWidth / 2 + 'px';
        this.toolbar.style.top = rect.top - toolbarHeight - 4 + document.body.scrollTop + 'px';
      }
    }, {
      key: 'hideToolbar',
      value: function hideToolbar() {
        var _this2 = this;

        if (this.toolbar) {
          this.toolbar.style.opacity = '0';
          delay(function () {
            _this2.toolbar.style.display = 'none';
          });
        }
      }
    }]);

    return WebClip;
  }();

  module.exports = WebClip;

/***/ },
/* 1 */
/***/ function(module, exports) {

  // removed by extract-text-webpack-plugin

/***/ }
/******/ ]);