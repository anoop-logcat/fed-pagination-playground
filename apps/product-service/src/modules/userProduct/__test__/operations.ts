import { get } from "lodash";
import { ContextValueType, MockContextValue } from "../../../__test__/context-mock";
import TestApolloServer from "../../../__test__/test-server";
import { CreateUserProductInput, UpdateUserProductInput } from "../../../libs/types";
import {
  createUserProduct,
  createManyUserProduct,
  deleteUserProduct,
  deleteManyUserProduct,
  getAllUserProduct,
  getAllUserProductCount,
  getOneUserProduct,
  getUserProductById,
  updateUserProduct,
  updateManyUserProduct,
} from "./queries";

export const getUserProductByIdOperation = async (userProductId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getUserProductById(userProductId), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getUserProductById");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(userProductId);
};

export const getAllUserProductOperation = async (userProductId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getAllUserProduct("", {}, { createdAt: 1 }, 10, 0), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getAllUserProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _id: userProductId,
      }),
    ])
  );
};

export const getOneUserProductOperation = async (userProductId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getOneUserProduct({ _id: { $eq: userProductId } }, { createdAt: 1 }), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getOneUserProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(userProductId);
};

export const getAllUserProductCountOperation = async (server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getAllUserProductCount("", {}), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getAllUserProductCount");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(5);
};

export const createUserProductOperation = async (data: CreateUserProductInput, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(createUserProduct(data), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.createUserProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.objectContaining(data));
};

export const createManyUserProductOperation = async (datas: CreateUserProductInput[], server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(createManyUserProduct(datas), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult: any = get(result, "body.singleResult.data.createManyUserProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.arrayContaining([expect.objectContaining(datas[0])]));
  return refinedResult;
};

export const updateUserProductOperation = async (data: UpdateUserProductInput, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(updateUserProduct(data), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.updateUserProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.objectContaining(data));
};

export const updateManyUserProductOperation = async (datas: UpdateUserProductInput[], server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(updateManyUserProduct(datas), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.updateManyUserProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.arrayContaining([expect.objectContaining(datas[0])]));
};

export const deleteUserProductOperation = async (userProductId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(deleteUserProduct(userProductId), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.deleteUserProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(userProductId);
};

export const deleteManyUserProductOperation = async (userProductId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(deleteManyUserProduct({ _id: { $eq: userProductId } }), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.deleteManyUserProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "0._id")).toEqual(userProductId);
};
