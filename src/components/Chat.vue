<template>
    <div class="luisa-chat">
        <div class="luisa-chat-header">
            <div>
                Luisa - Agent
            </div>
            <IconAdjustmentsAlt :size="16" stroke="1" :class="['luisa-icon', {'luisa-icon-active': showSettings}]" @click="showSettings = !showSettings"/>
        </div>
    <div class="luisa-chat-body">
      <template v-if="showSettings">
            <div class="luisa-chat-message luisa-chat-message-settings ">Please enter your OpenAi Key. The key will only be saved in the browser.</div>
            <div class="luisa-icon-input">
                <input class="luisa-input luisa-input-fw" @change="onSaveOpenAI" type="password"></input>
                <IconCornerRightUp  :size="16"  class="luisa-icon" @click="onSaveOpenAI"/>
            </div>
        </template>
        <template v-else>

            <template v-for="(m,i) in messages" :key="i">
                <ChatMessage :message="m"></ChatMessage>
            </template>
        

            <ZoomableTextArea @change="onMesssage" :disabled="status.busy" />
         
        </template>
    </div>
    </div>

</template>


<script>

import { IconCornerRightUp, IconAdjustmentsAlt } from '@tabler/icons-vue';
import ChatMessage from './ChatMessage.vue';
import ZoomableTextArea from './ZoomableTextArea.vue';


export default {
  emits: ['change'],
  inject: ['status'],
  props: {
  },
  data() {
    return {
        openAIKey:'',
        messages: [
            {
                "role": "ui",
                "content": "Hi there! \n\n Please describe the UI I should create for you."
            }
        ],
        showSettings: false
    }
  },
  components: {
    IconCornerRightUp,IconAdjustmentsAlt, ChatMessage, ZoomableTextArea
  },
  computed: {
    statusMessage () {
        if (this.status.busy) {
            return {
                role: 'agent',
                content: this.status.messages.join('\n\n')
            }
        }  
        return ''
    }
  },
  methods: {
    onMesssage (txt) {
        this.messages.push({
            "role": "user",
            "content": txt
        })
        this.$emit('change', this.messages)
    },
    onSaveOpenAI(e) {
        if (e.target.value) {
            this.openAIKey = e.target.value
            localStorage.setItem('luisaOpenAIKey', this.openAIKey)
            this.showSettings = false
        }
    },
    onChangeLastAgentMessage (txt) {
        this.messages[this.messages.length-1].content += txt
    },
    onAgentMessage (txt) {
        this.messages.push({
            "role": "agent",
            "content": txt
        })
    }
  },
  mounted() {
    this.openAIKey = localStorage.getItem('luisaOpenAIKey')
    if (!this.openAIKey) {
        this.showSettings = true
    } 
  }
}
</script>
