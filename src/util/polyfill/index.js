/**
 * Concat all params
 * @param  {...any} args 
 */
function concat(...args) {
  return args.reduce((count, item) => {
    count = count || []
    if (Array.isArray(item)) {
      count = count.concat(item)
    } else {
      count.push(item)
    }
    return count
  })
}

/**
 * Combining two different list with limitation
 * @param {String} limit Limitation for combine
 * @param {Array} l1 
 * @param {Array} l2 
 */
// function combine(l1, l2, limit) {
//   const list = l1.concat(l2)
  

// }

function replaceOrigin(origin, str, operation) {
  const matched = origin.match(str)
  if (matched) {
    const getReplace = operation(matched[0])
    return origin.replace(matched[0], getReplace)
  }
  return origin
}

export default {replaceOrigin, concat}