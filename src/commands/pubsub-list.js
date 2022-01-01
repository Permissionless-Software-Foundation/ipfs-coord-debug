/*
  List all the pubsub topics the IPFS node is subscribed to.
*/

// const SERVER = 'http://localhost:5001/bch'

// Public NPM libraries
// const axios = require('axios')
// const Conf = require('conf')
const IPFS = require('ipfs-http-client')

// Local libraries
// const WalletUtil = require('../lib/wallet-util')
const Utils = require('../lib/utils')

const { Command, flags } = require('@oclif/command')

class PubsubList extends Command {
  constructor (argv, config) {
    super(argv, config)

    // Encapsulate dependencies.
    // this.axios = axios
    // this.conf = new Conf()
    // this.walletUtil = new WalletUtil()
    this.utils = new Utils()
  }

  async run () {
    try {
      const { flags } = this.parse(PubsubList)

      const ipfsUrl = this.utils.getIpfsUrl()
      console.log('ipfsUrl: ', ipfsUrl)

      this.ipfs = IPFS.create(ipfsUrl)

      await this.listPubsubs()

      // const server = this.walletUtil.getRestServer()
      //
      // // Get a list of the IPFS peers this node is connected to.
      // const result = await this.axios.get(`${server}/bch`)
      // // console.log(`result.data: ${JSON.stringify(result.data, null, 2)}`);
      //
      // const providers = result.data.status.serviceProviders
      // const selectedProvider = result.data.status.selectedProvider
      //
      // console.log(
      //   `Available service providers: ${JSON.stringify(providers, null, 2)}`
      // )
      // console.log(`Selected service provider: ${selectedProvider}`)
      //
      // if (flags.select) await this.selectService(flags)

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

  // Select a different peer to use as a wallet service.
  async selectService (flags) {
    try {
      const chosenPeer = flags.select

      const server = this.walletUtil.getRestServer()

      const body = {
        provider: chosenPeer
      }
      await this.axios.post(`${server}/bch/provider`, body)

      console.log(`Service provider switched to ${chosenPeer}`)

      return true

      // Loop through the available wallet service peers.
      // for (let i = 0; i < servicePeers.length; i++) {
      //   const thisPeer = servicePeers[i];
      //
      //   // If the chosen ID is found in the list, select it.
      //   if (thisPeer.peer.includes(chosenPeer)) {
      //     this.conf.set("selectedService", chosenPeer);
      //
      //     break;
      //   }
      // }
    } catch (err) {
      console.log('Error in selectService()')
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
