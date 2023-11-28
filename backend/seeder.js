import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import user from "./data/users.js";
import products from "./data/productsNoId.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import dbConnect from "./config/db.js";
dotenv.config();
dbConnect();

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(user);
    const adminUsers = createdUsers[0]._id;
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUsers };
    });
    await Product.insertMany(sampleProducts);
    console.log(`Data Imported:`.green.inverse);
    process.exit(1);
  } catch (err) {
    console.error(`${err.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log(`Data Destroyed:`.red.inverse);
    process.exit(1);
  } catch (err) {
    console.error(`${err.message}.red.inverse`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
// node backend/seeder -d //this command will delete data
// node backend/seeder //this will import data
