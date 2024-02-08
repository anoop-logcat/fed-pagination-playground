import DataLoader from "dataloader";
import { PostByIdBatchFunc, PostsByUserIdBatchFunc } from "../modules/post/post.loader";

const loaders = {
  postByIdLoader: new DataLoader(PostByIdBatchFunc),
  postsByUserIdBatchFunc: new DataLoader(PostsByUserIdBatchFunc),
};

export function getLoaders() {
  return loaders;
}
