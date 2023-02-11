import User from "../models/UsersModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";


export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.verifyPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      error:0,
      msg:"Login Success"
    });
  } else {
    res.status(200).json({ msg: "Invalid email or password!",error:1 });
    throw new Error("Invalid email or password!");
  }
});


export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(200).json({msg:'User already exists with same email! Use another Email',error:1});
    throw new Error("User already exists with same email! Use another Email");
  }

  const newUser = new User({
    email,
    name,
    password,
  });

  const user = await newUser.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      msg:'Register success',error:0
    });
  } else {
    res.status(401);
    throw new Error("Error occured");
  }
});


export const AddTodo = asyncHandler(async (req, res) => {
  const { taskname, comment, date } = req.body;
  const user = await User.findOne({ id: req.user.id });
  user.todos.push({
    id: user.todos.length + 1,
    taskname,
    comment,
    date,
  });
  await user.save();
  res.status(200).json(user.todos);
});

export const getTodo = asyncHandler(async (req, res) => {
  const user = await User.findOne({ id: req.user.id });
  user.todos.sort(function (a, b) {
    var aa = a.date.toLocaleDateString().split("/").reverse().join();
    var bb = b.date.toLocaleDateString().split("/").reverse().join();
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
  res.status(200).json(user.todos.reverse());
});
