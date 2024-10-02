import { Document } from "mongoose";
import { User } from "../../types/User";

interface IUser extends Omit<User, "id">, Document {
  removeUnconfirmedEmail(): Promise<IUser>;
}

export default IUser;
