import { parseQuery } from "@hubspire/cache-directive";
import { Types } from "mongoose";
import { ProductUsersArgs } from "../../libs/types";
import { IUserDocument, UserModel } from "./user.model";
import { UserProductModel } from "./userProduct.model";

export async function UserByIdBatchFunc(ids: readonly string[]) {
  const users = await UserModel.find({
    _id: {
      $in: ids,
    },
  });
  return ids.map((id: string) => users.find((user: IUserDocument) => String(user._id.valueOf()) === id));
}

type TUsersByProductIdBatchFunc = {
  productId: string;
  args: ProductUsersArgs;
};
export async function UsersByProductIdBatchFunc(ids: readonly TUsersByProductIdBatchFunc[]) {
  const productIds = ids.map((id) => new Types.ObjectId(id.productId));
  const limit = ids[0].args.limit || 10;
  const offset = ids[0].args.offset || 0;
  const sort = ids[0].args.sort;
  const filter = ids[0].args.filter;

  const users = await UserProductModel.aggregate([
    {
      $match: {
        productId: { $in: productIds },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "users",
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
        path: "$users",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $group: {
        _id: "$productId",
        users: { $push: "$users" },
      },
    },
    {
      $project: {
        _id: 0,
        productId: "$_id",
        users: { $slice: ["$users", offset, limit] },
      },
    },
  ]);

  const usersByProductId: Record<string, IUserDocument[]> = {};
  users.forEach((o) => {
    if (!usersByProductId[o.productId]) usersByProductId[o.productId] = [];
    usersByProductId[o.productId].push(...o.users);
  });
  return ids.map((id) => usersByProductId[id.productId] || []);
}
