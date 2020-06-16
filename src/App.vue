<template>
  <div>
    this is app
    <span>version: {{ version }}</span>
    <span>time: {{ date }}</span>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() { 
    return {
      version: '1.0.0',
      date: new Date().toString()
    }
  }
 }
</script>