// const { libra } = require("gopherjs-libra");
const { LibraWallet, LibraClient } = require('wm-kulap-libra');
// const { eddsa } = require('elliptic');
// const { SHA3 } = require('sha3');

//kulap 
const wallet = new LibraWallet();

// generate a new account
const account = wallet.newAccount();

const privKey = account.getPrivateKey();
console.log(privKey);

const client = new LibraClient({
    transferProtocol: 'http',
    host: 'gamma.libraide.com',
    port: '8080',
})

// mint 2 libracoins to users accounts
async () => {
    await client.mintWithFaucetService(account.getAddress(), 20e6);
}


// const defaultServer = "https://harmonyide.io:8080",
//     waypoint = "insecure";

// // const fromSecretKey = secretKeyHex => {
// //     const keyBytes = new Uint8Array(Buffer.from(secretKeyHex, 'hex'));
// //     const eddsa1 = new eddsa('ed25519');
// //     const eddsaPair = eddsa1.keyFromSecret(Buffer.from(keyBytes));
// //     return eddsaPair;
// // }

// const fromHexString = hexString =>
//     new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

// const toHexString = bytes =>
//     bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

// var senderAddr = fromHexString("aff51463a637fef00379e32843065503a789aa8c7326d8db37112f63a547e59a"),
//     priKey = fromHexString("310b690d137fe99eab7518e67d9612da746715c57cc702b280da032b7d1045a313bf04feb68bde6799237af3e5a25de755a1b7b1a916b4fe9ddcc9d82d66a939");

// // var sha3 = new SHA3(256);
// // sha3.update(Buffer.from(new Uint8Array(secretKey.getSecret())));
// // var priKey = new Uint8Array(sha3.digest())

// var code = new Uint8Array([161, 28, 235, 11, 1, 0, 8, 1, 79, 0, 0, 0, 4, 0, 0, 0, 2, 83, 0, 0, 0, 4, 0, 0, 0, 3, 87, 0, 0, 0, 3, 0, 0, 0, 12, 90, 0, 0, 0, 10, 0, 0, 0, 13, 100, 0, 0, 0, 5, 0, 0, 0, 5, 105, 0, 0, 0, 24, 0, 0, 0, 4, 129, 0, 0, 0, 64, 0, 0, 0, 10, 193, 0, 0, 0, 10, 0, 0, 0, 0, 0, 1, 1, 1, 2, 1, 0, 0, 3, 0, 2, 1, 8, 0, 0, 1, 8, 0, 0, 0, 3, 1, 8, 0, 0, 8, 77, 121, 77, 111, 100, 117, 108, 101, 9, 76, 105, 98, 114, 97, 67, 111, 105, 110, 1, 84, 2, 105, 100, 175, 245, 20, 99, 166, 55, 254, 240, 3, 121, 227, 40, 67, 6, 85, 3, 167, 137, 170, 140, 115, 38, 216, 219, 55, 17, 47, 99, 165, 71, 229, 154, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 2, 0, 11, 0, 2])

// var client = libra.client(defaultServer, waypoint)
// client.queryAccountSequenceNumber(senderAddr)
//     .then(r => {
//         var txn = {
//             "senderAddr": senderAddr,
//             "senderPrivateKey": priKey,
//             "senderSeq": r,
//             "payload": {
//                 "module": code,
//             },
//             "maxGasAmount": 140000,
//             "gasUnitPrice": 0,
//             "expirationTimestamp": parseInt(Date.now() / 1000) + 60,
//         };
//         console.log(txn)
//         return client.submitRawTransaction(txn);
//     })
//     .then(r => {
//         console.log("Polling sequence number until ", r)
//         return client.pollSequenceUntil(senderAddr, r, parseInt(Date.now() / 1000) + 60)
//     })
//     .then(r => {
//         console.log("done.")
//     })
//     .catch(e => {
//         console.log("Error:", e)
//     })