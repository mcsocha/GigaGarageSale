const express = require("express");
const app = express();
app.use(express.static('public'));

const http = require("http");
const server = http.createServer(app);
const fs = require("fs");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

const cors = require("cors");
app.use(cors({
    origin: ['http://localhost:4200']
}));

const portNumber = 3000;

const filePath = 'src/products.json';

import { IProduct } from './models/IProduct';

let products: IProduct[] = [];

fs.readFile(filePath, (err, data) => {
    if (err) {
        console.error(`Unable to read file: ${filePath}`);
    } else {
        products = JSON.parse(data);
    }
});

app.get("/products", (req, res) => {
    return res.status(200).json(products);
});

app.get("/products:id", (req, res) => {
    let id = Number.parseInt(req.params.id);
    let product = products.find(p => p.id === id);
    if (product) {
        return res.status(200).json(product)
    }
    return res.status(404).json({ message: `Product with id: ${id} not found.` })
});

/**
 * Reserves a quantity of product for a shopping cart.
 */
app.patch("/products/reserve/:id", (req, res) => {
    let id = Number.parseInt(req.params.id);
    let product: IProduct = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ message: `Product with id: ${id} not found.` })
    }

    let qty: number = req.body;
    if (req.body || (!qty || qty < 1)) {
        return res.status(400).json({ message: 'Invalid product quantity specifed for reservation.' });
    }

    if (product.available < qty) {
        return res.status(500).json({ message: 'Insufficient quantity available for reservation.' });
    }

    product.available -= qty;
});

/**
 * Releases a quantity of product back to available inventory if removed from a shopping cart.
 */
app.patch("/products/release/:id", (req, res) => {
    let id = Number.parseInt(req.params.id);
    let product: IProduct = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ message: `Product with id: ${id} not found.` })
    }

    let qty: number = req.body;
    if (req.body || (!qty || qty < 1)) {
        return res.status(400).json({ message: 'Invalid product quantity specifed for release.' });
    }

    product.available += qty;
});



server.listen(portNumber, (req, res) => {
    console.log(`Express server running on port ${portNumber}`);
});