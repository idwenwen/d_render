const cellClass = {
  methods: {
    cellClassName({ row, column, rowIndex }) {
      let cellClass = 'ctable__cell'
      if (column.label === 'index' || row._deep) {
        cellClass += ' ctabel__cell-deep'
      }
      for (const val of this.header) {
        if (column.property === val.prop) {
          if (val.normal_deep) {
            cellClass += ' ctable__cell-normal-deep'
          }
          if (val.much_deep) {
            cellClass += ' ctable__cell-much-deep'
          }
          break
        }
      }
      if (row[column.property + '_disable']) {
        cellClass += ' ctable__cell-disable'
      }
      let has = false
      for (const key in row) {
        if (row[key].toString().match(/(total|Total|summary|Summary)/)) {
          has = true
          break
        }
      }
      if (has) {
        cellClass += ' ctable__summary'
      }
      return cellClass
    },

    headerCellClassName({ column }) {
      let cellClass = 'ctable__header-cell'
      for (const val of this.header) {
        if (column.property === val.prop) {
          if (val.normal_deep) {
            cellClass += ' ctable__normal-deep'
          }
          if (val.much_deep) {
            cellClass += ' ctable__much_deep'
          }
          break
        }
      }
      return cellClass
    }
  }
}
export default cellClass
