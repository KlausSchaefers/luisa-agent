<template>
    <div class="luisa-main">
      <Chat @change="onNewMessage" ref="chat"></Chat>
     
      <div class="luisa-main-content">
        <div class="luisa-main-content-header">
           <select v-model="size" class="luisa-select">            
            <option value="m">Mobile</option>
            <option value="d">Desktop</option>
          </select>

          {{size}}
        </div>
        <div :class="'luisa-main-content-body'  ">
          <div :class="'luisa-preview-size-' + this.size" :style="'width:' + getScreenSize().w + 'px;  min-height:' + getScreenSize().h + 'px'">
          <Preview :app="app"></Preview>
          </div>
        </div>
     
      </div>

    </div>
</template>


<script>
import Chat from '../components/Chat.vue'
import Preview from '../components/Preview.vue'
import LuisaAgent from '../agent/LuisaAgent'
import OpenAI from '../agent/OpenAI'

import QuxConverter from '../agent/converter/QuxConverter'

export default {
  emits: ['update:modelValue', 'click', 'change'],
  props: {
  },
  data() {
    return {
      isWorking: false,
      size: 'm',
      app: null,
      messages: [],
      status: {
        busy:false,
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
    'Preview': Preview
  },
  computed: {
  
  },
  methods: {

    getScreenSize () {
      if (this.size === 'm') {
        return {w: 414, h: 896}
      }
      return {w: 1200, h: 720}
    },

    getConfig() {
      return {
        removeContainers: false,
        screenSize: this.getScreenSize()
      }
    },

    async onNewMessage (messages) {
      this.messages = messages
      this.status.busy = true
      this.status.messages = []
      this.app = null

      const token = localStorage.getItem('luisaOpenAIKey')
      if (!token) {
        this.$refs.chat.onAgentMessage("No OpenAI key!\n\n")
        return
      }
      
      //chat.onAgentMessage("Working!\n\n")

      const filteredMessages = this.messages.filter(m => m.role ==='user' || m.role === 'system')
      const chat = this.$refs.chat
   
      const llm = new OpenAI(token)
      const agent = new LuisaAgent(llm, this.getConfig())
      
      const result = await agent.run(filteredMessages, (m) => {
        chat.onChangeLastAgentMessage(m + '\n\n')
      })

      if (result.error) {
        chat.onAgentMessage("Something went wrong: \n\n" + result.error)
        this.finish()
        return
      }

      this.saveModel(result.model)

      const qux = new QuxConverter()
      this.app = qux.convert(result.model)

      this.finish()
    },

    saveModel(app) {
        const s = JSON.stringify(app)
        localStorage.setItem('luisaApp', s)
    },
    finish() {
      this.isWorking = false
      this.status.busy = false
      this.status.messages = []
      //this.$refs.chat.onChangeLastAgentMessage("Done!")
    }
  },
  watch: {
    
  },
  mounted() {
    const s = localStorage.getItem('luisaApp')
    if (s) {
      const model = JSON.parse(s)
      const qux = new QuxConverter()
      this.app = qux.convert(model)
    }
  }
}
</script>
