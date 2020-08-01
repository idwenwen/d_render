function nearBy(impl, target) {
  const compare = JSON.parse(JSON.stringify(impl))
  compare.sort((a, b) => {
    if (a[0] > b[0]) {
      return 1
    } else {
      return -1
    }
  })
  let res = ''
  for (let i = 0; i < compare.length; i++) {
    const val = compare[i];
    if (val[0] > target) {
      if (i === 0) {
        res = val[1]
      } else {
        res = compare[i - 1][1]
      }
      break
    } else if (val[0] === target) {
      res = val[1]
      break
    }
  }
  if (!res) {
    res = compare[compare.length - 1][1]
  }
  return res
}

const dataFormat = {
  data() {
    return {
      range: 0
    }
  },
  methods: {
    checkData(datas) {
      debugger
      const res = JSON.parse(JSON.stringify(datas))
      for (const val of res) {
        for (const key in val) {
          if (Array.isArray(val[key])) {
            val[key] = nearBy(val[key], this.range)
          }
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
    },

    linkageRange(param) {
      this.range = param
    },
  }
}

export default dataFormat
