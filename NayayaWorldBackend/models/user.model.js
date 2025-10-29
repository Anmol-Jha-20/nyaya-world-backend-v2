// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema(
//   {
//     category: {
//       type: String,
//       required: [true, "Please select a category"],
//       trim: true,
//     },
//     fullName: {
//       type: String,
//       required: [true, "Please provide full name"],
//       trim: true,
//     },
//     parentOrganization: {
//       type: String,
//       trim: true,
//       default: "",
//     },
//     designation: {
//       type: String,
//       trim: true,
//       default: "",
//     },
//     city: {
//       type: String,
//       required: [true, "Please provide city"],
//       trim: true,
//     },
//     state: {
//       type: String,
//       required: [true, "Please provide state"],
//       trim: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: [true, "Please provide phone number"],
//       unique: true,
//       match: [/^[0-9]{10}$/, "Please provide a valid 10-digit phone number"],
//     },
//     email: {
//       type: String,
//       required: [true, "Please provide email"],
//       unique: true,
//       lowercase: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         "Please provide a valid email",
//       ],
//     },
//     address: {
//       type: String,
//       required: [true, "Please provide address"],
//       trim: true,
//     },
//     professionalDescription: {
//       type: String,
//       trim: true,
//       default: "",
//     },
//     profileImage: {
//       type: String,
//       default: "",
//     },
//     password: {
//       type: String,
//       required: [true, "Please provide password"],
//       minlength: 6,
//       select: false,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// // Compare password method
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Please select a category"],
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Please provide full name"],
      trim: true,
    },
    parentOrganization: {
      type: String,
      trim: true,
      default: "",
    },
    designation: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      required: [true, "Please provide city"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "Please provide state"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide phone number"],
      unique: true,
      match: [/^[0-9]{10}$/, "Please provide a valid 10-digit phone number"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    address: {
      type: String,
      required: [true, "Please provide address"],
      trim: true,
    },
    professionalDescription: {
      type: String,
      trim: true,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      select: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate email verification token
userSchema.methods.generateEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
