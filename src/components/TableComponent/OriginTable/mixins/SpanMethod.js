function needCompareHeader(list, current) {
  const headers = []
  for (const val of list) {
    if (val.children) {
      headers.push(...needCompareHeader(val.children))
    } else if (val.prop === current || val.label === current) {
      break
    } else {
      headers.push(val.prop)
    }
  }
  return headers
}

function compareRows(row1, row2, compareCol) {
  for (const val of compareCol) {
    if (row1[val] !== row2[val]) {
      return false
    }
  }
  return true
}

const SpanMethods = {
  methods: {
    notCombine() {
      return {
        rowspan: 1,
        colspan: 1
      }
    },
    doCombine({ column, rowIndex }) {
      const compared = needCompareHeader(this.headers, column.property)
      const ctd = this.currentTableData
      if (rowIndex > 0 && compareRows(ctd[rowIndex - 1], ctd[rowIndex], compared)) {
        return {
          rowspan: 0,
          colspan: 0
        }
      } else {
        let combineRowCount = 1
        while (ctd[rowIndex + combineRowCount] && compareRows(ctd[rowIndex + combineRowCount], ctd[rowIndex], compared)) {
          combineRowCount++
        }
        return {
          rowspan: combineRowCount,
          colspan: 1
        }
      }
    },
    defaultSpanMethod() {
      if (this.combine) {
        return this.doCombine
      } else {
        return this.notCombine
      }
    }
  }
}

export default SpanMethods
