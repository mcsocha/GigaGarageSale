import { IProduct } from '../../shared/i-product';
import { IReservationRequest } from '../../shared/i-reservation-request';

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



let products: IProduct[] = [];

fs.readFile(filePath, (err, data) => {
    if (err) {
        console.error(`Unable to read file: ${filePath}`);
    } else {
        products = JSON.parse(data);
    }
});

/**
 * Returns a list of product details.
 */
app.get("/api/products", (req, res) => {
    return res.status(200).json(products);
});

/**
 * Returns a product with the specified id.
 */
app.get("/api/products/:id", (req, res) => {
    let id = Number.parseInt(req.params.id);
    let product = products.find(p => p.id === id);
    if (product) {
        return res.status(200).json(product)
    }
    return res.status(404).json({ message: `Product with id: ${id} not found.` })
});

/**
 * Reserves or releases a quantity of product from available inventory.
 */
app.patch("/api/products/reserve/:id", (req, res) => {
    let id = Number.parseInt(req.params.id);
    let product: IProduct = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ message: `Product with id: ${id} not found.` })
    }

    let resReq: IReservationRequest = req.body;
    let qty = Math.trunc(resReq.quantity);

    if (!qty || qty < 1) {
        return res.status(400).json({ message: 'Invalid product quantity specifed for reservation.' });
    }

    if (resReq.reserve) {
        if (product.available < qty) {
            return res.status(500).json({ message: 'Insufficient quantity available for reservation.' });
        }
        product.available -= resReq.quantity;
    } else {
        product.available += qty;
    }

    console.log(`Product ${product.id} available quantity ${(resReq.reserve ? 'reduced' : 'increased')} to ${product.available}.`);
    return res.sendStatus(204);
});

server.listen(portNumber, (req, res) => {
    console.log(`Express server running on port ${portNumber}`);
});