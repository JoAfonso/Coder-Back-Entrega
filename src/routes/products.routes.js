import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager();

router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.json(products);
});

router.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await manager.getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Produto não encontrado' });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = await manager.addProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    try {
        const updated = await manager.updateProduct(id, req.body);
        res.json(updated);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    try {
        await manager.deleteProduct(id);
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
