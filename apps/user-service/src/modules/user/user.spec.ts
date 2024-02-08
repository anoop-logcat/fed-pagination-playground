import { TestDB } from "../../__test__/test-db";
import TestApolloServer from "../../__test__/test-server";
import {
  createUserOperation,
  createManyUserOperation,
  deleteUserOperation,
  deleteManyUserOperation,
  getAllUserCountOperation,
  getAllUserOperation,
  getUserByIdOperation,
  getOneUserOperation,
  updateUserOperation,
  updateManyUserOperation,
} from "./__test__/operations";
import { rawUserData, seedUser } from "./__test__/seed";

describe("User Module", () => {
  const server = new TestApolloServer();
  let updateUserIdOne: string = "";
  let updateUserIdTwo: string = "";

  beforeAll(async () => {
    await server.start();
    await seedUser();
  });

  afterAll(async () => {
    await TestDB.clearData();
    await server.stop();
  });

  it("Positive - QUERY: LIST USER BY ID", async () => {
    await getUserByIdOperation(String(rawUserData[0]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST USERS", async () => {
    await getAllUserOperation(String(rawUserData[1]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST ONE USER", async () => {
    await getOneUserOperation(String(rawUserData[2]._id.valueOf()), server);
  });

  it("Positive - QUERY: COUNT USERS", async () => {
    await getAllUserCountOperation(server);
  });

  it("Positive - MUTATION: CREATE USER", async () => {
    await createUserOperation(
      { firstName: "Jgvp0dFwLL", lastName: "g7c5GwF86p", email: "E7TSkcI@gmail.com", password: "2jlmJym8h0", lastLoggedIn: new Date() },
      server
    );
  });

  it("Positive - MUTATION: CREATE MANY USERS", async () => {
    const newUsers = await createManyUserOperation(
      [
        { firstName: "1blO1E7RzJ", lastName: "FdT13cq30I", email: "bajlNOI@gmail.com", password: "yfWB8K0lpB", lastLoggedIn: new Date() },
        { firstName: "K51MRHTYqa", lastName: "W8xQF4Wj4M", email: "rmRdgoa@gmail.com", password: "THhfKePV4K", lastLoggedIn: new Date() },
      ],
      server
    );
    updateUserIdOne = newUsers[0]._id;
    updateUserIdTwo = newUsers[1]._id;
  });

  it("Positive - MUTATION: UPDATE USER ", async () => {
    await updateUserOperation(
      {
        _id: updateUserIdOne,
        firstName: "AP6oVIoRem",
        lastName: "3gFUAlLJK4",
        email: "8FcJtqB@gmail.com",
        password: "DD33vZgPC5",
        lastLoggedIn: new Date(),
      },
      server
    );
  });

  it("Positive - MUTATION: UPDATE MANY USERS", async () => {
    await updateManyUserOperation(
      [
        {
          _id: updateUserIdOne,
          firstName: "XF3KjFwp2a",
          lastName: "yyAcQ7qzcQ",
          email: "PbdCipr@gmail.com",
          password: "OKXq0akWYK",
          lastLoggedIn: new Date(),
        },
        {
          _id: updateUserIdTwo,
          firstName: "odfWwODfAv",
          lastName: "OtqjyI7Ua8",
          email: "jw5ndad@gmail.com",
          password: "5IcW3CWSak",
          lastLoggedIn: new Date(),
        },
      ],
      server
    );
  });

  it("Positive - MUTATION: DELETE USER", async () => {
    await deleteUserOperation(String(rawUserData[3]._id.valueOf()), server);
  });

  it("Positive - MUTATION: DELETE USER BY FILTER", async () => {
    await deleteManyUserOperation(String(rawUserData[4]._id.valueOf()), server);
  });
});
