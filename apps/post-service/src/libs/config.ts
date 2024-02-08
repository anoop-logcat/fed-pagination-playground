import { PostByIdBatchFunc } from "../modules/post/post.loader";
import DataLoader from "dataloader";

const loaders = {
  postByIdLoader: new DataLoader(PostByIdBatchFunc),
};

export function getLoaders() {
  return loaders;
}
