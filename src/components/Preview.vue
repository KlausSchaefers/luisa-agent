<template>
    <div class="luisa-preview">
   
      <Luisa :design="app" v-if="app" :screen="screen" :config="config" v-model="viewModel"/>
      <div v-else>
        No preview
      </div>
    </div>
</template>


<script>

import '@mdi/font/css/materialdesignicons.css'


export default {
  emits: ['update:modelValue', 'click', 'change'],
  props: ['app', 'screen'],
  data() {
    return {
      viewModel: {},
      config: {
        debug: {
          logLevel: -3
        },
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
