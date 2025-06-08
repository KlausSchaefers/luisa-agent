<template>
    <div class="luisa-chat">
        <div class="luisa-chat-header">
            <div>
                Luisa - Agent
            </div>
            <IconTrash :size="16" stroke="1" @click="clear" class="luisa-icon"></IconTrash>
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
                    <ChatMessage :message="m" @delete="deleteMessage(i)"></ChatMessage>
                </template>
                <div ref="bodyEnd"></div>        
            </template>

        </div>
        <div class="luisa-padding">
            <ZoomableTextArea v-if="!showSettings" @change="addMessage" :disabled="status.busy" />
        </div>
    </div>

</template>


<script>

import { IconCornerRightUp, IconAdjustmentsAlt, IconTrash } from '@tabler/icons-vue';
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
        messages: [],
        showSettings: false
    }
  },
  components: {
    IconCornerRightUp,IconAdjustmentsAlt, ChatMessage, ZoomableTextArea, IconTrash
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
    clear () {
        this.messages = []
        this.onChange()
    },
    deleteMessage (i) {
        this.messages.splice(i, 1)
        this.onChange()
    },
    addMessage (txt) {
        if (txt.trim()) {
            this.messages.push({
                "role": "user",
                "content": txt
            })
        }
        this.$emit('change', this.messages)
        this.onChange()
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
        this.onChange()
    },
    onAgentMessage (txt) {
        this.messages.push({
            "role": "agent",
            "content": txt
        })
        this.onChange()
    },
    onChange () {
        const s = JSON.stringify(this.messages)
        localStorage.setItem('luisaMessages', s)

        setTimeout(() => {
            this.$refs.bodyEnd.scrollIntoViewIfNeeded(true)
        }, 50)
    }
  },
  mounted() {
    this.openAIKey = localStorage.getItem('luisaOpenAIKey')
    if (!this.openAIKey) {
        this.showSettings = true
    } 
    let s =  localStorage.getItem('luisaMessages')
    if (s) {
        this.messages = JSON.parse(s)
    }
    if (this.messages.length === 0) {
        this.messages.push(            {
            "role": "ui",
            "content": "Hi there! \n\n Please describe the UI I should create for you."
        })
    }
  }
}
</script>
