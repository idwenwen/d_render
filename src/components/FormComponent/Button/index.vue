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
  mixins: [basicOperation,disableCheck],
  props: {
    label: {
      type: String,
      default: 'btn',
      round: true
    }
  },
  data() { 
    return {
      size: 'mini',
      type: 'primary'
    }
  },
  methods: {
    btnClick() {
      this.$emit('click')
    }
  }
 }
</script>

<style lang="" scoped>

</style>