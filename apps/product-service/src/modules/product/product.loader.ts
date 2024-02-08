import { parseQuery } from "@hubspire/cache-directive";
import { Types } from "mongoose";
import { UserProductsArgs } from "../../libs/types";
import { IProductDocument, ProductModel } from "./product.model";
import { UserProductModel } from "./userProduct.model";

export async function ProductByIdBatchFunc(ids: readonly string[]) {
  const products = await ProductModel.find({
    _id: {
      $in: ids,
    },
  });
  return ids.map((id: string) => products.find((product: IProductDocument) => String(product._id.valueOf()) === id));
}

type TProductsByUserIdBatchFunc = {
  userId: string;
  args: UserProductsArgs;
};
export async function ProductsByUserIdBatchFunc(ids: readonly TProductsByUserIdBatchFunc[]) {
  const userIds = ids.map((id) => new Types.ObjectId(id.userId));
  const limit = ids[0].args.limit || 10;
  const offset = ids[0].args.offset || 0;
  const sort = ids[0].args.sort;
  const filter = ids[0].args.filter;

  const products = await UserProductModel.aggregate([
    {
      $match: {
        userId: { $in: userIds },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "products",
        pipeline: [
          {
            $match: { ...parseQuery(filter) },
          },
          { $sort: sort || { createdDate: -1 } },
        ],
      },
    },
    {
      $unwind: {
        path: "$products",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $group: {
        _id: "$userId",
        products: { $push: "$products" },
      },
    },
    {
      $project: {
        _id: 0,
        userId: "$_id",
        products: { $slice: ["$products", offset, limit] },
      },
    },
  ]);

  const productsByUserId: Record<string, IProductDocument[]> = {};
  products.forEach((o) => {
    if (!productsByUserId[o.userId]) productsByUserId[o.userId] = [];
    productsByUserId[o.userId].push(...o.products);
  });
  return ids.map((id) => productsByUserId[id.userId] || []);
}
