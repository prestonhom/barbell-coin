const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash = () => {
        // calculate the hash function of this block
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty) {
        // check for certain amount of 0's
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            // increment nonce as long as our hash doesn't with enough 0's
            this.hash = this.calculateHash()


        }
        console.log("Block mined", this.hash)
    }

    // when we create our block we create these parameters
}

class Blockchain {
    //constructor responsible for constructing our blockchain
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4
    }
    createGenesisBlock() {
        return new Block(0, "12/08/2019", "Genesis Block", "0")
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock) {

        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty)
        console.log(this.chain)
        this.chain.push(newBlock);
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true
    }
}

let barbellCoin = new Blockchain();

console.log('Mining Block 1...');
barbellCoin.addBlock(new Block(1, "12/8/2019", { amount: 10 }))
console.log('Mining block 2...')
barbellCoin.addBlock(new Block(2, "12/10/2019", { amount: 8 }))


