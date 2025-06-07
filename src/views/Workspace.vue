<template>
    <div class="luisa-main">
      <Chat @change="onNewMessage" ref="chat"></Chat>
      <Preview></Preview>
    </div>
</template>


<script>
import Chat from '../components/Chat.vue'
import Preview from '../components/Preview.vue'
export default {
  emits: ['update:modelValue', 'click', 'change'],
  props: {
  },
  data() {
    return {
      isWorking: false,
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
    onNewMessage (messages) {
      console.debug('onNewMessage', messages)
      this.messages = messages
      this.status.busy = true
      this.status.messages = []
      this.$refs.chat.onAgentMessage("Working!\n\n")
   
      setTimeout(() =>  this.$refs.chat.onChangeLastAgentMessage("Planning!\n\n"), 2000)
      setTimeout(() => this.finish(), 4000)
    },
    finish() {
      this.isWorking = false
      this.status.busy = false
      this.status.messages = []
      this.$refs.chat.onChangeLastAgentMessage("Done!")
    }
  },
  watch: {
    
  },
  mounted() {

  }
}
</script>
