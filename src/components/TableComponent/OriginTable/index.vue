<script>
import spanMethod from './mixins/SpanMethod'
import dataSort from './mixins/DataSort'
import dataFormat from './mixins/DataFormat'
import cellClass from './mixins/CellClass'
import tableSearch from './mixins/CellClass'
import clink from '../CustomColumn/Linking'
import ceditor from '../CustomColumn/Editor'
import cweight from '../CustomColumn/Weight'
export default {
  name: 'OriginTable',
  components: {
    clink,
    ceditor,
    cweight
  },
  mixins: [spanMethod, dataSort, dataFormat, cellClass, tableSearch],
  props: {
    // 表数据
    data: {
      type: Array,
      default: () => []
    },
    // 表头内容
    header: {
      type: Array,
      default: () => []
    },
    // 表格数据是否自动合并
    combine: {
      type: Boolean,
      default: true
    },
    // 空数据内容格式化
    nullFormat: {
      type: String,
      default: '-'
    },
    // 0数据内容格式化
    zeroFormatter: {
      type: String,
      default: '-'
    },
    // 是否使用科学计数法
    toExp: {
      type: Boolean,
      default: true
    },
    // 小数后保留多少位。
    size: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number | Boolean,
      default: 6
    }
  },
  data() {
    return {
      currentTableData: [],
      tableEvents: ['sort-change'],
      presetHeaderType: {
        link: 'clink',
        editor: 'ceditor',
        weight: 'cweight'
      },
      defaultHeaderType: 'ccustom',
      DEF_TABLE_ATTR: {
        emptyText: 'No data',
        elementLoadingText: 'Loading',
        size: 'mini'
      },
      DEF_COLUMN_ATTR: {
        showOverflowTooltip: true
      },
      hasWeight: -1
    }
  },
  watch: {
    data: {
      handler() {
        this.currentTableData = this.checkData(this.data)
        this.sortChange({
          column: this.currentSortColumn,
          order: this.currentOrder
        })
      },
      deep: true
    },
    header: {
      handler() {
        this.checkWeight(this.header)
      },
      deep: true
    }
  },
  mounted() {
    this.currentTableData = this.checkData(this.data)
    this.checkWeight(this.header)
    this.sortChange({
      column: this.defaultSortColumn,
      order: this.defaultOrder
    })
  },
  methods: {
    checkWeight(li) {
      for (let i = li.length - 1; i >= 0; i--) {
        const val = li[i]
        if (val.type === 'weight') {
          this.defaultSortColumn = { property: li[i].prop }
          this.defaultOrder = 'descending'
          this.hasWeight = i
          break
        }
      }
    },

    searchInTable(content, col) {
      this.search(this.currentTableData, content, col)
    },

    setCurrentRow(row) {
      this.$refs['cTable'][0].setCurrentRow(row)
    },

    sortChange({ column, order }) {
      this.currentTableData = this.sortMethod(
        this.currentTableData,
        column,
        order
      )
    },

    replaceOrigin(str, rep, to) {
      let res = str
      while (res.match(rep)) {
        const fto = to(res.match(rep)[0])
        res = res.replace(rep, fto)
      }
      return res
    },

    events(events) {
      const res = {}
      for (const val of events) {
        res[val] = (...args) => {
          const name = this.replaceOrigin(val, /-[a-z]/, str => {
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

    eachColumn(h, attrs) {
      let childEle = []
      if (attrs.children) {
        childEle = this.columns(h, attrs.children)
      }
      const props = Object.assign({}, attrs)
      if (['selection', 'index', 'expand'].indexOf(props.type) < 0) {
        delete props.type
      }
      delete props.children
      delete props.on
      const obj = {
        columnKey: attrs.prop || attrs.label
      }
      if (props.type === 'index') {
        obj.width = '70'
        obj.align = 'center'
      }
      const variable = {
        props: Object.assign(obj, this.DEF_COLUMN_ATTR, props),
        on: (() => {
          const res = attrs.on || {}
          for (const key in this.$listeners) {
            if (key.match(/^column-/)) {
              res[key.replace('column-', '')] = this.$listeners[key]
            }
          }
          return res
        })()
      }
      if (this.presetHeaderType[attrs.type]) {
        variable.scopedSlots = {
          default: cell => {
            return h(this.presetHeaderType[attrs.type], {
              props: Object.assign({ cell }, props),
              on: attrs.on || {}
            })
          }
        }
      }
      return h('el-table-column', variable, childEle)
    },

    columns(h, columns) {
      const cols = []
      columns.forEach(item => {
        cols.push(this.eachColumn(h, item))
      })
      return cols
    },

    filtersHeader(list) {
      const li = JSON.parse(JSON.stringify(list))
      if (this.hasWeight >= 0) {
        const weightProp = list[this.hasWeight].prop
        let biggest = 0
        for (const val of this.currentTableData) {
          if (
            typeof val[weightProp] === 'number' &&
						val[weightProp] > biggest
          ) {
            biggest = val[weightProp]
          }
        }
        if (!li[this.hasWeight].total || li[this.hasWeight].total < biggest) {
          li[this.hasWeight].total = biggest
        }
      }
      return list
    },

    table(h) {
      const variable = {
        props: Object.assign({}, this.DEF_TABLE_ATTR, {
          data: this.currentTableData,
          spanMethod: this.defaultSpanMethod(),
          cellClassName: this.cellClassName,
          headerCellClassName: this.headerCellClassName
        }),
        ref: 'cusTable',
        on: (() => {
          const res = this.events(this.tableEvents)
          for (const key in this.$listeners) {
            if (!key.match(/^column-/)) {
              res[key] = this.$listeners[key]
            }
          }
          return res
        })()
      }
      return h('el-table', variable, this.columns(h, this.header))
    }
  },
  render(h) {
    return this.table(h)
  }
}
</script>

<style lang="scss">
.ctable__header-cell {
	background-color: #deecfc !important;
	border: 1px solid #ffffff;
	color: #6a6c75;
	padding: 3px 0px;
	.caret-wrapper {
		height: 22px;
		.ascending {
			top: 0px;
		}
		.descending {
			bottom: 0px;
		}
	}
}

.ctable__normal-deep {
	background-color: #5e7feb !important;
	color: #ffffff;
}

.ctable__much_deep {
	background-color: #4159d1 !important;
	color: #ffffff;
}

.ctable__cell {
	border: 1px solid #fff;
	border-bottom: 1px solid #fff !important;
	background-color: #fafbfc;
	color: #999ba3;
	font-size: 12px;
	padding: 3px 0px;
}

.ctabel__cell-deep {
	background-color: #ebedf0 !important;
	color: #6a6c75;
}

.ctable__cell-normal-deep {
	background-color: #ebedf0 !important;
	padding: 0px 12px !important;
}

.ctable__cell-much-deep {
	background-color: #f5f7fa !important;
}

.ctable__cell-disable {
	background-color: #6a6c75;
	font-weight: bold;
}

.ctable__summary {
	background-color: #888 !important;
	color: #fff;
}
</style>
