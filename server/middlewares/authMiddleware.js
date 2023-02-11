import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UsersModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //token = req.header("auth-token");
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, "jwtSecret");
      req.user = await User.findById(decode.id).select("-password");
      //req.user['token'] = token;
      console.log("call", decode.id)
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, failed token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const admin = asyncHandler(async (req, res, next) => {
  console.log("user is ", req.user);
  console.log("user isAdmin ", req.user.isAdmin);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as Admin");
  }
});
