import button from "./elements/button";
import container from "./elements/container";
import input from "./elements/input";
import image from "./elements/image";
import label from "./elements/label";
import headline from "./elements/headline";
import sub_headline from "./elements/sub_headline";
import checkbox from "./elements/checkbox";
import radio from "./elements/radio";
import screen from "./elements/screen";
import nav from "./elements/nav";
import section from "./elements/section";
import card from "./elements/card";
import hero from "./elements/hero";

export default class Elements {
  constructor() {
    this.elements = {};
    this.register(screen);
    this.register(container);
    this.register(button);
    this.register(input);
    this.register(image);
    this.register(label);
    this.register(headline);
    this.register(section)
    this.register(sub_headline);
    this.register(checkbox)
    this.register(radio)
    this.register(nav)

    this.registerComplex(card);
    this.registerComplex(hero);
    

    this.fillExtensions();

    //console.debug(Object.keys(this.elements))
  }

  fillExtensions() {
    const properties = ["props", "has", "layout", "style", "hover", "error", "active", "focus", "checked"];
    for (let key in this.elements) {
      const element = this.elements[key];
      if (element.extends) {
        if (this.elements[element.extends]) {
          const parent = this.elements[element.extends];

          for (let p of properties) {
            if (parent[p]) {
              if (!element[p]) {
                element[p] = {};
              }
              this.mixin(element[p], parent[p]);
            }
          }

          if (element.w === undefined) {
            element.w = parent.w;
          }
          if (element.h === undefined) {
            element.h = parent.h;
          }
        } else {
          console.warn("Elements.fillExtensions() > No parent", e.extends);
        }
      }
    }
  }

  mixin(element, parent) {
    for (let key in parent) {
      if (element[key] === undefined) {
        element[key] = parent[key];
      }
    }
  }

  getAll() {
    // filter out variants
    return Object.values(this.elements).filter((e) => !e.variant);
  }

  get(e) {
    let k = this.getKey(e);
    if (this.elements[k]) {
      return this.elements[k];
    }
    return this.elements[e.type];
  }

  getKey(e) {
    if (e.variant) {
      return e.type + "." + e.variant;
    }
    return e.type;
  }

  registerComplex(e) {
    // make a different list later?
    this.register(e);
  }

  register(e) {
    if (Array.isArray(e)) {
      for (let x of e) {
        this.register(x);
      }
    } else {
        let k = this.getKey(e);
        this.elements[k] = e;
    }

  }
}
