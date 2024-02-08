import { UserByIdBatchFunc } from "../modules/user/user.loader";
import DataLoader from "dataloader";

const loaders = {
  userByIdLoader: new DataLoader(UserByIdBatchFunc),
};

export function getLoaders() {
  return loaders;
}
