const mongoose = require('mongoose')


const walletSchema = new mongoose.Schema(
  {
    Wallet: String,
    Address: String,
   
  }
);

module.exports = mongoose.model('Wallets', walletSchema)

