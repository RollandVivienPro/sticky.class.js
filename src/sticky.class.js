"use strict";

class Sticky {

    constructor(element, cssClass = 'is-fixed') {
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

    addEvents() {
        window.addEventListener('scroll', this.onScroll.bind(this),50,false,true);
    }

    onScroll() {
        if (this.aboveScroll()) {
            this.setFixed();
        } else {
            this.setStatic();
        }
    }

    aboveScroll() {
        return -(this.top) < (window.scrollY - this.position.top);
    }

    setFixed() {
        this.element.classList.add(this.cssClass);
        this.element.style.top = this.top + 'px';
        this.createShadowbox();
    }

    setStatic() {
        this.element.classList.remove(this.cssClass);
        this.element.style.top = 'auto';
        this.removeShadowbox();
    }

    createShadowbox() {
        if (this.shadow === false) {
            this.shadow = true;
            let shadowbox = document.createElement('div');
            shadowbox.setAttribute('id', 'sticky-shadowbox-' + this.id);
            shadowbox.style.width = '100%';
            shadowbox.style.height = this.height + 'px';
            this.element.parentNode.insertBefore(shadowbox, this.element);
        }
    }

    removeShadowbox() {
        if (this.shadow === true) {
            this.shadow = false;
            document.querySelector('#sticky-shadowbox-' + this.id).remove();
        }
    }

}