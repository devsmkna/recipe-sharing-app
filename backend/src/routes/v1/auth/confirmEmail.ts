import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { UserModel } from "../../../models/User";
import { connection } from "mongoose";

const confirmEmail = async (req: Request, res: Response) => {
  try {
    const { code } = matchedData(req);
    const user = await UserModel.findOne({
      emailConfirmationCode: code,
    });

    // user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // code expired
    if (
      !user.emailConfirmationCodeExpDate ||
      new Date() > user.emailConfirmationCodeExpDate
    ) {
      return res.status(400).json({
        message: "Email confirmation code expired",
      });
    }

    await connection.transaction(async () => {
      // validate email
      user.email = user.unconfirmedEmail;
      await user.removeUnconfirmedEmail();

      // remove validated email from other user that are trying to use it as new email
      const otherUsers = await UserModel.find({
        unconfirmedEmail: user.email,
      });
      await Promise.all(
        otherUsers.map((user) => user.removeUnconfirmedEmail()),
      );
    });

    return res.status(200).json({
      message: "Confirmed user email",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errorKey: "serverError",
      message: "An error occured while validating user email",
    });
  }
};

export default confirmEmail;
