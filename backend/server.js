import express from "express";
import dotenv from "dotenv";
const app = express();
const port = process.env.PORT || 5000;
import products from "./data/products.js";

dotenv.config();

app.get("/", (req, res) => {
  res.send("API Page , please use it wisely");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () =>
  console.log(`Server is Running in ${process.env.NODE_ENV} on port ${port}`)
);
