export default class MockLLM {

    constructor(replys) {
        this.replys  = replys
    }

    async runJSONPrompt(txt){
        const reply = this.replys.shift()
        return {
            "json": reply
        }
    }

    async runPrompt() {
        const reply = this.replys.shift()
        return {
            "content": JSON.stringify(reply)
        }
    }
}