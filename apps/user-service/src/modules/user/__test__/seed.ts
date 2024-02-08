import mongoose, { Types } from "mongoose";

export const rawUserData = [
  {
    _id: new Types.ObjectId("65c4dd50da24fa66663bdea0"),
    createdAt: new Date(),
    updatedAt: new Date(),
    firstName: "GMWTmzJYIA",
    lastName: "d8ZrfK2VoC",
    email: "B06pXYx@gmail.com",
    password: "VqfGsxw8xz",
    lastLoggedIn: new Date(),
  },
  {
    _id: new Types.ObjectId("65c4dd50da24fa66663bdea1"),
    createdAt: new Date(),
    updatedAt: new Date(),
    firstName: "b8GQie4B1C",
    lastName: "sgOtV4LhLt",
    email: "tHvyiVG@gmail.com",
    password: "LnBLFmiU4a",
    lastLoggedIn: new Date(),
  },
  {
    _id: new Types.ObjectId("65c4dd50da24fa66663bdea2"),
    createdAt: new Date(),
    updatedAt: new Date(),
    firstName: "c9qdAhKFKi",
    lastName: "UpaQhne3Wv",
    email: "fXB8A7E@gmail.com",
    password: "l7RE2RnM6O",
    lastLoggedIn: new Date(),
  },
  {
    _id: new Types.ObjectId("65c4dd50da24fa66663bdea3"),
    createdAt: new Date(),
    updatedAt: new Date(),
    firstName: "GC4T93ywWM",
    lastName: "TmYJiWDBAP",
    email: "yXi1wN0@gmail.com",
    password: "bZM4mjnE1x",
    lastLoggedIn: new Date(),
  },
  {
    _id: new Types.ObjectId("65c4dd50da24fa66663bdea4"),
    createdAt: new Date(),
    updatedAt: new Date(),
    firstName: "pMdqFFGExa",
    lastName: "OeSSIbxA2M",
    email: "vRiEdqH@gmail.com",
    password: "LZeLH0iSGx",
    lastLoggedIn: new Date(),
  },
];

export const seedUser = async () => {
  const { collections } = mongoose.connection;
  const userCollection = collections["users"];
  console.log("Inserted Doc Ids: ", await userCollection.insertMany(rawUserData));
};
