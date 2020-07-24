const dataFormat = {
  methods: {
    checkData(datas) {
      const res = JSON.parse(JSON.stringify(datas))
      for (const val of res) {
        for (const key in val) {
          if (typeof val[key] === 'number') {
            const data = val[key].toString().split('.')
            if (data[1] && data[1].length > 6 && this.size) {
              const size = typeof this.size === 'number' ? this.size : 6
              val[key] = parseFloat(val[key].toFixed(size))
            }
            if (data[0].replace('/[-+]/', '').length >= 8) {
              val[key] = val[key].toExponential()
            }
            if (val[key] === 0) {
              val[key] = this.zeroFormatter
            }
          } else if (val[key] === '' || val[key] === null) {
            val[key] = this.nullFormat
          }
        }
      }
      return res
    }
  }
}

export default dataFormat
