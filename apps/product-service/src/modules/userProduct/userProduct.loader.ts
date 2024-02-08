import { IUserProductDocument, UserProductModel } from "./userProduct.model";

export async function UserProductByIdBatchFunc(ids: readonly string[]) {
  const userProducts = await UserProductModel.find({
    _id: {
      $in: ids,
    },
  });
  return ids.map((id: string) => userProducts.find((userProduct: IUserProductDocument) => String(userProduct._id.valueOf()) === id));
}
