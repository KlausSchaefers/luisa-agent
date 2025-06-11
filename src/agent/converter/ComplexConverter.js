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
            element.children = structuredClone(data.children)

            this.inheritParentProps(element);
            // make it a container
            // element.type = "Container"
        }   
    } else {
      console.warn(`${this.name}.convertElement() > Element type ${element.type} not found in elements.`);
    }   
  }

  inheritParentProps(element) {
      for (let child of element.children) {
        if (child.props && element.props) {
          for (let key in child.props) {
            const value = child.props[key];
            if (value.startsWith('@')) {
              const elementKey = value.substring(1);
              if (element.props[elementKey]) {
                child.props[key] = element.props[elementKey];
              }
            }
          }
        }
      }
    }
}