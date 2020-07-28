const DisableCheck = {
  data() {
    return {
      disabled: false
    }
  },
  methods: {
    disable() {
      this.disabled = true
    },
    able() {
      this.disabled = false
    }
  }
}

export default DisableCheck
