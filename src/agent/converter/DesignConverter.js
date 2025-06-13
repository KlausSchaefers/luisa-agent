import { Converter } from "../Interfaces.js";


export default class DesignConverter extends Converter {

  constructor(elements, dsl) {
    super()
    this.dsl = dsl;
    this.elements = elements;
    this.name = 'DesignConverter'
    this.properties = ['style', 'hover', 'error', 'active', 'focus', 'checked']
  }

  convertElement (element) {
    const data = this.elements.get(element)
    if (data) {

      for (let p of this.properties) {
         if (data[p]) {
              if (!element[p]) {
                  element[p] = {}
              }
              this.mixin(element[p], data[p])
          }
      }
      if (element.w === undefined) {
        element.w = data.w || 0;
      }
      if (element.h === undefined) {
        element.h = data.h || 0;
      }
      this.dsl.replaceVariables(element);

      if (data.computeDynamicSize) {
        const size = data.computeDynamicSize(element)
        if (size.w) {
          element.w = size.w
        }
        if (element.h) {
          element.h = size.h
        }
        console.debug('computeDynamicSize', element.name, element.h)
      }
    } else {
      console.warn(`${this.name}.convertElement() > Element type ${element.type} not found in elements.`);
    }
  }

  mixin (element, parent) {
      for (let key in parent) {
          if (element[key] === undefined) {
              element[key] = parent[key]
          }
      }
  }
}