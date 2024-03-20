import sequelize from '../database/sequelize';
import { Wallet, Transaction } from '../models';
import { Transaction as SequelizeTransaction } from 'sequelize';

const WalletService = {
    async getAllWallets(): Promise<Wallet[]> {
        const wallets = await Wallet.findAll()
        return wallets
    },

    async createWallet(amount: number): Promise<Wallet | null> {
        try {
            const wallet = await Wallet.create({ balance: amount });
            await Transaction.create({ amount, type: 'initial', walletId: wallet.id });
            const walletWithTransaction = await Wallet.findByPk(wallet.id, { include: Transaction });
            return walletWithTransaction;
        } catch (error) {
            console.error('Error creating wallet:', error);
            return null;
        }
    },


    async credit(walletId: number, amount: number, transaction?: SequelizeTransaction) {
        const wallet = await Wallet.findByPk(walletId, { transaction: transaction || null });
        if (!wallet) {
            throw new Error('Wallet not found');
        }

        return sequelize.transaction(async (t) => {
            await wallet.update({ balance: sequelize.literal(`balance + ${amount}`) }, { transaction: t });
            await Transaction.create({ amount, type: 'credit', walletId }, { transaction: t });

            // Fetch wallet again to ensure the latest balance
            return Wallet.findByPk(walletId, { transaction: t });
        });
    },

    async debit(walletId: number, amount: number, transaction?: SequelizeTransaction) {
        const wallet = await Wallet.findByPk(walletId, { transaction: transaction || null });
        if (!wallet) {
            throw new Error('Wallet not found');
        }

        if (wallet.balance < amount) {
            throw new Error('Insufficient funds');
        }

        return sequelize.transaction(async (t) => {
            await wallet.update({ balance: sequelize.literal(`balance - ${amount}`) }, { transaction: t });
            await Transaction.create({ amount, type: 'debit', walletId }, { transaction: t });

            // Fetch wallet again to ensure the latest balance
            return Wallet.findByPk(walletId, { transaction: t });
        });
    },

    async getBalance(walletId: number) {
        const wallet = await Wallet.findByPk(walletId);
        if (!wallet) {
            throw new Error('Wallet not found');
        }

        return wallet.balance;
    },
};

export default WalletService;
