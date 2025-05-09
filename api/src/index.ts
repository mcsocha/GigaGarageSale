import { IProduct } from '../../shared/i-product';

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

function resetProducts() {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Unable to read file: ${filePath}`);
        } else {
            products = JSON.parse(data);
        }
    });
}

resetProducts();

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

app.post("/api/products/reset", (req, res) => {
    resetProducts();
    console.log('Product inventory reset.');
    res.sendStatus(204);
});

server.listen(portNumber, (req, res) => {
    console.log(`Express server running on port ${portNumber}`);
});