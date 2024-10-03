import { model, Schema } from "mongoose";
import IUser from "./user/IUser";
import { removeUnconfirmedEmail } from "./user/userMethods";

const userSchema = new Schema<IUser>(
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
  },
);

// indexes
userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $exists: true },
    },
  },
);

// instance methods
userSchema.methods.removeUnconfirmedEmail = removeUnconfirmedEmail;

export const UserModel = model<IUser>("user", userSchema);
