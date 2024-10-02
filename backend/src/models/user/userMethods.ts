import IUser from "./IUser";

export async function removeUnconfirmedEmail(this: IUser): Promise<IUser> {
  this.unconfirmedEmail = undefined;
  this.emailConfirmationCode = undefined;
  this.emailConfirmationCodeExpDate = undefined;
  return this.save();
}
