<template>
    <div class="luisa-main">
      <Chat @change="onNewMessage" ref="chat"></Chat>
      <Preview :app="app"></Preview>
    </div>
</template>


<script>
import Chat from '../components/Chat.vue'
import Preview from '../components/Preview.vue'
import LuisaAgent from '../agent/LuisaAgent'
import OpenAI from '../agent/OpenAI'

export default {
  emits: ['update:modelValue', 'click', 'change'],
  props: {
  },
  data() {
    return {
      isWorking: false,
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
    async onNewMessage (messages) {
      this.messages = messages
      this.status.busy = true
      this.status.messages = []

      const token = localStorage.getItem('luisaOpenAIKey')
      if (!token) {
        this.$refs.chat.onAgentMessage("No OpenAI key!\n\n")
        return
      }
      
      //chat.onAgentMessage("Working!\n\n")

      const filteredMessages = this.messages.filter(m => m.role ==='user' || m.role === 'system')
      const chat = this.$refs.chat
   
      const llm = new OpenAI(token)
      const agent = new LuisaAgent(llm)
      
      const result = await agent.run(filteredMessages, (m) => {
        chat.onChangeLastAgentMessage(m + '\n\n')
      })

      if (result.error) {
        chat.onAgentMessage("Something went wrong: \n\n" + result.error)
        this.finish()
        return
      }

      console.debug(JSON.stringify(result.app, null, 2))


      console.debug(result)

      this.finish()


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

  }
}
</script>
