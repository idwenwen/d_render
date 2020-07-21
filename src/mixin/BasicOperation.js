const BasicOperation = {
  methods: {

    change(val) {
      this.$emit('change', val)
    },

    refOpera(name, functionName, ...args) {
      if (this.$refs[name] && this.$refs[name][functionName]) {
        this.$refs[name][functionName](...args)
      } else if (this.$refs[name] && this.$refs[name][0] && this.$refs[name][0][functionName]) {
        this.$refs[name][0][functionName](...args)
      }
    },

    toArr(data) {
      return Array.isArray(data) ? data : [data]
    }
  }
}

export default BasicOperation