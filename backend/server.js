import express from "express";
import dotenv from "dotenv";
dotenv.config();
import color from "colors";
import dbConnect from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import productRoutes from "./routes/productRouter.js";
const port = process.env.PORT || 3002;
const app = express();

dbConnect();
app.get("/", (req, res) => {
  res.send("API is Running ....");
});

app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

const rootApi = `http://localhost:${port}`.green.inverse;
const productApi = `http://localhost:${port}/api/products`.cyan.inverse;
app.listen(port, () =>
  console.log(
    `Server is Running on: \t${rootApi}`,
    `\nServer Product is Running on: \t${productApi}`
  )
);
