import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
   // Get the JWT token from the 'authorization' header
    const token = req.headers.authorization;

    // If the 'authorization' header is missing, return a 401 Unauthorized response
    if (!token) {
      return res.status(401).json({ message: 'Authorization header is missing' });
  }
    // Verify the JWT token using the provided JWT_SECRET
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  }catch (error) {
    // Log the error for debugging purposes
    console.error(error);

    // If the error is a JsonWebTokenError, return a 401 Unauthorized response
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // If the error is a TokenExpiredError, return a 401 Unauthorized response
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }

    // Handle other unexpected errors with a 500 Internal Server Error response
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};