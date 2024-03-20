import { Request, Response } from 'express';
import WalletService from '../services/walletService';

const walletController = {
    async getAllWallets(req: Request, res: Response) {
        try {

            const wallets = await WalletService.getAllWallets();
            res.json(wallets);
        } catch (error: any) { // Explicitly specify the type of error
            res.status(400).json({ error: error.message });
        }
    },
    async createWallet(req: Request, res: Response) {
        try {
            const amount = parseFloat(req.body.amount);

            const wallet = await WalletService.createWallet(amount);
            res.json(wallet);
        } catch (error: any) { // Explicitly specify the type of error
            res.status(400).json({ error: error.message });
        }
    },

    async credit(req: Request, res: Response) {
        try {
            const walletId = parseInt(req.params.walletId);
            const amount = parseFloat(req.body.amount);

            const wallet = await WalletService.credit(walletId, amount);
            res.json(wallet);
        } catch (error: any) { // Explicitly specify the type of error
            res.status(400).json({ error: error.message });
        }
    },

    async debit(req: Request, res: Response) {
        try {
            const walletId = parseInt(req.params.walletId);
            const amount = parseFloat(req.body.amount);

            const wallet = await WalletService.debit(walletId, amount);
            res.json(wallet);
        } catch (error: any) { // Explicitly specify the type of error
            res.status(400).json({ error: error.message });
        }
    },

    async getBalance(req: Request, res: Response) {
        try {
            const walletId = parseInt(req.params.walletId);
            const balance = await WalletService.getBalance(walletId);
            res.json({ balance });
        } catch (error: any) { // Explicitly specify the type of error
            res.status(400).json({ error: error.message });
        }
    },
};

export default walletController;
