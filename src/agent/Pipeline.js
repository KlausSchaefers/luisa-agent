
import PropsConverter from './converter/PropsConverter'
import DesignConverter  from './converter/DesignConverter'
import ComplexConverter from './converter/ComplexConverter'
import ErrorCorrector from './converter/ErrorCorrector'
import Elements  from './Elements'


export default class Pipeline {

  constructor(converters = []) {
    this.converters = converters;
  }

  static defaultPipeline(dls) {
    if (!dls) {
      throw new Error("Please pass DLS object")
    }
    const elements = new Elements()
    const error = new ErrorCorrector(elements);
    const complex = new ComplexConverter(elements);
    const design = new DesignConverter(elements, dls)
    const props = new PropsConverter(elements)
    return new Pipeline([complex, props, error, design])
  }

  addConverter(converter) {
    this.converters.push(converter);
  }

  convert(tree) {
    let result = tree;
    for (const converter of this.converters) {
      //console.debug('Pipeline.convert() > ', converter.name)
      result = converter.convert(result);
    }
    return result;
  }
}