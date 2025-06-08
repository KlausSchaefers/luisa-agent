export default class MockLLM {

    constructor(replys) {
        this.replys  = replys
    }

    async runPrompt() {
        const reply = this.replys.shift()
        return {
            "content": JSON.stringify(reply)
        }
    }
}