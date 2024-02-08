import mongoose, { Types } from "mongoose";

export const rawUserProductData = [
  {
    _id: new Types.ObjectId("65c4f5592adaabf0642c5014"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: new Types.ObjectId("65c4f5592adaabf0642c5015"),
    productId: new Types.ObjectId("65c4f5592adaabf0642c5016"),
    isFav: true,
  },
  {
    _id: new Types.ObjectId("65c4f5592adaabf0642c5017"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: new Types.ObjectId("65c4f5592adaabf0642c5018"),
    productId: new Types.ObjectId("65c4f5592adaabf0642c5019"),
    isFav: true,
  },
  {
    _id: new Types.ObjectId("65c4f5592adaabf0642c501a"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: new Types.ObjectId("65c4f5592adaabf0642c501b"),
    productId: new Types.ObjectId("65c4f5592adaabf0642c501c"),
    isFav: true,
  },
  {
    _id: new Types.ObjectId("65c4f5592adaabf0642c501d"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: new Types.ObjectId("65c4f5592adaabf0642c501e"),
    productId: new Types.ObjectId("65c4f5592adaabf0642c501f"),
    isFav: true,
  },
  {
    _id: new Types.ObjectId("65c4f5592adaabf0642c5020"),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: new Types.ObjectId("65c4f5592adaabf0642c5021"),
    productId: new Types.ObjectId("65c4f5592adaabf0642c5022"),
    isFav: true,
  },
];

export const seedUserProduct = async () => {
  const { collections } = mongoose.connection;
  const userProductCollection = collections["userProducts"];
  console.log("Inserted Doc Ids: ", await userProductCollection.insertMany(rawUserProductData));
};
