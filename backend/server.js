import express from "express";
import dotenv from "dotenv";
dotenv.config();
import color from "colors";
import dbConnect from "./config/db.js";
import productRoutes from "./routes/productRouter.js";
const port = process.env.PORT || 3002;
const app = express();

dbConnect();
app.get("/", (req, res) => {
  res.send("API is Running ....");
});

app.use("/api/products", productRoutes);

const rootApi = `http://localhost:${port}`.green.inverse;
const productApi = `http://localhost:${port}/api/products`.green.inverse;
app.listen(port, () =>
  console.log(
    `Server is Running on: \t${rootApi}`.yellow,
    `\nServer Product is Running on: \t${productApi}`.yellow
  )
);
