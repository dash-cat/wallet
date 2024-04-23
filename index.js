const Client = require('bitcoin-core');

const client = new Client({
  //network: '127.0.0.1',
  network: 'regtest',
  username: 'baklosan',
  password: 'U)a2xhPc^TZAEys0;4Hb=b)!P%gn^NSz',
  port: 8332,
	wallet: '0xFDe3FD7D44C5973b58Ee798368913f94F5Fb4CC1',
});

async function getBlockHeight() {
  try {
    const blockCount = await client.getBlockCount();
    console.log('Текущая высота блока:', blockCount);
  } catch (error) {
    console.error('Ошибка получения информации о блоке:', error);
  }
	const balance = await new Client({ version: '0.15.1' }).getBalance({
		account: '*',
		minconf: 0
	});

	console.log(balance)
}

getBlockHeight();

