import { Resolvers } from "../../libs/types";

export default {
  Query: {
    getUserById: (parent, args, context, info) => context.dataSources.userDataSource.getUserById(String(args._id)),
    getAllUser: (parent, args, context, info) => context.dataSources.userDataSource.getAllUser(args),
    getOneUser: (parent, args, context, info) => context.dataSources.userDataSource.getOneUser(args),
    getAllUserCount: (parent, args, context, info) => context.dataSources.userDataSource.getAllUserCount(args),
  },
  Mutation: {
    createUser: (parent, args, context, info) => context.dataSources.userDataSource.createUser(args.data),
    createManyUser: (parent, args, context, info) => context.dataSources.userDataSource.createManyUser(args.datas),
    updateUser: (parent, args, context, info) => context.dataSources.userDataSource.updateUser(args.data),
    updateManyUser: (parent, args, context, info) => context.dataSources.userDataSource.updateManyUser(args.datas),
    deleteUser: (parent, args, context, info) => context.dataSources.userDataSource.deleteUser(String(args._id)),
    deleteManyUser: (parent, args, context, info) => context.dataSources.userDataSource.deleteManyUser(args),
  },
  User: {
    __resolveReference: async (ref, context, info) => (ref._id ? context.loaders.userByIdLoader.load(ref._id) : null),
  },
  Post: {
    createdByUser: async (post, args, context) => context.loaders.userByIdLoader.load(post.createdBy),
  },
} as Resolvers;
