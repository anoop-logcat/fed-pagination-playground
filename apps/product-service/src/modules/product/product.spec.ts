import { TestDB } from "../../__test__/test-db";
import TestApolloServer from "../../__test__/test-server";
import {
  createProductOperation,
  createManyProductOperation,
  deleteProductOperation,
  deleteManyProductOperation,
  getAllProductCountOperation,
  getAllProductOperation,
  getProductByIdOperation,
  getOneProductOperation,
  updateProductOperation,
  updateManyProductOperation,
} from "./__test__/operations";
import { rawProductData, seedProduct } from "./__test__/seed";

describe("Product Module", () => {
  const server = new TestApolloServer();
  let updateUserIdOne: string = "";
  let updateUserIdTwo: string = "";

  beforeAll(async () => {
    await server.start();
    await seedProduct();
  });

  afterAll(async () => {
    await TestDB.clearData();
    await server.stop();
  });

  it("Positive - QUERY: LIST PRODUCT BY ID", async () => {
    await getProductByIdOperation(String(rawProductData[0]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST PRODUCTS", async () => {
    await getAllProductOperation(String(rawProductData[1]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST ONE PRODUCT", async () => {
    await getOneProductOperation(String(rawProductData[2]._id.valueOf()), server);
  });

  it("Positive - QUERY: COUNT PRODUCTS", async () => {
    await getAllProductCountOperation(server);
  });

  it("Positive - MUTATION: CREATE PRODUCT", async () => {
    await createProductOperation({ productName: "niv3GIj0Ye", productDescription: "gubblMBJQI", price: 58, isAvailable: true }, server);
  });

  it("Positive - MUTATION: CREATE MANY PRODUCTS", async () => {
    const newUsers = await createManyProductOperation(
      [
        { productName: "FTE0xO12O5", productDescription: "MpaIRHcXfg", price: 58, isAvailable: true },
        { productName: "KuikYWfMDG", productDescription: "GoB3P5KVgm", price: 40, isAvailable: true },
      ],
      server
    );
    updateUserIdOne = newUsers[0]._id;
    updateUserIdTwo = newUsers[1]._id;
  });

  it("Positive - MUTATION: UPDATE PRODUCT ", async () => {
    await updateProductOperation(
      { _id: updateUserIdOne, productName: "BdmKTm4Obe", productDescription: "fGSrMw9Ngz", price: 75, isAvailable: true },
      server
    );
  });

  it("Positive - MUTATION: UPDATE MANY PRODUCTS", async () => {
    await updateManyProductOperation(
      [
        {
          _id: updateUserIdOne,
          productName: "mAkXN4C5nj",
          productDescription: "J0Ml0V6hGr",
          price: 21,
          isAvailable: true,
        },
        {
          _id: updateUserIdTwo,
          productName: "78sIpFxVHf",
          productDescription: "uGOHzqAbqc",
          price: 8,
          isAvailable: true,
        },
      ],
      server
    );
  });

  it("Positive - MUTATION: DELETE PRODUCT", async () => {
    await deleteProductOperation(String(rawProductData[3]._id.valueOf()), server);
  });

  it("Positive - MUTATION: DELETE PRODUCT BY FILTER", async () => {
    await deleteManyProductOperation(String(rawProductData[4]._id.valueOf()), server);
  });
});
