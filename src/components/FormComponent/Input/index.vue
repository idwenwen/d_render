<template>
  <div :class="className" class="input__container">
    <!-- label展示内容 -->
    <span v-if="label" class="input__label">{{ label + ':' }}</span>

    <el-input
      ref="cusInput"
      v-model="inputed"
      :size="size"
      :placeholder="$attrs['placeholder'] || placeholder"
      :clearable="clearable"
      :disabled="disabled"
      v-bind="$props"
      @change="contentChange"
    >
      <template slot="suffix">
        <slot name="suffix" />
      </template>
    </el-input>
  </div>
</template>

<script>
import basicOperation from '@/mixin/BasicOperation'
import disableCheck from '@/mixin/DisableCheck'
export default {
  name: 'CusInput',
  mixins: [basicOperation, disableCheck],
  props: {
    label: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    format: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Object,
      default: ''
    }
  },
  data() {
    return {
      size: 'mini',
      clearable: true,
      placeholder: '',

      inputed: ''
    }
  },
  watch: {
    inputed() {
      // todo: format
    }
  },
  methods: {
    change() {
      this.$emit('change', this.inputed)
    },
    confirm() {
      this.$emit('form', this.inputed)
    },
    contentChange() {
      this.change()
      this.confirm()
    },
    getParam() {
      return this.inputed
    },
    setParam(value) {
      this.inputed = value
    },
    reset() {
      this.inputed = ''
    }
  }
}
</script>

<style lang="" scoped>
</style>
