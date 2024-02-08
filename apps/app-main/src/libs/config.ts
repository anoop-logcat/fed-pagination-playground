import { RemoteGraphQLDataSource } from "@apollo/gateway";
import { AppMainContext } from "./types";

export class HeaderDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }: { request: any; context: Partial<AppMainContext> }) {
    request.http.headers.set("Authorization", context.authorization);
    if (context.serviceAdmin) {
      switch (String(request.http.url)) {
        case String(process.env.POST_SERVICE_URL):
          request.http.headers.set("service-token", process.env.POST_SERVICE_TOKEN);
          break;
        case String(process.env.USER_SERVICE_URL):
          request.http.headers.set("service-token", process.env.USER_SERVICE_TOKEN);
          break;
        case String(process.env.PRODUCT_SERVICE_URL):
          request.http.headers.set("service-token", process.env.PRODUCT_SERVICE_TOKEN);
          break;
      }
    }
  }
}
