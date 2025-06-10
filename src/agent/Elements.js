import button from './elements/button.json';
import button_secondary from './elements/button_secondary.json';
import button_danger from './elements/button_danger.json';
import container from './elements/container.json';
import input from './elements/input.json';
import image from './elements/image.json';
import label from './elements/label.json';
import screen from './elements/screen.json';
import login from './elements/login.json';
import card from './elements/card.json';

export default class Elements {

    constructor() {
        this.elements = {};
        this.register(container);
        this.register(button)
        this.register(button_secondary)
        this.register(button_danger)
        this.register(input);
        this.register(image);
        this.register(label);
        this.register(screen);
        this.register(card)

        this.registerComplex(login)

        this.fillExtensions()

        //console.debug(Object.keys(this.elements))
    }

    fillExtensions () {
        const properties = ['props', 'has', 'layout', 'style', 'hover', 'error', 'active', 'focus', 'checked']
        for (let key in this.elements) {
            const element = this.elements[key]
            if (element.extends) {
                if (this.elements[element.extends]) {
                    const parent = this.elements[element.extends]
                    
                    for (let p of properties) {
                        if (parent[p]) {
                            if (!element[p]) {
                                element[p] = {}
                            }
                            this.mixin(element[p], parent[p])
                        }
                    }                    

                    if (element.w === undefined) {
                        element.w = parent.w
                    }
                    if (element.h === undefined) {
                        element.h = parent.h
                    }
                } else {
                    console.warn("Elements.fillExtensions() > No parent", e.extends)
                }
            }
        }
    }

    mixin (element, parent) {
        for (let key in parent) {
            if (element[key] === undefined) {
                element[key] = parent[key]
            }
        }
    }

    getAll() {
        // filter out variants
        return Object.values(this.elements).filter(e => !e.variant)
    }

    get(e) {
        let k = this.getKey(e)
        if (this.elements[k]) {
            return this.elements[k]
        }
        return this.elements[e.type]
    }

    getKey(e) {
        if (e.variant) {
            return e.type + "." + e.variant
        }
        return e.type
    }
    
    registerComplex (e) {
        // make a different list later?
        this.register(e)
    }

    register(e) {
        let k = this.getKey(e)
        this.elements[k] = e;
    }
}