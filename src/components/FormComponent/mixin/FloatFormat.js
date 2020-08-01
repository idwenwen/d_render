const FloatFormat = {
  methods: {
    _length(value) {
      if (typeof value !== 'number') {
        throw new TypeError('Needed A Number')
      }
      const sp = value.toString().split('.')
      return sp.length > 1 ? sp[1].length : 0
    },

    _pow(p, b = 10) {
      return Math.pow(b, p)
    },

    _nearby(val, bet) {
      const blen = this._length(bet)
      const vlen = this._length(val)
      const largeLen = this._pow(blen > vlen ? blen : vlen)
      const distance = (val * largeLen) % (bet * largeLen)
      let res = val * largeLen - distance
      if (distance > (bet * largeLen / 2)) {
        res += (bet * largeLen)
      }
      return res / largeLen
    }
  }
}

export default FloatFormat