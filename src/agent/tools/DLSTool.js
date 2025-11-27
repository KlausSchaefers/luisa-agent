import {Tool} from "../Interfaces"
import DLSPrompt from "../prompts/DLSPrompt";

export default class DLSTool extends Tool {

  constructor(llm, config = {}) {
    super(llm);
    this.prompt = config.dslPrompt ? config.dslPrompt : new DLSPrompt();
  }

  async run(messages, currentModel) {

    const message = this.getUserMessages(messages);
    const prompt = `
          Please generate a design system for the following app:

          ${message}

          ${this.prompt.jsonFormatDLS(this.dsl)}

          Return the result as JSON in the defined language. Do not include any additional text.
    `;

    const aiMessages = [
      {
        role: "system",
        content: this.prompt.systemDLS(),
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

}