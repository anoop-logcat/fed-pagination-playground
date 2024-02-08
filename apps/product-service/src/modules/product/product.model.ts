import { Document, Model, Schema, model } from "mongoose";

type IProduct = {
  productName: string;
  productDescription: string;
  price: number;
  isAvailable: boolean;
} & Record<"createdAt" | "updatedAt", Readonly<Date>>;

export interface IProductDocument extends IProduct, Document {}

export interface IProductModel extends Model<IProductDocument> {}

const ProductSchema = new Schema<IProductDocument, IProductModel>(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    productDescription: {
      type: String,
      required: false,
      unique: false,
    },
    price: {
      type: Number,
      required: true,
      unique: false,
    },
    isAvailable: {
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

export const ProductModel = model<IProductDocument, IProductModel>("products", ProductSchema);
