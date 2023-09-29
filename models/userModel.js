import mongoose from "mongoose";
import validate from "validate.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Custom validation using validate.js
userSchema.pre("validate", function (next) {
  const constraints = {
    email: {
      email: {
        message: "is not a valid email address",
      },
    },
    phone: {
      format: {
        pattern: /^(?:\+94|0)[1-9][0-9]{8}$/, // Standard Sri Lankan phone number format
        message: "should be a valid Sri Lankan phone number",
      },
    },
  };

  const errors = validate(this.toObject(), constraints);
  if (errors) {
    const validationErrors = {};
    errors.forEach((error) => {
      validationErrors[error.attribute] = error.options.message;
    });
    return next(new Error(JSON.stringify(validationErrors)));
  }

  next();
});

export default mongoose.model("User", userSchema);
