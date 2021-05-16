import { makeExecutableSchema, gql } from "apollo-server-express";
import { merge } from "lodash";

import entityResolvers from "./resolvers/entityResolvers";
import entityType from "./types/entityType";

const query = gql`
  type Query {
    _empty: String
  }
`;

const mutation = gql`
  type Mutation {
    _empty: String
  }
`;

const executableSchema = makeExecutableSchema({
  typeDefs: [query, mutation, entityType],
  resolvers: merge(entityResolvers),
});

export default executableSchema;
