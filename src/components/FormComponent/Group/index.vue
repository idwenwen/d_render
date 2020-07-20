<script>
export default {
  name: 'Group',
  components: {
    ccheckbox: () => import('../Checkbox'),
    cradio: () => import('../Radio'),
    ceditor: () => import('../Editor'),
    cinput: () => import('../Input'),
    cselect: () => import('../Select'),
    cstep: () => import('../Step'),
    ctext: () => import('../Text'),
    cfilterSelect: () => import('../FiltersSelect'),
    ctitle: () => import('../Text/Title')
  },
  props: {
    form: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | Array,
      default: () => []
    },
    value: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Array,
      default: () => []
    },
    name: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    def: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    confirmd: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Boolean,
      default: false
    },
    reseted: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Boolean,
      default: false
    },
    toArray: {
      type: Boolean,
      default: false
    },
    toProperty: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Function | String,
      default: ''
    }
  },
  data() { 
    return {
      result: {},
      canSend: false,
      resultNeeded: ['filterSelect', 'step', 'select', 'radio', 'checkbox'],
      resultCompare: [],
      connectTo: ['text', 'title']
    }
  },
  methods: {
    init() {
      let index = 0
      const res =[]
      for (const val of this.form) {
        if (this.resultNeeded.indexOf(val.type) >= 0 && (val.def || this.def)) {
          res.push(val.name || 'comp' + index)
        }
        index ++
      }
      this.resultCompare = res
    },
    change() {
      if (this.def) {
        if (!this.canSend) {
          let canSend = true
          for (let i = 0; i < this.resultCompare; i++) {
            if (this.result[this.resultCompare[i]] === undefined) {
              canSend = false
              break
            } 
          }
          this.canSend = canSend
        }
        if (this.canSend) {
          this.updated()
        }
      } else {
        this.updated()
      }
    },

    getProperty() {
      if (this.toArray) {
        const res = []
        for (const key in this.result) {
          if (!Array.isArray(this.result[key])) {
            res.push(this.result[key])
          } else {
            res.push(...this.result[key])
          }
        }
        return res
      } else if (this.toProperty) {
        if (typeof this.toProperty === 'string') {
          return this.result[this.toProperty]
        } else {
          return this.toProperty(this.result)
        }
      } else {
        return this.result
      }
    },

    updated() {
      this.$emit('change', this.getProperty(), this.name, this.result)
    },

    confirm() {
      return this.result
    },

    reset() {
      for (let i = 0; i < this.form.length; i++) {
        if (this.$refs['comp' + i].reset) {
          this.$refs['comp' + i].reset()
        }
      }
    },

    disable() {
      for (let i = 0; i < this.form.length; i++) {
        if (this.$refs['comp' + i].disable) {
          this.$refs['comp' + i].disable()
        }
      }
    },

    able() {
      for (let i = 0; i < this.form.length; i++) {
        if (this.$refs['comp' + i].able) {
          this.$refs['comp' + i].able()
        }
      }
    },

    format(value){
      for (let i = 0; i < this.form.length; i++) {
        if (this.connectTo.indexOf(this.form[i].type) >= 0) {
          if (this.$refs['comp' + i] && this.$refs['comp' + i].format) {
            this.$refs['comp' + i].format(value)
          } else if (this.$refs['comp' + i][0] && this.$refs['comp' + i][0].format) {
            this.$refs['comp' + i][0].format(value)
          }
        }
      }
    },

    searching(content) {
      this.$emit('search', content)
    },

    setConnection(conn) {
      this.format(conn)
    },

    resetBtn(h) {
      return h(
        'el-button', {
          props: {
            size: 'mini',
            type: 'primary',
            round: true,
          },
          on: {
            click: () => {
              this.reset()
            }
          }
        },
        [
          typeof this.reseted === 'string' ? this.reseted : 'reset'
        ]
      )
    },
    comfirmBtn(h) {
      return h(
        'el-button', {
          props: {
            size: 'mini',
            type: 'primary',
            round: true,
          },
          on: {
            click: () => {
              this.updated()
            }
          }
        },
        [
          typeof this.confirmd === 'string' ? this.confirmd : 'confirm'
        ]
      )
    },
    searchComp(h, attr) {
      return h(
        'cinput', {
          props: Object.assign({}, attr.props ,{
            search: true,
            placeholder: 'searching'
          }),
          on: {
            change: (content) => {
              this.searching(content)
            }
          }
        }
      )
    },
    comps(h) {
      const res = []
      let index = 0
      for(const val of this.form) {
        const name = val.name || 'comp' + index
        let child = null
        if (val.type === 'search') {
          child = this.searchComp(h, val)
        } else {
          const variable = {
            props: Object.assign({}, val.props, {
              disabled: this.disabled,
              def: this.def
            }),
            ref: 'comp' + index,
            on: {
              change: (res) => {
                this.result[name] = res
                const connect = val.connectTo || []
                for (const i of connect) {
                  this.$refs['comp' + i].setProperty(res)
                }
                if (!this.confirmd) {
                  this.change()
                }
              }
            }
          }
          child = h(
            'c' + val.type, variable
          )
        }
        res.push(child)
        index ++
      }
      return res
    },

    group(h) {
      return h(
        'section', {
          'class': 'group__container ' + this.className
        },
        this.comps(h)
      )
    }
  },
  render(h) {
    return this.group(h)
  }
 }
</script>

<style lang="" scoped>

</style>