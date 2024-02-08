import DataLoader from "dataloader";
import { UserByIdBatchFunc, UsersByProductIdBatchFunc } from "../modules/user/user.loader";

const loaders = {
  userByIdLoader: new DataLoader(UserByIdBatchFunc),
  usersByProductIdLoader: new DataLoader(UsersByProductIdBatchFunc),
};

export function getLoaders() {
  return loaders;
}
