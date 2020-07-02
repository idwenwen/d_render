<script>
import config from '../config/table.attrs'
import util from '../util'
import operations from './operations/index'
import editor from './editor/index'

export default {
  name: 'Ctable',

  components: {
    operations,
    editor
  },

  props: {
    header: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    attrs: {
      type: Object,
      default: () => {}
    }, 
    index: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | Function | Number,
      default: false,
    },
    select: {
      type: Boolean,
      default: false
    },

    combine: {
      type: Boolean,
      default: false
    }
  },

  data() { 
    return {
      currentTableData: [...this.data],
      currentTableHeader: [...this.header],
      currentSortColumn: null,
      currentOrder: null
    }
  },

  watch: {
    data: {
      handler() {
        this.currentTableData = [...this.data]
      },
      deep: true
    },
    header: {
      handler() {
        this.currentTableHeader = [...this.header]
      },
      deep: true
    }
  },

  methods: {

    setCurrentRow(row) {
      this.$refs['cTable'][0].setCurrentRow(row)
    },

    /**
     * 事件获取方法，传递事件数组，返回事件基础方法。
     * $listener之中传递了方法则依据传递的方法来处理。
     * 如果无传递事件，则依据默认的方法进行处理。
     * 如果默认方法无，则不做处理。
     */
    getEvents(events) {
      const res = {}
      for (const val of events) {
        res[val] = (...args) => {
          const name = util.replaceOrigin(val, /-[a-z]/, (str) => {
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

    // 预设相关方法
    /**
     * 表格列排序方法。
     */
    sortChange({column, order}) {
      this.currentSortColumn = column
      this.currentOrder = order
      let currentTableData = [...this.data]
      const compareVal = (val1, val2) => {
        if (val1 !== '-' && val2 !== '-') {
          return val1 > val2
              ? 1 : -1
        } else if (val1 !== '-' && val2 === '-') {
          return -1
        } else {
          return 1
        }
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
      this.currentTableData = currentTableData
    },
    
    /**
     * 预设表格单元格合并方法。
     */
    spanMethod({column, rowIndex}) {
      // combine different cell
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
      for (const val of headers) {
        needCompare.unshift(val.prop)
        if (val.prop === column.property) {
          findInTable = true
            break
          }
        }
        if(findInTable) {
          if (this.data[rowIndex - 1] && compareRow(this.data[rowIndex], this.data[rowIndex - 1], needCompare)) {
            return {
              rowspan: 0,
              colspan: 0
            }
          } else {
            let row = 1
            while(this.data[rowIndex + row] && compareRow(this.data[rowIndex], this.data[rowIndex + row], needCompare)) {
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
    },

    /**
     * 预设table表格单元格样式
     */
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

    // table 组件绘制方法
    /**
     * 自定义列内容。
     */
    custom(h, props) {
      if (this.$scopedSlots[props.column.label + 'Col']) {
        return this.$scopedSlots[props.column.label + 'Col'](props)
      } else {
        return h(
          'span',
          {
            'class': 'ctable__custom'
          },
          [props.row[props.column.property]]
        )
      }
    },
    /**
     * 可编辑烈内容
     */
    editor(h, props) {
      return h(
        'editor',
        {
          props: {
            val: props.row[props.column.property]
          }
        }
      )
    },
    /**
     * 列内容为可点击链接形态
     */
    linking(h, props, link) {
      return h(
        'el-link',
        {
          'class': 'ctable__link',
          props: {
            type: 'primary',
            underline: true
          },
          on: {
            click: (ev) => {
              link(props)
              ev.stopPropagation()
            }
          }
        },
        [props.row[props.column.property]]
      )
    },
    /**
     * 操作列预设形式
     */
    operations(h, props, other) {
      const label = []
      const events = {}
      other.operations.forEach((item, index) => {
        label.push({
          name: item.name || item.text || 'option' + index,
          text: item.text,
          icon: item.icon,
          img: item.img,
          position: item.position || "end",
          underline: true,
          plain: true
        })
        events[item.name || item.label || 'option' + index] = (ev) => {
          if (item.method) {
            item.method(props)
          }
          ev.stopPropagation()
        }
      })
      return h(
        'operations',
        {
          props: {
            type: other.operationType,
            className: other.operationClass,
            label
          },
          on: events
        }
      )
    },
    /**
     * 创建单列数据内容
     */
    eachColumn(h, attr) {
      const variable = {
        props: attr,
        scopedSlots: {}
      }
      if (attr.type) {
        // 当前列表类行为linking的形式
        if (attr.type === 'link') {
          variable.scopedSlots.default = (props) => {
            return this.linking(h, props, attr.linkMethod)
          }
        }
        // 当前为operation列
        else if (attr.type === 'operation') {
          variable.scopedSlots.default = (props) => {
            return this.operations(h, props, {
              operations: attr.operations,
              operationType: attr.operationType,
              operationClass: attr.operationClass
            })
          }
        }
        // 当前列为custom的情况
        else if (attr.type === 'custom') {
          variable.scopedSlots.default = (props) => {
            return this.custom(h, props)
          }
        }
        // 当前列为editor的情况
        else if (attr.type === 'editor') {
          variable.scopedSlots.default = (props) => {
            return this.editor(h, props)
          }
        }
      }
      const childHeader = []
      if (attr.children) {
        for (const val of attr.children) {
          childHeader.push(this.eachColumn(h, Object.assign({}, config.DEF_COLUMN_ATTR, val)))
        }
      }
      return h(
        'el-table-column',
        variable,
        childHeader
      )
    },
    /**
     * 初始化所有列属性，并创建元素内容返回
     */
    columns(h) {
      const final = []
      const colAttr = [...this.header]
      if (this.index) {
        colAttr.unshift(Object.assign({}, config.DEF_INDEX_ATTR, {
          index: (this.index && typeof this.index === 'boolean')
            ? config.DEF_INDEX_BEGIN
            : this.index
        }))
      }
      if (this.select) {
        colAttr.unshift(Object.assign({}, config.DEF_SELECT_ATTR))
      }
      colAttr.forEach(item => {
        final.push(this.eachColumn(h, Object.assign({}, config.DEF_COLUMN_ATTR, item)))
      })
      this.currentTableHeader = colAttr
      return final
    },
    /**
     * table el-table 内容初始化，依据参数确定当前table的属性 与事件。
     */
    table(h) {
      const tableEvents = ['sort-change', 'filter-change', 'current-change']
      if (this.select) {
        tableEvents.push(...['select', 'selectAll', 'selectionChange'])
      }
      const variable = {
        props: Object.assign({},
          config.DEF_TABLE_ATTR,
          { 
            data:this.currentTableData,
            spanMethod: this.combine ? this.spanMethod : () => {
              return {
                rowspan: 1,
                colspan: 1
              }
            },
            cellClassName: this.cellClassName,
            headerCellClassName: 'ctable__header_cell'
          },
          this.attrs
        ),
        ref: 'cTable',
        on: this.getEvents(tableEvents)
      }
      return h(
        'el-table',
        variable,
        this.columns(h)
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