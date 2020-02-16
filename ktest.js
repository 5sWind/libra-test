const { LibraWallet, LibraClient } = require('kulap-libra');

async function main() {
  // On Browser
  const client = new LibraClient({
    transferProtocol: 'https',
    host: 'www.harmonyide.io',
    port: '8080',
    // dataProtocol: 'grpc-web-text',
    // faucetServerHost: 'gamma.libraide.com:9000', 
    // dataProtocol: 'grpc-web-text'
  })
  // On Node
  // const client = new LibraClient({ network: LibraNetwork.Testnet })

  const wallet = new LibraWallet({
    mnemonic:
      'lend arm arm addict trust release grid unlock exhibit surround deliver front link bean night dry tuna pledge expect net ankle process mammal great',

  });
  const account = wallet.newAccount();
  const account2Address = '854563c50d20788fb6c11fac1010b553d722edb0c02f87c2edbdd3923726d13f';
  const response = await client.transferCoins(account, account2Address, 1e6);

  console.log(response);

  // Account state has other information that you could be interested in such as `sequenceNumber`.
}

function start() {
  return main();
}

(async () => {
  console.log('before start');

  await start();

  console.log('after start');
})();