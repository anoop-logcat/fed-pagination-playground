import { CacheContext } from "@hubspire/cache-directive";
import { GraphQLSchema } from "graphql";
import PostDataSource from "../../modules/post/post.datasource";
import { getLoaders } from "../config";
export * from "./generated/base-types";

export interface PostServiceContext {
  accessToken?: string;
  serviceAdmin: boolean;
  dataSources: TDataSourceContext;
  cacheContext: CacheContext;
  loaders: ReturnType<typeof getLoaders>;
}

export type TDataSourceContext = {
  postDataSource: PostDataSource;
};

export type TModule = {
  schemas: GraphQLSchema;
  dataSources: TDataSourceContext;
};
