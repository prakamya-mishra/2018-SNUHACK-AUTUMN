const {
    NonceTxMiddleware, SignedTxMiddleware, Client,
    Contract, Address, LocalAddress, CryptoUtils, LoomProvider
  } = require('loom-js');

const Web3 = require('web3');
// const Asset = require('./contract.js');
var $ = require('jquery')
var contract;


async function createContract(privateKey) {
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(Buffer.from(privateKey, 'base64'))
    const client = new Client(
      'default',
      'ws://127.0.0.1:46658/websocket',
      'ws://127.0.0.1:46658/queryws',
    )

    const from = LocalAddress.fromPublicKey(publicKey).toString()
    const web3 = new Web3(new LoomProvider(client, privateKey))
    // const ABI = [{"constant":false,"inputs":[{"name":"_tileState","type":"string"}],"name":"SetTileMapState","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"GetTileMapState","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"state","type":"string"}],"name":"OnTileMapStateUpdate","type":"event"}]

    // const loomContractAddress = await client.getContractAddressAsync('TilesChain')
    // const contractAddress = CryptoUtils.bytesToHexAddr(loomContractAddress.local.bytes)

    const ABI =  [
        {
          "constant": true,
          "inputs": [],
          "name": "seller",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "orderNonce",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "productNonce",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "sellerName",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "name": "name",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "id",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "name",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "seller",
              "type": "string"
            }
          ],
          "name": "ProductAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "id",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "from",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "quantity",
              "type": "uint256"
            }
          ],
          "name": "ProductTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "order",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "id",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "quantity",
              "type": "uint256"
            }
          ],
          "name": "AddToCart",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "orderId",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "from",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "to",
              "type": "address"
            }
          ],
          "name": "OrderTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "orderId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "by",
              "type": "address"
            }
          ],
          "name": "OrderPlaced",
          "type": "event"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_id",
              "type": "string"
            },
            {
              "name": "_name",
              "type": "string"
            },
            {
              "name": "_category",
              "type": "string"
            },
            {
              "name": "_quantity",
              "type": "uint256"
            }
          ],
          "name": "addProduct",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_id",
              "type": "string"
            },
            {
              "name": "ipfsHash",
              "type": "string"
            }
          ],
          "name": "setImage",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_id",
              "type": "string"
            },
            {
              "name": "_desc",
              "type": "string"
            }
          ],
          "name": "setDesc",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_id",
              "type": "string"
            },
            {
              "name": "_features",
              "type": "string"
            }
          ],
          "name": "setFeatures",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_id",
              "type": "string"
            }
          ],
          "name": "getProduct",
          "outputs": [
            {
              "name": "_name",
              "type": "string"
            },
            {
              "name": "_category",
              "type": "string"
            },
            {
              "name": "_desc",
              "type": "string"
            },
            {
              "name": "_features",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_id",
              "type": "string"
            }
          ],
          "name": "getImage",
          "outputs": [
            {
              "name": "ipfsHash",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_id",
              "type": "string"
            }
          ],
          "name": "getTokens",
          "outputs": [
            {
              "name": "tokenIds",
              "type": "bytes32[]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "user",
              "type": "address"
            }
          ],
          "name": "getUserTokens",
          "outputs": [
            {
              "name": "tokenIds",
              "type": "bytes32[]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "to",
              "type": "address"
            },
            {
              "name": "_id",
              "type": "string"
            },
            {
              "name": "_quantity",
              "type": "uint256"
            }
          ],
          "name": "transferProduct",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_orderId",
              "type": "uint256"
            },
            {
              "name": "_id",
              "type": "string"
            },
            {
              "name": "_quantity",
              "type": "uint256"
            }
          ],
          "name": "addToCart",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_orderId",
              "type": "uint256"
            }
          ],
          "name": "getCart",
          "outputs": [
            {
              "name": "_ordersList",
              "type": "string[]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_orderId",
              "type": "uint256"
            }
          ],
          "name": "placeOrder",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_orderId",
              "type": "uint256"
            },
            {
              "name": "to",
              "type": "address"
            }
          ],
          "name": "buyOrder",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "createOrderId",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "getOrderId",
          "outputs": [
            {
              "name": "orderNonce",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_orderId",
              "type": "string"
            },
            {
              "name": "to",
              "type": "address"
            }
          ],
          "name": "transferOrder",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    const contractAddress = '0x5df49d7e5b3c0269d2b6399db513c9ca27fc2b35'
    contract = new web3.eth.Contract(ABI, contractAddress, {from})
    return contract;
}

var clientContract;

//SIgn up
async function createKeyPair() {
    const privateKey = CryptoUtils.generatePrivateKey()
    return Uint8ArrayToB64(privateKey);
}

async function initContract(pKey) {
    const privateKey = Buffer.from(pKey, 'base64');
    contract = await createContract(privateKey);
    console.log(contract.options);
    return Uint8ArrayToB64(privateKey);
}

function Uint8ArrayToB64(bytes) {
  return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString('base64')
}

function addProduct(id, name, category, quantity, desc, _features) {
    contract.methods.addProduct(id, name, category, quantity).send().then((tx) => {
        // console.log(tx);
        // contract.methods.setImage(id, ipfsHash).send();
        contract.methods.setDesc(id, desc);
        contract.methods.setFeatures(id, _features);
    })
}

async function getProduct(id, callback) {
    contract.methods.getProduct(id).call().then((res) => callback(res))
}

async function getImage(id, callback) {
    contract.methods.getImage(id).call().then((res) => callback(res))
}

async function transferProduct(to, id, quantity) {
    contract.methods.transferProduct(to, id, quantity).send()
}

initContract('IeQo3jEz6R5mjO+cZGWHUTbQbtYbftldNmE7T+HNJYabCInIY+7YT752dPKIoBSckvazZRlzgrgJDk5x7tylEg==')

var pids = []

for(var i = 0; i < 5; i++) {
    var pid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+"id";
    var name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var category = (Math.random() * 5 + 1).toString();
    var quantity = 100;
    var desc = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var features = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    addProduct(pid, name, category, quantity, desc, features);
}

//Client

async function login(pKey) {
    const privateKey = Buffer.from(pKey, 'base64');
    clientContract = await createContract(privateKey);
}

async function addToCart(orderId, pid, quantity) {
    if(contract == null) {
        return
    }
    contract.methods.addToCart(orderId, pid, quantity).send().then((tx) => {
        console.log("Transaction: "+tx);
    });
    // console.log(Asset.getOrderId(contract));
    // console.log(Asset.getOrderId(contract))
}

async function placeOrder(orderId) {
    contract.methods.placeOrder(orderId).send();
}

async function getOrderId() {
    contract.methods.createOrderId().send();
    return contract.methods.getOrderId().call();
}

getOrderId().then((res) => {
    //Should throw an error
    console.log(res);
    // addToCart(res, "3", 3);
})

//TEST IMPLEMENTATIONS
// initContract('IeQo3jEz6R5mjO+cZGWHUTbQbtYbftldNmE7T+HNJYabCInIY+7YT752dPKIoBSckvazZRlzgrgJDk5x7tylEg==')
// var id = "1";

// addProduct("1", "Laptop", "Electronics", 100, "A laptop", "really cool laptop");

// getProduct(id, (res) => {
//     console.log(res);
// })

// getImage(id, (res) => {
//     console.log(res);
// })


//Order Listener and transfer
contract.events.OrderPlaced(function(err, res) {
    console.log("New order received: "+JSON.stringify(res));
    var to = res.returnValues.by;
    var oid = res.returnValues.orderId;
    contract.methods.buyOrder(oid, to).send();
})

contract.events.ProductAdded(function(err, res) {
    console.log("Product Added: "+JSON.stringify(res.returnValues.id));
    pids.push(res.returnValues.id);
    // var idmong = res.returnValues.id;
    // var namemong = res.returnValues.name;
    // var sellermong = res.returnValues.seller;
    // var product = {"id": idmong,"name": namemong,"seller": sellermong}
    //   $.post("http://localhost:8080/addtrans",product,function(response){
    //     console.log(response)
    //   })
})
//
