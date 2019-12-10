const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
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
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    createGenesisBlock() {
        return new Block(0, "12/08/2019", "Genesis Block", "0")
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    minePendingTransactions(miningRewardAddress) {
        // when a miner calls this method then it would pass along its address so that if they do mine it, the rewards will go to that address
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)]
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount
                }
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
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


barbellCoin.createTransaction(new Transaction('address1', 'address2', 100))
barbellCoin.createTransaction(new Transaction('address2', 'address1', 50))
console.log('starting the miner...')
barbellCoin.minePendingTransactions('xaviers-address')
console.log('balance of xavier is', barbellCoin.getBalanceOfAddress('xaviers-address'))

console.log('starting the miner again...')
barbellCoin.minePendingTransactions('xaviers-address')
console.log('balance of xavier is', barbellCoin.getBalanceOfAddress('xaviers-address'))


