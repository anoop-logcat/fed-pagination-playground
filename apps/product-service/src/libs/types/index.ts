import { CacheContext } from "@hubspire/cache-directive";
import { GraphQLSchema } from "graphql";
import ProductDataSource from "../../modules/product/product.datasource";
import { getLoaders } from "../config";
export * from "./generated/base-types";

export interface ProductServiceContext {
  accessToken?: string;
  serviceAdmin: boolean;
  dataSources: TDataSourceContext;
  cacheContext: CacheContext;
  loaders: ReturnType<typeof getLoaders>;
}

export type TDataSourceContext = {
  productDataSource: ProductDataSource;
};

export type TModule = {
  schemas: GraphQLSchema;
  dataSources: TDataSourceContext;
};
