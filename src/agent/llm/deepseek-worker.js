import { AutoTokenizer, AutoModelForCausalLM, TextStreamer, InterruptableStoppingCriteria } from "@huggingface/transformers";

class DeepSeekWorker {
  constructor() {
    this.model = null;
    this.tokenizer = null;
    this.modelName = null;
    this.isLoaded = false;
  }

  async loadModel(modelName, progress_callback = null) {
    try {
      if (this.isLoaded && this.modelName === modelName) {
        return;
      }

      self.postMessage({
        type: "status",
        data: "Loading model...",
      });

      this.modelName = modelName;

      this.tokenizer = await AutoTokenizer.from_pretrained(this.modelName, {
      });

      this.model = await AutoModelForCausalLM.from_pretrained(this.modelName, {
        dtype: "q4f16",
        device: "webgpu"
      });

      this.isLoaded = true;

      self.postMessage({
        type: "loaded",
        data: "Model loaded successfully",
      });
    } catch (error) {
      self.postMessage({
        type: "error",
        data: error.toString(),
      });
    }
  }

  async generate(prompt, options = {}, messageId = null) {

    try {
      if (!this.isLoaded) {
        throw new Error("Model not loaded");
      }

      // Tokenize the input
      const inputs = await this.tokenizer(prompt, { return_tensors: "pt" });

      // Set up streaming
      const streamer = new TextStreamer(this.tokenizer, {
        skip_prompt: true,
        callback_function: (token) => {
          self.postMessage({
            type: "token",
            data: token,
          });
        },
      });

      // Generate response
      const outputs = await this.model.generate({
        ...inputs,
        max_new_tokens: options.maxTokens || 1024,
        temperature: options.temperature || 0.7,
        do_sample: true,
        streamer: streamer,
        stopping_criteria: new InterruptableStoppingCriteria(),
      });

      // Decode the full response
      const response = this.tokenizer.batch_decode(outputs, { skip_special_tokens: true });

      self.postMessage({
        type: "complete",
        data: response[0],
        messageId: messageId
      });
    } catch (error) {
      self.postMessage({
        type: "error",
        data: error.toString(),
      });
    }
  }
}

// Initialize worker instance
const worker = new DeepSeekWorker();

// Listen for messages from main thread
self.addEventListener("message", async (event) => {
  const { type, data } = event.data;

  switch (type) {
    case "generate":
      await worker.generate(data.prompt, data.options, data.messageId);
      break;

    case "load":
      await worker.loadModel(data.modelName);
      break;

    case "token":
      // This case is for potential token-based operations
      // Currently handled internally during generation
      break;

    default:
      self.postMessage({
        type: "error",
        data: `Unknown message type: ${type}`,
      });
  }
});

// Check WebGPU support on worker initialization
async function checkWebGPU() {
  try {
    const adapter = await navigator.gpu?.requestAdapter();
    if (!adapter) {
      throw new Error("WebGPU is not supported (no adapter found)");
    }
    self.postMessage({
      type: "status",
      data: "WebGPU support confirmed",
    });
  } catch (error) {
    self.postMessage({
      type: "error",
      data: error.toString(),
    });
  }
}

// Initialize
checkWebGPU();
