import DataLoader from "dataloader";
import { ProductByIdBatchFunc, ProductByUserIdBatchFunc } from "../modules/product/product.loader";

const loaders = {
  productByUserIdLoader: new DataLoader(ProductByUserIdBatchFunc),
  productByIdLoader: new DataLoader(ProductByIdBatchFunc),
};

export function getLoaders() {
  return loaders;
}
