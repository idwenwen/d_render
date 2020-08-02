<template>
  <div
    :class="className"
    class="input__container"
  >
    <!-- label展示内容 -->
    <span
      v-if="label"
      class="input__label"
    >{{ label + ':' }}</span>

    <el-input
      ref="cusInput"
      v-model="inputed"
      :size="size"
      :placeholder="$attrs['placeholder'] || placeholder"
      :clearable="clearable"
      :disabled="disabled"
      :class="inputClassName"
      v-bind="$attrs"
      @change="contentChange"
      v-on="$listeners"
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
    },
    inputClassName: {
      type: String,
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

<style lang="scss">
@import '../../../style/position';
.el-input {
	max-width: 150px;
	height: 24px;
	input {
		width: 100%;
		height: 24px !important;
		padding: 0px 10px;
		background: #f8f8fa;
		border-radius: 2px;
		line-height: 24px;
	}
	.el-input__icon {
		line-height: 24px;
	}
	.el-input-group__append {
		border: 0px;
		border-radius: 2px;
		background: #f8f8fa;
		padding-right: 10px;
		padding-left: 0px;
	}
	.el-select__caret {
		line-height: 24px;
	}
	.el-input__suffix-inner {
		@include flex(row, flex-end, center);
	}
}
</style>
