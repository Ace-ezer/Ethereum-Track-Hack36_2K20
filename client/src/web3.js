/*import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);


export default web3;*/

import Web3 from 'web3';

if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
}


const web3 = window.web3

export default web3;