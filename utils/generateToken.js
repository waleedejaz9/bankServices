const jwt =  require('jsonwebtoken')
const CONFIG = require('../config');

const generateToken = (client_id, client_secret) => {
  return jwt.sign({ client_id, client_secret }, CONFIG.JWT, {
    expiresIn: '3600s',
  })
}

module.exports =  generateToken