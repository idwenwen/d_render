<script>
import basicOperation from '@/mixin/BasicOperation'
export default {
  name: 'ComponentGroup',
  components: {
    cform: () => import('../FormComponent/Group'),
    ctable: () => import('../TableComponent/PaginationTable'),
    cchart: () => import('../ChartComponent/ChartContainer'),
    cechart: () => import('../ChartComponent/EchartsInstance'),
    casync: () => import('../AsyncComponent')
  },
  mixins: [basicOperation],
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentList: [...this.options]
    }
  },
  watch: {
    options: {
      handler() {
        this.currentList = [...this.options]
        this.$nextTick(() => {
          this.setDefault()
        })
      }
    }
  },
  mounted() {
    // todo 内容有待更新 //
    const check = setInterval(() => {
      if (this.$refs && Object.keys(this.$refs).length > 0) {
        clearInterval(check)
        this.$nextTick(() => {
          this.setDefault()
        })
      }
    }, 1000)
  },
  methods: {
    filterByForm(param, pos) {
      if (this.currentList[pos + 1].type !== 'form') {
        this.refOpera('comp' + (pos + 1), 'linkageForm', param)
      }
    },
    searchByForm(param, pos) {
      if (this.currentList[pos + 1].type === 'table') {
        this.refOpera('comp' + (pos + 1), 'searching', param)
      }
    },

    changeByForm(param, pos) {
      for (let o = pos + 1; o < this.currentList.length; o++) {
        this.refOpera('comp' + o, 'linkageChange', param)
      }
    },

    changeByOutside(param, pos) {
      for (let o = pos - 1; o >= 0; o--) {
        this.refOpera('comp' + o, 'linkageOutside', param)
      }
    },
    setDefault() {
      const res = []
      for (let i = 0; i < this.currentList.length; i++) {
        const val = this.currentList[i]
        if (val.type === 'form') {
          res.push(i)
        }
      }
      for (const val of res) {
        this.refOpera('comp' + val, 'setDefault')
      }
    },
    children(h) {
      const child = []
      for (let i = 0; i < this.currentList.length; i++) {
        const val = this.currentList[i]
        const variable = {
          props: val.props,
          ref: 'comp' + i,
          on: {
            change: param => {
              if (val.type === 'form') {
                this.changeByForm(param, i)
              } else {
                this.changeByOutside(param, i)
              }
            }
          }
        }
        if (val.type === 'form') {
          variable.on.search = content => {
            this.searchByForm(content, i)
          }
          variable.on.form = formList => {
            this.filterByForm(formList, i)
          }
        }
        if (val.type === 'async') {
          variable.on.afterRequest = params => {
            if (params.operation && typeof params.operation === 'function') {
              const res = {}
              for (let i = 0; i < this.currentList.length; i++) {
                const val = this.currentList[i];
                res[val.name || 'comp' + i] = this.$refs['comp' + i]
              }
              params.operation(res, params, this)
            }
          }
        }
        child.push(
          h(
            'div',
            {
              class: 'comp-group__each'
            },
            [h('c' + val.type, variable)]
          )
        )
      }
      return child
    },

    groups(h) {
      return h(
        'section',
        {
          class: 'cus-group__container'
        },
        this.children(h)
      )
    }
  },
  render(h) {
    return this.groups(h)
  }
}
</script>

<style lang="" scoped>
</style>
