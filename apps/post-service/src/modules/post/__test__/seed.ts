import mongoose, { Types } from "mongoose";

export const rawPostData = [
  {
    _id: new Types.ObjectId("65c4ddb4f970f568858c6d9b"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "wR9uZ0SG6K",
    description: "NXVTSPE6yF",
    imageUrl: "DlNAKygmh9",
    createdBy: new Types.ObjectId("65c4ddb4f970f568858c6d9c"),
  },
  {
    _id: new Types.ObjectId("65c4ddb4f970f568858c6d9d"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "MpaIposrP5",
    description: "Xowu93rDRP",
    imageUrl: "KGet9VdwHu",
    createdBy: new Types.ObjectId("65c4ddb4f970f568858c6d9e"),
  },
  {
    _id: new Types.ObjectId("65c4ddb4f970f568858c6d9f"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "8s00Rh472D",
    description: "zt2SrGf6uJ",
    imageUrl: "t7eSTEs2dJ",
    createdBy: new Types.ObjectId("65c4ddb4f970f568858c6da0"),
  },
  {
    _id: new Types.ObjectId("65c4ddb4f970f568858c6da1"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "jEr9MqOvbX",
    description: "hOqoKs8SYo",
    imageUrl: "Klw28HtplP",
    createdBy: new Types.ObjectId("65c4ddb4f970f568858c6da2"),
  },
  {
    _id: new Types.ObjectId("65c4ddb4f970f568858c6da3"),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "BstZKYvYz0",
    description: "6JpZzvZO60",
    imageUrl: "qA6VEQA0xD",
    createdBy: new Types.ObjectId("65c4ddb4f970f568858c6da4"),
  },
];

export const seedPost = async () => {
  const { collections } = mongoose.connection;
  const postCollection = collections["posts"];
  console.log("Inserted Doc Ids: ", await postCollection.insertMany(rawPostData));
};
