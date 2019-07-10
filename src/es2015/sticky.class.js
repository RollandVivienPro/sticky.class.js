"use strict";

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Sticky =
    /*#__PURE__*/
    function () {
        function Sticky(element) {
            var cssClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'is-fixed';

            _classCallCheck(this, Sticky);

            Sticky.count = Sticky.count ? Sticky.count + 1 : 1;
            this.id = Sticky.count;
            this.element = element;
            this.top = element.dataset.top;
            this.cssClass = cssClass;
            this.addEvents();
            this.position = d.offset(this.element);
            this.height = this.element.offsetHeight;
            this.shadow = false;
            this.onScroll();
        }

        _createClass(Sticky, [{
            key: "addEvents",
            value: function addEvents() {
                window.addEventListener('scroll', this.onScroll.bind(this), 50, false, true);
            }
        }, {
            key: "onScroll",
            value: function onScroll() {
                if (this.aboveScroll()) {
                    this.setFixed();
                } else {
                    this.setStatic();
                }
            }
        }, {
            key: "aboveScroll",
            value: function aboveScroll() {
                return -this.top < window.scrollY - this.position.top;
            }
        }, {
            key: "setFixed",
            value: function setFixed() {
                this.element.classList.add(this.cssClass);
                this.element.style.top = this.top + 'px';
                this.createShadowbox();
            }
        }, {
            key: "setStatic",
            value: function setStatic() {
                this.element.classList.remove(this.cssClass);
                this.element.style.top = 'auto';
                this.removeShadowbox();
            }
        }, {
            key: "createShadowbox",
            value: function createShadowbox() {
                if (this.shadow === false) {
                    this.shadow = true;
                    var shadowbox = document.createElement('div');
                    shadowbox.setAttribute('id', 'sticky-shadowbox-' + this.id);
                    shadowbox.style.width = '100%';
                    shadowbox.style.height = this.height + 'px';
                    this.element.parentNode.insertBefore(shadowbox, this.element);
                }
            }
        }, {
            key: "removeShadowbox",
            value: function removeShadowbox() {
                if (this.shadow === true) {
                    this.shadow = false;
                    document.querySelector('#sticky-shadowbox-' + this.id).remove();
                }
            }
        }]);

        return Sticky;
    }();