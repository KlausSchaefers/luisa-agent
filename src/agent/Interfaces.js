export class Converter {

  convert(tree) {
    this.convertElement(tree);
    if (tree.children) {
      //console.debug('convert() > ', tree.type, tree.children.length)
      for (let i = 0; i < tree.children.length; i++) {
        this.convert(tree.children[i]);
      }
    }
    return tree;
  }

  convertElement (/* element */) {
    console.warn("Method 'convertElement' must be implemented.");
  }


  isRowContainer (element) {
    return element && element?.props?.direction === "row";
  }

  isContainer (element) {
    return element && element?.type === "Container";
  }

}

export class LLM {

  runPrompt(/*messages, progressCallback*/) {
    throw new Error("Method 'convert' must be implemented.");
  }
}