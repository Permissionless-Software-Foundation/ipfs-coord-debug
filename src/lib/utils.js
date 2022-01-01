/*
  Utility library. Contains DRY functions used by several commands.
*/

// Public npm libraries.
const Conf = require('conf')

class Utils {
  constructor () {
    // Encapsulate dependencies
    this.conf = new Conf()
  }

  // Gets the IPFS URL from the configuration. If it has not been set, will
  // return the default value.
  getIpfsUrl () {
    try {
      const DEFAULT = 'http://172.17.0.1:5001'

      let result = this.conf.get('ipfsUrl')
      console.log('result: ', result)

      if (!result) {
        this.conf.set('ipfsUrl', DEFAULT)
        result = DEFAULT
      }

      return result
    } catch (err) {
      console.error('Error in getIpfsUrl()')
      throw err
    }
  }
}

module.exports = Utils
