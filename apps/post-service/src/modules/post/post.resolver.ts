import { Resolvers } from "../../libs/types";

export default {
  Query: {
    getPostById: (parent, args, context, info) => context.dataSources.postDataSource.getPostById(String(args._id)),
    getAllPost: (parent, args, context, info) => context.dataSources.postDataSource.getAllPost(args),
    getOnePost: (parent, args, context, info) => context.dataSources.postDataSource.getOnePost(args),
    getAllPostCount: (parent, args, context, info) => context.dataSources.postDataSource.getAllPostCount(args),
  },
  Mutation: {
    createPost: (parent, args, context, info) => context.dataSources.postDataSource.createPost(args.data),
    createManyPost: (parent, args, context, info) => context.dataSources.postDataSource.createManyPost(args.datas),
    updatePost: (parent, args, context, info) => context.dataSources.postDataSource.updatePost(args.data),
    updateManyPost: (parent, args, context, info) => context.dataSources.postDataSource.updateManyPost(args.datas),
    deletePost: (parent, args, context, info) => context.dataSources.postDataSource.deletePost(String(args._id)),
    deleteManyPost: (parent, args, context, info) => context.dataSources.postDataSource.deleteManyPost(args),
  },
  Post: {
    __resolveReference: async (ref, context, info) => (ref._id ? context.loaders.postByIdLoader.load(ref._id) : null),
  },
} as Resolvers;
