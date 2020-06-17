<script>
export default {
  name: 'TableContent',
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
     *   link: Function
     * }]
     */
    header: {
      type: Array,
      default: () => []
    },
    attrs: {
      type: Object,
      default: () => []
    },

    index: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | Number | Function,
      default: true
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
        'align': 'left',
        'headerAlign': 'left',
        'filters': [],
        'filterMultiple': true,
        'filterMethod': () => true,
        'className': 'table-content__cell-default'
      },
      defaultTableSet: {
        'maxHeight': 300,
        'size': 'mini',
        'fit': true,
        'highlightCurrentRow': true,
        'cellClassName': ({row, column}) => {
          if (column.label !== 'index') {
            if (row[column.property + '_disable']) {
              return 'table-content__cell-disable'
            }
          }
        },
        'headerCellClassNmae': 'table-content__header-cell-default'
      },
      defaultSelectCol: {
        type: 'select'
      },
      defaultIndexCol: {
        type: 'index',
        minWidth: 50,
        index: typeof this.index === 'number'
          ? (start) => { return start + this.index - 1 }
          : this.index
      }
    }
  },
  methods: {
    // 预设链接形式数据
    getLink(h, props, link) {
      return h(
        'span',
        {
          'class': { 'table-content__link': true },
          on: {
            click: () => { link(props) }
          }
        },
        props.row[props.colum.property]
      )
    },

    // 预设操作列
    operationCol(h, operation) {
      const operas = []
      for (const key in operation) {
        operas.push(this.getLink(h, key, operation[key]))
      }
      return operas.length > 0
        ? h(
          'div',
          {
            'class': { 'table-content__operations': true },
          },
          operas
        )
        : false
    },

    // 用户自定义列内容设置。
    eachColumn(h, attrs){
      const variable = {
        props: Object.assign(this.defaultHeaderSet, attrs),
      }
      if (attrs.link) {
        variable.scopedSlots = {
          default: (props) => {
            return this.getLink(h, props, attrs.link)
          }
        }
      }
      return h(
        'el-table-column',
        variable
      )
    },

    // 汇总数据列内容。
    columns(h) {
      const cols = []
      let colAttrs = this.header
      if(this.index) colAttrs = [this.defaultIndexCol].concat(colAttrs)
      if(this.select) colAttrs = [this.defaultSelectCol].concat(colAttrs)
      colAttrs.forEach(item => {
        cols.push(this.eachColumn(h, item))
      })
      if(this.operation) cols.push(this.operationCol(h))
      return cols
    },

    // 表格内容绘制
    table(h) {
      return h(
        'el-table',
        {
          props: Object.assign(this.defaultTableSet, this.attrs),
          ref: 'tableContent'
        },
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