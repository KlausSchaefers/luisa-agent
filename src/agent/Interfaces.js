export class Converter {

  convert(app) {
    if (app.screens) {
      app.screens.forEach(s => {
        //console.debug('convert() > ', s.name)
        this.convertTree(s)
      })
    }
    return app
  }


  convertTree(tree) {
    this.convertElement(tree);
    if (tree.children) {
      //console.debug('  convertTree() > ', tree.type, tree.children.length)
      for (let i = 0; i < tree.children.length; i++) {
        this.convertTree(tree.children[i]);
      }
    }
    return tree;
  }

  convertElement(/* element */) {
    console.warn("Method 'convertElement' must be implemented.");
  }

  isRowContainer(element) {
    return element && element?.props?.direction === "row";
  }

  isContainer(element) {
    return element && element?.type === "Container" || element?.type === "Box" || element?.type === "Screen";
  }

  isInput(node) {
    if (node) {
      const type = node.type;
      return (
        type === "Input" ||
        type === "TextArea" ||
        type === "TextBox" ||
        type === "RadioBox" ||
        type === "Password" ||
        type === "Checkbox" ||
        type === "DateDropDown" ||
        type === "DropDown" ||
        type === "RadioGroup" ||
        type === "CheckBoxGroup"
      );
    }
    return false;
  }
}

export class LLM {
  runPrompt(/*messages, progressCallback*/) {
    throw new Error("Method 'convert' must be implemented.");
  }
}
