<template>
    <div class="luisa-preview">
   
      <Luisa :design="app" v-if="app"/>
      <div v-else>
        No preview
      </div>
    </div>
</template>


<script>

export default {
  emits: ['update:modelValue', 'click', 'change'],
  props: ['app'],
  data() {
    return {
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
