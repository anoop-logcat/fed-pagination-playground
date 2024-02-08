import { TestDB } from "../../__test__/test-db";
import TestApolloServer from "../../__test__/test-server";
import {
  createPostOperation,
  createManyPostOperation,
  deletePostOperation,
  deleteManyPostOperation,
  getAllPostCountOperation,
  getAllPostOperation,
  getPostByIdOperation,
  getOnePostOperation,
  updatePostOperation,
  updateManyPostOperation,
} from "./__test__/operations";
import { rawPostData, seedPost } from "./__test__/seed";

describe("Post Module", () => {
  const server = new TestApolloServer();
  let updateUserIdOne: string = "";
  let updateUserIdTwo: string = "";

  beforeAll(async () => {
    await server.start();
    await seedPost();
  });

  afterAll(async () => {
    await TestDB.clearData();
    await server.stop();
  });

  it("Positive - QUERY: LIST POST BY ID", async () => {
    await getPostByIdOperation(String(rawPostData[0]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST POSTS", async () => {
    await getAllPostOperation(String(rawPostData[1]._id.valueOf()), server);
  });

  it("Positive - QUERY: LIST ONE POST", async () => {
    await getOnePostOperation(String(rawPostData[2]._id.valueOf()), server);
  });

  it("Positive - QUERY: COUNT POSTS", async () => {
    await getAllPostCountOperation(server);
  });

  it("Positive - MUTATION: CREATE POST", async () => {
    await createPostOperation(
      { title: "IFxuzeoUBQ", description: "y5MRAgyaFo", imageUrl: "NW7H56Np64", createdBy: "65c4ddb4f970f568858c6d95" },
      server
    );
  });

  it("Positive - MUTATION: CREATE MANY POSTS", async () => {
    const newUsers = await createManyPostOperation(
      [
        { title: "Ej4zIAuRDx", description: "LMlcFuMS5U", imageUrl: "e776z9Bkzl", createdBy: "65c4ddb4f970f568858c6d96" },
        { title: "JYbeJefhVf", description: "JmR0mrDMJQ", imageUrl: "gnxbAMqRHf", createdBy: "65c4ddb4f970f568858c6d97" },
      ],
      server
    );
    updateUserIdOne = newUsers[0]._id;
    updateUserIdTwo = newUsers[1]._id;
  });

  it("Positive - MUTATION: UPDATE POST ", async () => {
    await updatePostOperation(
      { _id: updateUserIdOne, title: "ESFtggBmRy", description: "oSTPzDEg5y", imageUrl: "uY3nhnfZTa", createdBy: "65c4ddb4f970f568858c6d98" },
      server
    );
  });

  it("Positive - MUTATION: UPDATE MANY POSTS", async () => {
    await updateManyPostOperation(
      [
        {
          _id: updateUserIdOne,
          title: "pBBm1VZfwa",
          description: "qg3WuQZf6U",
          imageUrl: "tsYz8akpyk",
          createdBy: "65c4ddb4f970f568858c6d99",
        },
        {
          _id: updateUserIdTwo,
          title: "Kz4hS9Zdou",
          description: "hVZDf9Pxz3",
          imageUrl: "TDGcx8NUMc",
          createdBy: "65c4ddb4f970f568858c6d9a",
        },
      ],
      server
    );
  });

  it("Positive - MUTATION: DELETE POST", async () => {
    await deletePostOperation(String(rawPostData[3]._id.valueOf()), server);
  });

  it("Positive - MUTATION: DELETE POST BY FILTER", async () => {
    await deleteManyPostOperation(String(rawPostData[4]._id.valueOf()), server);
  });
});
