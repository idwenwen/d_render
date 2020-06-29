
/**
 * constructor of logger fot saving different type of log
 */
import Now from '@/util/common/time'

const TYPES = ['debug', 'info', 'warning', 'error']
const DEF_TYPE = 'info'

function Logger(other_types) {
  const all = [...new Set(TYPES.concat(other_types))]
  all.forEach(item => {
    this[item] = []
    this.prototype[item] = ({log, error}) => {
      this.report({
        type: item,
        log, error
      })
    }
  })
}

Logger.prototype.report = function report({type, log, error}) {
  this[type || DEF_TYPE].push({text: `[${type}]${log} -${new Now().time()}`, error})
}

Logger.prototype.consoleLog = function consoleLog(type) {
  this[type || DEF_TYPE].forEach(item => {
    
  })
}

Logger.prototype.all = function all(type) {
  return this[type || DEF_TYPE]
}

const logger = new Logger()

export default logger