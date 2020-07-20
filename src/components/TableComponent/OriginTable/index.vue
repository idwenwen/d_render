<script>
export default {
  name: 'Origin',
  components: {
    'column': () => import('../CustomColumn/Custom'),
    'editor': () => import('../CustomColumn/Editor'),
    'link': () => import('../CustomColumn/Linking'),
    'weigth': () => import('../CustomColumn/Weight')
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    header: {
      type: Array,
      default: () => []
    },
    attrs: {
      type: Object,
      default: () => []
    },
    combine: {
      type: Boolean,
      default: false
    },
    nullFormat: {
      type: String,
      default: '-'
    },
    zeroFormatter: {
      type: String,
      default: '-'
    },
    toExp: {
      type: Boolean,
      default: true
    },
    size: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number | Boolean,
      default: 6
    }
  },
  data() { 
    return {
      currentTableData: [...this.data],
      tableEvents: ['sort-change'],
      currentSortColumn: '',
      currentOrder: ''
    }
  },
  watch: {
    data: {
      handler() {
        this.init()
      }
    }
  },
  create() {
    this.init()
  },
  methods: {
    init() {
      this.sortChange({column: this.currentSortColumn, order: this.currentOrder})
    },

    replaceOrigin(val, ori, to) {
      const res = JSON.parse(JSON.stringify(val))
      const content = val.match(ori)
      if (content) {
        const replaceTo = to(content[0])
        return res.replace(ori, replaceTo)
      } else {
        return res
      }
    },

    setCurrentRow(row) {
      this.$refs['cTable'][0].setCurrentRow(row)
    },

    // todo: 待验证
    sortChange({column, order}) {
      this.currentSortColumn = column
      this.currentOrder = order
      let currentTableData = [...this.data]
      if (column && order) {
        const compareVal = (val1, val2) => {
          return val1 > val2 ? 1 : -1
        }
        if (order !== null) {
          currentTableData.sort((a, b) => {
            const aVal = a[column.property]
            const bVal = b[column.property]
            if (bVal === '-') {
              return -1
            } else if (aVal === '-') {
              return 1
            } else {
              return compareVal(aVal, bVal)
            }
          })
        }
      }
      this.currentTableData = currentTableData
    },
    
    // todo: 待验证
    spanMethod({column, rowIndex}) {
      // 如果combine为true的情况，则本列内容自动归并
      if (this.combine) {
        const needCompare = []
        const compareRow = (row1, row2, compareCol) => {
          for (const val of compareCol) {
            if (row1[val] !== row2[val]) {
              return false
            }
          }
          return true
        }
        const getHeaders = (list) => {
          const headers = []
          for(const val of list) {
            if (val.children) {
              headers.push(...getHeaders(val.children))
            } else {
              headers.push(val)
            }
          }
          return headers
        }
        let findInTable = false
        const headers = getHeaders(this.header)
        const ctd = this.currentTableData
        for (const val of headers) {
          needCompare.unshift(val.prop)
          if (val.prop === column.property) {
            findInTable = true
            break
          }
        }
        if(findInTable) {
          if (ctd[rowIndex - 1] && compareRow(ctd[rowIndex], ctd[rowIndex - 1], needCompare)) {
            return {
              rowspan: 0,
              colspan: 0
            }
          } else {
            let row = 1
            while(ctd[rowIndex + row] && compareRow(ctd[rowIndex], ctd[rowIndex + row], needCompare)) {
              row += 1
            }
            return {
              rowspan: row,
              colspan: 1
            }
          }
        }
        return {
          rowspan: 1,
          colspan: 1
        }
      }
    },

    cellClassName({row, column}) {
      let cellClass = 'ctable__cell'
      if (column.label === 'index' || row._deep) {
        cellClass += ' ctabel__cell-deep'
      }
      if (row[column.property + '_disable']) {
        cellClass += ' ctable__cell-disable'
      }
      return cellClass
    },

    events(events) {
      const res = {}
      for (const val of events) {
        res[val] = (...args) => {
          const name = this.replaceOrigin(val, /-[a-z]/, (str) => {
            return str.replace('-', '').toUpperCase()
          })
          if (this.$listeners[name]) {
            this.$emit(name, ...args)
          } else {
            if (this[name]) this[name](...args)
          }
        }
      }
      return res
    },

    checkData(datas) {
      const res = JSON.parse(JSON.stringify(datas))
      for (const val of res) {
        for (const key in val) {
          if (typeof val[key] === 'number') {
            const data = val[key].toString().split('.')
            if (data[1] && data[1].length > 6 && this.size) {
              const size = typeof this.size === 'number' ? this.size : 6
              val[key] = parseFloat(val[key].toFixed(size))
            }
            if (data[0].replace('/[-+]/', '').length >= 8) {
              val[key] = val[key].toExponential()
            }
            if (val[key] === 0) {
              val[key] = this.zeroFormatter
            }
          } else if (val[key] === '' || val[key] === null) {
            val[key] = this.nullFormat
          }
        }
      }
      return res
    },

    columns(h, columns) {
      const cols = []
      columns.forEach((item, index) => {
        if (item.children) {
          cols.push(h(
            'column', {
              props: Object.assign({}, 
                this.DEF_COLUMN_ATTR,
                item.props
              )
            },
            this.columns(h, item.children)
          ))
        } else {
          cols.push(h(
            item.type || 'column', {
              props: Object.assign({
                  columnKey: 'col' + index
                }, 
                this.DEF_COLUMN_ATTR,
                item.props
              ),
              scopedSlots: (() => {
                const res = {}
                for (const key in this.$scopedSlots) {
                  if (key !== 'appned') {
                    res[key] = this.$scopedSlots[key]
                  }
                }
                if (item.slot) {
                  for (const key in item.slot) {
                    res[key] = item.slot[key](h)
                  }
                }
                return res
              })(),
              on: (() => {
                const res = item.on || {}
                for (const key in this.$listeners) {
                  if (key.match(/^column-/)) {
                    res[key.replace('column-', '')] = this.$listeners[key]
                  }
                }
                return res
              })()
            }
          ))
        }
      })
      return cols
    },

    table(h) {
      return h(
        'el-table', {
          props: Object.assign({},
            this.DEF_TABLE_ATTR,
            { 
              data: this.checkData(this.currentTableData),
              spanMethod: this.combine ? this.spanMethod : () => {
                return {
                  rowspan: 1,
                  colspan: 1
                }
              },
              cellClassName: this.cellClassName,
              headerCellClassName: 'ctable__header-cell'
            },
            this.attrs
          ),
          ref: 'cTable',
          on: (() => {
            const res = this.events(this.tableEvents)
            for (const key in this.$listeners) {
              if (!key.match(/^column-/)) {
                res[key] = this.$listeners[key]
              }
            }
            return res
          })()
        },
        this.columns(h, this.header)
      )
    }
  },
  render(h) {
    return this.table(h)
  }
 }
</script>

<style lang="" scoped>

</style>