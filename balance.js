const Client = require('bitcoin-core');

const balance = await new Client({ version: '0.15.1' }).getBalance({
  account: '*',
  minconf: 0
});
