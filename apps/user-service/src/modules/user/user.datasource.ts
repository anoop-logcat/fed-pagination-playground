import { getSearchRegex, parseQuery } from "@hubspire/cache-directive";
import { GraphQLError } from "graphql";
import { get, omit, set, size, map, isEmpty } from "lodash";
import { PipelineStage } from "mongoose";
import {
  CreateUserInput,
  QueryGetAllUserArgs,
  QueryGetOneUserArgs,
  MutationDeleteManyUserArgs,
  QueryGetAllUserCountArgs,
  UpdateUserInput,
} from "../../libs/types";
import { UserModel } from "./user.model";

export default class UserDataSource {
  private readonly model = UserModel;

  async getAllUser(args: QueryGetAllUserArgs) {
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

  async getAllUserCount(args: QueryGetAllUserCountArgs) {
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

  async getUserById(_id: string) {
    return this.model.findById(_id).lean();
  }

  async getOneUser(args: QueryGetOneUserArgs) {
    return this.model.findOne(args.filter).sort(args.sort).lean();
  }

  async createUser(data: CreateUserInput) {
    const user = new this.model({ ...data });
    return user.save();
  }

  async createManyUser(datas: CreateUserInput[]) {
    const users = datas.map((input: CreateUserInput) => this.createUser(input));
    return users;
  }

  async updateUser(data: UpdateUserInput) {
    const user = await this.model.findById(data._id);
    if (!user) throw new GraphQLError("user not found");

    for (const field in omit(data, "_id")) set(user, field, get(data, field));

    return user.save();
  }

  async updateManyUser(datas: UpdateUserInput[]) {
    const users = datas.map((input: UpdateUserInput) => this.updateUser(input));
    return users;
  }

  async deleteUser(_id: string) {
    const user = await this.model.findById(_id);
    if (!user) throw new GraphQLError("user not found");

    await this.model.deleteOne({ _id });
    return user;
  }

  async deleteManyUser(args: MutationDeleteManyUserArgs) {
    const users = await this.model.find(args.filter);
    if (isEmpty(users)) throw new GraphQLError("users not found");

    await this.model.deleteMany({ _id: { $in: map(users, "_id") } });
    return users;
  }
}
