<template>
    <div class="luisa-main">
      <Chat @change="onNewMessage" ref="chat"></Chat>
     
      <div class="luisa-main-content">
        <div class="luisa-main-content-header">
            <div>
              Luisa - Agent
            </div>
            <div>
               <select v-model="selectedScreen" class="luisa-select">            
                <option :value="name" v-for="name in screenNames">{{name}}</option>
                
              </select>
      
            </div>
            <div>
              <select v-model="size" class="luisa-select">            
                <option value="m">Mobile</option>
                <option value="d">Desktop</option>
              </select>
              <IconTrash :size="16" stroke="2" @click="clear" class="luisa-icon"></IconTrash>
            </div>
        </div>
        <div :class="'luisa-main-content-body'  ">
            <div  v-if="status.busy" class="luisa-main-content-loading">
                {{progressMessage}}
            </div>
            <div  v-else :class="'luisa-preview-size-' + this.size" :style="'width:' + getScreenSize().w + 'px;  min-height:' + getScreenSize().h + 'px'">
              <Preview :app="app" :screen="selectedScreen"></Preview>
            </div>
        </div>
     
      </div>

    </div>
</template>


<script>
import Chat from '../components/Chat.vue'
import Preview from '../components/Preview.vue'
import LuisaAgent from '../agent/LuisaAgent'
import Pipeline from '../agent/Pipeline'
import OpenAI from '../agent/OpenAI'

import QuxConverter from '../agent/converter/QuxConverter'
import { IconTrash } from '@tabler/icons-vue';

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
      selectedScreen: '',
      progressMessage: 'Thinking...',
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
    'Preview': Preview,
    'IconTrash': IconTrash
  },
  computed: {
    screenNames () {
      if (this.app) {
        return Object.values(this.app.screens).map(s => s.name)
      }
      return []
    }
  },
  methods: {

    clear () {
      this.app = null
      this.raw = null
      localStorage.removeItem('luisaApp')
    },

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
      this.selectedScreen = ''
      const chat = this.$refs.chat
   

      const token = localStorage.getItem('luisaOpenAIKey')
      if (!token) {
        this.$refs.chat.onAgentMessage("No OpenAI key!\n\n")
        return
      }
      
      chat.onAgentMessage("Great. I will start building the design!\n\n")

      const filteredMessages = this.messages.filter(m => m.role ==='user' || m.role === 'system')
      
      const llm = new OpenAI(token)
      const agent = new LuisaAgent(llm, this.getConfig())
      agent.setProgressCallback((m) => {
        chat.onChangeLastAgentMessage(m + '\n\n')
      })
      
      const result = await agent.run(filteredMessages, this.raw)

      if (result.error) {
        chat.onAgentMessage("Something went wrong: \n\n" + result.error)
        this.finish()
        return
      }

     
      this.saveModel(result.raw)

      const qux = new QuxConverter()
      this.app = qux.convert(result)
      this.raw = result.raw
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
    },
    printRaw(node, result = [], indent='') {
        result.push(`${indent} ${node.type} [${node.name}] `)
        if (node.children) {
          node.children.forEach(c => {
            this.printRaw(c, result, indent+'   ')
          })
        }
        if (node.screens) {
          node.screens.forEach(c => {
            this.printRaw(c, result, indent+'   ')
          })
        }
        return result.join('\n')
    }
  },
  watch: {
    
  },
  mounted() {
    const s = localStorage.getItem('luisaApp')
    if (s) {
      const raw = JSON.parse(s)

      const model = Pipeline.defaultPipeline().convert(structuredClone(raw))
      const qux = new QuxConverter()
      this.app = qux.convert(model)
      this.raw = raw
      //console.debug(this.printRaw(model))

     // console.debug(JSON.stringify(this.app, null , 2))
    }
  }
}
</script>
