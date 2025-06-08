<template>
    <div class="luisa-preview">
   
      <Luisa :design="app" v-if="app" :screen="screen" :config="config"/>
      <div v-else>
        No preview
      </div>
    </div>
</template>


<script>

export default {
  emits: ['update:modelValue', 'click', 'change'],
  props: ['app', 'screen'],
  data() {
    return {
      config: {
        router: {
          disabled: true,
          key: 'screenName',
          prefix: 'embedded'
        }
      }
    }
  },
  computed: {
  
  },
  methods: {
   
  },
  watch: {
    
  },
  mounted() {

  }
}
</script>
