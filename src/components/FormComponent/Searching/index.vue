<template>
  <cinput
    ref="cusInput"
    placeholder="search variable"
    @change="valueChange"
    @keyup.enter="searching"
  >
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

<style lang="scss" scoped>
.input__search {
	line-height: 22px;
	padding-right: 6px;
	padding-left: 2px;
	margin-top: 1px;
	margin-bottom: 1px;
	background-color: #fff;
	cursor: pointer;
}
</style>
