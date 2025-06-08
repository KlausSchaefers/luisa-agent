import { Converter } from "../Interfaces.js";


export default class DesignConverter extends Converter {

  constructor(elements, dsl) {
    super()
    this.dsl = dsl;
    this.elements = elements;
    this.name = 'DesignConverter'
  }

  convertElement (element) {
    const data = this.elements.get(element)
    if (data) {

      if (data.style) {
        element.style = data.style;

      }
      if (data.hover) {
        element.hover = data.hover;
      }
      if (data.focus) {
        element.focus = data.focus;
      }
      if (data.error) {
        element.focus = data.focus;
      }
      if (data.active) {
        element.focus = data.active;
      }
      
      element.w = data.w || 0;
      element.h = data.h || 0;


      this.dsl.replaceVariables(element);
    } else {
      console.warn(`${this.name}.convertElement() > Element type ${element.type} not found in elements.`);
    }
  }
}