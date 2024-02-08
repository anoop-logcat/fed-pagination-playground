import { getSearchRegex, parseQuery } from "@hubspire/cache-directive";
import { GraphQLError } from "graphql";
import { get, omit, set, size, map, isEmpty } from "lodash";
import { PipelineStage } from "mongoose";
import {
  CreateUserProductInput,
  QueryGetAllUserProductArgs,
  QueryGetOneUserProductArgs,
  MutationDeleteManyUserProductArgs,
  QueryGetAllUserProductCountArgs,
  UpdateUserProductInput,
} from "../../libs/types";
import { UserProductModel } from "./userProduct.model";

export default class UserProductDataSource {
  private readonly model = UserProductModel;

  async getAllUserProduct(args: QueryGetAllUserProductArgs) {
    const pipelines: PipelineStage[] = [];
    const limit = Number(args.limit) || 10;
    const offset = Number(args.offset) || 0;

    if (size(args.search?.trim()) > 2) {
      pipelines.push({
        $search: {
          index: "search-index-name",
          regex: {
            path: ["field-name"],
            query: getSearchRegex(args.search?.trim() || ""),
            allowAnalyzedField: true,
          },
        },
      });
    }
    pipelines.push({
      $match: parseQuery(args.filter),
    });
    size(args.search?.trim()) <= 2 && pipelines.push({ $sort: args.sort || { createdAt: -1 } });
    pipelines.push({ $skip: offset });
    pipelines.push({ $limit: limit });

    return this.model.aggregate(pipelines);
  }

  async getAllUserProductCount(args: QueryGetAllUserProductCountArgs) {
    const pipelines: PipelineStage[] = [];

    if (size(args.search?.trim()) > 2) {
      pipelines.push({
        $search: {
          index: "search-index-name",
          regex: {
            path: ["field-name"],
            query: getSearchRegex(args.search?.trim() || ""),
            allowAnalyzedField: true,
          },
        },
      });
    }
    pipelines.push({
      $match: parseQuery(args.filter),
    });
    pipelines.push({ $count: "totalCount" });

    return (await this.model.aggregate(pipelines))[0]?.totalCount || 0;
  }

  async getUserProductById(_id: string) {
    return this.model.findById(_id).lean();
  }

  async getOneUserProduct(args: QueryGetOneUserProductArgs) {
    return this.model.findOne(args.filter).sort(args.sort).lean();
  }

  async createUserProduct(data: CreateUserProductInput) {
    const userProduct = new this.model({ ...data });
    return userProduct.save();
  }

  async createManyUserProduct(datas: CreateUserProductInput[]) {
    const userProducts = datas.map((input: CreateUserProductInput) => this.createUserProduct(input));
    return userProducts;
  }

  async updateUserProduct(data: UpdateUserProductInput) {
    const userProduct = await this.model.findById(data._id);
    if (!userProduct) throw new GraphQLError("userProduct not found");

    for (const field in omit(data, "_id")) set(userProduct, field, get(data, field));

    return userProduct.save();
  }

  async updateManyUserProduct(datas: UpdateUserProductInput[]) {
    const userProducts = datas.map((input: UpdateUserProductInput) => this.updateUserProduct(input));
    return userProducts;
  }

  async deleteUserProduct(_id: string) {
    const userProduct = await this.model.findById(_id);
    if (!userProduct) throw new GraphQLError("userProduct not found");

    await this.model.deleteOne({ _id });
    return userProduct;
  }

  async deleteManyUserProduct(args: MutationDeleteManyUserProductArgs) {
    const userProducts = await this.model.find(args.filter);
    if (isEmpty(userProducts)) throw new GraphQLError("userProducts not found");

    await this.model.deleteMany({ _id: { $in: map(userProducts, "_id") } });
    return userProducts;
  }
}
