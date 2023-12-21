import jwt from "jsonwebtoken";

const generateToken = async (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30D",
  });

  //Set jwt http cookie only
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "Strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

const generateData = user => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  admin: user.isAdmin,
});
export { generateToken, generateData };
