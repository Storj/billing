const Coinpayments = require('coinpayments');
const log = require('../../logger');

const options = {
  key: process.env.CP_PUBLIC_KEY,
  secret: process.env.CP_PRIVATE_KEY
}

const client = new Coinpayments(options);

module.exports = client;
