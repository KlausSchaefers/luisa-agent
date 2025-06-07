<template>
    <div class="luisa-preview">
      <Luisa :design="app"/>
    </div>
</template>


<script>
import app from './testapp.json'
export default {
  emits: ['update:modelValue', 'click', 'change'],
  props: {
  },
  data() {
    return {
        app:app
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
