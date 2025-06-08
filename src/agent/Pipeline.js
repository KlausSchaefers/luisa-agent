
import PropsConverter from './converter/PropsConverter'
import DesignConverter  from './converter/DesignConverter'
import Elements  from './Elements'
import DLS  from './DLS'

export default class Pipeline {

  constructor(converters = []) {
    this.converters = converters;
  }

  static defaultPipeline() {
    const dls = new DLS()
    const elements = new Elements()

    const design = new DesignConverter(elements, dls)
    const props = new PropsConverter(elements)
    return new Pipeline([props, design])
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