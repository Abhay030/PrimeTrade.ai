const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger");
const { errorHandler } = require("./middleware/errorHandler");

// Route imports
const authRoutes = require("./modules/auth/auth.routes");
const taskRoutes = require("./modules/tasks/tasks.routes");
const adminRoutes = require("./modules/admin/admin.routes");

const app = express();

// --- Global Middleware ---
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

// Rate limit auth endpoints to prevent brute-force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, try again later" },
});
app.use("/api/v1/auth", authLimiter);

// --- API Documentation ---
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- API Routes (v1) ---
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/admin", adminRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Centralized error handler
app.use(errorHandler);

module.exports = app;
