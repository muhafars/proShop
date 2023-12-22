import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";

//~ Desc : Create New Order
//~ Route : POST/api/orders
//~ Access : Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new order({
      orderItems: orderItems.map(x => ({
        ...x,
        product: x_id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//~ Desc : Get Logged in User Orders
//~ Route : GET/api/orders/myorders
//~ Access : Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});
//~ Desc : Get Order by Id
//~ Route : GET /api/orders/:id
//~ Access : Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error("Order not Found");
  }
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
  const orders = await Order.find({});
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
