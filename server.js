import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import checkCSRFToken from "./middlewares/csrfMiddleware.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

// Initialize CSRF middleware
const csrfProtection = csrf({ cookie: true });

//middelwares
app.use(checkCSRFToken);
app.use(cors());
app.use(cookieParser());
app.use(csrfProtection);
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

// Generate and send CSRF token to the client
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

//PORT
const PORT = process.env.PORT || 5000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
