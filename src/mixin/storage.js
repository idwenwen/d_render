/**
 * Storage for page check (session storage)
 */

const storageMixin = {
  methods: {
    setCache(key, val) {
      this.necessaryParam(key, val)
      sessionStorage.setItem(key, JSON.stringify(val))
    },

    getCache(key) {
      this.necessaryParam(key)
      return JSON.parse(sessionStorage.getItem(key))
    },

    setLongCache(key, val) {
      this.necessaryParam(key, val)
      localStorage.setItem(key, JSON.stringify(val))
    },

    getLongCache(key) {
      this.necessaryParam(key)
      return JSON.parse(localStorage.getItem(key))
    }
  }
}

export default storageMixin