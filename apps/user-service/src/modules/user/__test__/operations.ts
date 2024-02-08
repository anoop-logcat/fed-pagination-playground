import { get } from "lodash";
import { ContextValueType, MockContextValue } from "../../../__test__/context-mock";
import TestApolloServer from "../../../__test__/test-server";
import { CreateUserInput, UpdateUserInput } from "../../../libs/types";
import {
  createUser,
  createManyUser,
  deleteUser,
  deleteManyUser,
  getAllUser,
  getAllUserCount,
  getOneUser,
  getUserById,
  updateUser,
  updateManyUser,
} from "./queries";

export const getUserByIdOperation = async (userId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getUserById(userId), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getUserById");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(userId);
};

export const getAllUserOperation = async (userId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getAllUser("", {}, { createdAt: 1 }, 10, 0), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getAllUser");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _id: userId,
      }),
    ])
  );
};

export const getOneUserOperation = async (userId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getOneUser({ _id: { $eq: userId } }, { createdAt: 1 }), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getOneUser");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(userId);
};

export const getAllUserCountOperation = async (server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getAllUserCount("", {}), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getAllUserCount");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(5);
};

export const createUserOperation = async (data: CreateUserInput, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(createUser(data), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.createUser");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.objectContaining(data));
};

export const createManyUserOperation = async (datas: CreateUserInput[], server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(createManyUser(datas), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult: any = get(result, "body.singleResult.data.createManyUser");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.arrayContaining([expect.objectContaining(datas[0])]));
  return refinedResult;
};

export const updateUserOperation = async (data: UpdateUserInput, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(updateUser(data), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.updateUser");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.objectContaining(data));
};

export const updateManyUserOperation = async (datas: UpdateUserInput[], server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(updateManyUser(datas), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.updateManyUser");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.arrayContaining([expect.objectContaining(datas[0])]));
};

export const deleteUserOperation = async (userId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(deleteUser(userId), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.deleteUser");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(userId);
};

export const deleteManyUserOperation = async (userId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(deleteManyUser({ _id: { $eq: userId } }), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.deleteManyUser");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "0._id")).toEqual(userId);
};
