import { Router } from 'express';
import walletController from '../controllers/walletController';

const router = Router();

router.post('/wallet/create', walletController.createWallet);
router.post('/wallet/:walletId/credit', walletController.credit);
router.post('/wallet/:walletId/debit', walletController.debit);
router.get('/wallet/:walletId/balance', walletController.getBalance);
router.get('/wallets/', walletController.getAllWallets);

export default router;
