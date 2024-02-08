import { parseQuery } from "@hubspire/cache-directive";
import { Types } from "mongoose";
import { UserPostsArgs } from "../../libs/types";
import { IPostDocument, PostModel } from "./post.model";

export async function PostByIdBatchFunc(ids: readonly string[]) {
  const posts = await PostModel.find({
    _id: {
      $in: ids,
    },
  });
  return ids.map((id: string) => posts.find((post: IPostDocument) => String(post._id.valueOf()) === id));
}

type TPostsByUserIdBatchFunc = {
  userId: string;
  args: UserPostsArgs;
};
export async function PostsByUserIdBatchFunc(ids: readonly TPostsByUserIdBatchFunc[]) {
  const userIds = ids.map((id) => new Types.ObjectId(id.userId));
  const limit = ids[0].args.limit || 10;
  const offset = ids[0].args.offset || 0;
  const sort = ids[0].args.sort;
  const filter = ids[0].args.filter;

  const posts = await PostModel.aggregate([
    {
      $match: {
        createdBy: { $in: userIds },
        ...parseQuery(filter),
      },
    },
    { $sort: sort || { createdDate: -1 } },
    {
      $group: {
        _id: "$createdBy",
        posts: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 0,
        createdBy: "$_id",
        posts: { $slice: ["$posts", offset, limit] },
      },
    },
  ]);

  const postsByUserId: Record<string, IPostDocument[]> = {};
  posts.forEach((o) => {
    if (!postsByUserId[o.createdBy]) postsByUserId[o.createdBy] = [];
    postsByUserId[o.createdBy].push(...o.posts);
  });
  return ids.map((id) => postsByUserId[id.userId] || []);
}
