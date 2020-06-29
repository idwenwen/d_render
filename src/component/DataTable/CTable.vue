<script>
export default {
  name: 'Ctable',

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

    }
  },

  methods: {
    
    table(h) {
      const defaultTableSet = {
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
      }
      const variable = {
        props: Object.assign({}, defaultTableSet, this.attrs),
        ref: 'cTable',
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
  }
}
</script>

<style lang="" scoped>

</style>