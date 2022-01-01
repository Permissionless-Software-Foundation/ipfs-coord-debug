/*
  List all the peers connected to a specific pubsub topic.
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

      await this.listPubsubPeers(flags)

      return true
    } catch (err) {
      console.log('Error in run(): ', err)

      return false
    }
  }

  async listPubsubPeers (flags) {
    try {
      const topic = flags.topic
      console.log('topic: ', topic)

      const result = await this.ipfs.pubsub.peers(topic)
      console.log('result: ', result)
    } catch (err) {
      console.error('Error in listPubsubPeers()')
      throw err
    }
  }
}

PubsubList.description = 'List and/or select a wallet service provider.'

PubsubList.flags = {
  topic: flags.string({
    char: 't',
    description: 'An IPFS topic to analyze.'
  })
}

module.exports = PubsubList
