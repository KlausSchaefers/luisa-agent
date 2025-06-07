import Prompts from "./Prompt";
export default class LuisaAgent {
  constructor(llm, prompts = new Prompts()) {
    this.llm = llm;
    this.prompts = prompts;
  }

  async run(messages, progressCallback) {
    const message = messages[messages.length - 1].content;
    const prompt = `
            ${this.prompts.dls()}

            ${this.prompts.elements()}

            Please generate :

            ${message}

            
            Return the result as JSON in the defined language. Do not include any additional text.
        `;

    const aiMessages = [
      {
        role: "system",
        content: this.prompts.system(),
      },
      { role: "user", content: prompt },
    ];

    const res = await this.llm.runPrompt(aiMessages);
    if (res.error) {
        return {
            error: res.error,
        }
    }
    const content = res.content;
    return {
        app: this.parseJSON(content),
        usage: res.usage,
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
}
