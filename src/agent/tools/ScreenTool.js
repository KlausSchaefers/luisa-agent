import { Tool } from "../Interfaces";
import ScreenPrompt from "../prompts/ScreenPrompt";
import ScreenPromptHTML from '../prompts/ScreenPromptHTML'

export default class Screen extends Tool {
  constructor(llm, elements, config = {}) {
    console.debug(config);
    super(llm);
    this.elements = elements;
    this.useHTML = config.useHTML
    this.screenSize = config.screenSize ? config.screenSize : { w: 400, h: 800 };
    this.promptJSON = config.screenPrompt ? config.screenPrompt : new ScreenPrompt();
    this.promptHTML = new ScreenPromptHTML();
  }

  async run(messages, currentScreen, section, app, currentModel) {
    if (this.useHTML) {
      return this.runHTML(messages, currentScreen, section, app, currentModel);
    } else {
      return this.runJSON(messages, currentScreen, section, app, currentModel);
    }
  }

  async runHTML(messages, currentScreen, section, app, currentModel) {

    const message = this.getUserMessages(messages);

    const prompt = `

            ${this.promptHTML.htmlFormatScreen()}


            ${this.promptHTML.screenSize(this.screenSize)}

            Please generate a screen:

            ${message}

            ${this.promptHTML.htmlRules()}
            
            Return the result as HTML. 
        `;


    const aiMessages = [
      {
        role: "system",
        content: this.promptJSON.systemScreen(),
      },
      { role: "user", content: prompt },
    ];

    console.debug('runHTML', aiMessages)


    const res = await this.llm.runHTMLPrompt(aiMessages);
    console.debug('RESULT: ', res)


    if (res.error) {
      return {
        error: res.error,
      };
    }
    return {
      raw: res.html,
      useHTML: true,
      prompt: prompt,
      usage: res.usage,
    };
  }

  async runJSON(messages, currentScreen, section, app, currentModel) {
    const message = this.getUserMessages(messages);

    //const screenMessage = this.promptJSON.messageScreen(message, currentScreen, section);

    const prompt = `

            ${this.promptJSON.jsonFormatScreen()}

            ${this.promptJSON.jsonElements(this.elements)}

            ${this.promptJSON.screenSize(this.screenSize)}

            Please generate a screen:

            ${message}

            ${this.promptJSON.jsonRules()}
            
            Return the result as JSON in the defined language. Do not include any additional text.
        `;

    const aiMessages = [
      {
        role: "system",
        content: this.promptJSON.systemScreen(),
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
}
