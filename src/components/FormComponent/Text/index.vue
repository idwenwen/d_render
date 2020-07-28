<template>
  <span
    v-show="!hide"
    :class="className"
    class="text__content"
  >{{ value }}</span>
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
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      val: '',
      value: '',
      hide: this.hidden
    }
  },
  watch: {
    val: {
      handler() {
        this.textContent()
      },
      deep: true
    },
    hidden() {
      this.hide = this.hidden
    }
  },
  beforeMount() {
    this.textContent()
  },
  methods: {
    textContent() {
      let res = this.content
      for (const key in this.data) {
        const rep =
          typeof this.data[key] === 'function'
            ? this.val
              ? this.data[key](this.val)
              : key
            : this.data[key]
        res = res.replace(key, rep)
      }
      this.value = res
    },
    linkageOutside(val) {
      this.val = val
    },
    visiable(bool) {
      this.hide = !bool
    }
  }
}
</script>

<style lang="scss" scoped>
.text__content {
	font-size: 16px;
	font-weight: bold;
	color: #7f7d8e;
	line-height: 24px;
	margin-bottom: 12px;
}
</style>
