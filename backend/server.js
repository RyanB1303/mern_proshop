import express from "express";
import dotenv from "dotenv";
import colors from "colors";
const app = express();
const port = process.env.PORT || 5000;
// import products from "./data/products.js";
import connectDB from "./config/database.js";
import productRoute from "./routes/productRoute.js";

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("API Page , please use it wisely");
});

app.use("/api/products", productRoute);

app.listen(port, () =>
  console.log(`Server is Running in ${process.env.NODE_ENV} on port ${port}`)
);
