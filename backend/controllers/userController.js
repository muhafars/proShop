import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import { generateToken, generateData } from "../utils/generateToken.js";

// ~Desc    Auth User
// ~Route   Get /api/users/login
// ~Access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const isPasswordMatch = await user.matchPassword(password);

    if (isPasswordMatch) {
      generateToken(res, user._id);
      res.status(200).json(generateData(user));
      return; // Optional: Early return to avoid else block
    }
  }

  res.status(400);
  throw new Error("Invalid Email or Password");
});

// ~Desc    Register User
// ~Route   Post /api/users
// ~Access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(200).json(generateData(user));
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// ~Desc    Logout user /clear cookies
// ~Route   Post /api/users/logout
// ~Access  private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Out Successfully" });
});

// ~Desc    Get User Profile
// ~Route   Get /api/users/profile
// ~Access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json(generateData(user));
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// ~Desc    Update User Profile
// ~Route   Put /api/users/profile
// ~Access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();
    res.status(200).json(generateData(updatedUser));
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// ~Desc    Get Users
// ~Route   Get /api/users
// ~Access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get Users");
});

// ~Desc    Get User by Id
// ~Route   Get /api/users/:id
// ~Access  Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  res.send("Get User By Id");
});

// ~Desc    Delete User
// ~Route   Delete /api/users
// ~Access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete User");
});

// ~Desc    Update Users
// ~Route   Update /api/users/:id
// ~Access  Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  res.send("Update User ");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
