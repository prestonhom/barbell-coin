const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('042e452e6578254d7a64f19104a614ad6568f732ad22b72dc3ddeeefdc2c07a098e3678e3354bc4e0f7976600189068ccfd93a4acd1e2f11c06cf353c760b79b54')
const myWalletAddress = myKey.getPublic('hex')

let barbellCoin = new Blockchain();

const tx1= new Transaction(myWalletAddress,'public key goes here',10)
tx1.signTransaction(myKey)
barbellCoin.addTransaction(tx1);

console.log('starting the miner...')
barbellCoin.minePendingTransactions(myWalletAddress)

console.log('balance of xavier is', barbellCoin.getBalanceOfAddress(myWalletAddress))


