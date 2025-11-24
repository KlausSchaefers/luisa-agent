import AppPrompt from "./prompts/AppPrompt";
import DLSPrompt from "./prompts/DLSPrompt";
import ScreenPrompt from "./prompts/ScreenPrompt";
import Pipeline from "./Pipeline";
import DLS from "./DLS";
import Elements from "./Elements";
import HTMLParser from "./converter/HTMLParser";

export default class LuisaAgent {
  constructor(llm, config = {}) {
    this.llm = llm;
    this.config = config;
    this.screenSize = config.screenSize ? config.screenSize : { w: 400, h: 800 };
    this.dsl = config.dls ? config.dls : new DLS();

    this.useCustomDSL = config.useCustomDSL ? config.useCustomDSL : false;
    this.appPrompt = config.appPrompt ? config.appPrompt : new AppPrompt();
    this.dslPrompt = config.dslPrompt ? config.dslPrompt : new DLSPrompt();

    this.screenPrompts = config.screenPrompt ? config.screenPrompt : new ScreenPrompt();
    this.pipeline = config.pipeline ? config.pipeline : Pipeline.defaultPipeline(this.dsl, this.useCustomDSL);
    this.elements = config.elements ? config.elements : new Elements();
    this.useHTML = config.useHTML ? config.useHTML : false;
    console.debug("LuisaAgent() > ", this.useHTML, this.useCustomDSL);
  }

  setProgressCallback(c) {
    this.progressCallback = c;
  }

  async run(messages, currentModel) {
    const result = {
      name: "",
      screenSize: this.screenSize,
      dsl: {},
      screens: [],
      raw: {
        screens: [],
        dsl: {},
        screenSize: this.screenSize,
      },
    };

    const message = this.getUserMessages(messages);

    // 1) think about a good structure
    this.onProgress(" - Plan main structure...");
    const structure = await this.createAppStructure(message, currentModel);
    if (structure.error) {
      return structure;
    }

    console.debug("run() > structure ", structure);

    result.raw.structure = structure.app;
    const app = structure.app;
    result.name = app.name;

    // 2) create the screens
    for (let section of app.sections) {
      for (let s of section.screens) {
        this.onProgress("- Create screen __" + s.name + "__");
        const scrn = await this.createScreen(message, s, section, currentModel);
        if (scrn.raw) {
          scrn.raw.name = s.name;
          result.screens.push(structuredClone(scrn.raw));
          result.raw.screens.push(scrn.raw);
        } else {
          console.warn("run() > Could not create screen");
        }
      }
    }

    //3) plan design system
    this.onProgress(" - Plan design system...");
    const dsl = await this.createDesignSystem(message, app, currentModel);
    result.dsl = dsl;
    result.raw.dsl = dsl;

    // 4) Set basic props and design system
    this.pipeline.convert(result);

    return result;
  }

  async createDesignSystem(message, app, currentModel) {
    const prompt = `
     
    
          Please generate a design system for the following app:

          ${message}

          ${this.dslPrompt.jsonFormatDLS(this.dsl)}

          Return the result as JSON in the defined language. Do not include any additional text.
    `;

    const aiMessages = [
      {
        role: "system",
        content: this.dslPrompt.systemDLS(),
      },
      { role: "user", content: prompt },
    ];
    const res = await this.llm.runJSONPrompt(aiMessages);
    console.debug("createDesignSystem() > ", res);
    if (res.error) {
      return {
        error: res.error,
      };
    }
    return res.json
  }

  async createAppStructure(message, currentModel) {
    const prompt = `

          ${this.appPrompt.jsonFormatStructure()}
    
          Please generate an app:

          ${message}

          Return the result as JSON in the defined language. Do not include any additional text.
    `;

    const aiMessages = [
      {
        role: "system",
        content: this.appPrompt.systemStructure(),
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

  async createScreen(message, currentScreen, app, currentModel) {
    const screenMessage = this.screenPrompts.messageScreen(message, currentScreen, app);
    //console.debug("createScreen() > ", screenMessage)
    if (this.useHTML) {
      return this.createScreenHTML(screenMessage, currentModel);
    } else {
      return this.createScreenJSON(screenMessage, currentModel);
    }
  }

  async createScreenHTML(message, currentModel) {
    const prompt = `

          ${this.screenPrompts.htmlFormatScreen()}

          ${this.screenPrompts.htmlElements(this.elements)}

          ${this.screenPrompts.screenSize(this.screenSize)}

          Please generate a screen:

          ${message}

          ${this.screenPrompts.htmlRules()}

          
          Return the result as HTML Do not include any additional text.
      `;

    const aiMessages = [
      {
        role: "system",
        content: this.screenPrompts.htmlSystem(),
      },
      { role: "user", content: prompt },
    ];

    const res = await this.llm.runHTMLPrompt(aiMessages);
    if (res.error) {
      return {
        error: res.error,
      };
    }

    const html = res.html;
    const raw = HTMLParser.parse(html);

    return {
      prompt: prompt,
      usage: res.usage,
      raw: raw,
      html: res.html,
    };
  }

  async createScreenJSON(message, currentModel) {
    const prompt = `

            ${this.screenPrompts.jsonFormatScreen()}

            ${this.screenPrompts.jsonElements(this.elements)}

            ${this.screenPrompts.screenSize(this.screenSize)}

            Please generate a screen:

            ${message}

            ${this.screenPrompts.jsonRules()}
            
            Return the result as JSON in the defined language. Do not include any additional text.
        `;

    const aiMessages = [
      {
        role: "system",
        content: this.screenPrompts.systemScreen(),
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
      raw: res.json,
      prompt: prompt,
      usage: res.usage,
    };
  }

  onProgress(message) {
    if (this.progressCallback) this.progressCallback(message);
  }

  getUserMessages(messages) {
    return messages
      .filter((m) => m.role == "user")
      .map((m) => m.content)
      .join("\n\n");
  }
}
