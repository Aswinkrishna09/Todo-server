import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "jwtSecret", {
    expiresIn: "28d",
  });
};

export default generateToken;
