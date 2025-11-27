<template>
    <div class="luisa-main">
        <Chat @change="onNewMessage" ref="chat"></Chat>

        <div class="luisa-main-content">
            <div class="luisa-main-content-header">
                <div>
                    Luisa - Bench
                </div>

            </div>
            <div :class="'luisa-main-content-body'">
                <div v-if="status.busy" class="luisa-main-content-loading">
                    {{ progressMessage }}
                </div>

                <div class="luisa-flex-row luisa-flex-grow " v-else>
                    <pre class="luisa-code"><code class="language-javascript" v-html="jsonCode"></code></pre>

                    <pre class="luisa-code"><code class="language-xml" v-html="htmlCode"></code></pre>

                </div>

            </div>

        </div>

    </div>
</template>

<style>
@import 'highlight.js/styles/atom-one-light.min.css';
</style>


<script>
import Chat from '../components/Chat.vue'
import Preview from '../components/Preview.vue'
import LuisaAgent from '../agent/LuisaAgent'
import OpenAI from '../agent/llm/OpenAI'

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
// Then register the languages you need
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

import { IconTrash } from '@tabler/icons-vue';
import Pipeline from '@/agent/Pipeline';

export default {
    emits: ['update:modelValue', 'click', 'change'],
    props: {
    },
    data() {
        return {
            isWorking: false,
            size: 'd',
            app: null,
            messages: [],
            selectedScreen: '',
            progressMessage: 'Thinking...',
            isDebug: false,
            jsonResult: '{"key": 1}',
            htmlResult: '<HTML></HTML>',
            status: {
                busy: false,
                messages: []
            }
        }
    },
    provide() {
        return {
            status: this.status
        }
    },
    components: {
        'Chat': Chat,
        'Preview': Preview,
        'IconTrash': IconTrash
    },
    computed: {
        screenNames() {
            if (this.app) {
                return Object.values(this.app.screens).map(s => s.name)
            }
            return []
        },
        jsonCode() {
            const result = hljs.highlight(this.jsonResult, { language: 'javascript' }).value
            return result
        },
        htmlCode() {
            const result = hljs.highlight(this.htmlResult, { language: 'xml' }).value
            return result
        }
    },
    methods: {

        getScreenSize() {
            if (this.size === 'm') {
                return { w: 414, h: 896 }
            }
            return { w: 1200, h: 720 }
        },

        getConfig() {
            return {
                removeContainers: false,
                screenSize: this.getScreenSize()
            }
        },

        async onNewMessage(messages) {
            this.messages = messages
            this.status.busy = true
            this.status.messages = []
            this.app = null
            this.selectedScreen = ''
            this.jsonResult = ''
            this.htmlResult = ''

            const token = localStorage.getItem('luisaOpenAIKey')
            if (!token) {
                this.$refs.chat.onAgentMessage("No OpenAI key!\n\n")
                return
            }
            let p1 = this.runJSON(token)
            let p2 = this.runHTML(token)
            await Promise.all([p1, p2])

            this.finish()

        },

        async runJSON(token) {

            const filteredMessages = this.messages.filter(m => m.role === 'user' || m.role === 'system').join('\n\n')

            const llm = new OpenAI(token)
            const agent = new LuisaAgent(llm, this.getConfig())

            const result = await agent.createScreenJSON(filteredMessages)

            this.jsonResult = JSON.stringify(result.raw, null, 2)
        },


        async runHTML(token) {

            const filteredMessages = this.messages.filter(m => m.role === 'user' || m.role === 'system').join('\n\n')

            const llm = new OpenAI(token)
            const conf = this.getConfig()
            conf.useHTML = true
            conf.pipeline = new Pipeline()
            const agent = new LuisaAgent(llm, conf)

            const result = await agent.createScreenHTML(filteredMessages)

            this.htmlResult = result.html
        },

        saveModel(app) {

        },
        finish() {
            this.isWorking = false
            this.status.busy = false
            this.status.messages = []
            //this.$refs.chat.onChangeLastAgentMessage("Done!")
        },
        printRaw(node, result = [], indent = '') {
            result.push(`${indent} ${node.type}  ${node.variant} [${node.name}] `)
            if (node.children) {
                node.children.forEach(c => {
                    this.printRaw(c, result, indent + '   ')
                })
            }
            if (node.screens) {
                node.screens.forEach(c => {
                    this.printRaw(c, result, indent + '   ')
                })
            }
            return result.join('\n')
        }
    },
    watch: {

    },
    mounted() {

    }
}
</script>
