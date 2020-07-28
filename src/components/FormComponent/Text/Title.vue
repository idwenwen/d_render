<template>
  <h3 class="cus-title" @click.stop="clicked">{{ title }}</h3>
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

<style lang="scss" scoped>
.cus-title {
	font-size: 24px !important;
	color: #3e4052 !important;
}
</style>
