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
            
         
              <select v-model="selectedModel" class="luisa-select" @change="setModel">            
                <option v-for="m in models " :value="m.value">{{m.label}}</option>
              </select>

              <select v-model="isDebug" class="luisa-select" @change="reRender">            
                <option :value="true">Debug View</option>
                <option :value="false">Production View</option>
              </select>
              <select v-model="size" class="luisa-select" @change="setSize">            
                <option value="m">Mobile</option>
                <option value="t">Tablet</option>
                <option value="d">Desktop</option>
              </select>

              <IconCode :size="16" stroke="2" :class="['luisa-icon']" @click="showCode" v-if="app"></IconCode>
              <IconAdjustmentsAlt :size="16" stroke="2" :class="['luisa-icon']" @click="showSettings"/>
              <IconTrash :size="16" stroke="2" @click="clear" class="luisa-icon"></IconTrash>
              
            </div>
        </div>
        <div :class="'luisa-main-content-body'  ">
            <div  v-if="status.busy" class="luisa-main-content-loading">
                {{progressMessage}}
            </div>
            <div  v-else :class="'luisa-preview-size-' + this.size" :style="'max-width:' + getScreenSize().w + 'px; width:100%;  min-height:' + getScreenSize().h + 'px'">
              <Preview :app="app" :screen="selectedScreen"></Preview>
            </div>
        </div>
     
      </div>

      <Dialog ref="settingsDialog">
        <div class="luisa-padding luisa-dialog-content">
          <h2>Settings</h2>
          <div class="luisa-form-row">
            <label>OpenAI Key</label>
            <input class="luisa-input" v-model="openAIKey"/>
          </div>
          <div class="luisa-form-row">
           <label>Claude Key</label>
            <input class="luisa-input" v-model="claudeKey" />
          </div>
          <div class="luisa-form-row">
            <label>LLM output format</label>
            <select v-model="useHTML" class="luisa-select luisa-input" @change="setMode">            
                <option :value=false>JSON</option>
                <option :value=true>HTML</option>
              </select>
          </div>
           <div class="luisa-form-row">
            <label>Layout Engine</label>
             <select v-model="flexEngine" class="luisa-select luisa-input" @change="setFlex">            
                <option value="yoga">Yoga</option>
                <option value="flex">QUX</option>
              </select>
          </div>
          <div class="luisa-button-bar">
            <button class="luisa-button" @click="saveSettings">Save</button>
          </div>
      
        </div>
     
      </Dialog>

        <Dialog ref="codeDialog">
          <div class="luisa-padding luisa-dialog-content">
              <pre class="luisa-code"><code class="language-javascript" v-html="jsonCode"></code></pre>
          </div>
        </Dialog>

    </div>
</template>


<script>
import Chat from '../components/Chat.vue'
import Dialog from '../components/Dialog.vue'
import Preview from '../components/Preview.vue'
import LuisaAgent from '../agent/LuisaAgent'
import Pipeline from '../agent/Pipeline'
import OpenAI from '../agent/OpenAI'
import Claude from '../agent/Claude'
import DLS from '../agent/DLS'

import QuxConverter from '../agent/converter/QuxConverter'
import { IconTrash, IconAdjustmentsAlt, IconCode } from '@tabler/icons-vue';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
// Then register the languages you need
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);


import fitness from '../examples/fitness'
import card from '../examples/card'
import grid from '../examples/grid'
import hero from '../examples/hero'
import flex from '../examples/flex'
import simple from '../examples/simple'
import landing from '../examples/landing'
import fruits from '../examples/fruits'
import fruits2 from '../examples/fruits2'
import yoga from '../examples/yoga'
import form from '../examples/form'
import banana from '../examples/banana'

const examples = {
  'fitness': fitness,
  'card': card,
  'grid': grid,
  'hero': hero,
  "flex": flex,
  "simple": simple,
  "landing": landing,
  "fruits": fruits,
  "fruits2": fruits2,
  "yoga": yoga,
  "form": form,
  'banana': banana
}

export default {
  emits: ['update:modelValue', 'click', 'change'],
  props: {
  },
  data() {
    return {
      isWorking: false,
      flexEngine: 'yoga',
      size: 'd',
      app: null,
      messages: [],
      useHTML : false,
      selectedScreen: '',
      progressMessage: 'Thinking...',
      isDebug: false,
      claudeKey: '',
      openAIKey: '',
      status: {
        busy:false,
        messages: []
      },
      selectedModel: 'gpt-4.1',
      models: [
        {label: "OpenAI - GPT-4.1", value: "gpt-4.1"},
        {label: "OpenAI - GPT-4o-Mini", value: "gpt-4o-mini"},
        {label: "OpenAI - GPT-4o-Namo", value:'gpt-4.1-nano'},
        {label: "OpenAI - GPT-5-Nano", value:'gpt-5-nano'},
        {label: "Claude - Sonnet", value:'claude-3-5-sonnet-latest'}
      ]
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
    'IconTrash': IconTrash,
    'IconCode': IconCode,
    'IconAdjustmentsAlt': IconAdjustmentsAlt,
    'Dialog': Dialog
  },
  computed: {
     jsonCode() {
        const jsonStr = JSON.stringify(this.raw, null, 2)
        console.debug(jsonStr)
        const result = hljs.highlight(jsonStr, { language: 'javascript' }).value
        return result
    },
    screenNames () {
      if (this.app) {
        return Object.values(this.app.screens).map(s => s.name)
      }
      return []
    }
  },
  methods: {

    showCode (e) {
      this.$refs.codeDialog.show(e.target)
    },

    setModel (m){
      localStorage.setItem('luisaLLMModel', this.selectedModel )
    },

    showSettings (e) {
      this.$refs.settingsDialog.show(e.target)
    },

    saveSettings() {
      localStorage.setItem('luisaOpenAIKey', this.openAIKey )
      localStorage.setItem('luisaClaudeKey', this.claudeKey)
      this.$refs.settingsDialog.close()
    },

    clear () {
      this.app = null
      this.raw = null
      localStorage.removeItem('luisaApp')
    },

    getScreenSize () {
      if (this.size === 'm') {
        return {w: 414, h: 896}
      }
      if (this.size === 't') {
        return {w: 960, h: 720}
      }
      return {w: 1200, h: 720}
    },

    getConfig() {
      return {
        removeContainers: false,
        useHTML: this.useHTML,
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

      chat.clearAgentMessages()
      chat.onAgentMessage(`Great. I will start building the design with **${this.selectedModel}** !\n\n`)

      const filteredMessages = this.messages.filter(m => m.role ==='user' || m.role === 'system')
      const llm = this.getLLM()
      if (!llm) {
        this.finish()
        return
      } 

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
      const s = this.getScreenSize()
      const qux = new QuxConverter(s.w, s.h, this.flexEngine)
      this.app = qux.convert(result)
      this.raw = result.raw
      this.finish()
    },
    getLLM () {
      console.debug('getLLM', this.selectedModel)

      if (this.selectedModel.startsWith('gpt')) {
        const token = localStorage.getItem('luisaOpenAIKey')
        if (!token) {
          this.$refs.chat.onAgentMessage("No OpenAI key!\n\n")
          return
        }      
        return new OpenAI(token, this.selectedModel)
      }

      if (this.selectedModel.startsWith('claude')) {
        const token = localStorage.getItem('luisaClaudeKey')
        if (!token) {
          this.$refs.chat.onAgentMessage("No Claude key!\n\n")
          return
        }      
        return new Claude(token, this.selectedModel)
      }
     

    },
    async computeEmbedding(txt) {
      const token = localStorage.getItem('luisaOpenAIKey')
      const llm = new OpenAI(token)
      const embedding = await llm.runEmbedding(txt)
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
        result.push(`${indent} ${node.type}  ${node.variant} [${node.name}] `)
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
    },
    reRender () {

      localStorage.setItem('luisaAppDebug', this.isDebug)
      this.app = null
      this.$nextTick(() => {
        this.buildRaw(this.raw)
      })
    },
    setMode () {
      localStorage.setItem('luisaUseHTML', this.useHTML)
    },
    setFlex () {
      localStorage.setItem('luisaFlexEngine', this.flexEngine)
      this.reRender()
    },
    setSize () {
      localStorage.setItem('luisaSize', this.size)
      this.reRender()
    },
    buildRaw(raw) {
      console.debug('buildRaw() ', this.isDebug, raw)
      const dsl = new DLS()
      if (this.isDebug) {
        dsl.set("@container-border-width", 3)
          .set("@container-border-color", "#123ef099")
          .set("@container-border-style", "dashed")
          .set("@@section-background", "red")
          .set("@container-padding", 16)
      }
      const model = Pipeline.defaultPipeline(dsl).convert(structuredClone(raw))
      const s = this.getScreenSize()
      const qux = new QuxConverter(s.w, s.h, this.flexEngine)
      this.app = qux.convert(model)
      this.raw = raw
      //console.debug(this.printRaw(raw))
      this.selectedScreen = Object.values(this.app.screens)[0].name
      //console.debug(JSON.stringify(this.raw, null , 2))
    }
  },
  watch: {
    
  },
  mounted() {
    this.isDebug = localStorage.getItem('luisaAppDebug') === 'true'
    this.useHTML = localStorage.getItem('luisaUseHTML') === 'true'
    this.size =  localStorage.getItem('luisaSize') ?  localStorage.getItem('luisaSize')  : "m"
    this.flexEngine = localStorage.getItem('luisaFlexEngine')
    this.openAIKey = localStorage.getItem('luisaOpenAIKey')
    this.claudeKey = localStorage.getItem('luisaClaudeKey')
    this.selectedModel = localStorage.getItem('luisaLLMModel') || 'gpt-4.1'
    if (this.$route.query.app) {
      if (examples[this.$route.query.app]) {
        //console.debug('mounted() > load example', this.$route.query.app)
        const raw = examples[this.$route.query.app]
        this.buildRaw(raw)
        return
      }
    }
    const s = localStorage.getItem('luisaApp')
    if (s) {
      const raw = JSON.parse(s)
      this.buildRaw(raw)
    }
  }
}
</script>
