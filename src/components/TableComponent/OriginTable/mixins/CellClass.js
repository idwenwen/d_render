const cellClass = {
  methods: {
    cellClassName({ row, column }) {
      let cellClass = 'ctable__cell'
      if (column.label === 'index' || row._deep) {
        cellClass += ' ctabel__cell-deep'
      }
      if (row[column.property + '_disable']) {
        cellClass += ' ctable__cell-disable'
      }
      return cellClass
    }
  }
}
export default cellClass
