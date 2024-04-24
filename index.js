const Client = require('bitcoin-core');

const client = new Client({
  version: '27.99.0',
  network: 'testnet',//regtest or mainnet
  host: '127.0.0.1',
  port: 18332,//8332
  username: 'baklosan',
  password: 'Ua2xhPcTZAEys04HbbPgnNSz',
  wallet: 'wallet-ordinals'
});

const wallet1 = new Client({
  network: 'testnet',
  port: 18332,
  wallet: 'wallet-ord',
  username: 'baklosan',
  password: 'Ua2xhPcTZAEys04HbbPgnNSz'
});

const wallet2 = new Client({
  network: 'testnet',
  port: 18332,
  wallet: 'wallet-o',
  username: 'baklosan',
  password: 'Ua2xhPcTZAEys04HbbPgnNSz'
});

//(async function() {
//  await wallet2.generateToAddress(100, );

//  console.log(await wallet1.getBalance());
  // => 0
//  console.log(await wallet2.getBalance());
  // => 50
//}());

async function getBlockHeight() {
  try {
    const address = await client.getNewAddress();
	  console.log("Address", address);
    const blockHashes = await client.generatetoaddress(10, address);
	  console.log('Хеши сгенерированных блоков:', blockHashes);
    const blockCount = await client.getBlockCount();
          console.log('Текущая высота блока:', blockCount);
    //const balance = await client.getBalance('*', 0);
    //console.log('Баланс кошелька:', balance);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

getBlockHeight();

