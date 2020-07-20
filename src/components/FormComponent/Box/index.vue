<script>
export default {
  name: 'ActiveBox',
  props: {
    box: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
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
      selected: ''
    }
  },
  watch: {
    box:{
      handler() {
        this.init()
      },
      deep: true
    },
    multiple() {
      this.init()
    }
  },
  beforeMount() {
    this.init()
  },
  methods: {
    // 初始化当前数据内容。
    init() {
      this.selected = this.multiple ? [] : ''
      let firstSelect = this.box[0].label
      if (this.value) {
        for (const val of this.box) {
          if (val.label === this.value || val.value === this.value) {
            firstSelect = val.label
          }
        }
      }
      if (Array.isArray(this.selected)) {
        this.selected.push(firstSelect)
      } else {
        this.selected = firstSelect
      }
      this.change()
    },
    change() {
      const list = Array.isArray(this.selected) ? [...this.selected] : [this.selected]
      const res = []
      for(const val of this.box) {
        for (let i = 0; i < list.length; i++) {
          if (val.label === list[i]) {
            list.splice(i, 1)
            res.push(val.value)
            break
          }
        }
        if (list.length === 0) {
          break
        }
      }
      this.$emit('change', res)
    },
    boxNode(h, attr, slotName) {
      const boxVNode = h(
        this.multiple ? 'el-checkbox' : 'el-radio', {
          'class': 'active-box__box',
          props: {
            label: attr.label,
            size: 'mini'
          },
          on: {
            change: () => {
              if (Array.isArray(this.selected)) {
                if (this.selected.indexOf(attr.label) < 0) {
                  this.selected.push(attr.label)
                } else {
                  this.selected.splice(this.selected.indexOf(attr.label), 1)
                }
              } else {
                this.selected = attr.label
              }
              this.change()
            }
          }
        }
      )
      return h(
        'div', {
          'class': 'active-box__tab',
        },[
          boxVNode,
          (() => {
            if (this.$scopedSlots[slotName])
            {
              return this.$scopedSlots[slotName](Object.assign({}, { value: attr.value }, {
                disable: (() => {
                  const check = Array.isArray(this.selected) ? this.selected : [this.selected]
                  return check.indexOf(attr.label) < 0
                })()
              }))
            } else {
              return void 0
            }
          })()
        ]
      )
    },
    boxGroup(h) {
      const child = []
      this.box.forEach((item, index) => {
        child.push(this.boxNode(h, item, 'box' + (index + 1)))
      })
      return h(
        this.multiple ? 'el-checkbox-group' : 'el-radio-group', {
          'class': 'active-box__group ' + this.className,
          props: {
            size: 'mini',
            value: this.selected
          }
        },
        child
      )
    }
  },
  render(h) {
    return this.boxGroup(h)
  }
}
</script>

<style lang="" scoped>

</style>