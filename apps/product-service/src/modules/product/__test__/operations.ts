import { get } from "lodash";
import { ContextValueType, MockContextValue } from "../../../__test__/context-mock";
import TestApolloServer from "../../../__test__/test-server";
import { CreateProductInput, UpdateProductInput } from "../../../libs/types";
import {
  createProduct,
  createManyProduct,
  deleteProduct,
  deleteManyProduct,
  getAllProduct,
  getAllProductCount,
  getOneProduct,
  getProductById,
  updateProduct,
  updateManyProduct,
} from "./queries";

export const getProductByIdOperation = async (productId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getProductById(productId), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getProductById");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(productId);
};

export const getAllProductOperation = async (productId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getAllProduct("", {}, { createdAt: 1 }, 10, 0), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getAllProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _id: productId,
      }),
    ])
  );
};

export const getOneProductOperation = async (productId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getOneProduct({ _id: { $eq: productId } }, { createdAt: 1 }), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getOneProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(productId);
};

export const getAllProductCountOperation = async (server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(getAllProductCount("", {}), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.getAllProductCount");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(5);
};

export const createProductOperation = async (data: CreateProductInput, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(createProduct(data), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.createProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.objectContaining(data));
};

export const createManyProductOperation = async (datas: CreateProductInput[], server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(createManyProduct(datas), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult: any = get(result, "body.singleResult.data.createManyProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.arrayContaining([expect.objectContaining(datas[0])]));
  return refinedResult;
};

export const updateProductOperation = async (data: UpdateProductInput, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(updateProduct(data), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.updateProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.objectContaining(data));
};

export const updateManyProductOperation = async (datas: UpdateProductInput[], server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(updateManyProduct(datas), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.updateManyProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(refinedResult).toEqual(expect.arrayContaining([expect.objectContaining(datas[0])]));
};

export const deleteProductOperation = async (productId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(deleteProduct(productId), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.deleteProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "_id")).toEqual(productId);
};

export const deleteManyProductOperation = async (productId: string, server: TestApolloServer) => {
  const result = await server.apollo.executeOperation(deleteManyProduct({ _id: { $eq: productId } }), {
    contextValue: MockContextValue(ContextValueType.serviceToken, server.redisClient),
  });

  const refinedResult = get(result, "body.singleResult.data.deleteManyProduct");
  const refinedError = get(result, "body.singleResult.errors");

  expect(refinedError).toBeUndefined();
  expect(get(refinedResult, "0._id")).toEqual(productId);
};
