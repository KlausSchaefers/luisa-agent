import { Converter } from "../Interfaces.js";


export default class ComplexConverter extends Converter {

  constructor(elements) {
    super()
    this.elements = elements;
    this.name = 'ComplexConverter'
  }

  convertElement (element) {
    const data = this.elements.get(element)
    if (data) {
        if (data.children && data.children.length > 0 && (!element.children || element.children.length === 0)){
            element.children = data.children
            // make it a container
            // element.type = "Container"
        }   
    } else {
      console.warn(`${this.name}.convertElement() > Element type ${element.type} not found in elements.`);
    }
  }
}