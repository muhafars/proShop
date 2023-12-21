import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// ~Desc    Auth User
// ~Route   Get /api/users/login
// ~Access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const checkPass = await user.matchPassword(password);

  if (user && checkPass) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30D",
    });

    //Set jwt http cookie only
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// ~Desc    Register User
// ~Route   Post /api/users
// ~Access  Public

const registerUser = asyncHandler(async (req, res) => {
  res.send("Register User");
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
  res.send("Get User Profile");
});

// ~Desc    Update User Profile
// ~Route   Put /api/users/profile
// ~Access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update User Profile");
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
