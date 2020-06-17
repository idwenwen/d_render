/**
 * Logger for front-end catch
 * 1. Save for log
 * 2. Log level check
 * 3. Log-gzip
 * 4. Check poistion according to code
 */
import Logger from '@/util/vender/FrontEndLogger'

const log = {
  methods: {
    throwError(item, error) {
      let param = item
      if (typeof item !== 'object') {
        param = {
          type: 'error',
          text: item.toString()
        }
      }
      Logger[param + 'Catch'](param, error)
    },

    consoleError(type) {
      Logger.console(type)
    },

    necessaryParam(...args) {
      args.forEach(item => {
        if (!item) {
          const errObj = new Error('Missing necessary parameter')
          this.throwError({
            type: 'Error',
            err: 'MissVariableError',
            text: 'Missing necessary parameter - necessaryParam'
          }, errObj)
          throw errObj
        }
      })
    }
  }
}

export default log