<template>
  <div
    :class="className"
    class="step__container"
  >
    <span class="step__title">Step</span>
    <div class="step__main">
      <span
        v-for="(item, index) in options"
        :key="index"
        :class="{'step__each-active': stepChoosed(item)}"
        class="step__each"
        @click.stop="stepChange(item)"
      >
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    multiple: {
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
      selected: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.selected.push(this.options[0].value)
      this.change()
    },
    change() {
      const list = Array.isArray(this.selected) ? [...this.selected] : [this.selected]
      if (this.$listeners['input']) {
        this.$emit('input', list)
      } else {
        this.$emit('change', list)
      }
    },
    stepChange(item) {
      const index = this.selected.indexOf(item.value)
      if (index >= 0) {
        this.selected.splice(index, 1)
      } else {
        this.selected.push(item.value)
      }
      this.change()
    },
    stepChoosed(item) {
      for (const val of this.selected) {
        if (val === item.value) {
          return true
        }
      }
      return false
    }
  }
 }
</script>

<style lang="" scoped>

</style>