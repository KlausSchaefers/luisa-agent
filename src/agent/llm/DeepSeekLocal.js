import { LLM } from "../Interfaces";

export default class DeepSeekLocal extends LLM {
  constructor(modelName = "onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX") {
    super();
    this.modelName = modelName;
    this.worker = null;
    this.isWorkerLoaded = false;
    this.pendingPromises = new Map();
    this.messageId = 0;

    this.initializeWorker();
  }

  initializeWorker() {
    if (this.worker) {
      return; // Worker already loaded
    }

    // Create worker only once
    this.worker = new Worker(new URL("./deepseek-worker.js", import.meta.url), {
      type: "module",
    });

    // Set up message handling
    this.worker.addEventListener("message", (event) => {
      this.handleWorkerMessage(event.data);
    });
  }

  handleWorkerMessage(message) {
    const { type, data, messageId } = message;
    //console.log("DeepSeekLocal.handleWorkerMessage() > ", type, message);
    switch (type) {
      case "loaded":
        if (data === "Model loaded successfully") {
          this.isWorkerLoaded = true;
        }
        this.onLoaded();
        break;

      case "token":
        // Handle streaming tokens
        console.log("token:", data);
        if (this.onToken) {
          this.onToken(data);
        }
        break;

      case "complete":
        // Handle completion

        if (messageId && this.pendingPromises.has(messageId)) {
          const { resolve } = this.pendingPromises.get(messageId);
          //console.log("DeepSeek Worker Complete:", data, resolve);
          resolve(data);
          this.pendingPromises.delete(messageId);
        }
        break;

      case "error":
        console.error("DeepSeek Worker Error:", data);
        if (messageId && this.pendingPromises.has(messageId)) {
          const { reject } = this.pendingPromises.get(messageId);
          reject(new Error(data));
          this.pendingPromises.delete(messageId);
        }
        break;
    }
  }

  async loadModel() {
    if (!this.worker) {
      throw new Error("Worker not initialized");
    }

    if (this.isWorkerLoaded) {
      return; // Model already loaded
    }

    this.worker.postMessage({
      type: "load",
      data: { modelName: this.modelName },
    });
  }

  async runPrompt(messages, options = {}) {
    const prompt = messages
      .filter((msg) => msg.role === "user")
      .map((msg) => msg.content)
      .join("\n");
    //console.log("DeepSeekLocal.runPrompt prompt", prompt);

    if (!this.worker || !this.isWorkerLoaded) {
      throw new Error("Model not loaded yet");
    }

    return new Promise((resolve, reject) => {
      const messageId = ++this.messageId;
      this.pendingPromises.set(messageId, { resolve, reject });
      this.worker.postMessage({
        type: "generate",
        data: { prompt, options, messageId },
        messageId
      });
    });
  }

  onLoaded() {

    if (this.onLoadedCallback) {
      this.onLoadedCallback();
    }
  }

  setLoadedCallback(callback) {
    this.onLoadedCallback = callback;
  }
  // Method to set token callback for streaming
  setTokenCallback(callback) {
    this.onToken = callback;
  }

  // Clean up worker when instance is destroyed
  destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
      this.isWorkerLoaded = false;
      this.pendingPromises.clear();
    }
  }

  async check() {
    // WebGPU check is now handled in the worker
    return true;
  }
}
