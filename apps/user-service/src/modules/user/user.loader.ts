import { IUserDocument, UserModel } from "./user.model";

export async function UserByIdBatchFunc(ids: readonly string[]) {
  const users = await UserModel.find({
    _id: {
      $in: ids,
    },
  });
  return ids.map((id: string) => users.find((user: IUserDocument) => String(user._id.valueOf()) === id));
}
