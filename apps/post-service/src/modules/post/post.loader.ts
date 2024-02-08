import { IPostDocument, PostModel } from "./post.model";

export async function PostByIdBatchFunc(ids: readonly string[]) {
  const posts = await PostModel.find({
    _id: {
      $in: ids,
    },
  });
  return ids.map((id: string) => posts.find((post: IPostDocument) => String(post._id.valueOf()) === id));
}
