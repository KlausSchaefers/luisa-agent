import { Converter } from "../Interfaces.js";
import * as Util from '../Util'
export default class PropsConverter extends Converter {

  constructor(elements) {
    super()
    this.elements = elements;
    this.name = 'PropsConverter'
  }

  convertElement (element) {
    const data = this.elements.get(element)
    if (data) {
        if (element.type !== "Screen") {
          if (!element.name) {
            element.name = data.name
          }

        }
        if (!element.props) {
            element.props = {};
        }
        if (element.properties) {
          element.props = element.properties
        }
        if (data.container) {
          element.container = true
        }
        if (data.layout) {
          //console.debug('add', element.name, data.layout)
          // maybe we should just take the directiom
          if (!element.layout) {
            element.layout = {}
          }
          Util.mixin(element.layout, data.layout)
    
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