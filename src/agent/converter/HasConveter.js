import { Converter } from "../Interfaces.js";

export default class HasConveter extends Converter {

  constructor(elements) {
    super()
    this.elements = elements;
  }



  convertElement (element) {
    if (this.elements.elements[element.type]) {
      const data = this.elements.elements[element.type];
        if (!element.has) {
            element.has = {};
        }
        if (data.has) {
            element.has = data.has;
        }
    } else {
      console.warn(`Element type ${element.type} not found in elements.`);
    }
  }

}