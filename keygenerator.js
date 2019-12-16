const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPublic('hex');

console.log();
console.log('Private key:', privateKey)

console.log();
console.log('public key:', publicKey);