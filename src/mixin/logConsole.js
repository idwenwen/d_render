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
    }
  }
}

export default log