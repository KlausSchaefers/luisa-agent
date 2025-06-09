import Prompts from "./Prompt";
import Pipeline from "./Pipeline";
import Elements from "./Elements";

export default class LuisaAgent {
  constructor(llm, config = { screenSize: { w: 400, h: 800 } }, pipeline = Pipeline.defaultPipeline(), prompts = new Prompts(), elements = new Elements()) {
    this.llm = llm;
    this.prompts = prompts;
    this.pipeline = pipeline;
    this.config = config;
    this.elements = elements;
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
    const res = await this.llm.runPrompt(aiMessages);
    if (res.error) {
      return {
        error: res.error,
      };
    }

    try {
      const content = res.content;
      const raw = this.parseJSON(content);

      return {
        app: raw,
        prompt: prompt,
        usage: res.usage,
      };
    } catch (err) {
      return {
        error: "Something went wrong when parsing " + err.message,
      };
    }
  }

  async createScreen(message, currentModel) {

    const prompt = `

            ${this.prompts.jsonFormatScreen()}

            ${this.prompts.elements(this.elements)}

            ${this.prompts.screenSize(this.config)}

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

    const res = await this.llm.runPrompt(aiMessages);
    if (res.error) {
      return {
        error: res.error,
      };
    }

    try {
      const content = res.content;
      const raw = this.parseJSON(content);

      return {
        raw: raw,
        prompt: prompt,
        usage: res.usage,
      };
    } catch (err) {
      return {
        error: "Something went wrong when parsing",
      };
    }
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

  parseJSON(content) {
    if (content.startsWith("```json")) {
      content = content.substring(8, content.length - 3).trim();
    }
    if (content.startsWith("```")) {
      content = content.substring(3, content.length - 3).trim();
    }
    return JSON.parse(content);
  }
}
