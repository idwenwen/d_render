<template>
  <cinput ref="cusInput" placeholder="searching" @change="valueChange" @keyup.enter="searching">
    <i slot="suffix" class="el-icon-search input__search" @click.stop="searching" />
  </cinput>
</template>

<script>
import cinput from '../Input'
import basicOperation from '@/mixin/BasicOperation'
export default {
  name: '',
  components: {
    cinput
  },
  mixins: [basicOperation],
  data() {
    return {
      inputed: ''
    }
  },
  methods: {
    valueChange(res) {
      this.inputed = res
    },
    searching() {
      this.$emit('searching', this.inputed)
    },
    disable() {
      this.$refs['cusInput'].disable()
    },
    able() {
      this.$refs['cusInput'].able()
    },
    getParam() {
      return this.inputed
    },
    setParam(value) {
      this.$refs['cusInput'].setParam(value)
      this.inputed = value
    }
  }
}
</script>

<style lang="" scoped>
</style>
