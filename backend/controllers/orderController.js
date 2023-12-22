import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";

//~ Desc : Create New Order
//~ Route : POST/api/orders
//~ Access : Private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send("add order items");
});
//~ Desc : Get Logged in User Orders
//~ Route : GET/api/orders/myorders
//~ Access : Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send("Get My Orders");
});
//~ Desc : Get Order by Id
//~ Route : GET /api/orders/:id
//~ Access : Private
const getOrderById = asyncHandler(async (req, res) => {
  res.send("Get Order By Id");
});
//~ Desc : Update Order to Paid
//~ Route : GET /api/orders/:id/pay
//~ Access : Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Update Order to Paid");
});
//~ Desc : Update Order to Delivered
//~ Route : GET /api/orders/:id/deliver
//~ Access : Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Update Order to Delivered");
});
//~ Desc : Get All Orders
//~ Route : GET /api/orders
//~ Access : Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("Get All Orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
