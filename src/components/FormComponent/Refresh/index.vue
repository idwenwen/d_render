<template>
  <el-link type="primary" @click="refreshing">
    <span class="refresh__container">
      <i class="el-icon-refresh-right" />
      <span>refresh</span>
    </span>
  </el-link>
</template>

<script>
export default {
  name: 'RefreshBtn',
  methods: {
    refreshing() {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="" scoped>
</style>
