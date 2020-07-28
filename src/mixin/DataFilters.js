const DataFilter = {
  data() {
    return {
      property: ''
    }
  },
  created() {
    this.initProperty()
  },
  methods: {
    initProperty() {
      this.property = ''
    },

    setProperty(value) {
      this.property = value
    },

    propfilter(data) {
      if (!Array.isArray(data) && this.property) {
        const res = []
        const list = Array.isArray(this.property)
          ? this.property
          : (this.property ? [this.property] : [])
        for (const val of list) {
          if (data[val]) {
            if (Array.isArray(data[val])) {
              res.push(...data[val])
            } else {
              res.push(data[val])
            }
          }
        }
        return res
      } else if (Array.isArray(data)) {
        return data
      }
      return []
    }
  }
}

export default DataFilter
