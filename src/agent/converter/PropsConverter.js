import { Converter } from "../Interfaces.js";

export default class PropsConverter extends Converter {

  constructor(elements) {
    super()
    this.elements = elements;
    this.name = 'PropsConverter'
  }

  convertElement (element) {
    if (this.elements.elements[element.type]) {
      const data = this.elements.elements[element.type];
        element.name = data.name

        if (!element.props) {
            element.props = {};
        }
        if (data.props) {
            for (const prop in data.props) {
                if (!data.props[prop]) {
                    element.props[prop] = data.props[prop];
                }
            }
        }
        if (data.has) {
            element.has = data.has;
        }
    } else {
      console.warn(`${this.name}.convertElement() > Element type ${element.type} not found in elements.`);
    }
  }

}