import { promises as fs } from 'fs';
import { socketServer } from '../server.js';

class ProductManager {
  constructor() {
    this.path = './src/data/products.json';
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async addProduct(product) {
    const products = await this.getProducts();

    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      status: true,
      ...product
    };

    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));

    socketServer.emit('productsUpdated', products);

    return newProduct;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const updated = products.filter(p => p.id !== id);
    await fs.writeFile(this.path, JSON.stringify(updated, null, 2));

    socketServer.emit('productsUpdated', updated);
  }

  async getProductById(id) {
  const products = await this.getProducts();
  return products.find(p => p.id === id);
}

async updateProduct(id, newData) {
  const products = await this.getProducts();
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    throw new Error('Produto não encontrado');
  }

  // Impede alterar o ID
  delete newData.id;

  const updatedProduct = {
    ...products[index],
    ...newData
  };

  products[index] = updatedProduct;

  await fs.writeFile(this.path, JSON.stringify(products, null, 2));

  // Atualiza a lista em tempo real
  socketServer.emit('productsUpdated', products);

  return updatedProduct;
}

}

export default ProductManager;
