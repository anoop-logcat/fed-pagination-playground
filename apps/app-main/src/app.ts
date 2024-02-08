import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from "@apollo/server/plugin/landingPage/default";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { get, omit } from "lodash";
import fetcher from "make-fetch-happen";
import { HeaderDataSource } from "./libs/config";
import { AppMainContext } from "./libs/types";

async function ApolloServerInit() {
  const app = express();
  const httpServer = http.createServer(app);

  const gateway = new ApolloGateway({
    debug: ["local", "development"].includes(String(process.env.NODE_ENV)),
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: "post-service", url: process.env.POST_SERVICE_URL },
        { name: "user-service", url: process.env.USER_SERVICE_URL },
      ],
    }),
    buildService({ url }) {
      return new HeaderDataSource({
        url,
        fetcher: fetcher.defaults({ maxSockets: 50, timeout: 30000 }),
      });
    },
  });

  const server = new ApolloServer<AppMainContext>({
    gateway,
    introspection: process.env.APOLLO_INTROSPECTION === "true",
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault({
            embed: false,
            footer: false,
          })
        : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    formatError: (error) => {
      return {
        ...error,
        extensions: {
          ...omit(get(error, "extensions"), "stacktrace"),
        },
      };
    },
  });
  await server.start();

  app.get("/app-main/health", (req, res) => {
    res.send({ status: "ok" });
  });
  app.use(
    "/app-main",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async (payload) => ({
        serviceAdmin: String(payload.req.headers["service-token"]) === String(process.env.SERVICE_TOKEN),
        authorization: payload.req?.headers?.authorization,
      }),
    })
  );

  const port = process.env.PORT || 4000;
  httpServer.listen(port, () => {
    console.log("\x1b[33m", `Server ready at http://localhost:${port}/app-main`, "\x1b[0m");
  });
}

ApolloServerInit();
