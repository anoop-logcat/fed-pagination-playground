import { Resolvers } from "../../libs/types";

export default {
  Query: {
    userServiceHello: (parent, args, context, info) => context.dataSources.helloDataSource.sayHello(),
  },
} as Resolvers;
