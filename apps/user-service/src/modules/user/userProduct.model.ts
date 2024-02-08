import { Document, Model, Schema, Types, model } from "mongoose";

type IUserProduct = {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface IUserProductDocument extends IUserProduct, Document {}

export interface IUserProductModel extends Model<IUserProductDocument> {}

const UserProductSchema = new Schema<IUserProductDocument, IUserProductModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
      index: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserProductModel = model<IUserProductDocument, IUserProductModel>("_user_products", UserProductSchema);
