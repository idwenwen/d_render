<template>
  <div id="app">
    this is app
    <span>version: {{ version }}</span>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() { 
    return {
      version: '1.0.0'
    }
  }
 }
</script>