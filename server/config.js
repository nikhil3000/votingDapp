const mongo_id = process.env.MLABUSER;
const mongo_pwd = process.env.MLABPWD;
let mongoURI = '';

if(process.env.NODE_ENV === 'production'){
		mongoURI = 'mongodb://' +mongo_id+':'+mongo_pwd+'@ds137703.mlab.com:37703/sentient'
}
else
{	
		mongoURI = 'mongodb://localhost:27017/votingDapp'
}


module.exports = {
    abi : {
        factoryABI: '[ { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "question", "type": "string" } ], "name": "createPoll", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isOwner", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "hash", "type": "string" } ], "name": "addVoter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getPollAddList", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_store", "type": "address" } ], "name": "setStorageContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getStorageContract", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_store", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "", "type": "address" } ], "name": "Print", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "", "type": "address[]" } ], "name": "PrintPollAddList", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } ]',
        pollABI: '[ { "constant": false, "inputs": [ { "name": "option", "type": "string" } ], "name": "addOptions", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "option", "type": "string" }, { "name": "voterHash", "type": "string" } ], "name": "vote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getQuestion", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_question", "type": "string" }, { "name": "_store", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ]'
    },
    contractAddresses : {
        storeAddress: '0x23d96eb8d3edc494c8a18154cef40bf3e9e80390',
        voterFactoryAddress: '0x002f7ff1a2ab0c1d516a45f0ac878be541395dd1'
    },
    db : {
        mongoURI: mongoURI
    }
}

