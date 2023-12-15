import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

//~ Desc : Fetch All Product
//~ Route : Get/api/products
//~ Access : Public
const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//~ Desc : Fetch a Product
//~ Route : Get/api/products/:id
//~ Access : Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Resource not Found");
});

export { getProduct, getProductById };
