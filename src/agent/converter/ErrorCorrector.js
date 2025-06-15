import { Converter } from "../Interfaces.js";


export default class ErrorCorrector extends Converter {

  constructor(elements) {
    super()
    this.elements = elements
  }

  convertElement (element) {
    const data = this.elements.get(element)
    const callback = "correct" + element.type
    if (this[callback]) {
      this[callback](element)
    }
    if (data) {

    } else {
      console.warn(`${this.name}.convertElement() > Element type ${element.type} not found in elements.`);
    }
  }

  correctNav(element) {
    console.debug('correctNav()')
  }
}