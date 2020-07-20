<template>
  <div
    :class="className"
    class="cus-input__container"
  >
    <!-- label展示内容 -->
    <span
      v-if="label"
      class="tab-input__label"
    >
      {{ label + ':' }}
    </span>

    <el-input
      ref="cusInput"
      v-model="inputed"
      :size="'mini'"
      :placeholder="placeholder"
      :clearable="true"
      :disabled="disableSet"
      v-bind="$props"
      @change="change"
    >
      <i
        v-if="search"
        slot="suffix"
        class="el-icon-search"
      />
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() { 
    return {
      inputed: '',
      disableSet: false
    }
  },
  watch: {
    inputed() {
      this.inputEve()
    },
    value() {
      this.inputed = this.value
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
      this.inputed = this.value 
      this.disableSet = this.disabled
      if (this.def && !this.search) {
        this.change()
      }
    },

    change() {
      this.$emit('change', this.inputed)
    },

    inputEve() {
      this.$emit('input', this.inputed)
    },

    reset() {
      this.inputed = ''
    },

    confirm() {
      return this.inputed
    },

    disable() {
      this.disableSet = true
    },

    able() {
      this.disableSet = false
    }
  }
 }
</script>

<style lang="" scoped>

</style>