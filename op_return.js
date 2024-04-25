const bitcoin = require('bitcoinjs-lib');

// Вставьте сюда сырой hex вашей транзакции
const rawTransaction = '020000000001013089b4b93e5dab584c8b84cd17ba41674dc5705c43073ce0317d2366bb12d7350000000000ffffffff010000000000000000286a26d092d0b0d188d0b820d0b4d0b0d0bdd0bdd18bd0b520d0bed180d0b4d0b8d0bdd0b0d0bbd0b0024830450221009425751663ff024fa00afffc405c4641a238e767d03f672ad08cbd6b9c112c0302207baaf3f8886994918ed8b5b653fd1b601449b2d4026e0ead817572f415977c75012102e5e0efebec5a575c406269f1981e46c543156de62ca6bbf97212ddd1acbd47d300000000';

// Декодирование транзакции
const transaction = bitcoin.Transaction.fromHex(rawTransaction);

// Поиск OP_RETURN данных
const outputs = transaction.outs;
outputs.forEach((out, index) => {
  const script = bitcoin.script.decompile(out.script);
  if (script && script[0] === bitcoin.opcodes.OP_RETURN) {
    const opReturnData = script[1].toString('utf8');
    console.log(`Data in OP_RETURN at output ${index}:`, opReturnData);
  }
});
