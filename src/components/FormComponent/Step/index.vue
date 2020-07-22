<template>
  <div
    :class="className"
    class="step__container"
  >
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
    className: {
      type: String,
      default: ''
    }
  },
  data() { 
    return {
      selected: ''
    }
  },
  watch: {
    selected() {
      this.change()
      this.confirm()
    }
  },
  methods: {
    change() {
      this.$emit('change', this.selected)
    },
    confirm() {
      this.$emit('change', this.selected)
    },
    stepChange(item) {
      this.selected = item.value
    },
    stepChoosed(item) {
      return item.value === this.selected
    },
    toStep(row) {
      if (row >= this.options.length) {
        this.selected = this.options[this.options.length].value
      } else if (row <= 0) {
        this.selected = this.options[0].value
      } else {
        this.selected = this.options[row - 1].value
      }
    },
    setDefault() {
      this.toStep(1)
    }
  }
}
</script>

<style lang="" scoped>

</style>