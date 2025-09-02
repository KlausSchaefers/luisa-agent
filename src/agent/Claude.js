import { LLM } from "./Interfaces";

import Anthropic from "@anthropic-ai/sdk";

export default class Claude extends LLM {
  constructor(token, model = "gpt-4.1", embeddingModel = "text-embedding-3-small") {
    super();
    this.token = token;
    this.model = model;
    this.embeddingModel = embeddingModel;
    this.anthropic = new Anthropic({
      apiKey: token,
      dangerouslyAllowBrowser: true,
    });
  }

  async runEmbedding(txt) {
    return {
      error: "error-embedding",
    };
  }

  async runPrompt(messages) {
    try {
      const systemPrompt = messages.find((m) => m.role === "system")?.content;
      const prompt = messages.find((m) => m.role === "user")?.content;

      if (!systemPrompt || !prompt) {
        return {
          error: "error-wrong prompt",
        };
      }

      const result = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 5000,
        temperature: 1,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      // Extract text content from the response
      const textContent = result.content
        .filter((content) => content.type === "text")
        .map((content) => content.text)
        .join("");

    //   console.log("Claude.runPrompt", textContent);
    //   const parsedResult = JSON.parse(textContent);

      return {
        content: textContent,
        usage: 0,
        finish_reason: "",
      };
    } catch (error) {
        console.error("Claude.runPrompt error", error);
      return {
        error: "error-json",
      };
    }
  }
}
