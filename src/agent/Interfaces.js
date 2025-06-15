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
    return element && (element?.layout?.direction === "row" || element?.props?.direction === "row")
  }

  isColumnContainer(element) {
    return !this.isRowContainer(element)
  }



  isNoLayoutGrow(element) {
    return element && element?.layout?.grow === 0;
  }

  isLayoutGrow(element) {
    if (!element.layout) {
      return true
    }
    return element && element?.layout?.grow === 1;
  }

  isContainer(element) {
    if (element.container) {
      return true
    }
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

  async runEmbedding(/*messages*/) {
    throw new Error("Method 'txt' must be implemented.");
  }

  async runPrompt(/*messages*/) {
    throw new Error("Method 'runPrompt' must be implemented.");
  }

  async runHTMLPrompt(messages) {
     let res = await this.runPrompt(messages)
    if (res.error) {
      return {
        error: res.error,
      }
    }
    try {
      const content = res.content;
      const html = this.parseHTML(content);
      return {
        html: html
      }
    } catch (err) {
      console.error('LLM.runHTMLPrompt() > ', err.message)
      return {
        error: "error-json"
      }
    }
  }

  async runJSONPrompt(messages) {
    let res = await this.runPrompt(messages)
    if (res.error) {
      return {
        error: res.error,
      }
    }
    try {
      const content = res.content;
      const json = this.parseJSON(content);
      return {
        json: json
      }
    } catch (err) {
      console.error('LLM.runJSONPrompt() > ', err.message)
      return {
        error: "error-json"
      }
    }
  }

  parseJSON(content) {
    if (content.startsWith("```json")) {
      content = content.substring(8, content.length - 3).trim();
    }
    if (content.startsWith("```")) {
      content = content.substring(3, content.length - 3).trim();
    }
    return JSON.parse(content);
  }

  parseHTML(content) {
    if (content.startsWith("```html")) {
      content = content.substring(8, content.length - 3).trim();
    }
    if (content.startsWith("```")) {
      content = content.substring(3, content.length - 3).trim();
    }
    return content;
  }
}
