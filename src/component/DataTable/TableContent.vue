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
      }
    }
  },
  methods: {
    getLink(h, text, link) {
      return h(
        'span',
        {
          'class': { 'table-content__link': true },
          on: {
            click: link
          }
        },
        text
      )
    },
    getOpera(h, operation) {
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
    getCols(h, attrs){
      const variable = {
        props: Object.assign(this.defaultHeaderSet, attrs),
      }
      if (attrs.link) {
        variable.scopedSlots = {
          default: ({column}) => {
            return this.getLink(h, column.data, attrs.link)
          }
        }
      }
      return h(
        'el-table-column',
        variable
      )
    },
    getIndex(h) {
      if (this.index) {
        return h(
          'el-table-column',
          {
            props: {
              type: 100,
              minWidth: 50,
              index: typeof this.index === 'number'
                ? (start) => { return start + this.index - 1 }
                : this.index
            }
          }
        )
      } else {
        return false
      }
    },
    getSelect(h) {
      if (this.select) {
        return h(
          'el-table-column',
          {
            props: {
              type: 'selection',
            }
          }
        )
      } else {
        return false
      }
    },
    getHeader(h) {
      const cols = []
      const select = this.getSelect(h)
      if (select) cols.push(select)
      const index = this.getIndex(h)
      if (index) cols.push(index)
      this.header.forEach(item => {
        cols.push(this.getCols(h, item))
      })
      const operation = this.getOpera(h, this.operation)
      if (operation) cols.push(operation)
      return cols
    },
    getTableContent(h) {
      return h(
        'el-table',
        {
          props: Object.assign(this.defaultTableSet, this.attrs),
          ref: 'tableContent'
        },
        this.getHeader(h)
      )
    }
  },
  render(h) {
    return this.getTableContent(h)
  },
}
</script>

<style lang="" scoped>

</style>