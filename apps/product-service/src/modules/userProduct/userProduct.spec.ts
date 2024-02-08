import { TestDB } from "../../__test__/test-db";
import TestApolloServer from "../../__test__/test-server";
import {
  createUserProductOperation,
  createManyUserProductOperation,
  deleteUserProductOperation,
  deleteManyUserProductOperation,
  getAllUserProductCountOperation,
  getAllUserProductOperation,
  getUserProductByIdOperation,
  getOneUserProductOperation,
  updateUserProductOperation,
  updateManyUserProductOperation,
} from "./__test__/operations";
import { rawUserProductData, seedUserProduct } from "./__test__/seed";

describe("UserProduct Module", () => {
  const server = new TestApolloServer();
  let updateUserIdOne: string = "";
  let updateUserIdTwo: string = "";

  beforeAll(async () => {
    await server.start();
    await seedUserProduct();
  });

  afterAll(async () => {
    await TestDB.clearData();
    await server.stop();
  });

  it("Positive - QUERY: LIST USERPRODUCT BY ID", async () => {
    await getUserProductByIdOperation(String(rawUserProductData[0]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST USERPRODUCTS", async () => {
    await getAllUserProductOperation(String(rawUserProductData[1]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST ONE USERPRODUCT", async () => {
    await getOneUserProductOperation(String(rawUserProductData[2]._id.valueOf()), server);
  });

  it("Positive - QUERY: COUNT USERPRODUCTS", async () => {
    await getAllUserProductCountOperation(server);
  });

  it("Positive - MUTATION: CREATE USERPRODUCT", async () => {
    await createUserProductOperation({ userId: "65c4f5592adaabf0642c5008", productId: "65c4f5592adaabf0642c5009", isFav: true }, server);
  });

  it("Positive - MUTATION: CREATE MANY USERPRODUCTS", async () => {
    const newUsers = await createManyUserProductOperation(
      [
        { userId: "65c4f5592adaabf0642c500a", productId: "65c4f5592adaabf0642c500b", isFav: true },
        { userId: "65c4f5592adaabf0642c500c", productId: "65c4f5592adaabf0642c500d", isFav: true },
      ],
      server
    );
    updateUserIdOne = newUsers[0]._id;
    updateUserIdTwo = newUsers[1]._id;
  });

  it("Positive - MUTATION: UPDATE USERPRODUCT ", async () => {
    await updateUserProductOperation(
      { _id: updateUserIdOne, userId: "65c4f5592adaabf0642c500e", productId: "65c4f5592adaabf0642c500f", isFav: true },
      server
    );
  });

  it("Positive - MUTATION: UPDATE MANY USERPRODUCTS", async () => {
    await updateManyUserProductOperation(
      [
        {
          _id: updateUserIdOne,
          userId: "65c4f5592adaabf0642c5010",
          productId: "65c4f5592adaabf0642c5011",
          isFav: true,
        },
        {
          _id: updateUserIdTwo,
          userId: "65c4f5592adaabf0642c5012",
          productId: "65c4f5592adaabf0642c5013",
          isFav: true,
        },
      ],
      server
    );
  });

  it("Positive - MUTATION: DELETE USERPRODUCT", async () => {
    await deleteUserProductOperation(String(rawUserProductData[3]._id.valueOf()), server);
  });

  it("Positive - MUTATION: DELETE USERPRODUCT BY FILTER", async () => {
    await deleteManyUserProductOperation(String(rawUserProductData[4]._id.valueOf()), server);
  });
});
