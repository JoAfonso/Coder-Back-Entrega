import { promises as fs } from 'fs';

const path = './src/data/products.json';

class ProductManager {
    constructor() {
        this.path = path;
    }

    async getProducts() {
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id);
    }

    async addProduct(product) {
        const products = await this.getProducts();

        const codeExists = products.some(p => p.code === product.code);
        if (codeExists) {
            throw new Error(`Produto com código ${product.code} já existe.`);
        }

        const newProduct = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            status: true,
            ...product
        };

        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products, null, 2));

        return newProduct;
    }

    async updateProduct(id, updates) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);

        if (index === -1) throw new Error('Produto não encontrado');

        if ('id' in updates) delete updates.id;

        products[index] = { ...products[index], ...updates };

        await fs.writeFile(this.path, JSON.stringify(products, null, 2));

        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const filtered = products.filter(p => p.id !== id);

        if (products.length === filtered.length) {
            throw new Error('Produto não encontrado');
        }

        await fs.writeFile(this.path, JSON.stringify(filtered, null, 2));
    }
}

export default ProductManager;
