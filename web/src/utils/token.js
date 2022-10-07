import jwt from "jsonwebtoken";

const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (_err) {
    return null;
  }
};

export { decodeToken };
