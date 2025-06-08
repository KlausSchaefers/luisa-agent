export default class MockLLM {

    constructor(reply) {
        this.reply  = reply
    }

    async runPrompt() {
        return {
            "content": JSON.stringify(this.reply)
        }
    }
}