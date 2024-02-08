import { buildSubgraphSchema } from "@apollo/subgraph";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { cacheDirectiveTransformer } from "@hubspire/cache-directive";
import { GraphQLDateTime, GraphQLEmailAddress, GraphQLJSON } from "graphql-scalars";
import path from "path";
import { authDirectiveTransformer } from "../libs/directives/auth.directive";
import { TModule } from "../libs/types";
import UserDataSource from "./user/user.datasource";

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.resolve(__dirname + "/**/*.graphql"), {
    extensions: ["graphql"],
  })
);
const resolvers = mergeResolvers(
  loadFilesSync(path.resolve(__dirname + "/**/*.resolver.{ts,js}"), {
    extensions: ["ts", "js"],
  })
);

export const Modules: TModule = {
  dataSources: {
    userDataSource: new UserDataSource(),
  },
  schemas: cacheDirectiveTransformer(
    authDirectiveTransformer(
      buildSubgraphSchema({
        typeDefs: typeDefs,
        resolvers: {
          ...resolvers,
          ...{ JSON: GraphQLJSON },
          ...{ DateTime: GraphQLDateTime },
          ...{ EmailAddress: GraphQLEmailAddress },
        },
      })
    )
  ),
};
