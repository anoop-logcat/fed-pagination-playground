import DataLoader from "dataloader";
import { ProductByIdBatchFunc, ProductsByUserIdBatchFunc } from "../modules/product/product.loader";

const loaders = {
  productsByUserIdLoader: new DataLoader(ProductsByUserIdBatchFunc),
  productByIdLoader: new DataLoader(ProductByIdBatchFunc),
};

export function getLoaders() {
  return loaders;
}
