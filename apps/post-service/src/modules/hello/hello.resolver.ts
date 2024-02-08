import { Resolvers } from "../../libs/types";

export default {
  Query: {
    postServiceHello: (parent, args, context, info) => context.dataSources.helloDataSource.sayHello(),
  },
} as Resolvers;
