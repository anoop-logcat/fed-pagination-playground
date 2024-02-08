import { ApolloServer } from "@apollo/server";
import { CacheService, responseCachePlugin } from "@hubspire/cache-directive";
import { PostServiceContext } from "../libs/types";
import { Modules } from "../modules";
import { TestDB } from "./test-db";

export default class TestApolloServer {
  public redisClient!: CacheService;

  constructor(
    public readonly apollo = new ApolloServer<PostServiceContext>({
      schema: Modules.schemas,
      plugins: [responseCachePlugin<PostServiceContext>()],
    })
  ) {}

  async start() {
    await TestDB.connect();
    this.redisClient = await CacheService.start({
      cache_prefix: "PostService",
      cache_mode: "in-memory",
    });
    await this.apollo.start();
  }
  async stop() {
    await TestDB.disconnect();
    await this.apollo.stop();
  }
}
