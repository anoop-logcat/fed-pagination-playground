import mongoose, { Types } from "mongoose";

export const rawProductData = [
  {
    _id: new Types.ObjectId("65c4f4e45b0f251ada15b08d"),
    createdAt: new Date(),
    updatedAt: new Date(),
    productName: "0hNL9OZ0C4",
    productDescription: "2WYXlv2m8r",
    price: 50,
    isAvailable: true,
  },
  {
    _id: new Types.ObjectId("65c4f4e45b0f251ada15b08e"),
    createdAt: new Date(),
    updatedAt: new Date(),
    productName: "hlPf419ThD",
    productDescription: "goHebY177t",
    price: 57,
    isAvailable: true,
  },
  {
    _id: new Types.ObjectId("65c4f4e45b0f251ada15b08f"),
    createdAt: new Date(),
    updatedAt: new Date(),
    productName: "WDwNvYGnY7",
    productDescription: "Cvle1wzn4P",
    price: 64,
    isAvailable: true,
  },
  {
    _id: new Types.ObjectId("65c4f4e45b0f251ada15b090"),
    createdAt: new Date(),
    updatedAt: new Date(),
    productName: "rXsoCf65zN",
    productDescription: "gh1m6KenAY",
    price: 65,
    isAvailable: true,
  },
  {
    _id: new Types.ObjectId("65c4f4e45b0f251ada15b091"),
    createdAt: new Date(),
    updatedAt: new Date(),
    productName: "IAkuEspVWj",
    productDescription: "rEsKheT0Bb",
    price: 46,
    isAvailable: true,
  },
];

export const seedProduct = async () => {
  const { collections } = mongoose.connection;
  const productCollection = collections["products"];
  console.log("Inserted Doc Ids: ", await productCollection.insertMany(rawProductData));
};
