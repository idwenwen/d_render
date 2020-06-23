
/**
 * constructor of logger fot saving different type of log
 */
const TYPES = ['debug', 'info', 'warning', 'error']
const DEF_TYPE = 'info'

function Logger() {
  TYPES.forEach(item => {
    this[item] = []
    this.prototype[item] = () => {

    }
  })
}

Logger.prototype.report = function report({type, log}) {
  this[type || DEF_TYPE].push(log + )
}