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

// @desc    REGISTER USER
// @route   POST /api/users
// @access  public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUserChecker = await User.findOne({ email });

  if (existingUserChecker) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const createUser = await User.create({
    name,
    email,
    password,
  });

  if (createUser) {
    res.status(201).json({
      _id: createUser._id,
      name: createUser.name,
      email: createUser.email,
      isAdmin: createUser.isAdmin,
      token: generateJWT(createUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Cant Retrieve Data , User Not Found");
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

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

export { authUser, getUserProfile, registerUser, getAllUsers };
