import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const manager = new CartManager();

router.post('/', async (req, res) => {
    const cart = await manager.createCart();
    res.status(201).json(cart);
});

router.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid);
    const cart = await manager.getCartById(id);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: 'Carrinho não encontrado' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    try {
        const cart = await manager.addProductToCart(cartId, productId);
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
