import { Resolvers } from "../../libs/types";

export default {
  Query: {
    productServiceHello: (parent, args, context, info) => context.dataSources.helloDataSource.sayHello(),
  },
} as Resolvers;
