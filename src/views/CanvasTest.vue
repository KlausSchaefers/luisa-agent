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
                <ZoomableCanvas cellWidth="400" cellHeight="800">
                    <!-- Place your content here -->
                    <div class="ScrnCntr">Your Vue components or HTML</div>
                      <div class="ScrnCntr">Your Vue components or HTML</div>
                                 <div class="ScrnCntr">Your Vue components or HTML</div>
                                            <div class="ScrnCntr">Your Vue components or HTML</div>
                                                       <div class="ScrnCntr">Your Vue components or HTML</div>
                </ZoomableCanvas>
            </div>


        </div>

    </div>
</template>

<style lang="css">
.ScrnCntr {
    width: 400px;
    height: 800px;
    border: 2px solid #000;
    background-color: #f0f0f0;
}
</style>


<script>
import ZoomableCanvas from '../components/ZoomableCanvas.vue'

import Chat from '../components/Chat.vue';

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
        'ZoomableCanvas': ZoomableCanvas
    },
    computed: {

    },
    methods: {
      
        async onNewMessage(messages) {
            console.log("New message received in Local.vue:", messages);

        },
    },
    watch: {

    },
    mounted() {
      
    }
}
</script>
