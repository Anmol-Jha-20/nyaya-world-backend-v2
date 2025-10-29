// const express = require("express");
// const router = express.Router();
// const {
//   register,
//   login,
//   logout,
//   getMe,
// } = require("../controllers/auth.controllers.js");
// const { protect } = require("../middleware/auth.js");

// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);
// router.get("/me", protect, getMe);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  register,
  verifyEmail,
  resendVerification,
  login,
  forgotPassword,
  resetPassword,
  logout,
  getMe,
} = require("../controllers/auth.controllers.js");
const { protect } = require("../middleware/auth.js");

// Registration & Verification
router.post("/register", register);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerification);

// Login & Logout
router.post("/login", login);
router.post("/logout", logout);

// Password Reset
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// Protected Routes
router.get("/me", protect, getMe);

module.exports = router;
