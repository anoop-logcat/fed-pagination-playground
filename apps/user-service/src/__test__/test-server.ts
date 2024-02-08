import { ApolloServer } from "@apollo/server";
import { CacheService, responseCachePlugin } from "@hubspire/cache-directive";
import { UserServiceContext } from "../libs/types";
import { Modules } from "../modules";
import { TestDB } from "./test-db";

export default class TestApolloServer {
  public redisClient!: CacheService;

  constructor(
    public readonly apollo = new ApolloServer<UserServiceContext>({
      schema: Modules.schemas,
      plugins: [responseCachePlugin<UserServiceContext>()],
    })
  ) {}

  async start() {
    await TestDB.connect();
    this.redisClient = await CacheService.start({
      cache_prefix: "UserService",
      cache_mode: "in-memory",
    });
    await this.apollo.start();
  }
  async stop() {
    await TestDB.disconnect();
    await this.apollo.stop();
  }
}
