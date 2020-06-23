function delicateWorker(file, message, error) {
  const worker = new Worker(file)
  worker.onmessage = message
  worker.onerror = error
  return worker
}

function sharedWorker() {
  
}