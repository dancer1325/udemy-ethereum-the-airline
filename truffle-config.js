// const HDWalletProvider = require('truffle-hdwallet-provider');   // Using the old library truffle-hdwallet-provider

const HDWalletProvider = require('@truffle/hdwallet-provider');

// Use the Mnemonic words of your Metamask account
// TODO: Configure a secrets file, and not to push to the public repository
const mnemonic = 'unhappy clarify worth panther sibling sand almost usage pulp fun action toe';

module.exports = {
  networks: {
    development: {      
      host: 'localhost',
      port: 7545,
      network_id: '*',
      gas: 5000000
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/LtjZFi6C8XO0qkthtI7p"),       // TODO: Chane to my Infura URL. It allows avoid launching a Ethereum node locally
      network_id: 4         // Values to configure by Ethereum test network https://medium.com/coinmonks/ethereum-test-network-21baa86072fa
    }
  },
  compilers: {      // Necessary to specify if you require a specific solc version. By default it's 0.5.16
    solc: {
      version: "0.8.6"
    }
  }
}