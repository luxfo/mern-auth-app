import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    activated: {
      type: Boolean,
      default: false,
    },
    verification_code: {
      type: String,
    },
    password_reset: {
      type: String,
    },
    password_reset_at: {
      type: Date,
    },
    otp_enabled: {
      type: Boolean,
      default: false,
    },
    otp_verified: {
      type: Boolean,
      default: false,
    },
    otp_code: {
      type: String,
    },
    otp_url: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model("User", userSchema);
