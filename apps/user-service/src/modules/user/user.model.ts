import { Document, Model, Schema, model, Types } from "mongoose";

type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  lastLoggedIn: Date;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}

const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    firstName: {
      type: String,
      required: true,
      unique: false,
    },
    lastName: {
      type: String,
      required: false,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    lastLoggedIn: {
      type: Date,
      required: false,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUserDocument, IUserModel>("users", UserSchema);
