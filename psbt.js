const bitcoin = require('bitcoinjs-lib');
const { ECPairFactory } = require('ecpair');
const tinysecp = require('tiny-secp256k1');

const ECPair = ECPairFactory(tinysecp);

// Приватный ключ (WIF): cQAtrMdHM6fKaeAxmTDvoZ4aJqHN5YyuYFYjXuGsvWjp8tkq9Ex1
// Public key <Buffer 03 79 94 f6 f3 06 44 b6 44 88 2d ec fe d8 66 ee b5 7e 92 de 67 8c 51 d2 df b6 87 26 0d 76 fb ab 00>
// "037994f6f30644b644882decfed866eeb57e92de678c51d2dfb687260d76fbab00"
// Биткоин адрес: tb1qmfufz7um5fs9d2tjee7z754sfrj8h9tmuegzx7

// Пример создания SegWit транзакции (P2WPKH)
function createSegWitTransaction(network, privKey, toAddress, amount) {
    const keyPair = ECPair.fromWIF(privKey, bitcoin.networks[network]);	
    const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: bitcoin.networks[network] });

    const psbt = new bitcoin.Psbt({ network: bitcoin.networks[network] });

	const utxos = [{
	  txid: "35d712bb66237d31e03c07435c70c54d6741ba17cd848b4c58ab5d3eb9b48930",
	  //txid: "1be9d0c66d1eb6b810e96a2ba4a70ae2ab6c40f9bc2bd279edd5fd417cc06612",
	  index: 0,
	  amount: 100000 // Сумма в сатоши на UTXO
	}];

	  // Добавление UTXO как входа
	utxos.forEach(utxo => {
      psbt.addInput({
        hash: utxo.txid,
        index: utxo.index,
        // nonWitnessUtxo: Buffer.from('полный_hex_транзакции_предыдущего_выхода', 'hex'),
        witnessUtxo: {
          // script: Buffer.from("037994f6f30644b644882decfed866eeb57e92de678c51d2dfb687260d76fbab00", 'hex'),
          script: p2wpkh.output,
          value: utxo.amount,
        }
    });
	});


    psbt.addOutput({
        address: toAddress,
        value: amount,
    });

    psbt.signInput(0, keyPair);
    psbt.validateSignaturesOfInput(0, keyPair.publicKey);
    psbt.finalizeAllInputs();

    return psbt.extractTransaction().toHex();
}

// Пример создания Taproot транзакции
function createTaprootTransaction(network, privKey, toAddress, amount) {
    const keyPair = ECPair.fromPrivateKey(Buffer.from(priKey, 'hex'), { network: bitcoin.networks[network] });
    const { address } = bitcoin.payments.p2tr({ pubkey: keyPair.publicKey, network: bitcoin.networks[network] });

    const psbt = new bitcoin.Psbt({ network: bitcoin.networks[network] });
    // Добавление inputs и outputs
    psbt.addOutput({
        address: toAddress,
        value: amount,
    });

    // Добавление свидетельств и подписывание
    // Для Taproot потребуются дополнительные шаги, поддержка в библиотеке еще может быть ограничена

    return psbt.extractTransaction().toHex();
}

// Использование функций
const network = 'testnet'; // или 'bitcoin' для mainnet
const privateKey = 'cRfKFTWKX1EEDkpTJDAM6Gpphvewqbcei11Ab5gXZEZ6td1P4ZnB';
const recipientAddress = 'tb1q0w3he0d7pc7ugrs7n9wpldk5dpcfhvar7j6jgf';
const sendAmount = 10000; // сумма в сатоши

const segWitTransaction = createSegWitTransaction(network, privateKey, recipientAddress, sendAmount);
console.log('SegWit Transaction:', segWitTransaction);

const taprootTransaction = createTaprootTransaction(network, privateKey, recipientAddress, sendAmount);
console.log('Taproot Transaction:', taprootTransaction);

