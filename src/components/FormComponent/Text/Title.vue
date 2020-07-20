<template>
  <span
    class="cus-title"
    @click.stop="clicked"
  >{{ title }}</span>
</template>

<script>
export default {
  name: 'CustomTitle',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    clicked() {
      this.$emit('click', this.title)
    }
  }
 }
</script>

<style lang="" scoped>

</style>