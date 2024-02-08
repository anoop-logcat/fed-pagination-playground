import { Resolvers } from "../../libs/types";

export default {
  Query: {
    getProductById: (parent, args, context, info) => context.dataSources.productDataSource.getProductById(String(args._id)),
    getAllProduct: (parent, args, context, info) => context.dataSources.productDataSource.getAllProduct(args),
    getOneProduct: (parent, args, context, info) => context.dataSources.productDataSource.getOneProduct(args),
    getAllProductCount: (parent, args, context, info) => context.dataSources.productDataSource.getAllProductCount(args),
  },
  Mutation: {
    createProduct: (parent, args, context, info) => context.dataSources.productDataSource.createProduct(args.data),
    createManyProduct: (parent, args, context, info) => context.dataSources.productDataSource.createManyProduct(args.datas),
    updateProduct: (parent, args, context, info) => context.dataSources.productDataSource.updateProduct(args.data),
    updateManyProduct: (parent, args, context, info) => context.dataSources.productDataSource.updateManyProduct(args.datas),
    deleteProduct: (parent, args, context, info) => context.dataSources.productDataSource.deleteProduct(String(args._id)),
    deleteManyProduct: (parent, args, context, info) => context.dataSources.productDataSource.deleteManyProduct(args),
  },
  Product: {
    __resolveReference: async (ref, context, info) => (ref._id ? context.loaders.productByIdLoader.load(ref._id) : null),
  },
} as Resolvers;
