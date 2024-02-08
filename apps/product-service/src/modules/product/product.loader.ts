import { IProductDocument, ProductModel } from "./product.model";

export async function ProductByIdBatchFunc(ids: readonly string[]) {
  const products = await ProductModel.find({
    _id: {
      $in: ids,
    },
  });
  return ids.map((id: string) => products.find((product: IProductDocument) => String(product._id.valueOf()) === id));
}
