import { get } from "lodash";
import { ContextValueType, MockContextValue } from "../../../__test__/context-mock";
import TestApolloServer from "../../../__test__/test-server";
import { CreatePostInput, UpdatePostInput } from "../../../libs/types";
import {
  createPost,
  createManyPost,
  deletePost,
  deleteManyPost,
  getAllPost,
  getAllPostCount,
  getOnePost,
  getPostById,
  updatePost,
  updateManyPost,
} from "./queries";

export const getPostByIdOperation = async (postId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getPostById(postId), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getPostById");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(postId);
};

export const getAllPostOperation = async (postId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getAllPost("", {}, { createdAt: 1 }, 10, 0), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getAllPost");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _id: postId,
      }),
    ])
  );
};

export const getOnePostOperation = async (postId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getOnePost({ _id: { $eq: postId } }, { createdAt: 1 }), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getOnePost");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(postId);
};

export const getAllPostCountOperation = async (server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getAllPostCount("", {}), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getAllPostCount");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(5);
};

export const createPostOperation = async (data: CreatePostInput, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(createPost(data), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.createPost");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.objectContaining(data));
};

export const createManyPostOperation = async (datas: CreatePostInput[], server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(createManyPost(datas), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult: any = get(result, "body.singleResult.data.createManyPost");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.arrayContaining([expect.objectContaining(datas[0])]));
  return refinedResult;
};

export const updatePostOperation = async (data: UpdatePostInput, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(updatePost(data), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.updatePost");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.objectContaining(data));
};

export const updateManyPostOperation = async (datas: UpdatePostInput[], server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(updateManyPost(datas), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.updateManyPost");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.arrayContaining([expect.objectContaining(datas[0])]));
};

export const deletePostOperation = async (postId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(deletePost(postId), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.deletePost");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(postId);
};

export const deleteManyPostOperation = async (postId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(deleteManyPost({ _id: { $eq: postId } }), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.deleteManyPost");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "0._id")).toEqual(postId);
};
