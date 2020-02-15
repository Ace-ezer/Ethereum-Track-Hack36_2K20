const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

//run with local daemon
//var ipfsAPI = require('ipfs-api');
//const ipfsAPI = require("ipfs-api");
 
// connect to ipfs daemon API server
//var ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});

export default ipfs;