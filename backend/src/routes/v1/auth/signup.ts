import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { UserModel } from "../../../models/User";
import { hashSync } from "bcrypt";
import { HASH_SALT_ROUNDS } from "../../../utils/constants";
import { randomUUID } from "crypto";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = matchedData(req);

    // email used to signup is already taken by a verified user
    const registedUser = await UserModel.findOne({
      email,
    });

    if (registedUser) {
      return res.status(409).json({
        errorKey: "userExists",
        message:
          "User with the same email is already registed on the platform.",
      });
    }

    // create email confirmaton expiration date as 24h after signup request
    const emailConfirmationCodeExpDate = new Date();
    emailConfirmationCodeExpDate.setHours(
      emailConfirmationCodeExpDate.getHours() + 24
    );

    // create new user
    const newUser = new UserModel({
      username,
      unconfirmedEmail: email,
      password: hashSync(password, HASH_SALT_ROUNDS),
      emailConfirmationCode: randomUUID(),
      emailConfirmationCodeExpDate,
    });
    await newUser.save();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errorKey: "serverError",
      message: "An error occured on user signup.",
    });
  }
};
