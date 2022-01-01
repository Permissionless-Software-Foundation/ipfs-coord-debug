/*
  List all the pubsub topics the IPFS node is subscribed to.
*/

// const SERVER = 'http://localhost:5001/bch'

// Public NPM libraries
const IPFS = require('ipfs-http-client')

// Local libraries
const Utils = require('../lib/utils')

const { Command, flags } = require('@oclif/command')

class PubsubList extends Command {
  constructor (argv, config) {
    super(argv, config)

    // Encapsulate dependencies.
    this.utils = new Utils()
  }

  async run () {
    try {
      const { flags } = this.parse(PubsubList)

      const ipfsUrl = this.utils.getIpfsUrl()
      console.log('ipfsUrl: ', ipfsUrl)

      this.ipfs = IPFS.create(ipfsUrl)

      await this.listPubsubs()

      return true
    } catch (err) {
      console.log('Error in run(): ', err)

      return false
    }
  }

  async listPubsubs () {
    try {
      const result = await this.ipfs.pubsub.ls()
      console.log('result: ', result)
    } catch (err) {
      console.error('Error in listPubsubs()')
      throw err
    }
  }
}

PubsubList.description = 'List and/or select a wallet service provider.'

PubsubList.flags = {
  select: flags.string({
    char: 's',
    description: 'Switch to a given IPFS ID for wallet service.'
  })
}

module.exports = PubsubList
