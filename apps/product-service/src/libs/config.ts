import { UserProductByIdBatchFunc } from "../modules/userProduct/userProduct.loader";
import { ProductByIdBatchFunc } from "../modules/product/product.loader";
import DataLoader from "dataloader";

const loaders = {
  userProductByIdLoader: new DataLoader(UserProductByIdBatchFunc),
  productByIdLoader: new DataLoader(ProductByIdBatchFunc),
};

export function getLoaders() {
  return loaders;
}
