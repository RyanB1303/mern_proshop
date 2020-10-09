import jwt from "jsonwebtoken";

// this is method to sign the given user_id with jwt_secret to generate TOKEN
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // expiresin are optional, feel free to delete it, or change to 2d, 365d, 3h
  });
};

export default generateJWT;
