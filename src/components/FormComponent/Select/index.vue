<template>
  <div
    :class="className"
    class="select__container"
  >
    <span
      v-if="label"
      class="select__label"
    >
      {{ label + ':' }}
    </span>

    <el-select
      ref="selectMain"
      v-model="selected"
      :size="size"
      :placeholder="$attrs['placeholder'] || placeholder"
      :clearable="clearable"
      :disabled="disabled"
      :multiple="multiple"
      v-bind="$attrs"
    >
      <el-option
        v-for="(item, index) in opts"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
import dataFilter from '@/mixin/DataFilters'
import basicOperation from '@/mixin/BasicOperation'
import disableCheck from '@/mixin/DisableCheck'
export default {
  name: 'CusSelection',
  mixins: [
    dataFilter,
    basicOperation,
    disableCheck
  ],
  props: {
    options: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array | Object,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() { 
    return {
      size: 'mini',
      clearable: true,
      placeholder: 'select please',

      selected: '',
      opts: []
    }
  },
  watch: {
    selected: {
      handler(newValue, oldValue) {
        if (oldValue || (Array.isArray(oldValue) && oldValue.length !== 0)){
          this.change(this.selected)
          this.confirm()
        }
      },
      deep: true
    },
    property: {
      handler() {
        this.opts = this.propfilter(this.options)
        this.able()
        this.setDefault()
      },
      deep: true
    }
  },
  beforeMount() {
    this.opts = this.propfilter(this.options)
    if (this.opts.length === 0) {
      this.disable()
    }
  },
  methods: {
    // 预留api
    able() {
      this.disabled = this.toArr(this.opts).length === 0
    },
    change() {
      this.$emit('change', this.selected)
    },
    confirm() {
      this.$emit('form', this.selected)
    },
    reset() {
      this.selected = ''
    },
    getParam() {
      return this.selected
    },
    setParam(value) {
      this.selected = value
    },
    setDefault() {
      if (this.opts.length > 0) {
        if (!this.multiple) {
          this.selected = this.opts[0].value
        } else {
          this.selected = [this.opts[0].value]
        }
      }
    }
  }
}
</script>

<style lang="" scoped>

</style>