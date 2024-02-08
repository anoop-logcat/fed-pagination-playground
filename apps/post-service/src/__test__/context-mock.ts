import { CacheService } from "@hubspire/cache-directive";
import { getLoaders } from "../libs/config";
import { PostServiceContext } from "../libs/types";
import { Modules } from "../modules";

export enum ContextValueType {
  serviceToken = "SERVICE_TOKEN",
  authenticated = "AUTHENTICATED",
  unAuthenticated = "UNAUTHENTICATED",
}

export const MockContextValue = (type: ContextValueType, cache: CacheService, accessToken?: string): PostServiceContext => {
  switch (type) {
    case ContextValueType.serviceToken:
      return {
        serviceAdmin: true,
        accessToken: undefined,
        cacheContext: { cache, sessionId: null },
        dataSources: Modules.dataSources,
        loaders: getLoaders(),
      };
    case ContextValueType.authenticated:
      return {
        serviceAdmin: false,
        accessToken,
        cacheContext: { cache, sessionId: accessToken! },
        dataSources: Modules.dataSources,
        loaders: getLoaders(),
      };
    default:
      return {
        serviceAdmin: false,
        accessToken: undefined,
        cacheContext: { cache, sessionId: null },
        dataSources: Modules.dataSources,
        loaders: getLoaders(),
      };
  }
};
