<template>
    <div class="luisa-main">
        <Chat @change="onNewMessage" ref="chat"></Chat>
        <div class="luisa-main-content">
            <div class="luisa-main-content-header">
                <div>
                    Luisa - Local LLM (DeepSeek {{ loaded ? "Loaded" : "Loading..." }})
                </div>

            </div>
            <div :class="'luisa-main-content-body'">
                <div v-if="status.busy" class="luisa-main-content-loading">
                    {{ progressMessage }}
                </div>
                <div v-else>
                    <button @click="runBenchmark" :disabled="!loaded">Run LLM Bench</button>
                    <div v-if="result" class="rawPreview">
                         {{result}}
                    </div>
  
                </div>

            </div>


        </div>

    </div>
</template>

<style lang="css">
.rawPreview {
    background-color: #f5f5f5;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    white-space: pre-wrap;
    font-family: 'Courier New', Courier, monospace;
    margin-top: 10px;
}
</style>


<script>

import Chat from '../components/Chat.vue';
import DeepSeekLocal from '@/agent/DeepSeekLocal';
import { uiPrompt } from './demo.js';

// https://dev.to/emojiiii/running-deepseek-r1-in-the-browser-a-comprehensive-guide-3j63

export default {
    emits: ['update:modelValue', 'click', 'change'],
    props: {
    },
    data() {
        return {
            messages: [],
            selectedScreen: '',
            progressMessage: 'Loading model...',
            isDebug: false,
            jsonResult: '{"key": 1}',
            htmlResult: '<HTML></HTML>',
            loaded: false,
            result: '',
            status: {
                busy: true,
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
        'Chat'  : Chat,
    },
    computed: {

    },
    methods: {
        async runBenchmark() {
            this.status.busy = true;
            this.progressMessage = "Generating response...";
            const messages = [
                {
                    role: 'user',
                    content: uiPrompt,
                }
            ]
            const response = await this.llm.runPrompt(messages);
            console.log("Bench LLM response:", response);
            this.result = response
            this.status.busy = false;
            
        },
        async onNewMessage(messages) {
            console.log("New message received in Local.vue:", messages);

            this.status.busy = true;
            this.progressMessage = "Generating response...";
            this.llm.runPrompt(messages).then(response => {
                console.log("LLM response:", response);
                this.result = response; 
                this.status.busy = false;
            }).catch(err => {
                console.error("Error from LLM:", err);
                this.status.busy = false;
            });
        },
    },
    watch: {

    },
    mounted() {
        this.llm = new DeepSeekLocal();
        this.llm.setLoadedCallback(() => {
            console.log("mounted() > DeepSeekLocal model loaded.");
            this.loaded = true;
            this.status.busy = false;
            this.progressMessage = "Model loaded.";
        });
        this.llm.loadModel()
    }
}
</script>
