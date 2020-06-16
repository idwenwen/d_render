/**
 * Storage for page check (session storage)
 */

const storageMixin = {
  methods: {
    setCache(key, val) {
      try {
        sessionStorage.setItem(key, JSON.stringify(val))
      } catch(e) {
        
      }
    },

    getCache() {
      return sessionStorage.getItem(key)
    },

    setLongCache() {

    },

    getLongCache() {

    }
  }
}