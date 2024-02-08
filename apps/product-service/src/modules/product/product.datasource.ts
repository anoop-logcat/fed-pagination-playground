import { getSearchRegex, parseQuery } from "@hubspire/cache-directive";
import { GraphQLError } from "graphql";
import { get, omit, set, size, map, isEmpty } from "lodash";
import { PipelineStage } from "mongoose";
import {
  CreateProductInput,
  QueryGetAllProductArgs,
  QueryGetOneProductArgs,
  MutationDeleteManyProductArgs,
  QueryGetAllProductCountArgs,
  UpdateProductInput,
} from "../../libs/types";
import { ProductModel } from "./product.model";

export default class ProductDataSource {
  private readonly model = ProductModel;

  async getAllProduct(args: QueryGetAllProductArgs) {
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

  async getAllProductCount(args: QueryGetAllProductCountArgs) {
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

  async getProductById(_id: string) {
    return this.model.findById(_id).lean();
  }

  async getOneProduct(args: QueryGetOneProductArgs) {
    return this.model.findOne(args.filter).sort(args.sort).lean();
  }

  async createProduct(data: CreateProductInput) {
    const product = new this.model({ ...data });
    return product.save();
  }

  async createManyProduct(datas: CreateProductInput[]) {
    const products = datas.map((input: CreateProductInput) => this.createProduct(input));
    return products;
  }

  async updateProduct(data: UpdateProductInput) {
    const product = await this.model.findById(data._id);
    if (!product) throw new GraphQLError("product not found");

    for (const field in omit(data, "_id")) set(product, field, get(data, field));

    return product.save();
  }

  async updateManyProduct(datas: UpdateProductInput[]) {
    const products = datas.map((input: UpdateProductInput) => this.updateProduct(input));
    return products;
  }

  async deleteProduct(_id: string) {
    const product = await this.model.findById(_id);
    if (!product) throw new GraphQLError("product not found");

    await this.model.deleteOne({ _id });
    return product;
  }

  async deleteManyProduct(args: MutationDeleteManyProductArgs) {
    const products = await this.model.find(args.filter);
    if (isEmpty(products)) throw new GraphQLError("products not found");

    await this.model.deleteMany({ _id: { $in: map(products, "_id") } });
    return products;
  }
}
