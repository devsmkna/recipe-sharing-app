export type User = {
  /**
   * Username of the user.
   */
  username: string;
  /**
   * Password of the user. Used to login on the platform.
   */
  password: string;
  /**
   * Verified email of the user. Used to login on the platform. Can't exists users that login with the same email.
   */
  email?: string;
  /**
   * Unconfirmed email of the user. Used on first signin and on email change.
   * A user with only an uncofirmed email is a new user try to sign in on the platform.
   * A user with both email and uncofirmed email is a user trying to change email.
   */
  unconfirmedEmail?: string;
  /**
   * Confirmation code to verify the new email.
   */
  emailConfirmationCode?: string;
  /**
   * Confirmation code expiration date.
   * After this date the code is invalid and the user need to repeat the steps to receive a new email confirmation code.
   */
  emailConfirmationCodeExpDate?: Date;
  /**
   * Reset password code. Used to verify if a password reset request is lecit.
   */
  passwordResetCode?: string;
  /**
   * Password reset code expiration date.
   * After this date the code is invalid and the user need to repeat the steps to receive a new password reset code.
   */
  passwordResetCodeExpDate?: Date;
  /**
   * Virtual field. String rappresentation of the unique id of the user.
   */
  id?: string;
};
