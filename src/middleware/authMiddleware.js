// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Employer from "../models/Employer.js";
import Admin from "../models/Admin.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check all collections
      let account =
        await User.findById(decoded.id).select("-password") ||
        await Employer.findById(decoded.id).select("-password") ||
        await Admin.findById(decoded.id).select("-password");

      if (!account) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      req.user = account;

      // Identify account type by model
      if (account.constructor.modelName === "Admin") {
        req.user.accountType = "admin";
      } else if (account.constructor.modelName === "Employer") {
        req.user.accountType = "employer";
      } else {
        req.user.accountType = "user";
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

// Employer-only middleware
export const employerProtect = async (req, res, next) => {
  await protect(req, res, async () => {
    if (req.user.accountType === "employer") {
      return next();
    }
    return res.status(403).json({ message: "Access denied, employers only" });
  });
};

// Admin-only middleware
export const adminProtect = async (req, res, next) => {
  await protect(req, res, async () => {
    if (req.user.accountType === "admin") {
      return next();
    }
    return res.status(403).json({ message: "Access denied, admins only" });
  });
};
