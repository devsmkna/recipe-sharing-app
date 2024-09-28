import { body } from "express-validator";

export const signupValidationChain = [
  body("username")
    .notEmpty()
    .trim()
    .toLowerCase()
    .withMessage("username is required"),
  body("email")
    .notEmpty()
    .isEmail()
    .trim()
    .toLowerCase()
    .withMessage("email is required and respect the email format"),
  body("password")
    .notEmpty()
    .isStrongPassword({
      minSymbols: 0,
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
    })
    .withMessage(
      "password is required and must be long at least 8 characters, with at least one lower case character, one upper case and one number."
    ),
];