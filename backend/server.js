import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import color from "colors";
import dbConnect from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const port = process.env.PORT || 3002;
const app = express();

dbConnect();
app.get("/", (req, res) => {
  res.send("API is Running ....");
});

//body parser middlewaree
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
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
