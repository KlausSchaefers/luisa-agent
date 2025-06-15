import Prompts from "./Prompt";
import Pipeline from "./Pipeline";
import DLS from "./DLS";
import Elements from "./Elements";
import HTMLParser from "./converter/HTMLParser";

export default class LuisaAgent {
  constructor(llm, config = {}) {
    this.llm = llm;
    this.config = config;
    this.screenSize = config.screenSize ? config.screenSize : { w: 400, h: 800 }
    this.dsl = config.dls ? config.dls : new DLS()
    this.prompts = config.prompts ? config.prompts :  new Prompts();
    this.pipeline = config.pipeline ? config.pipeline : Pipeline.defaultPipeline(this.dsl);
    this.elements = config.elements ? config.elements : new Elements()
    this.useHTML = config.useHTML ? config.useHTML : false
    console.debug("LuisaAgent() > ", this.useHTML)
  }

  setProgressCallback (c) {
    this.progressCallback = c
  }

  async run(messages, currentModel) {
    
    const result = {
      name : "",
      screens: [],
      raw: {
        screens: [],
      },
    };

    const message = this.getUserMessages(messages);

    // 1) think about a good structure
    this.onProgress(" - Plan main structure...")
    const structure = await this.createAppStructure(message, currentModel);
    if (structure.error) {
      return structure
    }

    result.raw.structure = structure.app;
    const app = structure.app
    result.name = app.name

    // 2) create the screens
    for (let s of app.screens) {
      this.onProgress("- Create screen __" + s.name + "__")
      const screenMessage = this.prompts.messageScreen(message, s.description)
      let scrn = await this.createScreen(screenMessage);
      if (scrn.raw) {
        scrn.raw.name = s.name         
        result.screens.push(structuredClone(scrn.raw));
        result.raw.screens.push(scrn.raw);
      } else {
        console.warn('run() > Could not create screen')
      }

    }

    //3) plan design system
    
 
    // 4) Set basic props and design system
    this.pipeline.convert(result);

    return result;
  }

  async createAppStructure(message, currentModel) {

    const prompt = `

          ${this.prompts.jsonFormatStructure()}

    
          Please generate an app:

          ${message}

          
          Return the result as JSON in the defined language. Do not include any additional text.
      `;

    const aiMessages = [
      {
        role: "system",
        content: this.prompts.systemStructure(),
      },
      { role: "user", content: prompt },
    ];
    const res = await this.llm.runJSONPrompt(aiMessages);
    if (res.error) {
      return {
        error: res.error,
      };
    }
    return {
      app: res.json,
      prompt: prompt,
      usage: res.usage,
    };
   
  }

  async createScreen(message, currentModel) {
    if (this.useHTML) {
      return this.createScreenHTML(message, currentModel)
    } else {
      return this.createScreenJSON(message, currentModel)
    }
  }

  async createScreenHTML(message, currentModel) {
    const prompt = `

          ${this.prompts.htmlFormatScreen()}

          ${this.prompts.htmlElements(this.elements)}

          ${this.prompts.screenSize(this.screenSize)}

          Please generate a screen:

          ${message}

          
          Return the result as HTML Do not include any additional text.
      `;

    const aiMessages = [
      {
        role: "system",
        content: this.prompts.htmlSystem(),
      },
      { role: "user", content: prompt },
    ];

    const res = await this.llm.runHTMLPrompt(aiMessages);
    if (res.error) {
      return {
        error: res.error,
      }
    }

    const html = res.html
    const raw = HTMLParser.parse(html)

    return {
      prompt: prompt,
      usage: res.usage,
      raw: raw,
      html: res.html
    };
  }

  async createScreenJSON(message, currentModel) {

    const prompt = `

            ${this.prompts.jsonFormatScreen()}

            ${this.prompts.jsonElements(this.elements)}

            ${this.prompts.screenSize(this.screenSize)}

            Please generate a screen:

            ${message}

            
            Return the result as JSON in the defined language. Do not include any additional text.
        `;

    const aiMessages = [
      {
        role: "system",
        content: this.prompts.systemScreen(),
      },
      { role: "user", content: prompt },
    ];

    const res = await this.llm.runJSONPrompt(aiMessages);
    if (res.error) {
      return {
        error: res.error,
      }
    }
    return {
      raw: res.json,
      prompt: prompt,
      usage: res.usage,
    };
    
  }

  onProgress (message) {
    if (this.progressCallback) (
      this.progressCallback(message)
    )
  }

  getUserMessages(messages) {
    return messages
      .filter((m) => m.role == "user")
      .map((m) => m.content)
      .join("\n\n");
  }
}
