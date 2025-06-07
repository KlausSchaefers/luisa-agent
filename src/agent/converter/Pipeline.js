export default class Pipeline {

  constructor(converters = []) {
    this.converters = converters;
  }

  addConverter(converter) {
    this.converters.push(converter);
  }

  convert(tree) {
    let result = tree;
    for (const converter of this.converters) {
      result = converter.convert(result);
    }
    return result;
  }
}