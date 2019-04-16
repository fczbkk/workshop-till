function validateEmailAddress (email) {
  if (typeof email !== 'string') {
    return false
  }

  if (email.length < 6) {
    return false
  }

  if (email.split('').indexOf('@') === -1) {
    return false
  }

  return true
}

module.exports = {
  validateEmail: validateEmailAddress
}
