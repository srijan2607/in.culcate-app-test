// app.js

require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const prisma = require("./db/connect");

// Routers
const article = require("./routers/article");
const auth = require("./routers/auth");
const home_page = require("./routers/home_page");
const Authentication = require("./middleware/authentication");

// Security Packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Middleware
app.set("trust proxy", 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Routes Middleware
app.use("/api/consumer/v1/article", Authentication, article);
app.use("/api/consumer/v1/auth", auth);
app.use("/api/consumer/v1/home_page", home_page);

// Server Port
const port = process.env.PORT || 6006;

const start = async () => {
  try {
    await prisma.$connect();
    app.listen(port, () =>
      console.log(`Server is listening on http://localhost:${port}`)
    );
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

start();
