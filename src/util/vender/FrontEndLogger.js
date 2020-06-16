const LogType = ['info', 'debug', 'warning', 'Error']

function Log() {
  this.logType = new Set(['error'].concat(LogType))
  this.logType.forEach(item => {
    item = item.toLocaleLowerCase()
    this[item] = []
    addProto(Log, item + 'Catch', (text, error) => {
      let param = text
      if (!(typeof text === 'object')) {
        param = {
          text: text.toString(),
          type: item
        }
      }
      this.catchError(param, error)
    })
  })
}

function addProto(constructorOperation, name, operation) {
  if (typeof constructorOperation != 'function') {
      logger.errorCatch({
        err: 'BuildError',
        text: 'There is no Log component, can work for current app - Log.addProto'
      })
  } else {
    constructorOperation.prototype[name] = operation
  }
}

Log.prototype.catchError = function catchError(
  {err, type, text} =
  {err: 'UnCatchError', type: 'error', text: 'Do not get error-information'},
  obj) {
    type = type.toLocaleLowerCase()
    this[type + 'Catch'].push({text: this.combine(err, type, text), obj})
}

Log.prototype.combine = function combine(err = 'Error', type = 'error', text = '') {
  type = type.toLocaleLowerCase()
  return `${err} : [${type}], ${text}`
}

Log.prototype.console = function consoleLog(type) {
  if (!type) {
    this.consoleAll()
  } else {
    this[type].forEach(item => {
      console.log('-------------------------------------------------')
      console.error(item.text, item.obj)
    })
  }
}

Log.prototype.consoleAll = function consoleLog() {
  this.logType.forEach(item => {
    this.console(item)
  })
}

Log.prototype.gzip = function gzip() {
  //gzip current log for get mo info
}

const logger = new Log()

export default logger