const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db/db.js");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// CORS middleware - Multiple origins support
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174", // agar aur local ports use kar rahe ho
  "https://nyaya-world-backend-v2.vercel.app", // agar frontend bhi deploy karna ho
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle OPTIONS requests explicitly
app.options("*", cors());

// CORS middleware
// app.use(
//   cors({
//     origin: "http://localhost:5173" || "*", // Your frontend URL
//     credentials: true,
//   })
// );

// Routes
app.use("/api/auth", require("./routes/auth.route.js"));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Registration API is running" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
