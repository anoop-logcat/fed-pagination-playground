import { Document, Model, Schema, Types, model } from "mongoose";

type IUserProduct = {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  isFav: boolean;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface IUserProductDocument extends IUserProduct, Document {}

export interface IUserProductModel extends Model<IUserProductDocument> {}

const UserProductSchema = new Schema<IUserProductDocument, IUserProductModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
    },
    isFav: {
      type: Boolean,
      required: false,
      unique: false,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserProductModel = model<IUserProductDocument, IUserProductModel>("userProducts", UserProductSchema);
