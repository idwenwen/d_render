/**
 * 确定基础日志类行，通过传递类行可以添加其他类行内容。
 */
const BasicType = ['debug', 'info', 'warning', 'error']

class Logger {
  /**
   * create Logger instance
   * @param {Array} types Type of Object
   */
  constructor(types) {
    this.DEFTYPE = 'info'
    this.logType = BasicType.concat(types)
    this.logType.forEach(item => {
      this[item] = []
    })
  }

  report(err) {
    this[err.type || this.DEFTYPE].push(new CustomerError(err))
  }

  console(type) {
    this[type || this.DEFTYPE].forEach(item => {
      item.console()
    })
  }

  clear(type) {
    this[type || this.DEFTYPE] = []
  }

  send(type) {
    const reportArticle = []
    this[type || this.DEFTYPE].forEach(item => {
      reportArticle.push(item.toString())
    })
    return reportArticle
  }

  [Symbol.iterator]() {
    const self = this
    let index = 0
    return {
      next() {
        if (this.logType[index + 1]) {
          index += 1
          return {
            value: {
              type: self.logType[index],
              log: self[self.logType[index]]
            },
            done: false
          }
        } else {
          return {
            value: null,
            done: true
          }
        }
      }
    }
  }
}

const DEF_ERROR_TYPE = 'CError'
const DEF_ERROR_TEXT = 'Error happend'

class CustomerError {
  constructor({type, text, errObj, operation, lineNum}) {
    this.type = type || DEF_ERROR_TYPE
    this.text = text || DEF_ERROR_TEXT
    this.operation = operation
    this.lineNum = lineNum
    this.errObj = errObj
  }

  console() {
    const tip = (this.operation || this.lineNum)
      ? ('-' + this.operation 
        ? (this.operation + ':') : '' +
      this.lineNum
        ? this.lineNum : '') : ''
    console.error(`${this.type}: ${this.text} ${tip}`, this.errObj)
  }

  toString() {
    const tip = (this.operation || this.lineNum)
      ? ('-' + this.operation 
        ? (this.operation + ':') : '' +
      this.lineNum
        ? this.lineNum : '') : ''
    const str = 
    `
      ${this.type}: ${this.text} ${tip},
      ${this.errObj ? this.errObj.message : ''}
    `
    return str
  }
}

const logContainer = new Logger()

export default logContainer