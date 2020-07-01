function replaceOrigin(origin, str, operation) {
  const matched = origin.match(str)
  if (matched) {
    const getReplace = operation(matched[0])
    return origin.replace(matched[0], getReplace)
  }
  return origin
}

export default { replaceOrigin }