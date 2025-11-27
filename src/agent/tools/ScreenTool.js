import { Tool } from "../Interfaces";
import ScreenPrompt from "../prompts/ScreenPrompt";


export default class Screen extends Tool {
  constructor(llm, elements, config = {}) {
    super(llm);
    this.elements = elements;
    this.screenSize = config.screenSize ? config.screenSize : { w: 400, h: 800 };
    this.prompt = config.screenPrompt ? config.screenPrompt : new ScreenPrompt();
  }

  async run(messages, currentScreen, section, app, currentModel) {
    const message = this.getUserMessages(messages);

    console.debug("ScreenTool.run() > ", section);
    const screenMessage = this.prompt.messageScreen(message, currentScreen, section);
    console.debug("createScreen() > ", screenMessage);

    const prompt = `

            ${this.prompt.jsonFormatScreen()}

            ${this.prompt.jsonElements(this.elements)}

            ${this.prompt.screenSize(this.screenSize)}

            Please generate a screen:

            ${message}

            ${this.prompt.jsonRules()}
            
            Return the result as JSON in the defined language. Do not include any additional text.
        `;

    const aiMessages = [
      {
        role: "system",
        content: this.prompt.systemScreen(),
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
