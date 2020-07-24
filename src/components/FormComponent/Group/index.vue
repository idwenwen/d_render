<script>
import basicOperation from '@/mixin/BasicOperation'
export default {
  name: 'Cgroup',
  components: {
    ccheckbox: () => import('../Checkbox'),
    cradio: () => import('../Radio'),
    ceditor: () => import('../Editor'),
    cinput: () => import('../Input'),
    cselect: () => import('../Select'),
    cstep: () => import('../Step'),
    ctext: () => import('../Text'),
    cselection: () => import('../Selection'),
    ctitle: () => import('../Text/Title'),
    csearch: () => import('../Searching'),
    cbutton: () => import('../Button')
  },
  mixins: [basicOperation],
  props: {
    // 表单列表内容
    form: {
      type: Array,
      default: () => []
    },

    // 是否自动设置默认值内容
    default: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },

    // 样式内容情况。
    className: {
      type: String,
      default: ''
    },

    // 是否有确定按键
    confirmBtn: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Boolean,
      default: false
    },
    // 是否有重置按键
    resetBtn: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Boolean,
      default: false
    }
  },
  data() {
    return {
      filtersType: ['filterSelect', 'step', 'checkbox', 'radio'],
      filterProperty: {},
      formType: ['input', 'select'],
      formParam: {},
      needConnect: ['text', 'title'],

      canSend: false,
      finalList: []
    }
  },
  watch: {
    filterProperty: {
      handler() {
        if (!this.canSend) {
          if (!this.default) {
            this.canSend = true
          } else {
            let canSend = true
            for (let i = 0; i < this.finalList.length; i++) {
              const val = this.finalList[i]
              if (
                this.typeChecking(val.type) &&
								!this.filterProperty[val.name || 'comp' + i]
              ) {
                canSend = false
                break
              }
            }
            this.canSend = canSend
          }
        }
        if (this.canSend) {
          this.change()
        }
      },
      deep: true
    },
    formParam: {
      handler() {
        if (!this.confirmBtn) {
          this.confirm()
        }
      },
      deep: true
    },
    disabled() {
      if (this.disabled) {
        this.disable()
      } else {
        this.able()
      }
    }
  },
  mounted() {
    if (this.disabled) {
      this.disable()
    }
  },
  methods: {
    linkageOutside(val) {
      for (let i = 0; i < this.finalList.length; i++) {
        if (this.needConnect.indexOf(this.finalList[i].type) >= 0) {
          this.refOpera('comp' + i, 'linkageOutside', val.param)
        }
      }
    },

    searching(res) {
      this.$emit('search', res)
    },

    getParam() {
      return this.formParam
    },

    setDefault() {
      if (this.default) {
        for (let i = 0; i < this.finalList.length; i++) {
          const val = this.finalList[i]
          if (this.typeChecking(val.type)) {
            this.refOpera('comp' + i, 'setDefault')
          }
        }
      }
    },

    disable() {
      for (let i = 0; i < this.finalList.length; i++) {
        this.refOpera('comp' + i, 'disable')
      }
    },

    able() {
      for (let i = 0; i < this.finalList.length; i++) {
        this.refOpera('comp' + i, 'able')
      }
    },

    change() {
      const getProperty = obj => {
        const res = []
        for (const key in obj) {
          if (Array.isArray(obj[key])) {
            res.push(...obj[key])
          } else {
            res.push(obj[key])
          }
        }
        return res
      }
      this.$emit('change', getProperty(this.filterProperty))
    },

    confirm() {
      this.$emit('form', this.formParam)
    },

    reset() {
      for (let i = 0; i < this.finalList.length; i++) {
        this.refOpera('comp' + i, 'reset')
      }
    },

    compChange(name, type) {
      return res => {
        if (this.typeChecking(type)) {
          this.$set(this.filterProperty, name, res)
        } else {
          this.$set(this.formParam, name, res)
        }
      }
    },

    connectTo(list, connect, operation, param) {
      const li = this.toArr(connect)
      for (const val of li) {
        let name = ''
        if (typeof val === 'number') {
          const item = list[val]
          name = item.name || 'comp' + val
        } else {
          name = val
        }
        this.refOpera(name, 'by' + operation, param)
      }
    },

    compEvents(list, name, type, ons, connect) {
      const res = {}
      if (this.typeChecking(type) || type === 'group') {
        res.change = (res) => {
          this.compChange(name, type)(res)
          this.connectTo(
            list,
            connect,
            'Change',
            this.typeChecking(type)
              ? this.filterProperty[name]
              : this.formParam[name]
          )
        }
      }
      if (!this.typeChecking(type) || type === 'group') {
        res.form = data => {
          this.$set(this.formParam, name, data)
          this.connectTo(list, connect, 'Form', this.formParam[name])
        }
      }
      res.search = res => {
        this.searching(res)
      }
      return Object.assign({}, ons, res)
    },

    typeChecking(type) {
      const stats = type.split('-')
      if (stats.length > 1 && stats[0].match(/^f|filter/)) {
        return true
      } else {
        return false
      }
    },

    comps(h, list) {
      const res = []
      for (let i = 0; i < list.length; i++) {
        const val = list[i]
        const name = val.name || 'comp' + i
        let child = null
        const variable = {
          props: Object.assign({}, val.props),
          ref: 'comp' + i,
          on: this.compEvents(list, name, val.type, val.on, val.connect)
        }
        child = h(this.impling(val.type), variable)
        res.push(child)
      }
      return res
    },

    impling(type) {
      const stats = type.split('-')
      if (stats.length > 1) {
        if (stats[1].match('select')) {
          return 'cselection'
        } else {
          return 'c' + stats[1]
        }
      } else {
        return 'c' + type
      }
    },

    addConfirmBtn() {
      return {
        type: 'button',
        props: {
          label: 'confirm'
        },
        on: {
          click: () => {
            this.confirm()
          }
        }
      }
    },

    addResetBtn() {
      return {
        type: 'button',
        props: {
          label: 'reset'
        },
        on: {
          click: () => {
            this.reset()
          }
        }
      }
    },

    group(h) {
      const compList = [...this.form]
      if (this.confirmBtn) {
        compList.push(this.addConfirmBtn())
      }
      if (this.resetBtn) {
        compList.push(this.addResetBtn())
      }
      this.finalList = compList
      return h(
        'section',
        {
          class: 'group__container ' + this.className
        },
        this.comps(h, compList)
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
