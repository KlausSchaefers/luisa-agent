export class Converter {

  convert(app) {
    if (app.screens) {
      app.screens.forEach(s => {
        //console.debug('convert() > ', s.name)
        this.convertTree(s, app)
      })
    }
    this.postConvert(app)
    return app
  }

  postConvert(/* app */) {
  }

  convertTree(tree, app) {
    this.convertElement(tree, app);
    if (tree.children) {
      //console.debug('  convertTree() > ', tree.type, tree.children.length)
      for (let i = 0; i < tree.children.length; i++) {
        this.convertTree(tree.children[i], app);
      }
    }
    return tree;
  }

  convertElement(/* element, app */) {
    console.warn("Method 'convertElement' must be implemented.");
  }

  isRowContainer(element) {
    return element && (element?.layout?.direction === "row" || element?.props?.direction === "row")
  }

  isColumnContainer(element) {
    return !this.isRowContainer(element)
  }

  hasChildren (node) {
    return node.children && node.children.length > 0
  }


  isNoLayoutGrow(element) {
    return element && element?.layout?.grow === 0;
  }

  isLayoutGrow(element) {
    // default is grow
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

export class Tool {

  constructor(llm) {
    this.llm = llm;
  }

  async run(/*message, currentModel*/) {
    throw new Error("Method 'run' must be implemented.");
  }

  getUserMessages(messages) {
    return messages
      .filter((m) => m.role == "user")
      .map((m) => m.content)
      .join("\n\n");
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
