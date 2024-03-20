import Wallet from './wallet';
import Transaction from './transaction';

// Establish associations
Wallet.hasMany(Transaction, { foreignKey: 'walletId' });
Transaction.belongsTo(Wallet, { foreignKey: 'walletId' });


export { Wallet, Transaction };
