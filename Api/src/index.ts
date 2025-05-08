const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());

const cors = require("cors");
app.use(cors({
    origin: ['http://localhost:4200']
}));

const portNumber = 3000;

const filePath = 'src/people.json';

import { IProduct } from './models/IProduct';

let products: IProduct[] = [];

fs.readFile(filePath, (err, data) => {
    if (err) {
        console.error(`Unable to read file: ${filePath}`);
    } else {
        products = JSON.parse(data);
    }
});

app.get("/", (req, res) => {
    return res.status(200).json(products);
});

app.get("/:id", (req, res) => {
    let id = Number.parseInt(req.params.id);
    let person = products.find(p => p.id === id);
    if (person) {
        return res.status(200).json(person)
    }
    return res.status(404).json({message: `Person with id: ${id} not found.`})
});

app.post("/", (req, res) => {
    if (req.body) {
        let newPerson: IProduct = req.body;
        //if(!newPerson || !newPerson.firstName || !newPerson.lastName || !newPerson.emailAddress || !newPerson.phoneNumber) {
        //    return res.status(500).json({message: 'Missing data.'});
        //}

        let id = getId()
        newPerson.id = id;
        products.push(newPerson);
        return res.status(200).json({message: `Person with id: ${id} was added.`});
    } else {
        return res.status(500).json({message: 'No Person object was provided.'});
    }
});

app.delete("/:id", (req, res) => {
    let id = Number.parseInt(req.params.id);
    let personIndex = products.findIndex(p => p.id === id);
    if (personIndex >= 0) {
        products.splice(personIndex, 1);
        return res.status(200).json({message: `Person with id: ${id} was deleted.`});
    }
    return res.status(404).json({message: `Person with id: ${id} was not found.`});
});

server.listen(portNumber, (req, res) => {
    console.log(`Express server running on port ${portNumber}`);
});

/**
 * Get first unused integer ID.
 */
function getId() {
    let id = 1;
    while(people.find(p => p.id === id)) {
        id++;
    }

    return id;
}