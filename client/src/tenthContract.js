import web3 from './web3';

// Address of the contract.
const address = '0x147D6a66a900186280855177872678830aB2aF41';

// ABI of the contract
const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint64",
        "name": "digiId",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "RollNo",
        "type": "uint64"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "dob",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "guardian",
        "type": "string"
      },
      {
        "internalType": "uint16",
        "name": "percent",
        "type": "uint16"
      },
      {
        "internalType": "bool",
        "name": "pass_status",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "board",
        "type": "string"
      }
    ],
    "name": "setTenthDetails",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint64",
        "name": "digiId",
        "type": "uint64"
      }
    ],
    "name": "getTenthDetails",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint64",
            "name": "RollNo",
            "type": "uint64"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "dob",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "guardian",
            "type": "string"
          },
          {
            "internalType": "uint16",
            "name": "percent",
            "type": "uint16"
          },
          {
            "internalType": "bool",
            "name": "pass_status",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "board",
            "type": "string"
          }
        ],
        "internalType": "struct TenthMarksheet.TenthInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

export default new web3.eth.Contract(abi, address);