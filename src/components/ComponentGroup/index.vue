<script>
import basicOperation from '@/mixin/BasicOperation'
export default {
  name: 'Cgroup',
  components: {
    Cform: () => import('../FormComponent/Group'),
    Ctable: () => import('../TableComponent/PaginationTable'),
    Cchart: () => import('../ChartComponent/ChartContainer'),
    Cechart: () => import('../ChartComponent/EchartsInstance'),
    Casync: () => import('../AsyncComponent'),
    Ctitle: () => import('../FormComponent/Text/Title')
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
      currentList: [...this.options],
      timer: new Date().getTime()
    }
  },
  watch: {
    options: {
      handler() {
        this.currentList = [...this.options]
        this.timer = new Date().getTime()
        this.$nextTick(() => {
          this.needDefault()
        })
      }
    }
  },
  mounted() {
    // todo 内容有待更新 //
    // const check = setInterval(() => {
      // clearInterval(check)
      this.$nextTick(() => {
        this.needDefault()
      })
    // }, 1000)
  },
  methods: {
    needDefault(next) {
      const notFinish = this.setDefault(next)
      if (notFinish.length > 0) {
        setTimeout(() => {
          this.needDefault(notFinish)
        }, 100)
      }
    },
    resize() {
      for (let i = 0; i < this.currentList.length; i++) {
        this.refOpera('comp' + i, 'resize')
      }
    },
    filterByForm(param, pos) {
      if (
        ['table', 'chart', 'async', 'echart'].indexOf(this.currentList[pos + 1].type) >= 0
      ) {
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
        if (
          ['table', 'chart', 'async', 'echart'].indexOf(this.currentList[o].type) >= 0
        ) {
          this.refOpera('comp' + o, 'linkageChange', param)
        }
      }
    },

    changeByOutside(param, pos) {
      for (let o = pos - 1; o >= 0; o--) {
        if (this.currentList[o].type === 'form') {
          this.refOpera('comp' + o, 'linkageOutside', param)
          break
        }
      }
    },

    refreshByForm(pos) {
      for (let o = pos + 1; o < this.currentList.length; o++) {
        if (['async', 'chart'].indexOf(this.currentList[o].type) >= 0) {
          this.refOpera('comp' + o, 'linkageRefresh')
          break
        }
      }
    },

    rangeByForm(param, pos) {
      for (let o = pos + 1; o < this.currentList.length; o++) {
        if (this.currentList[o].type === 'table') {
          this.refOpera('comp' + o, 'linkageRange', param)
          break
        }
      }
    },

    fixedAfterRequest() {
      const vm = this
      return params => {
        if (params.operation && typeof params.operation === 'function') {
          const res = {}
          for (let i = 0; i < vm.currentList.length; i++) {
            const val = vm.currentList[i]
            res[val.name || 'comp' + i] = vm.$refs['comp' + i]
          }
          params.operation(res, params, vm)
        }
      }
    },

    setDefault(list = []) {
      const res = list
      if (res.length === 0) {
        for (let i = 0; i < this.currentList.length; i++) {
          const val = this.currentList[i]
          if (val.type === 'form') {
            res.push(i)
          }
        }
      }
      const notFinish = []
      for (const val of res) {
        if (!this.refOpera('comp' + val, 'setDefault')) {
          notFinish.push(val)
        }
      }
      return notFinish
    },

    addEvents(obj, operation) {
      for (const name in operation) {
        obj.on[name] = operation[name]
      }
    },

    addEventForForm(obj, pos) {
      this.addEvents(obj, {
        search: content => {
          this.searchByForm(content, pos)
        },
        form: formList => {
          this.filterByForm(formList, pos)
        },
        refresh: () => {
          this.refreshByForm(pos)
        },
        change: param => {
          this.changeByForm(param, pos)
        },
        range: param => {
          this.rangeByForm(param, pos)
        }
      })
    },

    addEventForOthers(obj, pos, async = false) {
      const eves = {
        change: param => {
          this.changeByOutside(param, pos)
        }
      }
      if (async) {
        eves.afterRequest = this.fixedAfterRequest()
      }
      this.addEvents(obj, eves)
    },

    children(h) {
      const child = []
      for (let i = 0; i < this.currentList.length; i++) {
        const val = this.currentList[i]
        const variable = {
          props: val.props,
          ref: 'comp' + i,
          key: this.timer + i,
          on: {}
        }
        if (val.type === 'form') {
          this.addEventForForm(variable, i)
        }
        if (['table', 'chart'].indexOf(val.type) >= 0) {
          this.addEventForOthers(variable, i, false)
        }
        if (val.type === 'async') {
          this.addEventForOthers(variable, i, true)
        }
        child.push(
          h(
            'div',
            {
              class: 'comp-group__each'
            },
            [h('C' + val.type, variable)]
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

<style lang="scss" scoped>
.cus-group__container {
	width: 100%;
	.comp-group__each {
		margin: 12px 0px;
	}
}
</style>
