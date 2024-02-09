const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
app.use(express.json());

const Product = require('./Models/product');

const sequelize = new Sequelize({
    dialect: 'mssql',
    server: 'localhost',
    database: 'Server',
    dialectOptions: {
        authentication: {
            type: 'default',
        },
        trustServerCertificate: true,
    },
});

(async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
})();

app.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.send(products);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).send('Error getting products');
    }
});

app.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            res.status(404).send('Product not found');
        } else {
            res.send(product);
        }
    } catch (error) {
        console.error('Error getting product by ID:', error);
        res.status(500).send('Error getting product by ID');
    }
});

app.post('/products', async (req, res) => {
    const { name, quantity, price } = req.body;
    try {
        const product = await Product.create({ name, quantity, price });
        res.status(201).send(product);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Error adding product');
    }
});

app.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, quantity, price } = req.body;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            res.status(404).send('Product not found');
        } else {
            await product.update({ name, quantity, price });
            res.send('Product updated successfully');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product');
    }
});

app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            res.status(404).send('Product not found');
        } else {
            await product.destroy();
            res.send('Product deleted successfully');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Error deleting product');
    }
});

const PORT = process.env.PORT || 1433;
app.listen(PORT, () => {
    console.log(`Node API app is running on port ${PORT}`);
});