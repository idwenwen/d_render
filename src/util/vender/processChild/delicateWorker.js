
/**
 * Class for delicate worker with
 */
import Logger from '../FrontEndLogger'

class WorkerChecker {
  constructor(path) {
    new Worker(path)
  }
}