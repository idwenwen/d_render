<template>
  <span
    :class="className"
    class="text__content"
  >{{ textContent }}</span>
</template>

<script>
export default {
  name: 'CustomText',
  props: {
    content: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {}
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      val: ''
    }
  },
  computed: {
    textContent() {
      let res = this.content
      for (const key in this.data) {
        const rep = typeof this.data[key] === 'function'
          ? (this.val
            ? this.data[key](this.val)
            : key)
          : this.data[key]
        res = res.replace(key, rep)
      }
      return res
    }
  },
  watch: {
    value: {
      handler() {
        this.val = this.value
      },
      deep:true
    }
  },
  methods: {
    format(val) {
      this.val = val
    }
  }
}
</script>

<style lang="" scoped>

</style>