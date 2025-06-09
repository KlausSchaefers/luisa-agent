
import PropsConverter from './converter/PropsConverter'
import DesignConverter  from './converter/DesignConverter'
import ComplexConverter from './converter/ComplexConverter'
import Elements  from './Elements'
import DLS  from './DLS'

export default class Pipeline {

  constructor(converters = [], dls = new DLS()) {
    this.converters = converters;
    if (dls === undefined) {
      console.warn('no dsl passed')
    }
    this.dls = dls
  }

  static defaultPipeline() {
    const dls = new DLS()
    const elements = new Elements()
    const complex = new ComplexConverter(elements);
    const design = new DesignConverter(elements, dls)
    const props = new PropsConverter(elements)
    return new Pipeline([complex, props, design], dls)
  }

  getDLS() {
    return this.dls
  }

  addConverter(converter) {
    this.converters.push(converter);
  }

  convert(tree) {
    let result = tree;
    for (const converter of this.converters) {
      console.debug('Pipeline.convert() > ', converter.name)
      result = converter.convert(result);
    }
    return result;
  }
}