const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash=()=>{
        // calculate the hash function of this block
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    // when we create our block we create these parameters
}

class Blockchain {
    //constructor responsible for constructing our blockchain
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, "12/08/2019", "Genesis Block", "0")
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock) {
        
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        console.log(this.chain)
        this.chain.push(newBlock);
    }
}

let barbellCoin = new Blockchain();

barbellCoin.addBlock(new Block(1, "12/8/2019", { amount: 10 }))
console.log(JSON.stringify(barbellCoin, null, 4))


