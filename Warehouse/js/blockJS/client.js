const {
    NonceTxMiddleware, SignedTxMiddleware, Client,
    Contract, Address, LocalAddress, CryptoUtils, LoomProvider
  } = require('loom-js');

  const Web3 = require('web3');
  const bs58 = require('bs58');
//   function getPublicKey(privateKey) {
//       return CryptoUtils.publicKeyFromPrivateKey(privateKey);
//   }

//   const client = new Client(
//     'default',
//     '://127.0.0.1:46658/websocket',
//     'ws://127.0.0.1:46658/queryws',
//   )

const privateKey = CryptoUtils.generatePrivateKey()
const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)

var sellerPriv =  Buffer.from('IeQo3jEz6R5mjO+cZGWHUTbQbtYbftldNmE7T+HNJYabCInIY+7YT752dPKIoBSckvazZRlzgrgJDk5x7tylEg==', 'base64');//.B64ToUint8Array('IeQo3jEz6R5mjO+cZGWHUTbQbtYbftldNmE7T+HNJYabCInIY+7YT752dPKIoBSckvazZRlzgrgJDk5x7tylEg==');
var sellerPub = CryptoUtils.publicKeyFromPrivateKey(sellerPriv);
console.log(sellerPub);
// Create the client
const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
)

// The address for the caller of the function
const from = LocalAddress.fromPublicKey(sellerPub).toString()

// Instantiate web3 client using LoomProvider
const web3 = new Web3(new LoomProvider(client, sellerPriv));

const ABI = [{"constant":true,"inputs":[],"name":"seller","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"orderNonce","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"productNonce","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sellerName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"string"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"seller","type":"string"}],"name":"ProductAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"string"},{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"quantity","type":"uint256"}],"name":"ProductTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"order","type":"uint256"},{"indexed":false,"name":"id","type":"string"},{"indexed":false,"name":"quantity","type":"uint256"}],"name":"AddToCart","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"orderId","type":"string"},{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"OrderTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"orderId","type":"uint256"}],"name":"OrderPlaced","type":"event"},{"constant":false,"inputs":[{"name":"_id","type":"string"},{"name":"_name","type":"string"},{"name":"_category","type":"string"},{"name":"_quantity","type":"uint256"}],"name":"addProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"string"},{"name":"ipfsHash","type":"string"}],"name":"setImage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"string"},{"name":"_desc","type":"string"}],"name":"setDesc","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"string"},{"name":"_features","type":"string"}],"name":"setFeatures","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"string"}],"name":"getProduct","outputs":[{"name":"_name","type":"string"},{"name":"_category","type":"string"},{"name":"_desc","type":"string"},{"name":"_features","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"string"}],"name":"getImage","outputs":[{"name":"ipfsHash","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"string"}],"name":"getTokens","outputs":[{"name":"tokenIds","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getUserTokens","outputs":[{"name":"tokenIds","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"_id","type":"string"},{"name":"_quantity","type":"uint256"}],"name":"transferProduct","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_orderId","type":"uint256"},{"name":"_id","type":"string"},{"name":"_quantity","type":"uint256"}],"name":"addToCart","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_orderId","type":"uint256"}],"name":"getCart","outputs":[{"name":"_ordersList","type":"string[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_orderId","type":"uint256"}],"name":"placeOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"createOrderId","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOrderId","outputs":[{"name":"orderNonce","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_orderId","type":"string"},{"name":"to","type":"address"}],"name":"transferOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const contractAddress = '0x940c15bb22a296ed2ee6e2c726ff8e1891a14d69'

// Instantiate the contract and let it ready to be used
const contract = new web3.eth.Contract(ABI, contractAddress, {from})
// console.log(contract.options);
const id = "1234";
const name = "Laptop"
const cate = "Electronics"
const quant = 100;

async function test() {
    const tx = await contract.methods.addProduct(id, name, cate, quant).send();
    const res = await contract.methods.getTokens(id).call();
    console.log(tx);
    console.log(res);
}

test();

  