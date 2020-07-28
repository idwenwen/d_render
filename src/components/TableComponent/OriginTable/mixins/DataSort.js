const DataSort = {
  data() {
    return {
      currentSortColumn: '',
      currentOrder: '',
      defaultSortColumn: '',
      defaultOrder: ''
    }
  },
  methods: {
    sortMethod(list, col, order) {
      this.currentSortColumn = order ? (col || this.defaultSortColumn) : this.defaultSortColumn
      this.currentOrder = order || this.defaultOrder
      if (this.currentSortColumn && this.currentOrder) {
        const compareVal = (val1, val2) => {
          if (val1 > val2) {
            return this.currentOrder.match('ascend') ? 1 : -1
          } else {
            return this.currentOrder.match('ascend') ? -1 : 1
          }
        }
        if (this.currentOrder !== null) {
          list.sort((a, b) => {
            const aVal = a[this.currentSortColumn.property]
            const bVal = b[this.currentSortColumn.property]
            if (b._total && aVal === '-') {
              return -1
            } else if (a._total && bVal === '-') {
              return 1
            } else if (b._total || bVal === '-') {
              return -1
            } else if (a._total || aVal === '-') {
              return 1
            } else {
              return compareVal(aVal, bVal)
            }
          })
        }
      }
      return list
    }
  }
}

export default DataSort
