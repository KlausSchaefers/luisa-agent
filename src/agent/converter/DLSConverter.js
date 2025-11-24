import { Converter } from "../Interfaces.js";

export default class DLSConverter extends Converter {
  constructor(elements, dsl, useCustomDSL = true) {
    super();
    this.dsl = dsl;
    this.elements = elements;
    this.useCustomDSL = useCustomDSL;
    this.name = "DLSConverter";
    this.mapping = {
      "screen-background" : ["@screen-background"],
      "text-color"       : ["@text-color"],
      "primary-button-background"    : ["@primary-button-background"],
      "secondary-button-background"  : ["@secondary-button-background"],
      "card-background"   : ["@card-background"],
      "font-family"       : ["@font-family"]
    }
  }

  convert(app) {
    if (!this.useCustomDSL) {
      console.debug("DLSConverter.convert() > Skipping conversion because useCustomDSL is false");
      return app;
    }

    if (!app.dsl) {
      console.debug("DLSConverter.convert() > Skipping conversion because app.dsl is not defined");
      return app;
    }

 
    for (let key in this.mapping) {
      const value = app.dsl[key];
      const dslKeys = this.mapping[key];
      if (!value) {
        console.warn("DLSConverter.convert() > Key not found in app.dsl: ", key);
        continue;
      }
      for (let dslKey of dslKeys) {
        console.debug("DLSConverter.convert() > ", dslKey, " = ", value);
        this.dsl.set(dslKey, value);
      }
    }

    // TODO: do something about fonts, sizes, etc.
    
    return app;
  }
}
