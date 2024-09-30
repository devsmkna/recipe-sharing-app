import { body } from "express-validator";

export const signupValidationChain = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .trim()
    .toLowerCase(),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email")
    .trim()
    .toLowerCase(),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isStrongPassword({
      minSymbols: 0,
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
    })
    .withMessage(
      "password must be long at least 8 characters, with at least one lower case character, one upper case and one number."
    ),
];
