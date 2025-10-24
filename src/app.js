// Import dependencies
import express from "express";
import dotenv from "dotenv";               // For loading environment variables from .env
import logger from "./config/logger.js";   // Custom logger (Winston)
import helmet from "helmet";               // Security middleware
import morgan from "morgan";               // HTTP request logger
import cookieParser from "cookie-parser";  // Parse cookies
import cors from "cors";                   // Handle cross-origin requests

// Initialize environment variables from .env file
dotenv.config();

// Create the Express app
const app = express();

// 🔰 MIDDLEWARE SECTION
// Middlewares are functions that run between receiving a request and sending a response.
// They can modify request/response objects, log data, enforce security, or handle errors.

// 1️⃣ Helmet – Security Headers
// Helmet adds standard HTTP headers that protect your app from well-known web vulnerabilities
// like XSS, clickjacking, MIME sniffing, etc.
app.use(helmet());

// 2️⃣ CORS – Cross-Origin Resource Sharing
// CORS allows your backend to be safely accessed from another domain (like a frontend app).
// Without this, browsers will block requests coming from a different origin.
app.use(cors());

// 3️⃣ JSON and URL Encoded Parsers
// These allow Express to understand JSON payloads and form data in incoming requests.
app.use(express.json()); // parses application/json
app.use(express.urlencoded({ extended: true })); // parses application/x-www-form-urlencoded

// 4️⃣ Cookie Parser
// Extracts and parses cookies from incoming requests, making them available under req.cookies.
app.use(cookieParser());

// 5️⃣ Morgan – HTTP Request Logging
// Morgan logs details about every HTTP request (method, URL, status, response time, etc.).
// Here we tell Morgan to format logs using the 'combined' preset
// and write the logs into our Winston logger instead of just printing to console.
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()), // pass logs into Winston
    },
  })
);

// 🛣️ Basic route
app.get("/", (req, res) => {
  logger.info("Hello from Acquisition"); // log custom message
  res.send("🚀 Welcome to your Express.js server!");
});

// 🧭 Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express API 👋" });
});

export default app;
