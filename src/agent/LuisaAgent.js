import Prompts from "./Prompt";
import Pipeline from "./Pipeline";
import Elements from "./Elements";

export default class LuisaAgent {

  constructor(llm, config = {screenSize: {w: 400, h:800}}, pipeline = Pipeline.defaultPipeline(), prompts = new Prompts(), elements = new Elements() ) {
    this.llm = llm;
    this.prompts = prompts;
    this.pipeline = pipeline
    this.config = config
    this.elements = elements
  }


  async run(messages, progressCallback) {
    const message = messages[messages.length - 1].content;
    const prompt = `

            ${this.prompts.jsonFormat()}

            ${this.prompts.elements(this.elements)}

            ${this.prompts.screenSize(this.config)}

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

    try {
      const content = res.content;
      const raw = this.parseJSON(content)
      const model = this.pipeline.convert(raw)
      return {
          raw: raw,
          model: model,
          prompt: prompt,
          usage: res.usage,
      }
    } catch (err) {
       return {
        "error": "Something went wrong when parsing"
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
}
