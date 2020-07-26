<template>
  <el-button
    :type="$attrs['type'] || type"
    :size="size"
    :round="$attrs['round'] || round"
    :disabled="disabled"
    v-bind="$attrs"
    @click.stop="btnClick"
  >
    {{ label }}
  </el-button>
</template>

<script>
import basicOperation from '@/mixin/BasicOperation'
import disableCheck from '@/mixin/DisableCheck'
export default {
  name: 'CusButton',
  mixins: [basicOperation, disableCheck],
  props: {
    label: {
      type: String,
      default: 'btn',
      round: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      size: 'mini',
      type: 'primary',
      round: true
    }
  },
  methods: {
    btnClick() {
      this.$emit('click')
      if (this.value) {
        this.$emit('change', this.value)
        this.$emit('form', this.value)
      }
    }
  }
}
</script>

<style lang="" scoped>
</style>
