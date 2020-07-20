<template>
  <div
    :class="className"
    class="cus-select__container"
  >
    <!-- label展示内容 -->
    <span
      v-if="label"
      class="tab-select__label"
    >
      {{ label + ':' }}
    </span>

    <el-select
      ref="cusSelect"
      v-model="selected"
      :size="'mini'"
      :placeholder="placeholder"
      :clearable="true"
      :disabled="disableSet"
      :multiple="multiple"
      v-bind="$props"
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
export default {
  name: 'CustomSelect',
  props: {
    options: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array | Object,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Select please'
    },
    value: {
      type: String,
      default: String
    },
    def: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() { 
    return {
      selected: '',
      disableSet: false,
      property: '',
    }
  },
  computed: {
    opts() {
      let res = []
      if (typeof this.options === 'object' && this.property) {
        const list = Array.isArray(this.property) ? this.property : [this.property]
        for (const val of list) {
          if (this.options[val]) {
            res.push(...this.options[val])
          }
        }
      } else if (Array.isArray(this.options)) {
        res.push(...this.options)
      }
      return res
    }
  },
  watch: {
    selected() {
      this.change()
    },
    property() {
      this.init()
    },
    disabled() {
      this.disableSet = this.disabled
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      
      if (this.opts.length > 0) {
        const selectedContent = this.value || (this.def ? this.opts[0].value : '')
        this.disableSet = this.disabled
        if (this.multiple) {
          this.selected = []
          this.selected.push(selectedContent)
        } else {
          this.selected = selectedContent
        }
      } else {
        this.disableSet = true
      }
    },

    change() {
      if (this.$listeners['input']) {
        this.$emit('input', this.selected)
      }
      this.$emit('change', this.selected)
    },

    reset() {
      this.selected = ''
    },

    confirm() {
      return this.selected
    },

    disable() {
      this.disableSet = true
    },

    able() {
      if (this.opts.length > 0) {
        this.disableSet = false
      } else {
        this.disableSet = true
      }
    },

    setProperty(property) {
      this.property = property
    }
  }
 }
</script>

<style lang="" scoped>

</style>