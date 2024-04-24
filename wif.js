const bitcoin = require('bitcoinjs-lib');
const { ECPairFactory } = require('ecpair');
const tinysecp = require('tiny-secp256k1');

const ECPair = ECPairFactory(tinysecp);

function generateSegWitAddress(networkType) {
    // Выбор сети: 'bitcoin' для mainnet и 'testnet' для тестовой сети
    const network = bitcoin.networks[networkType];

    // Генерация случайного приватного ключа
    const keyPair = ECPair.makeRandom({ network });
    const { address } = bitcoin.payments.p2wpkh({
        pubkey: keyPair.publicKey,
        network,
    });

    // Экспорт приватного ключа в формате WIF (Wallet Import Format)
    const wif = keyPair.toWIF();

    return { wif, address, publicKey: keyPair.publicKey };
}

// Пример использования функции для тестовой сети
const { wif, address, publicKey } = generateSegWitAddress('testnet');
console.log('Приватный ключ (WIF):', wif);
console.log('Public key', publicKey);
console.log('Биткоин адрес:', address);

