class Now {
  constructor(date) {
    this.date = (date && date instanceof Date) ? date : new Date()
  }

  len(str, lens) {
    const strlen = str.toString().length
    return strlen < lens ? new Array(lens - strlen).fill(0).join('') + str : str
  }

  /**
   * 
   * @param {String} format 
   * Y - year
   * M - month
   * E - month in English
   * D - day
   * h - hour
   * m - minute
   * s - second
   * w - week
   */
  time(format = 'Y-M-D h:m:s') {
    // TODO
    console.log(format)
  }
}

export default Now