<template>

    <div :class="'luisa-chat-message luisa-chat-message-' + message.role" v-html=value></div>
         
</template>


<script>


import { marked } from 'marked'

export default {
  props: ['message'],
  emits: [],
  data() {
    return {
       
    }
  },
  components: {
  },
  computed: {
    value () {
      const html = marked(this.message.content)
      return html
    }
  },
  methods: {
   
  },
  watch: {
    
  },
  mounted() {
  }
}
</script>
