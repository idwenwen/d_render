<script>
export default {
  name: 'Operations',
  props: {
    // 展示方式, 当前可选[link, btn]
    type: {
      type: String,
      default: 'link'
    },
    inline: {
      type: Number,
      default: 3
    },
    label: {
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

    }
  },
  methods: {

    content(h, attr) {
      const child = []
      if (attr.text) {
        child.push(h(
          'span',
          {
            'class': 'operations__text',
          },
          [attr.text]
        ))
      }
      if (attr.icon) {
        const iconC = h(
          'i',
          {
            'class': {
              [attr.icon]: true,
              'operations__icon': true
            }
          }
        )
        if (attr.position === 'begin') {
          child.unshift(iconC)
        } else {
          child.push(iconC)
        }
      }
      if (attr.img) {
        const imgC = h(
          'img',
          {
            'class': 'operations__img',
            attr: {
              src: attr.img
            }
          }
        )
        if (attr.position === 'begin') {
          child.unshift(imgC)
        } else {
          child.push(imgC)
        }
      }
      return child
    },

    each(h, attr) {
      const dom = this.type.match('link') ? 'el-link' : 'el-button'
      const variable = {
        'class': {
          'operations__option': true,
          [this.className]: true
        },
        props: {
          type: attr.type,
          underline: !!attr.underline,
          plain: !!attr.plain,
          round: !!attr.round,
          size: attr.size || 'mini'
        },
        on: {
          click: (ev) => {
            if (attr.name && this.$listeners[attr.name]) {
              this.$emit(attr.name, ev)
            }
            else if (attr.text && this.$listeners[attr.text]) {
              this.$emit(attr.text, ev)
            }
            ev.stopPropagation()
          }
        }
      }
      return h(
        dom,
        variable,
        this.content(h, attr)
      )
    },

    operations(h) {
      const options = []
      this.label.forEach(item => {
        options.push(this.each(h, item))
      })
      return h(
        'div',
        {
          'class': 'operations__container'
        },
        options
      )
    }
  },
  render(h) {
    return this.operations(h)
  }
 }
</script>

<style lang="" scoped>

</style>