import { Schema } from "mongoose";
import { User } from "../types/User";

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: false,
    },
    unconfirmedEmail: {
      type: String,
      required: false,
    },
    emailConfirmationCode: {
      type: String,
      required: false,
    },
    emailConfirmationCodeExpDate: {
      type: Date,
      required: false,
    },
    passwordResetCode: {
      type: String,
      required: false,
    },
    passwordResetCodeExpDate: {
      type: Date,
      required: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);