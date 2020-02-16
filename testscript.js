const { libra } = require("gopherjs-libra");
// const { eddsa } = require('elliptic');
// const { SHA3 } = require('sha3');

const defaultServer = "http://gamma.libraide.com:8080",
    waypoint = "insecure";

// const fromSecretKey = secretKeyHex => {
//     const keyBytes = new Uint8Array(Buffer.from(secretKeyHex, 'hex'));
//     const eddsa1 = new eddsa('ed25519');
//     const eddsaPair = eddsa1.keyFromSecret(Buffer.from(keyBytes));
//     return eddsaPair;
// }

const fromHexString = hexString =>
    new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

const toHexString = bytes =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

var senderAddr = fromHexString("aff51463a637fef00379e32843065503a789aa8c7326d8db37112f63a547e59a"),
    priKey = fromHexString("310b690d137fe99eab7518e67d9612da746715c57cc702b280da032b7d1045a313bf04feb68bde6799237af3e5a25de755a1b7b1a916b4fe9ddcc9d82d66a939");

// var sha3 = new SHA3(256);
// sha3.update(Buffer.from(new Uint8Array(secretKey.getSecret())));
// var priKey = new Uint8Array(sha3.digest())

var code = new Uint8Array([161, 28, 235, 11, 1, 0, 8, 1, 79, 0, 0, 0, 8, 0, 0, 0, 2, 87, 0, 0, 0, 4, 0, 0, 0, 3, 91, 0, 0, 0, 12, 0, 0, 0, 12, 103, 0, 0, 0, 31, 0, 0, 0, 13, 134, 0, 0, 0, 8, 0, 0, 0, 5, 142, 0, 0, 0, 78, 0, 0, 0, 4, 220, 0, 0, 0, 64, 0, 0, 0, 7, 28, 1, 0, 0, 24, 0, 0, 0, 0, 0, 1, 1, 1, 2, 0, 3, 2, 5, 1, 0, 0, 4, 0, 1, 6, 1, 3, 7, 2, 1, 8, 3, 2, 0, 1, 3, 0, 2, 1, 8, 0, 0, 1, 3, 0, 2, 1, 8, 0, 0, 1, 8, 0, 0, 0, 2, 0, 2, 5, 8, 0, 0, 0, 3, 2, 3, 8, 0, 0, 3, 0, 6, 60, 83, 69, 76, 70, 62, 12, 76, 105, 98, 114, 97, 65, 99, 99, 111, 117, 110, 116, 9, 76, 105, 98, 114, 97, 67, 111, 105, 110, 8, 77, 121, 77, 111, 100, 117, 108, 101, 4, 109, 97, 105, 110, 1, 84, 20, 119, 105, 116, 104, 100, 114, 97, 119, 95, 102, 114, 111, 109, 95, 115, 101, 110, 100, 101, 114, 2, 105, 100, 7, 100, 101, 112, 111, 115, 105, 116, 175, 245, 20, 99, 166, 55, 254, 240, 3, 121, 227, 40, 67, 6, 85, 3, 167, 137, 170, 140, 115, 38, 216, 219, 55, 17, 47, 99, 165, 71, 229, 154, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 8, 0, 11, 0, 18, 1, 1, 12, 1, 44, 11, 1, 18, 2, 1, 18, 3, 1, 2])

var client = libra.client(defaultServer, waypoint)
client.queryAccountSequenceNumber(senderAddr)
    .then(r => {
        var txn = {
            "senderAddr": senderAddr,
            "senderPrivateKey": priKey,
            "senderSeq": r,
            "payload": {
                "code": code,
                "args": [
                    10 * 1000000
                ],
            },
            "maxGasAmount": 140000,
            "gasUnitPrice": 0,
            "expirationTimestamp": parseInt(Date.now() / 1000) + 60,
        };
        console.log(txn)
        return client.submitRawTransaction(txn);
    })
    .then(r => {
        console.log("Polling sequence number until ", r)
        return client.pollSequenceUntil(senderAddr, r, parseInt(Date.now() / 1000) + 60)
    })
    .then(r => {
        console.log("done.")
    })
    .catch(e => {
        console.log("Error:", e)
    })