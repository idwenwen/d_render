<script>
import DataInput from '../DataInput'
import util from '@/util/polyfill'
export default {
  name: 'TableContent',
  components: {
    'data-input': DataInput
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },

    /**
     * [{
     *   label, // Name for label
     *   prop, // Implying to data
     *   min-width,
     *   fixed,
     *   
     *   sortable: true/false/'custom'
     *   sort-method,
     * 
     *   resizable
     *   formatter: Function,
     *   show-overflow-tooltip,
     * 
     *   align,
     *   header-align,
     *   
     *   class-name
     *   filter: [{text, value}]
     *   filter-multiple,
     *   filter-method,
     *
     *   link: Function,
     *   children: []
     * }]
     */
    header: {
      type: Array,
      default: () => []
    },
    attrs: {
      type: Object,
      default: () => {}
    },

    index: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | Number | Function,
      default: 1
    },

    select: {
      type: Boolean,
      default: false
    },

    /**
     * Has Operation col
     * {
     *   operationName: Function 
     * }
     */
    operation: {
      type: Object,
      default: () => {}
    },

    /**
     * combine likely data
     */
    combine: {
      type: Boolean,
      default: false
    },

    titleChange: {
      type: Boolean,
      default: false
    }
  },
  data() { 
    return {
      defaultHeaderSet:{
        'minWidth': 120,
        'showOverflowTooltip': true,
        'fixed': false,
        'resizable': true,
        'sortable': false,
        'sortMethod': () => 0,
        'align': 'center',
        'headerAlign': 'center',
        // 'className': 'table-content__cell-default'
      },
      defaultTableSet: {
        'maxHeight': 300,
        'size': 'mini',
        'fit': true,
        'highlightCurrentRow': true,
        'border': true,
        // 'cellClassName': ({row, column}) => {
        //   if (column.label !== 'index') {
        //     if (row[column.property + '_disable']) {
        //       return 'table-content__cell-disable'
        //     }
        //   }
        // },
        // 'headerCellClassNmae': 'table-content__header-cell-default',
        'emptyText': 'No Data'
      },
      defaultSelectCol: {
        type: 'selection',
        width: 70
      },
      defaultIndexCol: {
        type: 'index',
        label: 'index',
        width: 70,
        index: typeof this.index === 'number'
          ? (start) => { return start + this.index - 1 }
          : this.index,
        className: 'table-content__cell-index'
      },
      currentTableData: [...this.data],
      currentTableHeader: [...this.header],
      currentSortColumn: null,
      currentOrder: null
    }
  },
  watch: {
    data: {
      handler() {
        this.sortChange({
          column: this.currentSortColumn,
          order: this.currentOrder
        })
      },
      deep: true
    }
  },
  methods: {
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

    addEvents() {
      const res = {}
      const defaultEvents = ['sort-change', 'filter-change', 'current-change']
      for (const val of defaultEvents) {
        res[val] = (...args) => {
          if (this.$listeners[val]) {
            this.$emit(val, ...args)
          } else {
            const name = util.replaceOrigin(val, /-[a-z]/, (str) => {
              return str.replace('-', '').toUpperCase()
            })
            if (this[name]) this[name](...args)
          }
        }
      }
      return res
    },

    setCurrentRow(row) {
      this.$refs['tableContent'][0].setCurrentRow(row)
    },

    // 预设链接形式数据
    getLink(h, props, link, alias) {
      return h(
        'span',
        {
          'class': { 'table-content__link': true },
          on: {
            click: () => { link(props) }
          }
        },
        (alias || props.row[props.colum.property])
      )
    },

    getChangeSet(h, props) {
      const child = []
      let setHeader = false
      child.push(h(
        'data-input',
        {
          props: { 'initData': props.column.label },
          directives: [{
            name: 'show',
            value: setHeader
          }],
          on: {
            'updated': (newLabel) => {
              for (const val of this.currentTableHeader) {
                if (val.prop === props.column.property) {
                  val.label === newLabel
                  break
                }
              }
            },
            'cancel': () => {

            }
          },
          ref: props.column.label + '_dataInput'
        }
      ))
      child.push(h(
        'span',
        {
          'class': 'data-table__header-span',
          directives: [
            {
              name: 'show',
              value: !setHeader,
            }
          ]
        },
        props.column.label
      ))
      return h(
        'div',
        {
          'class': 'table-content__header-set',
          on: {
            click: (ev) => {
              if (ev.)
            }
          }
        }
      )
    },

    // 预设操作列
    operationCol(h, operation) {
      return h(
        'el-table-column',
        {
          'class': { 'table-content__operations': true },
          scopedSlots: {
            default: (props) => {
              const operas = []
              for (const key in operation) {
                operas.push(this.getLink(h, props, operation[key], key))
              }
              return h(
                'div',
                {
                  'class': { 'inline': true, 'hor-center': true }
                },
                operas)
            }
          }
        }
      )
    },

    // 用户自定义列内容设置。
    eachColumn(h, attrs){
      const variable = {
        props: Object.assign({}, this.defaultHeaderSet, attrs),
      }
      if (attrs.link) {
        variable.scopedSlots = {
          default: (props) => {
            return this.getLink(h, props, attrs.link)
          }
        }
      }
      if (this.titleChange) {
        variable.scopedSlots = variable.scopedSlots || {}
        variable.scopedSlots.header = (props) => {
          return this.getChangeSet(props)
        }
      }
      const childHeader = []
      if (attrs.children) {
        for (const val of attrs.children) {
          childHeader.push(this.eachColumn(h, val))
        }
      }
      return h(
        'el-table-column',
        variable,
        childHeader
      )
    },

    // 汇总数据列内容。
    columns(h) {
      const cols = []
      let colAttrs = [...this.header]
      if(this.index) colAttrs.unshift(this.defaultIndexCol)
      if(this.select) colAttrs.unshift(this.defaultSelectCol)
      colAttrs.forEach(item => {
        cols.push(this.eachColumn(h, item))
      })
      if(this.operation && Object.key(this.operation).length > 0)
        cols.push(this.operationCol(h, this.operation))
      return cols
    },

    // 表格内容绘制
    table(h) {
      const variable = {
        props: Object.assign({}, this.defaultTableSet, this.attrs),
        ref: 'tableContent',
        on: this.addEvents()
      }
      variable.props.data = this.currentTableData
      if (this.combine) {
        variable.props.spanMethod = this.spanMethod
      }
      if (this.select) { // Adding event-listener for selection
        const eves = ['select', 'selectAll', 'selectionChange']
        for (const val of eves) {
          variable.on[val] = (select, row) => {
            this.$emit(val, select, row)
          }
        }
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
  },
}
</script>

<style lang="" scoped>

</style>