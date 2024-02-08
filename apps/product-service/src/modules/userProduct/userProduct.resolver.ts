import { Resolvers } from "../../libs/types";

export default {
  Query: {
    getUserProductById: (parent, args, context, info) => context.dataSources.userProductDataSource.getUserProductById(String(args._id)),
    getAllUserProduct: (parent, args, context, info) => context.dataSources.userProductDataSource.getAllUserProduct(args),
    getOneUserProduct: (parent, args, context, info) => context.dataSources.userProductDataSource.getOneUserProduct(args),
    getAllUserProductCount: (parent, args, context, info) => context.dataSources.userProductDataSource.getAllUserProductCount(args),
  },
  Mutation: {
    createUserProduct: (parent, args, context, info) => context.dataSources.userProductDataSource.createUserProduct(args.data),
    createManyUserProduct: (parent, args, context, info) => context.dataSources.userProductDataSource.createManyUserProduct(args.datas),
    updateUserProduct: (parent, args, context, info) => context.dataSources.userProductDataSource.updateUserProduct(args.data),
    updateManyUserProduct: (parent, args, context, info) => context.dataSources.userProductDataSource.updateManyUserProduct(args.datas),
    deleteUserProduct: (parent, args, context, info) => context.dataSources.userProductDataSource.deleteUserProduct(String(args._id)),
    deleteManyUserProduct: (parent, args, context, info) => context.dataSources.userProductDataSource.deleteManyUserProduct(args),
  },
  UserProduct: {
    __resolveReference: async (ref, context, info) => (ref._id ? context.loaders.userProductByIdLoader.load(ref._id) : null),
  },
} as Resolvers;
