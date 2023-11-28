import express from "express";
import dotenv from "dotenv";
dotenv.config();
import color from "colors";
import dbConnect from "./config/db.js";
import products from "./data/products.js";
const port = process.env.PORT || 3002;
const app = express();

dbConnect();
app.get("/", (req, res) => {
  res.send("API is Running ....");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
});

const rootApi = `http://localhost:${port}`.green.inverse;
const productApi = `http://localhost:${port}/api/products`.green.inverse;
app.listen(port, () =>
  console.log(
    `Server is Running on: \t${rootApi}`.yellow,
    `\nServer Product is Running on: \t${productApi}`.yellow
  )
);
