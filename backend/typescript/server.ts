import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { ApolloServer } from "apollo-server-express";
import { mongo } from "./models";
import schema from "./graphql";

const CORS_ALLOW_LIST = ["http://localhost:3000"];

const CORS_OPTIONS: cors.CorsOptions = {
  origin: CORS_ALLOW_LIST,
  credentials: true,
};

const app = express();
app.use(cookieParser());
app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(express.urlencoded());

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
});

server.applyMiddleware({
  app,
  path: "/graphql",
  cors: { origin: CORS_ALLOW_LIST, credentials: true },
});

mongo.connect();

app.listen({ port: 5000 }, () => {
  /* eslint-disable-next-line no-console */
  console.info("Server is listening on port 5000!");
});
