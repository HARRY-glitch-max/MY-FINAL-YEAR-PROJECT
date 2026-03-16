// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Employer from "../models/Employer.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Try to find the account in either collection
      let account = await User.findById(decoded.id).select("-password");
      if (!account) {
        account = await Employer.findById(decoded.id).select("-password");
      }

      if (!account) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      req.user = account;
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Employer-only middleware
export const employerProtect = async (req, res, next) => {
  // Run protect first
  await protect(req, res, async () => {
    // Check if account is an employer
    if (req.user.companyName || req.user.role === "employer") {
      return next();
    }
    return res.status(403).json({ message: "Access denied, employers only" });
  });
};
