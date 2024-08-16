"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.port || 3000;
const products = [{ title: "tomato" }, { title: "orange" }];
const addresses = [{ value: "Hüttenberg 6" }, { value: "Schillerstr. 25" }];
app.get('/products', (req, res) => {
    res.send(products);
});
app.get('/addresses', (req, res) => {
    res.send(addresses);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
