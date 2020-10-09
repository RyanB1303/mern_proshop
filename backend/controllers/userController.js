import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateJWT from "../utils/generateJWT.js";

// @desc    AUTH USER & GET TOKEN
// @route   POST /api/users/login
// @access  public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateJWT(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc    GET USER PROFILE
// @route   GET /api/users/profile
// @access  private (protected)
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User Not Found");
  }
});

export { authUser, getUserProfile };
